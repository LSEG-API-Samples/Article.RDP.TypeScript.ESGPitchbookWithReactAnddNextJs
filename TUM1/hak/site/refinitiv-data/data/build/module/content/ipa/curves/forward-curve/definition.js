"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params) {
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getForwardCurve(params);
        },
        getInstrument() {
            return params;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvZm9yd2FyZC1jdXJ2ZS9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFpRTtBQUdqRSx3REFBb0Q7QUFHcEQsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sY0FBYyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRCxPQUFPLGNBQWMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFYRCxnQ0FXQyJ9