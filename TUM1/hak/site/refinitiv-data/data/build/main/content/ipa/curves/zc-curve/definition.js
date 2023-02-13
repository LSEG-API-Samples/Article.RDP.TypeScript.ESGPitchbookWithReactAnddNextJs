"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params) {
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getZcCurve(params);
        },
        getInstrument() {
            return params;
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvemMtY3VydmUvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBaUU7QUFHakUsd0RBQW9EO0FBR3BELFNBQWdCLFVBQVUsQ0FBQyxNQUFjO0lBQ3JDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkQsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxhQUFhO1lBQ1QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBWkQsZ0NBWUMifQ==