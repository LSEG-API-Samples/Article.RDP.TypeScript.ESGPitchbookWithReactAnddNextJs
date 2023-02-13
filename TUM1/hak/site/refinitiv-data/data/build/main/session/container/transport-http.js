"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportHttp = void 0;
const lodash_1 = require("lodash");
const baggage_header_1 = require("../../constants/baggage-header");
const logger_1 = require("../../logger");
const detect_environment_1 = require("../../util/detect-environment");
let EDP = {};
if (detect_environment_1.detectEnvironment() === "WEB") {
    EDP = require('edp-helper-lib').EDP;
}
const config_1 = require("../../config");
const container_session_1 = require("../../constants/container-session");
const error_messages_1 = require("../../constants/error-messages");
const http_client_impl_1 = require("../../http-client/http-client-impl");
const detect_container_1 = require("../../util/detect-container");
const merge_request_params_1 = require("../../util/merge-request-params");
const constants_1 = require("../../constants");
const trim = (str, char) => str.split(char).filter(Boolean).join(char);
const removeProxyPrefix = (url) => {
    const rdpPrefix = trim(container_session_1.RDP_ENDPOINT_ROOT, '/');
    const udfPrefix = trim(container_session_1.UDF_ENDPOINT_ROOT, '/');
    const urlTrimmed = trim(url, '/');
    const startsWithRdp = urlTrimmed.toLowerCase().startsWith(rdpPrefix);
    const startsWithUdf = urlTrimmed.toLowerCase().startsWith(udfPrefix);
    const urlStartCropPosition = rdpPrefix.length;
    if (startsWithRdp || startsWithUdf) {
        return urlTrimmed.slice(urlStartCropPosition);
    }
    return url;
};
class TransportHttp {
    constructor(params) {
        this.isInitialized = false;
        this.appKey = params.appKey;
        this.bus = params.bus;
        this.httpClient = params.httpClient || http_client_impl_1.HttpClientImpl.getInstance();
        this.log = logger_1.logger.getLogger('TransportHttp');
    }
    static get rdpPlatformHost() {
        return config_1.config.get('sessions').platform['default-session']['base-url'];
    }
    async initialize() {
        if (!EDP.getAccessToken) {
            throw new Error(error_messages_1.ErrorMessages.EDP_HELPER_UNAVAILABLE);
        }
        if (this.bus) {
            EDP.bus = this.bus;
        }
        this.isInitialized = true;
    }
    async authorize(authParams) {
        if (!this.isInitialized) {
            throw new Error(error_messages_1.ErrorMessages.INITIALIZE_FIRST);
        }
        EDP.appId = authParams.appKey;
        EDP.scopes = [authParams.scope];
        await EDP.getAccessToken();
    }
    async cleanUp() {
        return Promise.resolve(void 0);
    }
    get rdpUrlRoot() {
        return '';
    }
    async request(requestParams) {
        const { url } = requestParams;
        const urlWithNoPrefix = removeProxyPrefix(url);
        const token = await EDP.getAccessToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };
        this.addBaggageHeader(requestParams);
        const sessionRequestParams = Object.assign(Object.assign({}, requestParams), { url: urlWithNoPrefix });
        const environment = await this.getEnvironment();
        let urlPrefix = container_session_1.RW_REQUEST_PREFIX;
        const useRelativeBaseUrlContainers = [container_session_1.ExecutionContainer.SXS_WEB];
        if (useRelativeBaseUrlContainers.some(container => container === environment)) {
            urlPrefix = TransportHttp.rdpPlatformHost;
        }
        const requestConfig = merge_request_params_1.mergeRequestParams(urlPrefix, sessionRequestParams, headers);
        return this.httpClient.request(requestConfig);
    }
    getStreamTransport() {
        throw new Error(error_messages_1.ErrorMessages.STREAMING_NOT_READY_OR_UNAVAILABLE);
    }
    getStreamLoginParams() {
        throw new Error(error_messages_1.ErrorMessages.STREAMING_NOT_READY_OR_UNAVAILABLE);
    }
    async getEnvironment() {
        if (this.environment) {
            return this.environment;
        }
        this.environment = await detect_container_1.detectContainer();
        return this.environment;
    }
    addBaggageHeader(requestParams) {
        const { headers: initialHeaders } = requestParams;
        if (initialHeaders) {
            const headerEntries = Object.entries(initialHeaders);
            const mappedEntries = headerEntries.map(([key, value]) => {
                return [key.toLowerCase(), value];
            });
            const lowerCaseHeaders = lodash_1.fromPairs(mappedEntries);
            const baggage = lowerCaseHeaders[baggage_header_1.BAGGAGE_HEADER];
            const baggageFields = this.deserializeBaggage(baggage);
            if (!baggageFields.has(baggage_header_1.ORIGIN_SVC_FIELD_NAME) || !this.isValid(baggageFields)) {
                baggageFields.set(baggage_header_1.ORIGIN_SVC_FIELD_NAME, `${constants_1.ASSET_ID}${baggage_header_1.ORIGIN_SVC_SEPARATOR}${this.appKey}`);
            }
            const filteredHeaders = headerEntries.filter(([key]) => key.toLowerCase() !== baggage_header_1.BAGGAGE_HEADER);
            requestParams.headers = lodash_1.fromPairs(filteredHeaders);
            requestParams.headers[baggage_header_1.BAGGAGE_HEADER] = this.serializeBaggage(baggageFields);
        }
        else {
            requestParams.headers = {
                [baggage_header_1.BAGGAGE_HEADER]: this.serializeBaggage(new Map([[baggage_header_1.ORIGIN_SVC_FIELD_NAME, `${constants_1.ASSET_ID}${baggage_header_1.ORIGIN_SVC_SEPARATOR}${this.appKey}`]])),
            };
        }
    }
    deserializeBaggage(baggage) {
        const fields = new Map();
        if (!!baggage) {
            baggage.split(baggage_header_1.BAGGAGE_FIELD_SEPARATOR).forEach((field) => {
                if (field.includes(baggage_header_1.FIELD_NAME_VALUE_SEPARATOR)) {
                    const entry = field.split(baggage_header_1.FIELD_NAME_VALUE_SEPARATOR, 2);
                    fields.set(...entry);
                }
            });
        }
        return fields;
    }
    serializeBaggage(baggageFields) {
        const baggage = [];
        baggageFields.forEach((value, key) => {
            baggage.push(`${key}${baggage_header_1.FIELD_NAME_VALUE_SEPARATOR}${value || ''}`);
        });
        return baggage.join(baggage_header_1.BAGGAGE_FIELD_SEPARATOR);
    }
    isValid(baggageFields) {
        const baggageValue = baggageFields.get(baggage_header_1.ORIGIN_SVC_FIELD_NAME);
        if (!!(baggageValue && baggageValue.split(baggage_header_1.ORIGIN_SVC_SEPARATOR).length > 1)) {
            return true;
        }
        this.log.warn(`Value of the baggage header is invalid. Existing value: ${baggageValue}. Baggage header will be overwritten.`);
        return false;
    }
}
exports.TransportHttp = TransportHttp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWh0dHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9jb250YWluZXIvdHJhbnNwb3J0LWh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBR25DLG1FQU13QztBQUN4Qyx5Q0FBc0M7QUFDdEMsc0VBQStFO0FBQy9FLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQztBQUVsQixJQUFJLHNDQUFpQixFQUFFLFVBQW9CLEVBQUU7SUFFekMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUN2QztBQUlELHlDQUFzQztBQUN0Qyx5RUFBZ0k7QUFDaEksbUVBQStEO0FBRS9ELHlFQUFvRTtBQUNwRSxrRUFBOEQ7QUFDOUQsMEVBQXFFO0FBSXJFLCtDQUEyQztBQUczQyxNQUFNLElBQUksR0FBRyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUvRixNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHFDQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxxQ0FBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckUsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFT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