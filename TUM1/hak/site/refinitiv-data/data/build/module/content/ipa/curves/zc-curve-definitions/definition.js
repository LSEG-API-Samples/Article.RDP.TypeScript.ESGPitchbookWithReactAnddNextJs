"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const default_session_1 = require("../../../../session/default-session");
const curves_provider_1 = require("../curves-provider");
function Definition(params) {
    let parameters;
    if (isPlainObject_1.default(params)) {
        parameters = params;
    }
    else {
        parameters = {
            universe: params,
        };
    }
    return {
        getData(session = default_session_1.getDefault()) {
            const curvesProvider = new curves_provider_1.CurvesProvider(session);
            return curvesProvider.getZcCurveDefinitions(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9jdXJ2ZXMvemMtY3VydmUtZGVmaW5pdGlvbnMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5RUFBaUQ7QUFFakQseUVBQWlFO0FBR2pFLHdEQUFvRDtBQU1wRCxTQUFnQixVQUFVLENBQUMsTUFBMkY7SUFDbEgsSUFBSSxVQUFxQyxDQUFDO0lBQzFDLElBQUksdUJBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixVQUFVLEdBQUcsTUFBbUMsQ0FBQztLQUNwRDtTQUFNO1FBQ0gsVUFBVSxHQUFHO1lBQ1QsUUFBUSxFQUFFLE1BQWlFO1NBQzlFLENBQUM7S0FDTDtJQUVELE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkQsT0FBTyxjQUFjLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBakJELGdDQWlCQyJ9