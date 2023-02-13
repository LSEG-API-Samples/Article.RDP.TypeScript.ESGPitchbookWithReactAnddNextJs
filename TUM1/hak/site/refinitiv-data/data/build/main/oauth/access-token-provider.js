"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenProviderImpl = exports.TOKEN_REDUCING_VALIDITY_TIME = exports.DEFAULT_TOKEN_EXPIRY_TIME_SEC = exports.RETRY_REFRESH_TIMEOUT = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const p_limit_1 = __importDefault(require("p-limit"));
const p_retry_1 = __importDefault(require("p-retry"));
const config_1 = require("../config");
const http_client_impl_1 = require("../http-client/http-client-impl");
const logger_1 = require("../logger");
const delay_1 = require("../util/delay");
const access_token_helper_1 = require("./access-token-helper");
const access_token_provider_interface_1 = require("./access-token-provider.interface");
const oauth_converter_1 = require("./oauth-converter");
exports.RETRY_REFRESH_TIMEOUT = 30;
exports.DEFAULT_TOKEN_EXPIRY_TIME_SEC = 10 * 60;
const MAX_TOKEN_EXPIRY_TIME_SEC = 24 * 60 * 60;
exports.TOKEN_REDUCING_VALIDITY_TIME = 5;
class AccessTokenProviderImpl extends eventemitter3_1.default {
    constructor(appKey, getAuthUrl, oAuthGrantType, httpClient = http_client_impl_1.HttpClientImpl.getInstance()) {
        super();
        this.appKey = appKey;
        this.getAuthUrl = getAuthUrl;
        this.oAuthGrantType = oAuthGrantType;
        this.httpClient = httpClient;
        this.limit = p_limit_1.default(1);
        this.onRetryLoginFailed = async (error) => {
            var _a;
            this.log.warn(`Auth try:${error.attemptNumber} failed. ${error.message}`, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) ? error.response.data : '');
            await delay_1.delay(exports.TOKEN_REDUCING_VALIDITY_TIME * 1000);
        };
        this.stopWithError = (error) => {
            this.log.error(`${access_token_provider_interface_1.TokenProviderEvent.TokenExpired} => ${error.message}`);
            this.emit(access_token_provider_interface_1.TokenProviderEvent.TokenExpired, error);
            this.stopRefresh();
        };
        this.isStopped = false;
        this.log = logger_1.logger.getLogger('token:provider');
    }
    login() {
        return this.limit(async () => {
            var _a;
            try {
                this.log.debug('Starting authentication process.');
                const payload = oauth_converter_1.oAuthConverter.getPasswordGrantPayload(this.oAuthGrantType, this.appKey);
                await this.executeAuthenticationWithSafeGuard(access_token_provider_interface_1.TokenProviderEvent.AuthenticationSucceeded, payload);
            }
            catch (error) {
                this.log.error(`${access_token_provider_interface_1.TokenProviderEvent.AuthenticationFailed} => ${error.message}`, ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) ? error.response.data : '');
                this.emit(access_token_provider_interface_1.TokenProviderEvent.AuthenticationFailed, error);
                throw error;
            }
        });
    }
    emit(event, ...args) {
        if (this.isStopped) {
            this.clearAllTimers();
            this.log.debug(`emit '${event}' skipped`);
            return false;
        }
        return super.emit(event, ...args);
    }
    getToken() {
        var _a;
        if ((_a = this.platformAuthParams) === null || _a === void 0 ? void 0 : _a.accessToken) {
            return this.platformAuthParams.accessToken;
        }
        throw new Error('Access token is not available!');
    }
    stopRefresh() {
        this.isStopped = true;
        this.clearAllTimers();
    }
    async processRefreshRequest() {
        var _a;
        this.log.debug(`Start token refreshing.`);
        try {
            const payload = oauth_converter_1.oAuthConverter.getRefreshGrantPayload(this.oAuthGrantType, this.appKey, this.platformAuthParams.refreshToken);
            await this.executeAuthenticationWithSafeGuard(access_token_provider_interface_1.TokenProviderEvent.RefreshSucceeded, payload);
        }
        catch (err) {
            this.log.warn(`${access_token_provider_interface_1.TokenProviderEvent.RefreshFailed} => ${err.message}`, ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) ? err.response.data : '');
            this.emit(access_token_provider_interface_1.TokenProviderEvent.RefreshFailed, err);
            if (access_token_helper_1.isHttpTimeoutError(err)) {
                this.log.warn(`Request timed out. Next refresh retry in ${exports.RETRY_REFRESH_TIMEOUT} sec`);
                this.startRefreshTimer(exports.RETRY_REFRESH_TIMEOUT * 1000);
            }
            else if (this.autoReconnectEnabled() && access_token_helper_1.isAllowedHttpErrorToReconnect(err)) {
                return this.reLogin();
            }
            else {
                this.stopWithError(err);
            }
        }
    }
    async executeAuthenticationWithSafeGuard(event, payload) {
        const start = Date.now();
        const response = await this.httpClient.post(this.getAuthUrl(), payload);
        const durationSec = Math.ceil((Date.now() - start) / 1000);
        this.platformAuthParams = oauth_converter_1.oAuthConverter.parseTokenResponse(response.data);
        this.log.debug(`${event} => ${this.platformAuthParams.accessToken.slice(0, 5)}*****`, `expiresIn=${this.platformAuthParams.expiresIn}-${durationSec}sec`);
        this.platformAuthParams.expiresIn = this.getValidExpiresIn(this.platformAuthParams.expiresIn);
        this.runTimers(this.platformAuthParams.expiresIn - durationSec);
        this.emit(event, this.platformAuthParams.accessToken);
    }
    getValidExpiresIn(expiresIn) {
        if (Number.isNaN(expiresIn) || expiresIn < exports.DEFAULT_TOKEN_EXPIRY_TIME_SEC || expiresIn > MAX_TOKEN_EXPIRY_TIME_SEC) {
            this.log.warn(`Data to refresh a token: ${expiresIn}.`);
            this.log.warn(`The token refreshing delay is set to the minimum allowable value ${exports.DEFAULT_TOKEN_EXPIRY_TIME_SEC} ms.`);
            return exports.DEFAULT_TOKEN_EXPIRY_TIME_SEC;
        }
        return expiresIn;
    }
    autoReconnectEnabled() {
        return config_1.config.get('sessions').platform['default-session']['auto-reconnect'];
    }
    async reLogin() {
        this.log.debug('Starting reconnect!');
        this.clearAllTimers();
        return this.login().catch(this.stopWithError);
    }
    runTimers(expireTime) {
        const expiresTimeout = (expireTime - exports.RETRY_REFRESH_TIMEOUT) * 1000;
        this.startExpireTimer(expiresTimeout);
        this.startRefreshTimer((expireTime * 1000) / 2);
    }
    clearAllTimers() {
        this.clearRefreshTimeout();
        this.clearExpiresTimeout();
    }
    startRefreshTimer(timeout) {
        this.clearRefreshTimeout();
        this.refreshTimeoutId = setTimeout(this.processRefreshRequest.bind(this), timeout);
    }
    startExpireTimer(timeout) {
        this.clearExpiresTimeout();
        this.expireTimeoutId = setTimeout(async () => {
            this.clearAllTimers();
            await p_retry_1.default(this.login.bind(this), {
                factor: 1,
                maxRetryTime: (exports.RETRY_REFRESH_TIMEOUT - exports.TOKEN_REDUCING_VALIDITY_TIME) * 1000,
                onFailedAttempt: this.onRetryLoginFailed,
            }).catch(e => this.stopWithError(new Error('Access token has been expired')));
        }, timeout);
    }
    clearRefreshTimeout() {
        if (this.refreshTimeoutId) {
            clearTimeout(this.refreshTimeoutId);
            this.refreshTimeoutId = undefined;
        }
    }
    clearExpiresTimeout() {
        if (this.expireTimeoutId) {
            clearTimeout(this.expireTimeoutId);
            this.expireTimeoutId = undefined;
        }
    }
}
exports.AccessTokenProviderImpl = AccessTokenProviderImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLXRva2VuLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29hdXRoL2FjY2Vzcy10b2tlbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBeUM7QUFDekMsc0RBQTZCO0FBQzdCLHNEQUFxRDtBQUVyRCxzQ0FBbUM7QUFDbkMsc0VBQWlFO0FBQ2pFLHNDQUEyQztBQUMzQyx5Q0FBc0M7QUFDdEMsK0RBQTBGO0FBQzFGLHVGQUFpSDtBQUNqSCx1REFBbUQ7QUFVdEMsUUFBQSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7QUFFM0IsUUFBQSw2QkFBNkIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3JELE1BQU0seUJBQXlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFTbEMsUUFBQSw0QkFBNEIsR0FBRyxDQUFDLENBQUM7QUFlOUMsTUFBYSx1QkFBd0IsU0FBUSx1QkFBaUM7SUFjMUUsWUFDWSxNQUFjLEVBQ2QsVUFBd0IsRUFDeEIsY0FBNkIsRUFDN0IsYUFBYSxpQ0FBYyxDQUFDLFdBQVcsRUFBRTtRQUVqRCxLQUFLLEVBQUUsQ0FBQztRQUxBLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFVLEdBQVYsVUFBVSxDQUFjO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQStCO1FBZDdDLFVBQUssR0FBRyxpQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBK0tsQix1QkFBa0IsR0FBRyxLQUFLLEVBQUUsS0FBeUIsRUFBRSxFQUFFOztZQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDVCxZQUFZLEtBQUssQ0FBQyxhQUFhLFlBQVksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUMxRCxDQUFBLE1BQUMsS0FBYSxDQUFDLFFBQVEsMENBQUUsSUFBSSxFQUFDLENBQUMsQ0FBRSxLQUFhLENB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