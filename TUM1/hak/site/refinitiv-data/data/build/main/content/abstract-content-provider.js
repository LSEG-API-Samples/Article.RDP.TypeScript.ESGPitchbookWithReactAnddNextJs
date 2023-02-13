"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractContentProvider = void 0;
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const merge_1 = __importDefault(require("lodash/merge"));
const url_join_1 = __importDefault(require("url-join"));
const config_1 = require("../config");
class AbstractContentProvider {
    constructor(session) {
        this.session = session;
    }
    getEndpointPath(pathName) {
        const configEndpoint = this.getEndpointConfig();
        if (!configEndpoint) {
            throw new Error(`Configuration for the endpoint '${pathName}' is missed.`);
        }
        return url_join_1.default(configEndpoint.url, configEndpoint.endpoints[pathName]);
    }
    getEndpointConfig() {
        const allGroup = config_1.config.get('apis')[this.apiGroup];
        const currentEndpointConfig = allGroup === null || allGroup === void 0 ? void 0 : allGroup[this.endpointName];
        const sessionOverriddenEndpoints = this.session.getOverriddenEndpoint(this.apiGroup, this.endpointName);
        if (!(currentEndpointConfig || sessionOverriddenEndpoints)) {
            return void 0;
        }
        return merge_1.default(cloneDeep_1.default(currentEndpointConfig), sessionOverriddenEndpoints);
    }
    toContentResponse(endpointResponse, buildTable) {
        const formattedResponse = Object.assign(Object.assign({}, endpointResponse), { data: {
                raw: endpointResponse.data,
            } });
        let responseTable;
        if (buildTable) {
            Object.defineProperty(formattedResponse.data, 'table', {
                get: () => {
                    if (responseTable !== undefined) {
                        return responseTable;
                    }
                    responseTable = buildTable();
                    return responseTable;
                },
            });
        }
        return formattedResponse;
    }
}
exports.AbstractContentProvider = AbstractContentProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29udGVudC1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L2Fic3RyYWN0LWNvbnRlbnQtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUVBQXlDO0FBQ3pDLHlEQUFpQztBQUNqQyx3REFBK0I7QUFFL0Isc0NBQW1EO0FBTW5ELE1BQXNCLHVCQUF1QjtJQWF6QyxZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQztJQUVqQyxlQUFlLENBQUMsUUFBZ0I7UUFDbkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxRQUFRLGNBQWMsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsT0FBTyxrQkFBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxpQkFBaUI7UUFDcEIsTUFBTSxRQUFRLEdBQUcsZUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RyxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSwwQkFBMEIsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sS0FBSyxDQUFDLENBQUM7U0FDakI7UUFFRCxPQUFPLGVBQUssQ0FBQyxtQkFBUyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsMEJBQTBCLENBQStCLENBQUM7SUFDN0csQ0FBQztJQUVNLGlCQUFpQixDQUFlLGdCQUFrQyxFQUFFLFVBQXlCO1FBQ2hHLE1BQU0saUJBQWlCLG1DQUNoQixnQkFBZ0IsS0FDbkIsSUFBSSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO2FBQzdCLEdBQ0osQ0FBQztRQUVGLElBQUksYUFBcUIsQ0FBQztRQUUxQixJQUFJLFVBQVUsRUFBRTtZQUNaLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQThDLEVBQUU7Z0JBQzFGLEdBQUcsRUFBRSxHQUFHLEVBQUU7b0JBQ04sSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO3dCQUM3QixPQUFPLGFBQWEsQ0FBQztxQkFDeEI7b0JBRUQsYUFBYSxHQUFHLFVBQVUsRUFBRSxDQUFDO29CQUU3QixPQUFPLGFBQWEsQ0FBQztnQkFDekIsQ0FBQzthQUNKLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUEvREQsMERBK0RDIn0=