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
exports.Definition = exports.IR_SWAP_INSTRUMENT_TYPE = void 0;
const default_session_1 = require("../../../../session/default-session");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.IR_SWAP_INSTRUMENT_TYPE = 'Swap';
function Definition(params) {
    if (!params.tenor && !params.endDate) {
        throw new Error('Either the end date or the tenor must be provided.');
    }
    if (!params.instrumentCode && !params.template && !params.legs) {
        throw new Error('Either the instrument code or the template or legs must be provided.');
    }
    const { outputs, fields, extendedParams, pricingParameters } = params, instrumentDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
    const definition = {
        instrumentType: exports.IR_SWAP_INSTRUMENT_TYPE,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2lyLXN3YXAvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFpRTtBQUdqRSxnRUFBb0U7QUFFcEUsb0RBQW1EO0FBR3RDLFFBQUEsdUJBQXVCLEdBQUcsTUFBTSxDQUFDO0FBRTlDLFNBQWdCLFVBQVUsQ0FBQyxNQUFjO0lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7S0FDekU7SUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQzVELE1BQU0sSUFBSSxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztLQUMzRjtJQUVELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsS0FBOEIsTUFBTSxFQUEvQixvQkFBb0IsVUFBSyxNQUFNLEVBQXhGLDREQUErRSxDQUFTLENBQUM7SUFDL0YsTUFBTSxVQUFVLEdBQUc7UUFDZixjQUFjLEVBQUUsK0JBQXVCO1FBQ3ZDLG9CQUFvQjtRQUNwQixpQkFBaUI7S0FDcEIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksK0JBQWUsRUFBRSxDQUFDO0lBRTNDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGtCQUFrQixHQUFHLElBQUksZ0RBQTBCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWpGLE9BQU8sa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTVCRCxnQ0E0QkMifQ==