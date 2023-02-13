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
exports.Definition = exports.ETI_TYPE = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const default_session_1 = require("../../../../session/default-session");
const surfaces_provider_1 = require("../surfaces-provider");
exports.ETI_TYPE = 'Eti';
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
    const { outputs, extendedParams, instrumentCode, cleanInstrumentCode, exchange, isFutureUnderlying } = parameters, instrumentDefinition = __rest(parameters, ["outputs", "extendedParams", "instrumentCode", "cleanInstrumentCode", "exchange", "isFutureUnderlying"]);
    const requestItem = Object.assign(Object.assign({}, instrumentDefinition), { underlyingDefinition: {
            instrumentCode,
            cleanInstrumentCode,
            exchange,
            isFutureUnderlying,
        }, underlyingType: exports.ETI_TYPE });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9zdXJmYWNlcy9ldGkvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFpRDtBQUNqRCx5RUFBaUU7QUFHakUsNERBQXdEO0FBRzNDLFFBQUEsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUk5QixTQUFnQixVQUFVLENBQUMsTUFBdUIsRUFBRSxVQUFtQjtJQUNuRSxJQUFJLFVBQWtCLENBQUM7SUFFdkIsSUFBSSx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRyxNQUFnQixDQUFDO0tBQ2pDO1NBQU07UUFDSCxVQUFVLEdBQUc7WUFDVCxVQUFVO1lBQ1YsY0FBYyxFQUFFLE1BQWdCO1NBQ25DLENBQUM7S0FDTDtJQUNELE1BQU0sRUFDRixPQUFPLEVBQ1AsY0FBYyxFQUNkLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsUUFBUSxFQUNSLGtCQUFrQixLQUVsQixVQUFVLEVBRFAsb0JBQW9CLFVBQ3ZCLFVBQVUsRUFSUix3R0FRTCxDQUFhLENBQUM7SUFDZixNQUFNLFdBQVcsbUNBQ1Ysb0JBQW9CLEtBQ3ZCLG9CQUFvQixFQUFFO1lBQ2xCLGNBQWM7WUFDZCxtQkFBbUI7WUFDbkIsUUFBUTtZQUNSLGtCQUFrQjtTQUNyQixFQUNELGNBQWMsRUFBRSxnQkFBUSxHQUMzQixDQUFDO0lBRUYsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxvQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6RCxPQUFPLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUExQ0QsZ0NBMENDIn0=