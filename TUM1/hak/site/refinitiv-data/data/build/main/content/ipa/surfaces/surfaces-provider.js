"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurfacesProvider = void 0;
const common_1 = require("@refinitiv-data/common");
const util_1 = require("../../../util");
const abstract_content_provider_1 = require("../../abstract-content-provider");
const data_accessor_1 = require("../../data-accessor/data-accessor");
class SurfacesProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session) {
        super(session);
        this.apiGroup = 'data';
        this.endpointName = 'quantitative-analytics-curves-and-surfaces';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getSurfaces(universe, params = {}) {
        util_1.validateRequired({ universe }, ['universe'], 'Surfaces.Params');
        const { extendedParams, outputs } = params;
        const body = Object.assign({ universe, outputs }, extendedParams);
        const url = this.getEndpointPath('surfaces');
        const request = {
            url,
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: body,
        };
        const response = await this.dataAccessor.getData(request);
        return this.toContentResponse(response);
    }
}
exports.SurfacesProvider = SurfacesProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZXMtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9pcGEvc3VyZmFjZXMvc3VyZmFjZXMtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW9EO0FBR3BELHdDQUFpRDtBQUNqRCwrRUFBMEU7QUFFMUUscUVBQXFFO0FBS3JFLE1BQWEsZ0JBQWlCLFNBQVEsbURBQXVCO0lBT3pELFlBQVksT0FBZ0I7UUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBUFosYUFBUSxHQUF1QixNQUFNLENBQUM7UUFFdEMsaUJBQVksR0FBRyw0Q0FBNEMsQ0FBQztRQU8vRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBZ0MsRUFBRSxTQUFvQyxFQUFFO1FBQzdGLHVCQUFnQixDQUF1QyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN0RyxNQUFNLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUMzQyxNQUFNLElBQUksbUJBQXVCLFFBQVEsRUFBRSxPQUFPLElBQUssY0FBYyxDQUFFLENBQUM7UUFDeEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3QyxNQUFNLE9BQU8sR0FBK0M7WUFDeEQsR0FBRztZQUNILE1BQU0sRUFBRSxtQkFBVSxDQUFDLElBQUk7WUFDdkIsdUJBQXVCLEVBQUUsSUFBSTtTQUNoQyxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7QUE3QkQsNENBNkJDIn0=