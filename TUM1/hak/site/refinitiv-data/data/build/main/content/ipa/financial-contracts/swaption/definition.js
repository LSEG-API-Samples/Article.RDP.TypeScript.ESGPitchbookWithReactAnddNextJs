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
exports.Definition = exports.SWAPTION_INSTRUMENT_TYPE = void 0;
const default_session_1 = require("../../../../session/default-session");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.SWAPTION_INSTRUMENT_TYPE = 'Swaption';
function Definition(params) {
    if (!params || (!params.tenor && !params.endDate)) {
        throw new Error('Either the end date or the tenor must be provided.');
    }
    const { underlyingDefinition } = params;
    if (!underlyingDefinition || (!underlyingDefinition.instrumentCode && !underlyingDefinition.template && !underlyingDefinition.legs)) {
        throw new Error('Either instrumentCode, template or legs must be provided for underlyingDefinition.');
    }
    const { outputs, fields, extendedParams, pricingParameters } = params, instrumentDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
    const definition = {
        instrumentType: exports.SWAPTION_INSTRUMENT_TYPE,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL3N3YXB0aW9uL2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBaUU7QUFHakUsZ0VBQW9FO0FBRXBFLG9EQUFtRDtBQUd0QyxRQUFBLHdCQUF3QixHQUFHLFVBQVUsQ0FBQztBQUVuRCxTQUFnQixVQUFVLENBQUMsTUFBYztJQUNyQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztLQUN6RTtJQUVELE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUV4QyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2pJLE1BQU0sSUFBSSxLQUFLLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztLQUN6RztJQUVELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsS0FBOEIsTUFBTSxFQUEvQixvQkFBb0IsVUFBSyxNQUFNLEVBQXhGLDREQUErRSxDQUFTLENBQUM7SUFDL0YsTUFBTSxVQUFVLEdBQUc7UUFDZixjQUFjLEVBQUUsZ0NBQXdCO1FBQ3hDLG9CQUFvQjtRQUNwQixpQkFBaUI7S0FDcEIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksK0JBQWUsRUFBRSxDQUFDO0lBRTNDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGtCQUFrQixHQUFHLElBQUksZ0RBQTBCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWpGLE9BQU8sa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTlCRCxnQ0E4QkMifQ==