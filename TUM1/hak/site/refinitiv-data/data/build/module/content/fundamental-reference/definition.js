"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const logger_1 = require("../../logger");
const config_1 = require("../../config");
const default_session_1 = require("../../session/default-session");
const fundamental_reference_provider_udf_1 = require("./fundamental-reference-provider-udf");
const fundamental_reference_provider_rdp_1 = require("./fundamental-reference-provider-rdp");
const table_builder_1 = require("./table-builder");
const fundamental_reference_util_1 = require("./fundamental-reference-util");
function Definition(params, fields) {
    const parameters = isPlainObject_1.default(params)
        ? params
        : { universe: params, fields: fields };
    const log = logger_1.logger.getLogger('fundamental-reference');
    const tableBuilder = new table_builder_1.TableBuilderImp();
    return {
        getData(session = default_session_1.getDefault()) {
            const underlyingPlatform = config_1.config.get('apis.data.datagrid.underlying-platform');
            let fundAndRefProvider;
            if (underlyingPlatform === "rdp") {
                fundAndRefProvider = new fundamental_reference_provider_rdp_1.FundamentalAndReferenceProviderRdp(session, tableBuilder);
            }
            else if (fundamental_reference_util_1.FundamentalReferenceUtil.isPlatformSession(session)) {
                log.debug('UDF DataGrid service cannot be used with platform sessions');
                fundAndRefProvider = new fundamental_reference_provider_rdp_1.FundamentalAndReferenceProviderRdp(session, tableBuilder);
            }
            else {
                fundAndRefProvider = new fundamental_reference_provider_udf_1.FundamentalAndReferenceProviderUdf(session, tableBuilder);
            }
            return fundAndRefProvider.getFundamentalAndReference(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2Z1bmRhbWVudGFsLXJlZmVyZW5jZS9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFpRDtBQUVqRCx5Q0FBc0M7QUFDdEMseUNBQXNDO0FBQ3RDLG1FQUEyRDtBQUczRCw2RkFBMEY7QUFDMUYsNkZBQTBGO0FBRzFGLG1EQUFrRDtBQUNsRCw2RUFBd0U7QUFJeEUsU0FBZ0IsVUFBVSxDQUFDLE1BQWtDLEVBQUUsTUFBMEI7SUFDckYsTUFBTSxVQUFVLEdBQVcsdUJBQWEsQ0FBQyxNQUFNLENBQUM7UUFDNUMsQ0FBQyxDQUFFLE1BQWlCO1FBQ3BCLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUEyQixFQUFFLE1BQU0sRUFBRSxNQUEyQixFQUFFLENBQUM7SUFFckYsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRXRELE1BQU0sWUFBWSxHQUFHLElBQUksK0JBQWUsRUFBRSxDQUFDO0lBRTNDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGtCQUFrQixHQUFHLGVBQU0sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUVoRixJQUFJLGtCQUFrQixDQUFDO1lBRXZCLElBQUksa0JBQWtCLFVBQTJCLEVBQUU7Z0JBQy9DLGtCQUFrQixHQUFHLElBQUksdUVBQWtDLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3RGO2lCQUFNLElBQUkscURBQXdCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVELEdBQUcsQ0FBQyxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztnQkFDeEUsa0JBQWtCLEdBQUcsSUFBSSx1RUFBa0MsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDdEY7aUJBQU07Z0JBQ0gsa0JBQWtCLEdBQUcsSUFBSSx1RUFBa0MsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDdEY7WUFFRCxPQUFPLGtCQUFrQixDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTNCRCxnQ0EyQkMifQ==