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
exports.Definition = exports.CAP_TYPE = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const default_session_1 = require("../../../../session/default-session");
const surfaces_provider_1 = require("../surfaces-provider");
exports.CAP_TYPE = 'Cap';
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
    const requestItem = Object.assign(Object.assign({}, instrumentDefinition), { underlyingDefinition: {
            instrumentCode,
            discountingType,
        }, underlyingType: exports.CAP_TYPE });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9zdXJmYWNlcy9jYXAvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFpRDtBQUNqRCx5RUFBaUU7QUFHakUsNERBQXdEO0FBRzNDLFFBQUEsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUk5QixTQUFnQixVQUFVLENBQUMsTUFBdUIsRUFBRSxVQUFtQjtJQUNuRSxJQUFJLFVBQWtCLENBQUM7SUFFdkIsSUFBSSx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRyxNQUFnQixDQUFDO0tBQ2pDO1NBQU07UUFDSCxVQUFVLEdBQUc7WUFDVCxVQUFVO1lBQ1YsY0FBYyxFQUFFLE1BQWdCO1NBQ25DLENBQUM7S0FDTDtJQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxlQUFlLEtBQThCLFVBQVUsRUFBbkMsb0JBQW9CLFVBQUssVUFBVSxFQUFsRyxrRUFBcUYsQ0FBYSxDQUFDO0lBQ3pHLE1BQU0sV0FBVyxtQ0FDVixvQkFBb0IsS0FDdkIsb0JBQW9CLEVBQUU7WUFDbEIsY0FBYztZQUNkLGVBQWU7U0FDbEIsRUFDRCxjQUFjLEVBQUUsZ0JBQVEsR0FDM0IsQ0FBQztJQUVGLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGtCQUFrQixHQUFHLElBQUksb0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekQsT0FBTyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxhQUFhO1lBQ1QsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBaENELGdDQWdDQyJ9