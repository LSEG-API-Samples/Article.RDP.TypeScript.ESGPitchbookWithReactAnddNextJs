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
exports.EndpointRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const isString_1 = __importDefault(require("lodash/isString"));
const url_1 = require("url");
const common_1 = require("@refinitiv-data/common");
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const render_endpoint_url_1 = require("../../util/render-endpoint-url");
const default_session_1 = require("../../session/default-session");
class EndpointRequest {
    constructor(requestParams) {
        this.requestParams = requestParams;
        util_1.validateRequired(requestParams, ['url'], 'EndpointRequestDefinitionParams');
    }
    get url() {
        return this.requestParams.url;
    }
    get method() {
        return this.requestParams.method || common_1.HttpMethod.GET;
    }
    get query() {
        return this.requestParams.queryParameters;
    }
    get body() {
        return this.requestParams.bodyParameters;
    }
    get path() {
        return this.requestParams.pathParameters;
    }
    get headers() {
        return this.requestParams.headerParameters;
    }
    get handleAutoRedirect() {
        return this.requestParams.handleAutoRedirect;
    }
    static Definition(params) {
        return new EndpointRequest(isString_1.default(params) ? { url: params } : params);
    }
    static parseUrl(endpointUrl, pathParams) {
        const renderedUrl = render_endpoint_url_1.renderEndpointUrl(endpointUrl, pathParams);
        return url_1.parse(renderedUrl, true);
    }
    static prepareEndpointResponse(httpResponse) {
        return {
            httpHeaders: httpResponse.headers,
            httpStatus: httpResponse.status,
            data: httpResponse.data,
        };
    }
    async getData(session = default_session_1.getDefault()) {
        var _a, _b, _c;
        util_1.validateRequired({ session }, ['session'], 'EndpointRequestDataParams');
        if (!session.isEndpointSupported) {
            throw new Error(constants_1.ErrorMessages.ONLY_STREAMING_CONNECTION);
        }
        const _d = this.requestParams, { url: endpointUrl, method = common_1.HttpMethod.GET, pathParameters = {}, queryParameters = {}, handleAutoRedirect, bodyParameters, headerParameters } = _d, httpParams = __rest(_d, ["url", "method", "pathParameters", "queryParameters", "handleAutoRedirect", "bodyParameters", "headerParameters"]);
        const { pathname, query: queryFromUrl } = EndpointRequest.parseUrl(endpointUrl, pathParameters);
        const queryParams = Object.assign(Object.assign({}, queryFromUrl), queryParameters);
        const requestConfig = Object.assign(Object.assign(Object.assign({ method, url: pathname }, (Object.keys(queryParams).length && { query: queryParams })), httpParams), (handleAutoRedirect !== undefined && { handleAutoRedirect }));
        if (bodyParameters) {
            requestConfig.body = bodyParameters;
        }
        if (headerParameters) {
            requestConfig.headers = headerParameters;
        }
        try {
            const httpResponse = await session.sendRequest(requestConfig);
            return EndpointRequest.prepareEndpointResponse(httpResponse);
        }
        catch (error) {
            const errorDescription = (_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message;
            if (errorDescription) {
                error.message += `. ${errorDescription}`;
            }
            if (axios_1.default.isAxiosError(error)) {
                this.handleAxiosError(error);
            }
            throw error;
        }
    }
    handleAxiosError(error) {
        const { response } = error;
        if (!(response === null || response === void 0 ? void 0 : response.statusText) && (response === null || response === void 0 ? void 0 : response.status) === common_1.HttpCode.BAD_REQUEST) {
            response.statusText = 'Bad Request';
        }
    }
}
exports.EndpointRequest = EndpointRequest;
EndpointRequest.Method = common_1.HttpMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnQtcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWxpdmVyeS9lbmRwb2ludC1yZXF1ZXN0L2VuZHBvaW50LXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEM7QUFDMUMsK0RBQXVDO0FBQ3ZDLDZCQUFnRDtBQUVoRCxtREFBeUY7QUFFekYsK0NBQWdEO0FBRWhELHFDQUE4QztBQUM5Qyx3RUFBbUU7QUFFbkUsbUVBQTJEO0FBRTNELE1BQWEsZUFBZTtJQW9EeEIsWUFBMkIsYUFBOEM7UUFBOUMsa0JBQWEsR0FBYixhQUFhLENBQWlDO1FBQ3JFLHVCQUFnQixDQUFrQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFyREQsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxtQkFBVSxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFXLGtCQUFrQjtRQUN6QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7SUFD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