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
exports.TransportPipe = void 0;
const qs_1 = __importDefault(require("qs"));
const common_1 = require("@refinitiv-data/common");
const container_session_1 = require("../../constants/container-session");
const error_messages_1 = require("../../constants/error-messages");
const get_position_1 = require("../../util/get-position");
const jet_bus_browser_1 = require("./jet-bus-browser/jet-bus-browser");
const content_1 = require("../../constants/content");
const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
class TransportPipe {
    constructor(bus, options) {
        this.options = options;
        this.isInitialized = false;
        this.bus = bus || new jet_bus_browser_1.JETBusBrowser();
        this.busRequester = new common_1.IpcBusRequester(this.bus, common_1.ContainerSessionService.ApiProxy, this.options);
    }
    async initialize() {
        await this.busRequester.connect();
        this.isInitialized = true;
    }
    async authorize(authParams) {
        if (!this.isInitialized) {
            throw new Error(error_messages_1.ErrorMessages.INITIALIZE_FIRST);
        }
        await this.busRequester.request(common_1.ContainerSessionChannel.Authorize, authParams);
        this.authParams = authParams;
    }
    async cleanUp() {
        await this.busRequester.disconnect();
    }
    get rdpUrlRoot() {
        return container_session_1.RDP_ENDPOINT_ROOT;
    }
    async request(requestParams) {
        const { url, query } = requestParams, restParams = __rest(requestParams, ["url", "query"]);
        const arrayFormat = url.startsWith(content_1.HISTORICAL_PRICING_URL) ? 'comma' : 'repeat';
        const urlWithQueryParams = query ? `${url}?${qs_1.default.stringify(query, { arrayFormat })}` : url;
        const headers = this.prepareRequestHeaders(requestParams);
        const params = Object.assign(Object.assign({}, restParams), { headers, url: urlWithQueryParams, appKey: this.authParams.appKey, scope: this.authParams.scope });
        const response = await this.busRequester.request(common_1.ContainerSessionChannel.Request, params);
        const httpResponse = this.toHttpResponse(response);
        this.validateResponseStatus(httpResponse);
        return httpResponse;
    }
    getStreamTransport(api, protocol, execEnv) {
        if (protocol !== 'tr_json2' && protocol !== 'rdp_streaming') {
            throw new Error(`"${protocol}" streaming connection type is not supported!`);
        }
        const channel = protocol === 'tr_json2' && execEnv && execEnv !== container_session_1.ExecutionContainer.DESKTOP_RW_NON_1_9_OR_EIKON
            ? '/api-proxy/stream'
            : common_1.ContainerSessionChannel.Stream;
        return () => {
            const client = new common_1.IpcBusSocketClient(this.bus, channel, api, protocol, this.options);
            client.connect();
            return client;
        };
    }
    getStreamLoginParams() {
        return {
            applicationId: void 0,
            position: get_position_1.getPosition(),
            appKey: this.authParams.appKey,
        };
    }
    validateResponseStatus(response) {
        const { status } = response;
        if (status >= common_1.HttpCode.OK && status < common_1.HttpCode.MULTIPLE_CHOICES) {
            return;
        }
        const error = new Error(`Request failed with status code ${status}`);
        Object.assign(error, response);
        throw error;
    }
    prepareRequestHeaders(requestParams) {
        const headers = requestParams.headers || {};
        if (typeof requestParams.body === 'object') {
            const contentType = Object.keys(headers).find((header) => header.toUpperCase() === CONTENT_TYPE_HEADER_NAME.toUpperCase());
            if (!contentType) {
                headers[CONTENT_TYPE_HEADER_NAME] = 'application/json';
            }
        }
        return headers;
    }
    toHttpResponse(response) {
        let data;
        try {
            data = response.body ? JSON.parse(response.body) : response.body;
        }
        catch (err) {
            data = response.body;
        }
        const result = {
            config: {},
            headers: response.headers || {},
            statusText: response.statusMessage || 'OK',
            status: response.statusCode,
            data,
        };
        return result;
    }
}
exports.TransportPipe = TransportPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LXBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9jb250YWluZXIvdHJhbnNwb3J0LXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFFcEIsbURBZWdDO0FBRWhDLHlFQUEwRjtBQUMxRixtRUFBK0Q7QUFFL0QsMERBQXNEO0FBRXRELHVFQUFrRTtBQUVsRSxxREFBaUU7QUFFakUsTUFBTSx3QkFBd0IsR0FBRyxjQUFjLENBQUM7QUFFaEQsTUFBYSxhQUFhO0lBVXRCLFlBQVksR0FBbUIsRUFBVSxPQUE4QjtRQUE5QixZQUFPLEdBQVAsT0FBTyxDQUF1QjtRQUYvRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUduQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLCtCQUFhLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksd0JBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGdDQUF1QixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ25CLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFxQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNuRDtRQUVELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0NBQXVCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRS9FLElBQUksQ0FBQyxVQUFVLEdB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