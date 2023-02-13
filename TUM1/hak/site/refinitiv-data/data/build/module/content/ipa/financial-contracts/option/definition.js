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
exports.Definition = exports.OPTION_INSTRUMENT_TYPE = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../../session/default-session");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
const interfaces_1 = require("./interfaces");
exports.OPTION_INSTRUMENT_TYPE = 'Option';
function Definition(params) {
    let instrument;
    let instrumentParams;
    const tableBuilder = new table_builder_1.TableBuilderImp();
    if (isString_1.default(params)) {
        instrument = {
            instrumentType: exports.OPTION_INSTRUMENT_TYPE,
            instrumentDefinition: { instrumentCode: params, underlyingType: interfaces_1.UnderlyingType.Eti },
        };
    }
    else {
        const { outputs, fields, extendedParams, pricingParameters } = params, paramsDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
        instrument = { instrumentType: exports.OPTION_INSTRUMENT_TYPE, instrumentDefinition: Object.assign({}, paramsDefinition), pricingParameters };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL29wdGlvbi9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXVDO0FBRXZDLHlFQUFpRTtBQUdqRSxnRUFBb0U7QUFFcEUsb0RBQW1EO0FBQ25ELDZDQUEyRTtBQUU5RCxRQUFBLHNCQUFzQixHQUFHLFFBQVEsQ0FBQztBQUkvQyxTQUFnQixVQUFVLENBQUMsTUFBdUI7SUFDOUMsSUFBSSxVQUErQixDQUFDO0lBQ3BDLElBQUksZ0JBQXVELENBQUM7SUFDNUQsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBZSxFQUFFLENBQUM7SUFFM0MsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xCLFVBQVUsR0FBRztZQUNULGNBQWMsRUFBRSw4QkFBc0I7WUFDdEMsb0JBQW9CLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSwyQkFBYyxDQUFDLEdBQUcsRUFBRTtTQUN2RixDQUFDO0tBQ0w7U0FBTTtRQUNILE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsS0FBMEIsTUFBTSxFQUEzQixnQkFBZ0IsVUFBSyxNQUFNLEVBQXBGLDREQUEyRSxDQUFTLENBQUM7UUFFM0YsVUFBVSxHQUFHLEVBQUUsY0FBYyxFQUFFLDhCQUFzQixFQUFFLG9CQUFvQixvQkFBTyxnQkFBZ0IsQ0FBRSxFQUFFLGlCQUFpQixFQUFFLENBQUM7UUFDMUgsZ0JBQWdCLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDO0tBQzFEO0lBRUQsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxnREFBMEIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakYsT0FBTyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckYsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUE1QkQsZ0NBNEJDIn0=