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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurvesProvider = void 0;
const common_1 = require("@refinitiv-data/common");
const util_1 = require("../../../util");
const abstract_content_provider_1 = require("../../abstract-content-provider");
const data_accessor_1 = require("../../data-accessor/data-accessor");
class CurvesProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session) {
        super(session);
        this.apiGroup = 'data';
        this.endpointName = 'quantitative-analytics-curves-and-surfaces';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getForwardCurve(params) {
        util_1.validateRequired(params, ['curveDefinition', 'forwardCurveDefinitions'], 'ForwardCurve.Params');
        const { outputs, extendedParams } = params, forwardCurveParams = __rest(params, ["outputs", "extendedParams"]);
        const requestParams = {
            url: this.getEndpointPath('forward-curves'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe: [forwardCurveParams], outputs }, extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        return this.toContentResponse(response);
    }
    async getForwardCurves(params) {
        util_1.validateRequired(params, ['universe'], 'ForwardCurves.Params');
        const { outputs, extendedParams, universe: u } = params;
        const universe = u.map(this.getCurveParams);
        const requestParams = {
            url: this.getEndpointPath('forward-curves'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe, outputs }, extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        return this.toContentResponse(response);
    }
    async getZcCurve(params) {
        util_1.validateRequired(params, ['curveDefinition'], 'ZcCurve.Params');
        const { outputs, extendedParams } = params, zcCurveParams = __rest(params, ["outputs", "extendedParams"]);
        const requestParams = {
            url: this.getEndpointPath('zc-curves'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe: [zcCurveParams], outputs }, extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        return this.toContentResponse(response);
    }
    async getZcCurves(params) {
        util_1.validateRequired(params, ['universe'], 'ZcCurves.Params');
        const { outputs, extendedParams, universe: u } = params;
        const universe = u.map(this.getCurveParams);
        const requestParams = {
            url: this.getEndpointPath('zc-curves'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe, outputs }, extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        return this.toContentResponse(response);
    }
    async getZcCurveDefinition(universe) {
        const { extendedParams } = universe, parameters = __rest(universe, ["extendedParams"]);
        const params = {
            url: this.getEndpointPath('zc-curve-definitions'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe: [parameters] }, extendedParams),
        };
        const response = await this.dataAccessor.getData(params);
        return this.toContentResponse(response);
    }
    async getZcCurveDefinitions(params) {
        util_1.validateRequired(params, ['universe'], 'ZcCurveDefinitions.Params');
        const { extendedParams, universe: u } = params;
        const universe = u.map(item => {
            const _a = item.getInstrument(), { extendedParams: e } = _a, zcCurveDefinitionParams = __rest(_a, ["extendedParams"]);
            return zcCurveDefinitionParams;
        });
        const requestParams = {
            url: this.getEndpointPath('zc-curve-definitions'),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: Object.assign({ universe }, extendedParams),
        };
        const response = await this.dataAccessor.getData(requestParams);
        return this.toContentResponse(response);
    }
    getCurveParams(item) {
        const _a = item.getInstrument(), { outputs: o, extendedParams: e } = _a, curveParams = __rest(_a, ["outputs", "extendedParams"]);
        return curveParams;
    }
}
exports.CurvesProvider = CurvesProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VydmVzLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaXBhL2N1cnZlcy9jdXJ2ZXMtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBb0Q7QUFFcEQsd0NBQWlEO0FBQ2pELCtFQUEwRTtBQUUxRSxxRUFBcUU7QUFVckUsTUFBYSxjQUFlLFNBQVEsbURBQXVCO0lBS3ZELFlBQVksT0FBZ0I7UUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBTFosYUFBUSxHQUF1QixNQUFNLENBQUM7UUFDdEMsaUJBQVksR0FBRyw0Q0FBNEMsQ0FBQztRQUsvRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBMkI7UUFDcEQsdUJBQWdCLENBQXNCLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLHlCQUF5QixDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNySCxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsS0FBNEIsTUFBTSxFQUE3QixrQkFBa0IsVUFBSyxNQUFNLEVBQTNELDZCQUFrRCxDQUFTLENBQUM7UUFDbEUsTUFBTSxhQUFhLEdBQW1EO1lBQ2xFLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQzNDLE1BQU0sRUFBRSxtQkFBVSxDQUFDLElBQUk7WUFDdkIsdUJBQXVCLGtCQUFJLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxJQUFLLGNBQWMsQ0FBRTtTQUMxRixDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQTRCO1FBQ3RELHVCQUFnQixDQUF1QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFeEQsTUFBTSxRQUFRLEdBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sYUFBYSxHQUFvRDtZQUNuRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMzQyxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxJQUFJO1lBQ3ZCLHVCQUF1QixrQkFBSSxRQUFRLEVBQUUsT0FBTyxJQUFLLGNBQWMsQ0FBRTtTQUNwRSxDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFzQjtRQUMxQyx1QkFBZ0IsQ0FBaUIsTUFBTSxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxLQUF1QixNQUFNLEVBQXhCLGFBQWEsVUFBSyxNQUFNLEVBQXRELDZCQUE2QyxDQUFTLENBQUM7UUFFN0QsTUFBTSxhQUFhLEdBQThDO1lBQzdELEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUN0QyxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxJQUFJO1lBQ3ZCLHVCQUF1QixrQkFBSSxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLElBQUssY0FBYyxDQUFFO1NBQ3JGLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQXVCO1FBQzVDLHVCQUFnQixDQUFrQixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFeEQsTUFBTSxRQUFRLEdBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlELE1BQU0sYUFBYSxHQUErQztZQUM5RCxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7WUFDdEMsTUFBTSxFQUFFLG1CQUFVLENBQUMsSUFBSTtZQUN2Qix1QkFBdUIsa0JBQUksUUFBUSxFQUFFLE9BQU8sSUFBSyxjQUFjLENBQUU7U0FDcEUsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFaEUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxRQUFrQztRQUNoRSxNQUFNLEVBQUUsY0FBYyxLQUFvQixRQUFRLEVBQXZCLFVBQVUsVUFBSyxRQUFRLEVBQTVDLGtCQUFpQyxDQUFXLENBQUM7UUFFbkQsTUFBTSxNQUFNLEdBQXdEO1lBQ2hFLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixDQUFDO1lBQ2pELE1BQU0sRUFBRSxtQkFBVSxDQUFDLElBQUk7WUFDdkIsdUJBQXVCLGtCQUFJLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFLLGNBQWMsQ0FBRTtTQUN6RSxDQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6RCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSyxDQUFDLHFCQUFxQixDQUFDLE1BQWlDO1FBQ2hFLHVCQUFnQixDQUE0QixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBRS9GLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUUvQyxNQUFNLFFBQVEsR0FBK0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxNQUFNLEtBQW9ELElBQUksQ0FBQyxhQUFjLEVBQUUsRUFBekUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxPQUFzRCxFQUFqRCx1QkFBdUIsY0FBL0Msa0JBQWlELENBQXdCLENBQUM7WUFFaEYsT0FBTyx1QkFBdUIsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUF5RDtZQUN4RSxHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNqRCxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxJQUFJO1lBQ3ZCLHVCQUF1QixrQkFBSSxRQUFRLElBQUssY0FBYyxDQUFFO1NBQzNELENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxjQUFjLENBQTJCLElBQWtDO1FBQy9FLE1BQU0sS0FBb0QsSUFBSSxDQUFDLGFBQWMsRUFBRSxFQUF6RSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsT0FBMEMsRUFBckMsV0FBVyxjQUEvQyw2QkFBaUQsQ0FBd0IsQ0FBQztRQUVoRixPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUE1R0Qsd0NBNEdDIn0=