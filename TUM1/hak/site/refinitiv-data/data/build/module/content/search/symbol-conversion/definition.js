"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isArray_1 = __importDefault(require("lodash/isArray"));
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../session/default-session");
const search_provider_1 = require("../search-provider");
const table_builder_1 = require("./table-builder");
function Definition(params) {
    const parameters = isArray_1.default(params) || isString_1.default(params) ? { symbols: [].concat(params) } : params;
    const tableBuilder = new table_builder_1.TableBuilderImp();
    return {
        getData(session = default_session_1.getDefault()) {
            const searchProvider = new search_provider_1.SearchProvider(session, tableBuilder);
            return searchProvider.getSymbology(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zeW1ib2wtY29udmVyc2lvbi9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZEQUFxQztBQUNyQywrREFBdUM7QUFFdkMsc0VBQThEO0FBRzlELHdEQUFvRDtBQUVwRCxtREFBa0Q7QUFJbEQsU0FBZ0IsVUFBVSxDQUFDLE1BQWtDO0lBQ3pELE1BQU0sVUFBVSxHQUFXLGlCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUcsRUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDdkgsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBZSxFQUFFLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sY0FBYyxHQUFHLElBQUksZ0NBQWMsQ0FBYyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFOUUsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQVhELGdDQVdDIn0=