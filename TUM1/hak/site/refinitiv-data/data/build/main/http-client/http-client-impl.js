"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClientImpl = void 0;
const axios_1 = __importDefault(require("axios"));
const isNumber_1 = __importDefault(require("lodash/isNumber"));
const isString_1 = __importDefault(require("lodash/isString"));
const config_1 = require("../config");
const logger_1 = require("../logger");
const request_params_serializer_1 = require("../util/request-params-serializer");
const http_client_interface_1 = require("./http-client.interface");
class HttpClientImpl {
    constructor() {
        this.log = logger_1.logger.getLogger('http:client');
        this.log.debug('HTTP settings:', this.httpConfig);
    }
    get defaultConfig() {
        return {
            paramsSerializer: request_params_serializer_1.commaRequestParamsSerializer,
            timeout: this.getTimeoutSetting(),
        };
    }
    get httpConfig() {
        return config_1.config.get('http');
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    request(config) {
        return axios_1.default.request(this.mergeDefaults(config));
    }
    post(url, data, config = {}) {
        return axios_1.default.post(url, data, this.mergeDefaults(config));
    }
    mergeDefaults(config) {
        return Object.assign(Object.assign({}, this.defaultConfig), config);
    }
    isValidTimeoutNumber(value) {
        return isNumber_1.default(value) && Math.sign(value) >= 0 && Number.isFinite(value) && value <= Number.MAX_SAFE_INTEGER;
    }
    getTimeoutSetting() {
        let timeout = this.httpConfig['request-timeout'];
        timeout = isString_1.default(timeout) ? Number(timeout) : timeout;
        if (!this.isValidTimeoutNumber(timeout)) {
            timeout = config_1.config.default(http_client_interface_1.TIMEOUT_CONFIG_PATH);
            this.log.warn(`Invalid value of the "${http_client_interface_1.TIMEOUT_CONFIG_PATH}". Default value "${timeout}" is used`);
        }
        return timeout * 1000;
    }
}
exports.HttpClientImpl = HttpClientImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQtaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odHRwLWNsaWVudC9odHRwLWNsaWVudC1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQiwrREFBdUM7QUFDdkMsK0RBQXVDO0FBRXZDLHNDQUE4RDtBQUM5RCxzQ0FBMkM7QUFDM0MsaUZBQWlGO0FBQ2pGLG1FQUF1SDtBQUV2SCxNQUFhLGNBQWM7SUF1QnZCO1FBRlEsUUFBRyxHQUFXLGVBQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFHbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUF4QkQsSUFBVyxhQUFhO1FBQ3BCLE9BQU87WUFDSCxnQkFBZ0IsRUFBRSx3REFBNEI7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtTQUNwQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQVksVUFBVTtRQUNsQixPQUFPLGVBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBU00sT0FBTyxDQUFxQyxNQUErQjtRQUM5RSxPQUFPLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxJQUFJLENBQXFDLEdBQVcsRUFBRSxJQUFVLEVBQUUsU0FBa0MsRUFBRTtRQUN6RyxPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUErQjtRQUNqRCx1Q0FBWSxJQUFJLENBQUMsYUFBYSxHQUFLLE1BQU0sRUFBRztJQUNoRCxDQUFDO0lBRU8sb0JBQW9CLENBQUMsS0FBVTtRQUNuQyxPQUFPLGtCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ2xILENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUV4RCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxlQUFTLENBQUMsT0FBTyxDQUFDLDJDQUFtQixDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLDJDQUFtQixxQkFBcUIsT0FBTyxXQUFXLENBQUMsQ0FBQztTQUN0RztRQUVELE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUF0REQsd0NBc0RDIn0=