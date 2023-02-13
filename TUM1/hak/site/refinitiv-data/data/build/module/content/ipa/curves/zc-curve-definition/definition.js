"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params) {
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getZcCurveDefinition(params);
        },
        getInstrument() {
            return params;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvemMtY3VydmUtZGVmaW5pdGlvbi9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFpRTtBQUdqRSx3REFBb0Q7QUFHcEQsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sY0FBYyxHQUFHLElBQUksZ0NBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVuRCxPQUFPLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsYUFBYTtZQUNULE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQVpELGdDQVlDIn0=