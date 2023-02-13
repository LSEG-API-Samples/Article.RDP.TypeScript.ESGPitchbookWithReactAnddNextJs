"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSession = void 0;
const isArray_1 = __importDefault(require("lodash/isArray"));
const p_limit_1 = __importDefault(require("p-limit"));
const tough_cookie_1 = require("tough-cookie");
const config_1 = require("../../config");
const config_interfaces_1 = require("../../config/config.interfaces");
const constants_1 = require("../../constants");
const omm_stream_interface_1 = require("../../delivery/stream/omm-stream.interface");
const protocol_1 = require("../../delivery/stream/protocol");
const rdp_stream_interface_1 = require("../../delivery/stream/rdp-stream.interface");
const stream_connection_1 = require("../../delivery/stream/stream-connection");
const stream_message_converter_1 = require("../../delivery/stream/stream-message-converter");
const http_client_1 = require("../../http-client");
const logger_1 = require("../../logger");
const connection_error_1 = require("../../state/connection-error");
const recover_error_1 = require("../../state/recover-error");
const state_manager_1 = require("../../state/state-manager");
const session_interface_1 = require("../session.interface");
const hash_generator_1 = require("../../util/hash-generator");
const protocols = {
    [config_interfaces_1.StreamingType.OMM]: new protocol_1.OmmProtocol(),
    [config_interfaces_1.StreamingType.RDP]: new protocol_1.RdpProtocol(),
};
const DUMMY_TOUGH_COOKIE_URL = 'https://isnotrealurl.com';
class AbstractSession extends state_manager_1.AbstractStateManager {
    constructor(httpClient = http_client_1.HttpClientImpl.getInstance()) {
        super();
        this.httpClient = httpClient;
        this.isEndpointSupported = true;
        this.log = logger_1.logger.getLogger('session:common');
        this.sessionEventsEmitter = this;
        this.streamConnections = new Map();
        this.getStreamConnectionLimit = p_limit_1.default(1);
        this.cookieJar = new tough_cookie_1.CookieJar();
    }
    get invalidStateMessage() {
        return constants_1.ErrorMessages.INVALID_SESSION_STATE_MESSAGE;
    }
    async sendRequest(requestParams) {
        this.log.info('Begin request sending...');
        this.log.debug('Request parameters:', requestParams);
        this.validateState();
        this.log.debug('Is cookie Jar supported:', this.cookieJarSupport);
        if (this.cookieJarSupport) {
            const requestParamsWithCookies = await this.addCookies(requestParams);
            this.log.debug('Params with cookie:', requestParamsWithCookies);
            const result = await this.request(requestParamsWithCookies);
            await this.saveCookies(result.headers);
            this.log.debug('Cookies have been saved');
            return result;
        }
        return this.request(requestParams);
    }
    getOMMStreamConnection(api = omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME, validateState = true) {
        return this.getStreamConnection(protocols[config_interfaces_1.StreamingType.OMM], api, validateState);
    }
    getRDPStreamConnection(api = rdp_stream_interface_1.DEFAULT_RDP_STREAMING_CONNECTION_NAME, validateState = true) {
        return this.getStreamConnection(protocols[config_interfaces_1.StreamingType.RDP], api, validateState);
    }
    getOverriddenEndpoint(group, name) {
        const endpointFullConfig = this.getOverriddenEndpoints()[group];
        return endpointFullConfig ? endpointFullConfig[name] : endpointFullConfig;
    }
    async cleanUp() {
        this.log.debug('Close all streaming connections. Protocols:', Array.from(this.streamConnections.keys()));
        await Promise.all(Array.from(this.streamConnections.values()).map(streamConnection => streamConnection.close()));
    }
    getStreamingTypes(api) {
        const [dataApi, service, endpoint] = api.split('/');
        const connectionConfig = config_1.config.get(`apis.${dataApi}.${service}`);
        if (!connectionConfig) {
            throw new Error(`"${api}" streaming connection is not defined is the config!`);
        }
        const connectionEndpointConfig = connectionConfig.endpoints[endpoint];
        if (!connectionEndpointConfig) {
            throw new Error(`"${endpoint}" streaming connection endpoint is not defined is the config!`);
        }
        return connectionEndpointConfig.protocols || [];
    }
    checkAndValidateState(validateState) {
        if (validateState) {
            this.validateState();
        }
    }
    async createStreamConnection(protocol, api) {
        try {
            const socketCreatorsList = await this.getSocketCreators(api, protocol.getProtocolName());
            return new stream_connection_1.StreamConnectionImpl(protocol, socketCreatorsList, () => this.getStreamLoginParams(), new hash_generator_1.NumericHashGenerator());
        }
        catch (err) {
            this.emit(session_interface_1.SessionEvent.Error, err, this);
            throw err;
        }
    }
    async getStreamConnection(protocol, api, validateState) {
        this.log.debug('Get streaming connection. Connection name:', api);
        return this.getStreamConnectionLimit(async () => {
            this.checkAndValidateState(validateState);
            const type = protocol.getProtocolType();
            const configTypes = this.getStreamingTypes(api);
            if (!configTypes.includes(type)) {
                throw new Error('StreamingType conflict: requested config type is not supported!');
            }
            const connectionKey = `${type}/${api}`;
            const needCreateConnection = !this.streamConnections.has(connectionKey);
            this.log.debug('Connection with such streaming type does not exist:', needCreateConnection);
            if (needCreateConnection) {
                this.log.debug('Create new streaming connection. Name:', connectionKey);
                const createdStreamConnection = await this.createStreamConnection(protocol, api);
                this.checkAndValidateState(validateState);
                this.log.debug('Cache streaming connection with name:', connectionKey);
                this.streamConnections.set(connectionKey, createdStreamConnection);
            }
            else {
                await this.checkPipeErrors();
            }
            const streamConnection = this.streamConnections.get(connectionKey);
            try {
                this.log.info('Open streaming connection');
                await streamConnection.open();
            }
            catch (err) {
                let finalError = this.mapReconnectError(err, connectionKey);
                if (finalError === err) {
                    finalError = this.mapError(err, connectionKey);
                }
                this.log.error(`Opening streaming connection. Name: "${connectionKey}"`, err);
                this.emit(session_interface_1.SessionEvent.Error, finalError, this);
                throw finalError;
            }
            this.log.info(`Streaming connection '${connectionKey}' has been opened successfully`);
            return streamConnection;
        });
    }
    mapError(err, api) {
        if (err.type === 'error') {
            return new Error(stream_message_converter_1.getStreamConnectionError(api));
        }
        else {
            return err;
        }
    }
    mapReconnectError(err, api) {
        if (err instanceof recover_error_1.RecoverError) {
            return new Error(stream_message_converter_1.getStreamConnectionRecoverError(api));
        }
        else if (err instanceof connection_error_1.ConnectionError) {
            return new Error(stream_message_converter_1.getStreamConnectionError(api));
        }
        return err;
    }
    async addCookies(request) {
        const { headers = {} } = request, rest = __rest(request, ["headers"]);
        const { cookie, Cookie: alternativeCookie } = headers, restHeaders = __rest(headers, ["cookie", "Cookie"]);
        const savedCookies = await this.getCookies();
        const joinedCookies = [cookie, alternativeCookie, savedCookies].filter(Boolean).join('; ');
        if (!request.headers && !savedCookies) {
            return request;
        }
        return Object.assign(Object.assign({}, rest), { headers: Object.assign(Object.assign({}, (joinedCookies ? { cookie: joinedCookies } : {})), restHeaders) });
    }
    async getCookies() {
        const cookies = await this.cookieJar.getCookies(DUMMY_TOUGH_COOKIE_URL, { allPaths: true });
        return cookies.map(cookie => cookie.cookieString()).join('; ');
    }
    async saveCookies(headers = {}) {
        const originalSetCookie = headers['set-cookie'];
        const setCookie = ((originalSetCookie && !isArray_1.default(originalSetCookie) ? [originalSetCookie] : originalSetCookie) || []);
        const promises = setCookie.map(async (value) => {
            const cookie = tough_cookie_1.Cookie.parse(value);
            if (cookie) {
                await this.cookieJar.setCookie(cookie, DUMMY_TOUGH_COOKIE_URL);
            }
            return Promise.resolve(void 0);
        });
        await Promise.all(promises);
    }
}
exports.AbstractSession = AbstractSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXNzaW9uL2Fic3RyYWN0L2Fic3RyYWN0LXNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBcUM7QUFDckMsc0RBQTZCO0FBQzdCLCtDQUFpRDtBQUlqRCx5Q0FBc0M7QUFDdEMsc0VBQTBGO0FBQzFGLCtDQUFnRDtBQUNoRCxxRkFBbUc7QUFDbkcsNkRBQThHO0FBQzlHLHFGQUFtRztBQUNuRywrRUFBK0U7QUFFL0UsNkZBQTJIO0FBQzNILG1EQUF1RTtBQUN2RSx5Q0FBc0M7QUFDdEMsbUVBQStEO0FBQy9ELDZEQUF5RDtBQUN6RCw2REFBaUU7QUFDakUsNERBQThHO0FBQzlHLDhEQUFpRTtBQUVqRSxNQUFNLFNBQVMsR0FBRztJQUNkLENBQUMsaUNBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLHNCQUFXLEVBQUU7SUFDdEMsQ0FBQyxpQ0FBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksc0JBQVcsRUFBRTtDQUN6QyxDQUFDO0FBS0YsTUFBTSxzQkFBc0IsR0FBRywwQkFBMEIsQ0FBQztBQUUxRCxNQUFzQixlQUFnQixTQUFRLG9DQUFvQjtJQWdCOUQsWUFBK0IsYUFBYSw0QkFBYyxDQUFDLFdBQVcsRUFBRTtRQUNwRSxLQUFLLEVBQUUsQ0FBQztRQURtQixlQUFVLEdBQVYsVUFBVSxDQUErQjtRQVRqRSx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFeEIsUUFBRyxHQUFHLGVBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFlLENBQUM7UUFFdkMsc0JBQWlCLEdBQXVDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEUsNkJBQXdCLEdBQUcsaUJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxjQUFTLEdBQUcsSUFBSSx3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