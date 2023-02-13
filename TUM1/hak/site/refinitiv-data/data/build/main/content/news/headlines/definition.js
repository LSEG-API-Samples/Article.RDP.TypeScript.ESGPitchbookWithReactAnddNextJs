"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../session/default-session");
const news_provider_1 = require("../news-provider");
const interfaces_1 = require("./interfaces");
const table_builder_1 = require("./table-builder");
const DEFAULT_NEWS_HEADLINES_QUERY = {
    count: 10,
    sort: interfaces_1.SortDirection.NewToOld,
};
function Definition(params) {
    const parameters = isString_1.default(params)
        ? Object.assign(Object.assign({}, DEFAULT_NEWS_HEADLINES_QUERY), { query: params }) : Object.assign(Object.assign({}, DEFAULT_NEWS_HEADLINES_QUERY), params);
    const tableBuilder = new table_builder_1.TableBuilderImp();
    return {
        getData(session = default_session_1.getDefault()) {
            const newsProvider = new news_provider_1.NewsProvider(session, tableBuilder);
            return newsProvider.getHeadlines(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L25ld3MvaGVhZGxpbmVzL2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0RBQXVDO0FBRXZDLHNFQUE4RDtBQUk5RCxvREFBZ0Q7QUFDaEQsNkNBQWtFO0FBQ2xFLG1EQUFrRDtBQUVsRCxNQUFNLDRCQUE0QixHQUFtQztJQUNqRSxLQUFLLEVBQUUsRUFBRTtJQUNULElBQUksRUFBRSwwQkFBYSxDQUFDLFFBQVE7Q0FDL0IsQ0FBQztBQUlGLFNBQWdCLFVBQVUsQ0FBQyxNQUF1QjtJQUM5QyxNQUFNLFVBQVUsR0FBVyxrQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxDQUFDLGlDQUFNLDRCQUE0QixLQUFFLEtBQUssRUFBRSxNQUFNLElBQ2xELENBQUMsaUNBQU0sNEJBQTRCLEdBQUssTUFBTSxDQUFFLENBQUM7SUFDckQsTUFBTSxZQUFZLEdBQUcsSUFBSSwrQkFBZSxFQUFFLENBQUM7SUFFM0MsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQiw0QkFBVSxFQUFFO1lBQ25DLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBYyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFMUUsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWJELGdDQWFDIn0=