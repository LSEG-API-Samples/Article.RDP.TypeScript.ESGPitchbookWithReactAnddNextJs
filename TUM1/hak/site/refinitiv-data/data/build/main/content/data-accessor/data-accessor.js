"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccessorImpl = void 0;
const common_1 = require("@refinitiv-data/common");
const endpoint_request_1 = require("../../delivery/endpoint-request");
const constants_1 = require("../../constants");
class DataAccessorImpl {
    constructor(session) {
        this.session = session;
    }
    async getData(request) {
        const urlRoot = request.url.startsWith(constants_1.UDF_ENDPOINT_ROOT) ? '' : this.session.rdpUrlRoot;
        const url = urlRoot ? `${urlRoot}${request.url}` : request.url;
        return endpoint_request_1.EndpointRequest.Definition({
            url,
            method: request.method || common_1.HttpMethod.GET,
            queryParameters: request.dataAccessorContentQuery,
            bodyParameters: request.dataAccessorContentBody,
        }).getData(this.session);
    }
}
exports.DataAccessorImpl = DataAccessorImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2RhdGEtYWNjZXNzb3IvZGF0YS1hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBb0Q7QUFFcEQsc0VBQW9GO0FBR3BGLCtDQUFvRDtBQUVwRCxNQUFhLGdCQUFnQjtJQUN6QixZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQztJQUVqQyxLQUFLLENBQUMsT0FBTyxDQUNoQixPQUFpQjtRQUVqQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyw2QkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3pGLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRS9ELE9BQU8sa0NBQWUsQ0FBQyxVQUFVLENBQUM7WUFDOUIsR0FBRztZQUNILE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLG1CQUFVLENBQUMsR0FBRztZQUN4QyxlQUFlLEVBQUUsT0FBTyxDQUFDLHdCQUF3QjtZQUNqRCxjQUFjLEVBQUUsT0FBTyxDQUFDLHVCQUF1QjtTQUNsRCxDQUFDLENBQUMsT0FBTyxDQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0o7QUFoQkQsNENBZ0JDIn0=