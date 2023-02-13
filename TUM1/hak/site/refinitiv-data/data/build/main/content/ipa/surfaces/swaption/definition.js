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
exports.Definition = exports.SWAPTION_TYPE = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const default_session_1 = require("../../../../session/default-session");
const surfaces_provider_1 = require("../surfaces-provider");
exports.SWAPTION_TYPE = 'Swaption';
function Definition(params, surfaceTag) {
    let parameters;
    if (isPlainObject_1.default(params)) {
        parameters = params;
    }
    else {
        parameters = {
            surfaceTag,
            instrumentCode: params,
        };
    }
    const { outputs, instrumentCode, extendedParams, discountingType } = parameters, instrumentDefinition = __rest(parameters, ["outputs", "instrumentCode", "extendedParams", "discountingType"]);
    const requestItem = Object.assign(Object.assign({}, instrumentDefinition), { underlyingDefinition: { instrumentCode, discountingType }, underlyingType: exports.SWAPTION_TYPE });
    return {
        getData(session = default_session_1.getDefault()) {
            const financialContracts = new surfaces_provider_1.SurfacesProvider(session);
            return financialContracts.getSurfaces([requestItem], { extendedParams, outputs });
        },
        getInstrument() {
            return requestItem;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9zdXJmYWNlcy9zd2FwdGlvbi9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWlEO0FBQ2pELHlFQUFpRTtBQUdqRSw0REFBd0Q7QUFHM0MsUUFBQSxhQUFhLEdBQUcsVUFBVSxDQUFDO0FBSXhDLFNBQWdCLFVBQVUsQ0FBQyxNQUF1QixFQUFFLFVBQW1CO0lBQ25FLElBQUksVUFBa0IsQ0FBQztJQUV2QixJQUFJLHVCQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDdkIsVUFBVSxHQUFHLE1BQWdCLENBQUM7S0FDakM7U0FBTTtRQUNILFVBQVUsR0FBRztZQUNULFVBQVU7WUFDVixjQUFjLEVBQUUsTUFBZ0I7U0FDbkMsQ0FBQztLQUNMO0lBQ0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsS0FBOEIsVUFBVSxFQUFuQyxvQkFBb0IsVUFBSyxVQUFVLEVBQWxHLGtFQUFxRixDQUFhLENBQUM7SUFDekcsTUFBTSxXQUFXLG1DQUNWLG9CQUFvQixLQUN2QixvQkFBb0IsRUFBRSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsRUFDekQsY0FBYyxFQUFFLHFCQUFhLEdBQ2hDLENBQUM7SUFFRixPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLG9DQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpELE9BQU8sa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTdCRCxnQ0E2QkMifQ==