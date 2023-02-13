"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSession = void 0;
const detect_browser_1 = require("detect-browser");
const url_join_1 = __importDefault(require("url-join"));
const config_1 = require("../../config");
const error_messages_1 = require("../../constants/error-messages");
const omm_stream_interface_1 = require("../../delivery/stream/omm-stream.interface");
const logger_1 = require("../../logger");
const oauth_1 = require("../../oauth");
const merge_request_params_1 = require("../../util/merge-request-params");
const abstract_session_1 = require("../abstract/abstract-session");
const session_definition_1 = require("../session-definition");
const session_interface_1 = require("../session.interface");
const platform_session_validator_1 = require("./platform-session-validator");
const transport_host_1 = require("./transport-host");
const transport_rdp_1 = require("./transport-rdp");
class PlatformSession extends abstract_session_1.AbstractSession {
    constructor(sessionParams) {
        super();
        this.sessionParams = sessionParams;
        this.isEndpointSupported = false;
        this.onRefreshSucceed = (token) => {
            this.log.debug(`${session_interface_1.SessionEvent.EventReceived} => ${session_interface_1.SessionEventCode.RefreshSucceeded}`);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.RefreshSucceeded);
            this.refreshStreamToken();
        };
        this.onTokenExpired = async (error) => {
            this.log.error(`${session_interface_1.SessionEvent.EventReceived} => ${session_interface_1.SessionEventCode.RefreshFailed}`);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.RefreshFailed, error);
            this.log.error(`${session_interface_1.SessionEvent.Error} => ${error.message}`);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.Error, error, this);
            await this.close();
        };
        this.log = logger_1.logger.getLogger('session:platform');
        this.log.info('Create session');
        platform_session_validator_1.validatePlatformSessionParams(sessionParams);
        this.streamingTransport = this.getStreamingTransport(sessionParams);
        this.defineSessionProps(sessionParams);
    }
    static Definition(params) {
        return new session_definition_1.SessionDefinitionImpl(() => new PlatformSession(params));
    }
    get config() {
        return config_1.config.get('sessions').platform['default-session'];
    }
    get baseUrl() {
        return this.config['base-url'];
    }
    get tokenEndpoint() {
        const { url, token } = this.config.auth;
        return url_join_1.default(this.baseUrl, url, token);
    }
    getOverriddenEndpoints() {
        return config_1.config.get('sessions').platform['default-session'].apis || {};
    }
    get cookieJarSupport() {
        var _a;
        return ((_a = detect_browser_1.detect()) === null || _a === void 0 ? void 0 : _a.type) === 'node';
    }
    async initialize() {
        const sessionInitialization = [];
        if (this.isEndpointSupported) {
            sessionInitialization.push(this.tokenProvider.login());
        }
        if ('host' in this.sessionParams) {
            sessionInitialization.push(this.getOMMStreamConnection(omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME, false));
        }
        try {
            await Promise.all(sessionInitialization);
            this.log.debug(`${session_interface_1.SessionEvent.EventReceived} => ${session_interface_1.SessionEventCode.AuthenticationSucceeded}`);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationSucceeded);
            this.registerTokenListeners();
        }
        catch (err) {
            this.log.error(`${session_interface_1.SessionEvent.EventReceived} => ${session_interface_1.SessionEventCode.AuthenticationFailed}`);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationFailed, err);
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.Error, err, this);
            await this.cleanUp();
            throw err;
        }
    }
    async request(requestParams) {
        if (!this.isEndpointSupported) {
            throw new Error(error_messages_1.ErrorMessages.ONLY_STREAMING_CONNECTION);
        }
        const headers = {
            Authorization: `Bearer ${this.tokenProvider.getToken()}`,
            Accept: 'application/json',
        };
        const requestConfig = merge_request_params_1.mergeRequestParams(this.baseUrl, requestParams, headers);
        return this.httpClient.request(requestConfig);
    }
    async getSocketCreators(api, protocol) {
        return this.streamingTransport.getSocketCreators(api, protocol);
    }
    getStreamLoginParams() {
        return this.streamingTransport.getStreamLoginParams();
    }
    async cleanUp() {
        var _a, _b;
        (_a = this.tokenProvider) === null || _a === void 0 ? void 0 : _a.stopRefresh();
        (_b = this.tokenProvider) === null || _b === void 0 ? void 0 : _b.removeAllListeners();
        return super.cleanUp();
    }
    refreshStreamToken() {
        if (this.streamingTransport.isRefreshRequired) {
            Array.from(this.streamConnections.values()).forEach(streamConnection => {
                streamConnection.refresh();
            });
        }
    }
    getStreamingTransport(sessionParams) {
        if ('host' in sessionParams) {
            this.log.debug('Transport HOST is used. Host:', sessionParams.host);
            return new transport_host_1.TransportHost(sessionParams.host, sessionParams.dacs);
        }
        else if ('userName' in sessionParams && 'password' in sessionParams) {
            const transportRdpParams = {
                dacs: sessionParams.dacs,
                userName: sessionParams.userName,
                getAccessToken: () => this.tokenProvider.getToken(),
                request: this.request.bind(this),
            };
            this.log.debug('Transport RDP is used.');
            return new transport_rdp_1.TransportRdp(transportRdpParams);
        }
        const err = new Error('Wrong streaming transport type for Platform Session');
        this.log.error(err);
        throw err;
    }
    defineSessionProps(sessionParams) {
        if ('userName' in sessionParams && 'password' in sessionParams) {
            this.isEndpointSupported = true;
            this.tokenProvider = new oauth_1.AccessTokenProviderImpl(this.sessionParams.appKey, () => this.tokenEndpoint, sessionParams);
        }
    }
    registerTokenListeners() {
        var _a, _b, _c;
        (_a = this.tokenProvider) === null || _a === void 0 ? void 0 : _a.on(oauth_1.TokenProviderEvent.AuthenticationSucceeded, this.onRefreshSucceed);
        (_b = this.tokenProvider) === null || _b === void 0 ? void 0 : _b.on(oauth_1.TokenProviderEvent.RefreshSucceeded, this.onRefreshSucceed);
        (_c = this.tokenProvider) === null || _c === void 0 ? void 0 : _c.on(oauth_1.TokenProviderEvent.TokenExpired, this.onTokenExpired);
    }
    async checkPipeErrors() {
        return Promise.resolve(void 0);
    }
}
exports.PlatformSession = PlatformSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tc2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXNzaW9uL3BsYXRmb3JtL3BsYXRmb3JtLXNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQXdDO0FBQ3hDLHdEQUErQjtBQUkvQix5Q0FBc0M7QUFFdEMsbUVBQStEO0FBQy9ELHFGQUFtRztBQUVuRyx5Q0FBc0M7QUFDdEMsdUNBQStGO0FBQy9GLDBFQUFxRTtBQUNyRSxtRUFBK0Q7QUFDL0QsOERBQThEO0FBQzlELDREQUE2SDtBQUU3SCw2RUFBNkU7QUFFN0UscURBQWlEO0FBQ2pELG1EQUErQztBQU0vQyxNQUFhLGVBQWdCLFNBQVEsa0NBQWU7SUF1QmhELFlBQW9CLGFBQW9DO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRFEsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBbEJqRCx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFxSDNCLHFCQUFnQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxnQ0FBWSxDQUFDLGFBQWEsT0FBTyxvQ0FBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQ0FBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0NBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVwRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUM7UUFFTSxtQkFBYyxHQUFHLEtBQUssRUFBRSxLQUFZLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLGdDQUFZLENBQUMsYUFBYSxPQUFPLG9DQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLG9CQUFvQixD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