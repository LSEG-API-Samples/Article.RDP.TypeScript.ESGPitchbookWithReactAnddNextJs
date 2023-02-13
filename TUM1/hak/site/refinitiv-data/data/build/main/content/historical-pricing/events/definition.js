"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../session/default-session");
const historical_pricing_provider_1 = require("../historical-pricing-provider");
const table_builder_1 = require("../table-builder");
function Definition(params, fields) {
    const parameters = isString_1.default(params) ? { universe: params, fields } : params;
    const tableBuilder = new table_builder_1.TableBuilderImp();
    return {
        getData(session = default_session_1.getDefault()) {
            const historicalPricingProvider = new historical_pricing_provider_1.HistoricalPricingProvider(session, tableBuilder);
            return historicalPricingProvider.getEvents(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2hpc3RvcmljYWwtcHJpY2luZy9ldmVudHMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrREFBdUM7QUFFdkMsc0VBQThEO0FBRzlELGdGQUEyRTtBQUUzRSxvREFBbUQ7QUFLbkQsU0FBZ0IsVUFBVSxDQUFDLE1BQXVCLEVBQUUsTUFBaUI7SUFDakUsTUFBTSxVQUFVLEdBQVcsa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEYsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBZSxFQUFFLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0seUJBQXlCLEdBQUcsSUFBSSx1REFBeUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFdkYsT0FBTyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBWEQsZ0NBV0MifQ==