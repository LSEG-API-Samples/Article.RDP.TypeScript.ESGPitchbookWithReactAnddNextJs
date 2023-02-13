"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params, outputs) {
    let parameters;
    if (isPlainObject_1.default(params)) {
        parameters = params;
    }
    else {
        parameters = {
            universe: params,
            outputs,
        };
    }
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getForwardCurves(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvZm9yd2FyZC1jdXJ2ZXMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5RUFBaUQ7QUFFakQseUVBQWlFO0FBR2pFLHdEQUFvRDtBQU1wRCxTQUFnQixVQUFVLENBQUMsTUFBbUUsRUFBRSxPQUFrQjtJQUM5RyxJQUFJLFVBQWtCLENBQUM7SUFDdkIsSUFBSSx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRyxNQUFnQixDQUFDO0tBQ2pDO1NBQU07UUFDSCxVQUFVLEdBQUc7WUFDVCxRQUFRLEVBQUUsTUFBNkI7WUFDdkMsT0FBTztTQUNWLENBQUM7S0FDTDtJQUVELE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsT0FBTyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBakJELGdDQWlCQyJ9