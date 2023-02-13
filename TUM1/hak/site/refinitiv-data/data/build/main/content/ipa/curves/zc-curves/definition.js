"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params, outputs) {
    let parameters;
    if (Array.isArray(params)) {
        parameters = {
            universe: params,
            outputs,
        };
    }
    else {
        parameters = params;
    }
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getZcCurves(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvemMtY3VydmVzL2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUVBQWlFO0FBR2pFLHdEQUFvRDtBQU1wRCxTQUFnQixVQUFVLENBQUMsTUFBOEQsRUFBRSxPQUFrQjtJQUN6RyxJQUFJLFVBQWtCLENBQUM7SUFFdkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU87U0FDVixDQUFDO0tBQ0w7U0FBTTtRQUNILFVBQVUsR0FBRyxNQUFNLENBQUM7S0FDdkI7SUFFRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFsQkQsZ0NBa0JDIn0=