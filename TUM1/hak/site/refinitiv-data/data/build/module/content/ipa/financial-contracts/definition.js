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
exports.Definition = void 0;
const isArray_1 = __importDefault(require("lodash/isArray"));
const financial_contracts_1 = require("./financial-contracts");
const table_builder_1 = require("./table-builder");
const default_session_1 = require("../../../session/default-session");
function Definition(params) {
    let parameters;
    const tableBuilder = new table_builder_1.TableBuilderImp();
    if (isArray_1.default(params)) {
        parameters = {
            definitions: params,
        };
    }
    else {
        parameters = params;
    }
    return {
        getData(session = default_session_1.getDefault()) {
            const financialContracts = new financial_contracts_1.FinancialContractsProvider(session, tableBuilder);
            const { definitions } = parameters, instrumentParams = __rest(parameters, ["definitions"]);
            return financialContracts.getInstrumentAnalytics(definitions.map(instrument => instrument.getInstrument()), instrumentParams);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBcUM7QUFLckMsK0RBQW1FO0FBQ25FLG1EQUFrRDtBQUNsRCxzRUFBOEQ7QUFJOUQsU0FBZ0IsVUFBVSxDQUFDLE1BQThDO0lBQ3JFLElBQUksVUFBa0IsQ0FBQztJQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLCtCQUFlLEVBQUUsQ0FBQztJQUUzQyxJQUFJLGlCQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsVUFBVSxHQUFHO1lBQ1QsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQztLQUNMO1NBQU07UUFDSCxVQUFVLEdBQUcsTUFBTSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxnREFBMEIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakYsTUFBTSxFQUFFLFdBQVcsS0FBMEIsVUFBVSxFQUEvQixnQkFBZ0IsVUFBSyxVQUFVLEVBQWpELGVBQW9DLENBQWEsQ0FBQztZQUN4RCxPQUFPLGtCQUFrQixDQUFDLHNCQUFzQixDQUM1QyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWMsRUFBRSxDQUFDLEVBQzFELGdCQUFnQixDQUNuQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBdkJELGdDQXVCQyJ9