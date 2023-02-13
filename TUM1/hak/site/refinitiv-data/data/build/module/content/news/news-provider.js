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
exports.NewsProvider = void 0;
const url_join_1 = __importDefault(require("url-join"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_1 = require("../../util");
const abstract_content_provider_1 = require("../abstract-content-provider");
const data_accessor_1 = require("../data-accessor/data-accessor");
class NewsProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'data';
        this.endpointName = 'news';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getStory(params) {
        util_1.validateRequired(Object.assign({}, params), ['storyId'], 'News.Story.Params');
        const { storyId, extendedParams } = params, rest = __rest(params, ["storyId", "extendedParams"]);
        const requestParams = {
            url: url_join_1.default(this.getEndpointPath('stories'), storyId),
            dataAccessorContentQuery: Object.assign(Object.assign({}, rest), extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        return this.addNewsStoryToContentResponse(response.data, contentResponse);
    }
    async getHeadlines(params) {
        util_1.validateRequired(Object.assign({}, params), ['query'], 'News.Headlines.Params');
        const { extendedParams, count: limit } = params, query = __rest(params, ["extendedParams", "count"]);
        const requestContent = Object.assign(Object.assign(Object.assign({}, query), { limit }), extendedParams);
        const requestParams = {
            url: this.getEndpointPath('headlines'),
            dataAccessorContentQuery: requestContent,
        };
        const response = await this.dataAccessor.getData(requestParams);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
    addNewsStoryToContentResponse(responseData, contentResponse) {
        const { itemMeta, contentMeta } = responseData.newsItem;
        const formattedResponse = cloneDeep_1.default(contentResponse);
        formattedResponse.data.news = {
            story: {
                title: itemMeta.title[0].$,
                creator: contentMeta.creator[0]._qcode,
                source: contentMeta.infoSource,
                language: contentMeta.language,
                subject: contentMeta.subject,
                itemCodes: contentMeta.subject.map((subject) => subject._qcode),
                urgency: contentMeta.urgency.$,
                creationDate: itemMeta.firstCreated.$,
                updateDate: itemMeta.versionCreated.$,
                raw: responseData,
                newsType: 'story',
            },
        };
        return formattedResponse;
    }
}
exports.NewsProvider = NewsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L25ld3MvbmV3cy1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUErQjtBQUMvQixpRUFBeUM7QUFHekMscUNBQThDO0FBQzlDLDRFQUF1RTtBQUd2RSxrRUFBa0U7QUFPbEUsTUFBYSxZQUE0QyxTQUFRLG1EQUF1QjtJQUtwRixZQUFZLE9BQWdCLEVBQVUsWUFBOEM7UUFDaEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRG1CLGlCQUFZLEdBQVosWUFBWSxDQUFrQztRQUo3RSxhQUFRLEdBQXVCLE1BQU0sQ0FBQztRQUN0QyxpQkFBWSxHQUFHLE1BQU0sQ0FBQztRQUt6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBb0I7UUFDdEMsdUJBQWdCLG1CQUFvQixNQUFNLEdBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxLQUFjLE1BQU0sRUFBZixJQUFJLFVBQUssTUFBTSxFQUE3Qyw2QkFBb0MsQ0FBUyxDQUFDO1FBQ3BELE1BQU0sYUFBYSxHQUF1QztZQUN0RCxHQUFHLEVBQUUsa0JBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sQ0FBQztZQUN0RCx3QkFBd0Isa0NBQU8sSUFBSSxHQUFLLGNBQWMsQ0FBRTtTQUMzRCxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQVEsUUFBUSxDQUFDLENBQUM7UUFFaEUsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUF3QjtRQUM5Qyx1QkFBZ0IsbUJBQXdCLE1BQU0sR0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFFdEYsTUFBTSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxLQUFlLE1BQU0sRUFBaEIsS0FBSyxVQUFLLE1BQU0sRUFBbkQsMkJBQTBDLENBQVMsQ0FBQztRQUMxRCxNQUFNLGNBQWMsaURBQTJCLEtBQUssS0FBRSxLQUFLLEtBQUssY0FBYyxDQUFFLENBQUM7UUFDakYsTUFBTSxhQUFhLEdBQTJDO1lBQzFELEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUN0Qyx3QkFBd0IsRUFBRSxjQUFjO1NBQzNDLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBUyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVPLDZCQUE2QixDQUNqQyxZQUF3QixFQUN4QixlQUF5RTtRQUV6RSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDeEQsTUFBTSxpQkFBaUIsR0FBRyxtQkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXJELGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDMUIsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07Z0JBQ3RDLE1BQU0sRUFBRSxXQUFXLENBQUMsVUFBVTtnQkFDOUIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2dCQUM5QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87Z0JBQzVCLFNBQVMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQStCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZGLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLFlBQVksRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JDLFVBQVUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsRUFBRSxZQUFZO2dCQUNqQixRQUFRLEVBQUUsT0FBTzthQUNwQjtTQUNKLENBQUM7UUFFRixPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQW5FRCxvQ0FtRUMifQ==