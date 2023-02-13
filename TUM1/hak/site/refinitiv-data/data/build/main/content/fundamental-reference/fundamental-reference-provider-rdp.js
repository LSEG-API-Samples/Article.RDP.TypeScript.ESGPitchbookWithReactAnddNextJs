"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundamentalAndReferenceProviderRdp = void 0;
const url_join_1 = __importDefault(require("url-join"));
const delivery_1 = require("../../delivery");
const util_1 = require("../../util");
const abstract_content_provider_1 = require("../abstract-content-provider");
const data_accessor_1 = require("../data-accessor/data-accessor");
const FundamentalAndReference = __importStar(require("./interfaces"));
const fundamental_reference_util_1 = require("./fundamental-reference-util");
const config_1 = require("../../config");
const content_1 = require("../../constants/content");
class FundamentalAndReferenceProviderRdp extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'data';
        this.endpointName = 'datagrid';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
        this.setConfig();
    }
    setConfig() {
        config_1.config.set('apis.data.datagrid.url', content_1.DATAGRID_RDP_URL);
        config_1.config.set('apis.data.datagrid.endpoints', { standard: content_1.DATAGRID_RDP_ENDPOINT });
    }
    async getFundamentalAndReference(params) {
        const { universe, fields } = params;
        util_1.validateRequired({ universe, fields }, ['universe', 'fields'], 'FundamentalAndReference.Params');
        const requestParams = this.prepareRequest(params);
        const response = await this.dataAccessor.getData(requestParams);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
    get mainEndpoint() {
        const endpointConfig = this.getEndpointConfig();
        if (!endpointConfig) {
            throw new Error(`Configuration for the endpoint '${this.endpointName}' is missed.`);
        }
        return url_join_1.default(endpointConfig.url, '/');
    }
    prepareRequest(requestParams) {
        var _a;
        const { universe, fields, parameters, rowHeaders } = requestParams;
        const formattedFields = fundamental_reference_util_1.FundamentalReferenceUtil.formatItems(fundamental_reference_util_1.FundamentalReferenceUtil.filterRealTimeFields(fields));
        const formattedInstruments = fundamental_reference_util_1.FundamentalReferenceUtil.formatItems(universe);
        const datagrid = config_1.config.get('apis.data.datagrid');
        const layout = (_a = datagrid === null || datagrid === void 0 ? void 0 : datagrid.layout) === null || _a === void 0 ? void 0 : _a["rdp"];
        return {
            url: this.mainEndpoint,
            method: delivery_1.EndpointRequest.Method.POST,
            dataAccessorContentBody: Object.assign(Object.assign(Object.assign({ universe: formattedInstruments, fields: formattedFields }, (parameters && { parameters })), requestParams.extendedParams), (rowHeaders === FundamentalAndReference.RowHeaders.Date && layout)),
        };
    }
}
exports.FundamentalAndReferenceProviderRdp = FundamentalAndReferenceProviderRdp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZGFtZW50YWwtcmVmZXJlbmNlLXByb3ZpZGVyLXJkcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2Z1bmRhbWVudGFsLXJlZmVyZW5jZS9mdW5kYW1lbnRhbC1yZWZlcmVuY2UtcHJvdmlkZXItcmRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBK0I7QUFFL0IsNkNBQWlEO0FBRWpELHFDQUE4QztBQUM5Qyw0RUFBdUU7QUFHdkUsa0VBQWtFO0FBRWxFLHNFQUF3RDtBQUN4RCw2RUFBd0U7QUFDeEUseUNBQXNDO0FBQ3RDLHFEQUFrRjtBQUdsRixNQUFhLGtDQUFtQyxTQUFRLG1EQUF1QjtJQUszRSxZQUFZLE9BQWdCLEVBQVUsWUFBdUY7UUFDekgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRG1CLGlCQUFZLEdBQVosWUFBWSxDQUEyRTtRQUp0SCxhQUFRLEdBQXVCLE1BQU0sQ0FBQztRQUN0QyxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUs3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxTQUFTO1FBQ2IsZUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELGVBQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsRUFBRSxRQUFRLEVBQUUsK0JBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxLQUFLLENBQUMsMEJBQTBCLENBQ25DLE1BQXNDO1FBRXRDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLHVCQUFnQixDQUFpQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBRWpJLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQWdDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsSUFBWSxZQUFZO1FBQ3BCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsSUFBSSxDQUFDLFlBQVksY0FBYyxDQUFDLENBQUM7U0FDdkY7UUFFRCxPQUFPLGtCQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sY0FBYyxDQUFDLGFBQTZDOztRQUNoRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBQ25FLE1BQU0sZUFBZSxHQUFHLHFEQUF3QixDQUFDLFdBQVcsQ0FBQyxxREFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BILE1BQU0sb0JBQW9CLEdBQUcscURBQXdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVFLE1BQU0sUUFBUSxHQUFHLGVBQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxNQUFNLGdEQUEwQixDQUFDO1FBRTFELE9BQU87WUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDdEIsTUFBTSxFQUFFLDBCQUFlLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDbkMsdUJBQXVCLDhDQUNuQixRQUFRLEVBQUUsb0JBQWdDLEVBQzFDLE1BQU0sRUFBRSxlQUFlLElBQ3BCLENBQUMsVUFBVSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsR0FDOUIsYUFBYSxDQUFDLGNBQWMsR0FDNUIsQ0FBQyxVQUFVLEtBQUssdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FDeEU7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0RELGdGQTJEQyJ9