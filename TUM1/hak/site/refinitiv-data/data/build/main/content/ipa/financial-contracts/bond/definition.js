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
exports.Definition = exports.BOND_INSTRUMENT_TYPE = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../../session/default-session");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.BOND_INSTRUMENT_TYPE = 'Bond';
function Definition(params) {
    let instrument;
    let instrumentParams;
    const tableBuilder = new table_builder_1.TableBuilderImp();
    if (isString_1.default(params)) {
        instrument = {
            instrumentType: exports.BOND_INSTRUMENT_TYPE,
            instrumentDefinition: { instrumentCode: params },
        };
    }
    else {
        const { outputs, fields, pricingParameters, extendedParams } = params, paramsDefinition = __rest(params, ["outputs", "fields", "pricingParameters", "extendedParams"]);
        instrument = { instrumentType: exports.BOND_INSTRUMENT_TYPE, instrumentDefinition: Object.assign({}, paramsDefinition), pricingParameters };
        instrumentParams = { fields, outputs, extendedParams };
    }
    return {
        getData(session = default_session_1.getDefault()) {
            const financialContracts = new financial_contracts_1.FinancialContractsProvider(session, tableBuilder);
            return financialContracts.getInstrumentAnalytics([instrument], instrumentParams);
        },
        getInstrument() {
            return instrument;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2JvbmQvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUF1QztBQUV2Qyx5RUFBaUU7QUFHakUsZ0VBQW9FO0FBRXBFLG9EQUFtRDtBQUd0QyxRQUFBLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQUkzQyxTQUFnQixVQUFVLENBQUMsTUFBdUI7SUFDOUMsSUFBSSxVQUErQixDQUFDO0lBQ3BDLElBQUksZ0JBQXVELENBQUM7SUFDNUQsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBZSxFQUFFLENBQUM7SUFFM0MsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xCLFVBQVUsR0FBRztZQUNULGNBQWMsRUFBRSw0QkFBb0I7WUFDcEMsb0JBQW9CLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFO1NBQ25ELENBQUM7S0FDTDtTQUFNO1FBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxLQUEwQixNQUFNLEVBQTNCLGdCQUFnQixVQUFLLE1BQU0sRUFBcEYsNERBQTJFLENBQVMsQ0FBQztRQUUzRixVQUFVLEdBQUcsRUFBRSxjQUFjLEVBQUUsNEJBQW9CLEVBQUUsb0JBQW9CLG9CQUFPLGdCQUFnQixDQUFFLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztRQUN4SCxnQkFBZ0IsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7S0FDMUQ7SUFFRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGdEQUEwQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVqRixPQUFPLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTVCRCxnQ0E0QkMifQ==