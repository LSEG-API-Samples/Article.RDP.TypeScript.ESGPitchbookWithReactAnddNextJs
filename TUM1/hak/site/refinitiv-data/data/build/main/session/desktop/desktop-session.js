"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopSession = void 0;
const detect_browser_1 = require("detect-browser");
const isString_1 = __importDefault(require("lodash/isString"));
const url_1 = require("url");
const url_join_1 = __importDefault(require("url-join"));
const common_1 = require("@refinitiv-data/common");
const config_1 = require("../../config");
const handshake_1 = require("../../handshake/handshake");
const logger_1 = require("../../logger");
const merge_request_params_1 = require("../../util/merge-request-params");
const validate_required_1 = require("../../util/validate-required");
const webSocket_helper_1 = require("../../util/webSocket-helper");
const abstract_session_1 = require("../abstract/abstract-session");
const session_definition_1 = require("../session-definition");
const session_interface_1 = require("../session.interface");
const build_desktop_session_login_data_1 = require("./build-desktop-session-login-data");
const desktop_session_params_interface_1 = require("./desktop-session-params.interface");
class DesktopSession extends abstract_session_1.AbstractSession {
    constructor(sessionParams) {
        super();
        this.sessionParams = sessionParams;
        this.socketCreators = [];
        this.log = logger_1.logger.getLogger('session:desktop');
        this.log.info('Create session');
        this.log.debug('Session options:', sessionParams);
        validate_required_1.validateRequired(sessionParams, ['appKey'], 'DesktopSessionParams');
        this.port = sessionParams.port || this.defaultPort;
        this.log.debug('Port to be used by session:', this.port);
    }
    static Definition(params) {
        return new session_definition_1.SessionDefinitionImpl(() => new DesktopSession(isString_1.default(params) ? { appKey: params } : params));
    }
    get rdpUrlRoot() {
        return config_1.config.get('sessions').desktop['default-session']['platform-paths'].rdp;
    }
    get defaultPort() {
        return Number(new URL(config_1.config.get('sessions').desktop['default-session']['base-url']).port);
    }
    get baseUrl() {
        const { hostname, protocol, pathname } = new URL(config_1.config.get('sessions').desktop['default-session']['base-url']);
        return url_1.format({ protocol, hostname, port: this.port, pathname });
    }
    get udfUrlRoot() {
        return config_1.config.get('sessions').desktop['default-session']['platform-paths'].udf;
    }
    get handshakeEndpoint() {
        return config_1.config.get('sessions').desktop['default-session']['handshake-url'];
    }
    get uuid() {
        return process.env.REFINITIV_AAA_USER_ID;
    }
    getOverriddenEndpoints() {
        return config_1.config.get('sessions').desktop['default-session'].apis || {};
    }
    get cookieJarSupport() {
        var _a;
        return ((_a = detect_browser_1.detect()) === null || _a === void 0 ? void 0 : _a.type) === 'node';
    }
    async initialize() {
        try {
            const handshakePayload = handshake_1.getHandshakePayload(this.sessionParams.appKey, this.uuid);
            const { data: { access_token, token_type }, } = await this.request({
                method: common_1.HttpMethod.POST,
                url: this.handshakeEndpoint,
                body: handshakePayload,
            });
            this.accessToken = access_token;
            this.tokenType = token_type[0].toUpperCase() + token_type.slice(1);
            this.emitAuthenticationSuccess();
        }
        catch (err) {
            const { status } = err.response || {};
            if (status === common_1.HttpCode.FORBIDDEN || status === common_1.HttpCode.NOT_FOUND) {
                await this.request({ method: common_1.HttpMethod.POST, url: this.udfUrlRoot });
                this.emitAuthenticationSuccess();
                return;
            }
            this.emitAuthenticationFailed(err);
            throw err;
        }
    }
    async request(sessionRequestParams) {
        const headers = { [desktop_session_params_interface_1.APPLICATION_ID_HEADER]: this.sessionParams.appKey };
        if (this.accessToken) {
            headers[desktop_session_params_interface_1.AUTHORIZATION_HEADER] = `${this.tokenType} ${this.accessToken}`;
        }
        const requestConfig = merge_request_params_1.mergeRequestParams(this.baseUrl, sessionRequestParams, headers);
        return this.httpClient.request(requestConfig);
    }
    async getSocketCreators(api, protocolName) {
        if (protocolName !== 'tr_json2' && protocolName !== 'rdp_streaming') {
            throw new Error(`"${protocolName}" streaming connection type is not supported!`);
        }
        if (!this.socketCreators.length) {
            this.socketCreators = await this.requestWebSocketList(api, protocolName);
        }
        return this.socketCreators;
    }
    getStreamLoginParams() {
        const streamAuthParams = {
            appKey: this.sessionParams.appKey,
            accessToken: this.accessToken,
            tokenType: this.tokenType,
        };
        return build_desktop_session_login_data_1.buildDesktopSessionLoginData(streamAuthParams);
    }
    prepareWebSocketCreators(endpointsList, protocol) {
        return endpointsList.services.map(({ endpoint, port }) => {
            const endpointWithPort = endpoint.replace('localhost', `localhost:${port}`);
            const options = {
                headers: {
                    [desktop_session_params_interface_1.AUTHORIZATION_HEADER]: `${this.tokenType} ${this.accessToken}`,
                },
            };
            return webSocket_helper_1.prepareSocketCreator(`ws://${endpointWithPort}`, protocol, options);
        });
    }
    getStreamingDiscoveryEndpoint(api) {
        const [dataApi, service, endpoint] = api.split('/');
        if (!(dataApi && service && endpoint)) {
            throw new Error(`Parameter 'api' is not correct. Please check your config.`);
        }
        const discoveryEndpoint = config_1.config.get(`apis.${dataApi}.${service}`).url || '';
        const path = config_1.config.get(`apis.${dataApi}.${service}.endpoints.${endpoint}.path`) || '/';
        return url_join_1.default(this.rdpUrlRoot, discoveryEndpoint, path);
    }
    async requestWebSocketList(api, protocol) {
        try {
            const { data: endpointsList } = await this.request({
                url: this.getStreamingDiscoveryEndpoint(api),
                method: common_1.HttpMethod.GET,
            });
            return this.prepareWebSocketCreators(endpointsList, protocol);
        }
        catch (err) {
            this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.Error, err, this);
            throw err;
        }
    }
    emitAuthenticationSuccess() {
        this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationSucceeded);
    }
    emitAuthenticationFailed(err) {
        this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.EventReceived, this, session_interface_1.SessionEventCode.AuthenticationFailed, err);
        this.sessionEventsEmitter.emit(session_interface_1.SessionEvent.Error, err, this);
    }
    async checkPipeErrors() {
        return Promise.resolve(void 0);
    }
}
exports.DesktopSession = DesktopSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVza3RvcC1zZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Nlc3Npb24vZGVza3RvcC9kZXNrdG9wLXNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQXdDO0FBQ3hDLCtEQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0Isd0RBQStCO0FBRy9CLG1EQUFzRztBQUV0Ryx5Q0FBc0M7QUFFdEMseURBQWdFO0FBRWhFLHlDQUFzQztBQUN0QywwRUFBcUU7QUFDckUsb0VBQWdFO0FBQ2hFLGtFQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0QsOERBQThEO0FBQzlELDREQU84QjtBQUM5Qix5RkFBa0Y7QUFDbEYseUZBQTBJO0FBRTFJLE1BQWEsY0FBZSxTQUFRLGtDQUFlO0lBdUMvQyxZQUFvQixhQUFtQztRQUNuRCxLQUFLLEVBQUUsQ0FBQztRQURRLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUgvQyxtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFLekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVsRCxvQ0FBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBL0NNLE1BQU0sQ0FBQyxVQUFVLENBQUMs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