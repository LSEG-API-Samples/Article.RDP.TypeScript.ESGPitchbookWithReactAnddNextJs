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
const default_session_1 = require("../../../session/default-session");
const surfaces_provider_1 = require("./surfaces-provider");
function Definition(params) {
    let parameters;
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
            const financialContracts = new surfaces_provider_1.SurfacesProvider(session);
            const { definitions } = parameters, instrumentParams = __rest(parameters, ["definitions"]);
            return financialContracts.getSurfaces(definitions.map(instrument => instrument.getInstrument()), instrumentParams);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9zdXJmYWNlcy9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLHNFQUE4RDtBQUc5RCwyREFBdUQ7QUFLdkQsU0FBZ0IsVUFBVSxDQUFDLE1BQW9DO0lBQzNELElBQUksVUFBa0IsQ0FBQztJQUN2QixJQUFJLGlCQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakIsVUFBVSxHQUFHO1lBQ1QsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQztLQUNMO1NBQU07UUFDSCxVQUFVLEdBQUcsTUFBTSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxvQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6RCxNQUFNLEVBQUUsV0FBVyxLQUEwQixVQUFVLEVBQS9CLGdCQUFnQixVQUFLLFVBQVUsRUFBakQsZUFBb0MsQ0FBYSxDQUFDO1lBQ3hELE9BQU8sa0JBQWtCLENBQUMsV0FBVyxDQUNqQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWMsRUFBRSxDQUFDLEVBQzFELGdCQUFnQixDQUNuQixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBckJELGdDQXFCQyJ9