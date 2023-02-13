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
exports.BondFutureUnderlyingContract = exports.Definition = exports.BOND_FUTURE_INSTRUMENT_TYPE = void 0;
const default_session_1 = require("../../../../session/default-session");
const Bond = __importStar(require("../bond"));
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.BOND_FUTURE_INSTRUMENT_TYPE = 'BondFuture';
function Definition(params) {
    const { outputs, fields, extendedParams, pricingParameters } = params, instrumentDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
    const definition = {
        instrumentType: exports.BOND_FUTURE_INSTRUMENT_TYPE,
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
function BondFutureUnderlyingContract(instrumentDefinition) {
    return Bond.Definition(instrumentDefinition).getInstrument();
}
exports.BondFutureUnderlyingContract = BondFutureUnderlyingContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2JvbmQtZnV0dXJlL2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWlFO0FBSWpFLDhDQUFnQztBQUNoQyxnRUFBb0U7QUFFcEUsb0RBQW1EO0FBR3RDLFFBQUEsMkJBQTJCLEdBQUcsWUFBWSxDQUFDO0FBRXhELFNBQWdCLFVBQVUsQ0FBQyxNQUFjO0lBQ3JDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsS0FBOEIsTUFBTSxFQUEvQixvQkFBb0IsVUFBSyxNQUFNLEVBQXhGLDREQUErRSxDQUFTLENBQUM7SUFDL0YsTUFBTSxVQUFVLEdBQUc7UUFDZixjQUFjLEVBQUUsbUNBQTJCO1FBQzNDLG9CQUFvQjtRQUNwQixpQkFBaUI7S0FDcEIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksK0JBQWUsRUFBRSxDQUFDO0lBRTNDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGtCQUFrQixHQUFHLElBQUksZ0RBQTBCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWpGLE9BQU8sa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN4RyxDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXBCRCxnQ0FvQkM7QUFJRCxTQUFnQiw0QkFBNEIsQ0FBQyxvQkFBMEM7SUFDbkYsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFtQyxDQUFDLENBQUMsYUFBYyxFQUFFLENBQUM7QUFDakYsQ0FBQztBQUZELG9FQUVDIn0=