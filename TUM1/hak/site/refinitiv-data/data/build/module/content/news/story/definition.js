"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const default_session_1 = require("../../../session/default-session");
const news_provider_1 = require("../news-provider");
function Definition(params) {
    const parameters = isString_1.default(params) ? { storyId: params } : params;
    return {
        getData(session = default_session_1.getDefault()) {
            const newsProvider = new news_provider_1.NewsProvider(session);
            return newsProvider.getStory(parameters);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L25ld3Mvc3RvcnkvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwrREFBdUM7QUFFdkMsc0VBQThEO0FBSzlELG9EQUFnRDtBQUtoRCxTQUFnQixVQUFVLENBQUMsTUFBdUI7SUFDOUMsTUFBTSxVQUFVLEdBQVcsa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUUzRSxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLDRCQUFVLEVBQUU7WUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9DLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFWRCxnQ0FVQyJ9