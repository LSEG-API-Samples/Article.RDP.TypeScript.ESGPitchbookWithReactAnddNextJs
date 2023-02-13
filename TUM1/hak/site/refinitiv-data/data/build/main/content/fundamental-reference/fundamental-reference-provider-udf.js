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
exports.FundamentalAndReferenceProviderUdf = void 0;
const url_join_1 = __importDefault(require("url-join"));
const content_1 = require("../../constants/content");
const delivery_1 = require("../../delivery");
const util_1 = require("../../util");
const abstract_content_provider_1 = require("../abstract-content-provider");
const data_accessor_1 = require("../data-accessor/data-accessor");
const FundamentalAndReference = __importStar(require("./interfaces"));
const fundamental_reference_util_1 = require("./fundamental-reference-util");
const config_1 = require("../../config");
class FundamentalAndReferenceProviderUdf extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'data';
        this.endpointName = 'datagrid';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
        this.setConfig();
    }
    setConfig() {
        config_1.config.set('apis.data.datagrid.url', content_1.DATAGRID_UDF_URL);
        config_1.config.set('apis.data.datagrid.endpoints', { standard: content_1.DATAGRID_UDF_ENDPOINT });
    }
    async getFundamentalAndReference(params) {
        const { universe, fields } = params;
        util_1.validateRequired({ universe, fields }, ['universe', 'fields'], 'FundamentalAndReference.Params');
        const requestParams = this.prepareRequest(params);
        const response = await this.getData(requestParams);
        const buildTable = () => this.tableBuilder.build(this.prepareResponse(response));
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
        const formattedInstruments = fundamental_reference_util_1.FundamentalReferenceUtil.formatItems(universe);
        const formattedFields = fundamental_reference_util_1.FundamentalReferenceUtil.formatUdfFields(fundamental_reference_util_1.FundamentalReferenceUtil.filterRealTimeFields(fields));
        const datagrid = config_1.config.get('apis.data.datagrid');
        const layout = (_a = datagrid === null || datagrid === void 0 ? void 0 : datagrid.layout) === null || _a === void 0 ? void 0 : _a["udf"];
        return this.getRequestBody(Object.assign(Object.assign(Object.assign({ instruments: formattedInstruments, fields: formattedFields }, (parameters && { parameters })), requestParams.extendedParams), (rowHeaders === FundamentalAndReference.RowHeaders.Date && layout)));
    }
    prepareTrackRequest(ticket) {
        return this.getRequestBody({
            ticket,
        });
    }
    getRequestBody(request) {
        return {
            url: this.mainEndpoint,
            method: delivery_1.EndpointRequest.Method.POST,
            dataAccessorContentBody: {
                Entity: {
                    E: content_1.DATAGRID_UDF_DATAPOINT_NAME,
                    W: {
                        requests: [request],
                    },
                },
            },
        };
    }
    async getData(requestParams, maxAllowedRequestsCount = content_1.UDF_MAX_REQUEST_COUNT) {
        let currentRequestParams = requestParams;
        for (let i = 0; i <= maxAllowedRequestsCount; i++) {
            const response = await this.dataAccessor.getData(currentRequestParams);
            const responseBody = this.getResponseBody(response);
            if (!('ticket' in responseBody)) {
                return response;
            }
            currentRequestParams = this.prepareTrackRequest(responseBody.ticket);
            await new Promise(resolve => setTimeout(resolve, fundamental_reference_util_1.FundamentalReferenceUtil.getWaitDuration(responseBody.estimatedDuration)));
        }
        throw new Error('The request to UDF took too long');
    }
    prepareResponse(response) {
        const responseBody = this.getResponseBody(response);
        return {
            data: responseBody.data,
            headers: fundamental_reference_util_1.FundamentalReferenceUtil.formatResponseHeaders(responseBody.headers),
        };
    }
    getResponseBody(response) {
        fundamental_reference_util_1.FundamentalReferenceUtil.validateUdfErrors(response.data);
        return response.data.responses[0];
    }
}
exports.FundamentalAndReferenceProviderUdf = FundamentalAndReferenceProviderUdf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZGFtZW50YWwtcmVmZXJlbmNlLXByb3ZpZGVyLXVkZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2Z1bmRhbWVudGFsLXJlZmVyZW5jZS9mdW5kYW1lbnRhbC1yZWZlcmVuY2UtcHJvdmlkZXItdWRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBK0I7QUFFL0IscURBQXNJO0FBQ3RJLDZDQUFpRDtBQUVqRCxxQ0FBOEM7QUFDOUMsNEVBQXVFO0FBR3ZFLGtFQUFrRTtBQUVsRSxzRUFBd0Q7QUFDeEQsNkVBQXdFO0FBQ3hFLHlDQUFzQztBQUd0QyxNQUFhLGtDQUFtQyxTQUFRLG1EQUF1QjtJQUszRSxZQUFZLE9BQWdCLEVBQVUsWUFBdUY7UUFDekgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRG1CLGlCQUFZLEdBQVosWUFBWSxDQUEyRTtRQUp0SCxhQUFRLEdBQXVCLE1BQU0sQ0FBQztRQUN0QyxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUs3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxTQUFTO1FBQ2IsZUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELGVBQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsRUFBRSxRQUFRLEVBQUUsK0JBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTSxLQUFLLENBQUMsMEJBQTBCLENBQ25DLE1BQXNDO1FBRXRDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLHVCQUFnQixDQUFpQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLFVB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