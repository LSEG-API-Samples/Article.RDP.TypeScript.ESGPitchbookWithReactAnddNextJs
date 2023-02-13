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
exports.HistoricalPricingProvider = void 0;
const url_join_1 = __importDefault(require("url-join"));
const util_1 = require("../../util");
const abstract_content_provider_1 = require("../abstract-content-provider");
const data_accessor_1 = require("../data-accessor/data-accessor");
const historical_pricing_interface_1 = require("./historical-pricing.interface");
class HistoricalPricingProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'data';
        this.endpointName = 'historical-pricing';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getEvents(params) {
        util_1.validateRequired(params, ['universe'], 'HistoricalPricing.Events');
        const { universe, extendedParams } = params, otherParams = __rest(params, ["universe", "extendedParams"]);
        const url = url_join_1.default(this.getEndpointPath('events'), universe);
        const requestParams = {
            url,
            dataAccessorContentQuery: Object.assign(Object.assign({}, otherParams), extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
    async getSummaries(params) {
        util_1.validateRequired(params, ['universe'], 'HistoricalPricing.Summaries');
        const { universe, extendedParams } = params, otherParams = __rest(params, ["universe", "extendedParams"]);
        const url = url_join_1.default(this.getSummaryEndpoint(params.interval), universe);
        const requestParams = {
            url,
            dataAccessorContentQuery: Object.assign(Object.assign({}, otherParams), extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
    getSummaryEndpoint(interval) {
        let endpoint = url_join_1.default(this.getEndpointPath('interday-summaries'));
        if (interval && Object.values(historical_pricing_interface_1.IntradayInterval).includes(interval)) {
            endpoint = url_join_1.default(this.getEndpointPath('intraday-summaries'));
        }
        return endpoint;
    }
}
exports.HistoricalPricingProvider = HistoricalPricingProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yaWNhbC1wcmljaW5nLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaGlzdG9yaWNhbC1wcmljaW5nL2hpc3RvcmljYWwtcHJpY2luZy1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUErQjtBQUcvQixxQ0FBOEM7QUFDOUMsNEVBQXVFO0FBR3ZFLGtFQUFrRTtBQUdsRSxpRkFBaUc7QUFJakcsTUFBYSx5QkFBMEIsU0FBUSxtREFBdUI7SUFLbEUsWUFBWSxPQUFnQixFQUFVLFlBQXVDO1FBQ3pFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURtQixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFKdEUsYUFBUSxHQUF1QixNQUFNLENBQUM7UUFDdEMsaUJBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUt2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBcUI7UUFDeEMsdUJBQWdCLENBQWdCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDbEYsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEtBQXFCLE1BQU0sRUFBdEIsV0FBVyxVQUFLLE1BQU0sRUFBckQsOEJBQTRDLENBQVMsQ0FBQztRQUU1RCxNQUFNLEdBQUcsR0FBRyxrQkFBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUQsTUFBTSxhQUFhLEdBQXdDO1lBQ3ZELEdBQUc7WUFDSCx3QkFBd0Isa0NBQU8sV0FBVyxHQUFLLGNBQWMsQ0FBRTtTQUNsRSxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQVEsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQXdCO1FBQzlDLHVCQUFnQixDQUFtQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sRUFBRSxRQUFRLEVBQUUsY0FBYyxLQUFxQixNQUFNLEVBQXRCLFdBQVcsVUFBSyxNQUFNLEVBQXJELDhCQUE0QyxDQUFTLENBQUM7UUFFNUQsTUFBTSxHQUFHLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sYUFBYSxHQUEyQztZQUMxRCxHQUFHO1lBQ0gsd0JBQXdCLGtDQUFPLFdBQVcsR0FBSyxjQUFjLENBQUU7U0FDbEUsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFaEUsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFRLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsUUFBOEM7UUFDckUsSUFBSSxRQUFRLEdBQVcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUUzRSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLCtDQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQTRCLENBQUMsRUFBRTtZQUNwRixRQUFRLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUNsRTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXRERCw4REFzREMifQ==