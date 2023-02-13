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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = exports.CDS_INSTRUMENT_TYPE = void 0;
const default_session_1 = require("../../../../session/default-session");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.CDS_INSTRUMENT_TYPE = 'Cds';
function Definition(params) {
    if (!params.instrumentCode && (!params.premiumLeg || !params.protectionLeg)) {
        throw new Error('If instrument code is null, the protection leg and the premium leg must be provided.');
    }
    if (!params.instrumentCode && !params.tenor && !params.endDate) {
        throw new Error('If instrument code is null, either the end date or the tenor must be provided.');
    }
    const { outputs, fields, extendedParams, pricingParameters } = params, instrumentDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
    const definition = {
        instrumentType: exports.CDS_INSTRUMENT_TYPE,
        instrumentDefinition,
        pricingParameters,
    };
    const tableBuilder = new table_builder_1.TableBuilderImp();
    return {
        getData(session = default_session_1.getDefault()) {
            const financialContracts = new financial_contracts_1.FinancialContractsProvider(session, tableBuilder);
            return financialContracts.getInstrumentAnalytics([definition], { outputs, fields, extendedParams });
        },
        getInstrument() {
            return definition;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2Nkcy9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWlFO0FBR2pFLGdFQUFvRTtBQUVwRSxvREFBbUQ7QUFHdEMsUUFBQSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFFekMsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDekUsTUFBTSxJQUFJLEtBQUssQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDO0tBQzNHO0lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLGdGQUFnRixDQUFDLENBQUM7S0FDckc7SUFFRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEtBQThCLE1BQU0sRUFBL0Isb0JBQW9CLFVBQUssTUFBTSxFQUF4Riw0REFBK0UsQ0FBUyxDQUFDO0lBQy9GLE1BQU0sVUFBVSxHQUFHO1FBQ2YsY0FBYyxFQUFFLDJCQUFtQjtRQUNuQyxvQkFBb0I7UUFDcEIsaUJBQWlCO0tBQ3BCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLCtCQUFlLEVBQUUsQ0FBQztJQUUzQyxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGdEQUEwQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVqRixPQUFPLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDeEcsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE1QkQsZ0NBNEJDIn0=