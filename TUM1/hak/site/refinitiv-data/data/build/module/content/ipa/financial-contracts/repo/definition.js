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
exports.RepoUnderlyingContract = exports.Definition = exports.REPO_INSTRUMENT_TYPE = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../../session/default-session");
const definition_1 = require("../bond/definition");
const financial_contracts_1 = require("../financial-contracts");
const table_builder_1 = require("../table-builder");
exports.REPO_INSTRUMENT_TYPE = 'Repo';
function Definition(params) {
    if (!params || (!params.tenor && !params.endDate)) {
        throw new Error('Either the end date or the tenor must be provided.');
    }
    const { outputs, fields, extendedParams, pricingParameters } = params, instrumentDefinition = __rest(params, ["outputs", "fields", "extendedParams", "pricingParameters"]);
    const definition = {
        instrumentType: exports.REPO_INSTRUMENT_TYPE,
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
function RepoUnderlyingContract(params) {
    if (isString_1.default(params)) {
        return {
            instrumentType: definition_1.BOND_INSTRUMENT_TYPE,
            instrumentDefinition: { instrumentCode: params },
        };
    }
    const { pricingParameters } = params, instrumentDefinition = __rest(params, ["pricingParameters"]);
    return {
        instrumentType: definition_1.BOND_INSTRUMENT_TYPE,
        instrumentDefinition: Object.assign({}, instrumentDefinition),
        pricingParameters,
    };
}
exports.RepoUnderlyingContract = RepoUnderlyingContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL3JlcG8vZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUF1QztBQUV2Qyx5RUFBaUU7QUFLakUsbURBQTBEO0FBQzFELGdFQUFvRTtBQUVwRSxvREFBbUQ7QUFHdEMsUUFBQSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFFM0MsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7S0FDekU7SUFFRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEtBQThCLE1BQU0sRUFBL0Isb0JBQW9CLFVBQUssTUFBTSxFQUF4Riw0REFBK0UsQ0FBUyxDQUFDO0lBQy9GLE1BQU0sVUFBVSxHQUFHO1FBQ2YsY0FBYyxFQUFFLDRCQUFvQjtRQUNwQyxvQkFBb0I7UUFDcEIsaUJBQWlCO0tBQ3BCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLCtCQUFlLEVBQUUsQ0FBQztJQUUzQyxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGdEQUEwQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVqRixPQUFPLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDeEcsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF4QkQsZ0NBd0JDO0FBTUQsU0FBZ0Isc0JBQXNCLENBQUMsTUFBNkM7SUFDaEYsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xCLE9BQU87WUFDSCxjQUFjLEVBQUUsaUNBQW9CO1lBQ3BDLG9CQUFvQixFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRTtTQUNuRCxDQUFDO0tBQ0w7SUFFRCxNQUFNLEVBQUUsaUJBQWlCLEtBQThCLE1BQU0sRUFBL0Isb0JBQW9CLFVBQUssTUFBTSxFQUF2RCxxQkFBOEMsQ0FBUyxDQUFDO0lBRTlELE9BQU87UUFDSCxjQUFjLEVBQUUsaUNBQW9CO1FBQ3BDLG9CQUFvQixvQkFBTyxvQkFBb0IsQ0FBRTtRQUNqRCxpQkFBaUI7S0FDcEIsQ0FBQztBQUNOLENBQUM7QUFmRCx3REFlQyJ9