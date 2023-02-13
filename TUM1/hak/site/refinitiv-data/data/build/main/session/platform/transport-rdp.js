"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportRdp = void 0;
const url_join_1 = __importDefault(require("url-join"));
const common_1 = require("@refinitiv-data/common");
const config_1 = require("../../config");
const logger_1 = require("../../logger");
const lodash_1 = require("lodash");
const stream_login_request_converter_1 = require("../../util/stream-login-request-converter");
const web_socket_url_builder_1 = require("../../util/web-socket-url-builder");
const webSocket_helper_1 = require("../../util/webSocket-helper");
class TransportRdp {
    constructor(params) {
        this.params = params;
        this.isRefreshRequired = true;
        this.log = logger_1.logger.getLogger('transport:rdp');
    }
    get baseUrl() {
        return config_1.config.get('sessions').platform['default-session']['base-url'];
    }
    async getSocketCreators(api, protocol) {
        return this.requestWebSocketList(api, protocol);
    }
    getStreamLoginParams() {
        const streamAuthParams = {
            dacs: this.params.dacs,
            accessToken: this.params.getAccessToken(),
            userName: this.params.userName,
        };
        return stream_login_request_converter_1.buildRdpSessionLoginData(streamAuthParams);
    }
    getStreamingDiscoveryEndpoint(api) {
        const [dataApi, service, endpoint] = api.split('/');
        if (!(dataApi && service && endpoint)) {
            throw new Error(`Parameter 'api' is not correct. Please check your config.`);
        }
        const discoveryEndpoint = config_1.config.get(`apis.${dataApi}.${service}`).url || '';
        const path = config_1.config.get(`apis.${dataApi}.${service}.endpoints.${endpoint}.path`) || '/';
        return url_join_1.default(this.baseUrl, discoveryEndpoint, path);
    }
    getWebSocketLocations(api) {
        const [dataApi, service, endpoint] = api.split('/');
        return config_1.config.get(`apis.${dataApi}.${service}.endpoints.${endpoint}.locations`) || [];
    }
    async requestWebSocketList(api, protocol) {
        const { data } = await this.params.request({
            url: this.getStreamingDiscoveryEndpoint(api),
            method: common_1.HttpMethod.GET,
        });
        const filteredByProtocol = data.services.filter(service => service.dataFormat.includes(protocol));
        const configLocations = this.getWebSocketLocations(api);
        let endpointsList;
        if (!Array.isArray(configLocations)) {
            throw new Error(`Location ${configLocations} should be Array. Please check your configuration`);
        }
        if (configLocations.length === 0) {
            endpointsList = lodash_1.shuffle(filteredByProtocol.filter(({ location }) => location.length >= 1));
        }
        else {
            endpointsList = configLocations.map((configLocation) => {
                const endpoint = filteredByProtocol.find(({ location }) => this.isLocationAllowed(location, configLocation));
                if (!endpoint) {
                    throw new Error(`Unknown location: ${configLocation}. Please check your configuration`);
                }
                return endpoint;
            });
        }
        if (endpointsList.length === 0) {
            throw new Error('Could not select endpoint for streaming connection. Please check streaming discovery response');
        }
        this.log.debug('Available WS endpoints', endpointsList.map(({ endpoint }) => endpoint));
        return endpointsList.map(({ endpoint, port }) => webSocket_helper_1.prepareSocketCreator(this.buildWsUrl(endpoint, parseInt(port, 10)), protocol));
    }
    buildWsUrl(endpoint, port) {
        try {
            return web_socket_url_builder_1.WebSocketUrlBuilderImpl.getNewInstance().setDefaultPathname('/WebSocket').setUrl(endpoint).setPort(port).build();
        }
        catch (err) {
            throw new Error('Unable to create a web socket url!');
        }
    }
    isLocationAllowed(locationsList, value) {
        if (locationsList.length > 1) {
            return locationsList.every(item => item.includes(value));
        }
        return locationsList[0] === value;
    }
}
exports.TransportRdp = TransportRdp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LXJkcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXNzaW9uL3BsYXRmb3JtL3RyYW5zcG9ydC1yZHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQStCO0FBRS9CLG1EQUFvRDtBQUVwRCx5Q0FBc0M7QUFHdEMseUNBQThDO0FBQzlDLG1DQUFpQztBQUNqQyw4RkFBcUY7QUFDckYsOEVBQTRFO0FBQzVFLGtFQUFtRTtBQUtuRSxNQUFhLFlBQVk7SUFRckIsWUFBb0IsTUFBMEI7UUFBMUIsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFIdkMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBSTVCLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBVEQsSUFBWSxPQUFPO1FBQ2YsT0FBTyxlQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFjTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBVyxFQUFFLFFBQWdCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sb0JBQW9CO1FBQ3ZCLE1BQU0sZ0JBQWdCLEdBQWtCO1lBQ3BDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDdEIsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7U0FDakMsQ0FBQztRQUNGLE9BQU8seURBQXdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8sNkJBQTZCLENBQUMsR0FBVztRQUM3QyxNQUFNLENBQUMs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