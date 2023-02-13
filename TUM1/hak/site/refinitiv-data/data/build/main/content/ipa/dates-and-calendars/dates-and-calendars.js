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
exports.DatesAndCalendarsProvider = void 0;
const common_1 = require("@refinitiv-data/common");
const abstract_content_provider_1 = require("../../abstract-content-provider");
const data_accessor_1 = require("../../data-accessor/data-accessor");
const util_1 = require("../../../util");
class DatesAndCalendarsProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session) {
        super(session);
        this.apiGroup = 'data';
        this.endpointName = 'quantitative-analytics-dates-and-calendars';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getAddPeriods(paramsList) {
        this.validateParamsList(paramsList, ['period', 'startDate'], 'AddPeriods.Params');
        const normalizedParamsList = this.normalizeParamsList(paramsList);
        const requestParams = this.getRequestParams('add-periods', normalizedParamsList);
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        const responseData = this.getResponseData(response);
        if (responseData.length > 1) {
            contentResponse.data.addedPeriods = responseData;
        }
        else {
            const [addedPeriod] = responseData;
            contentResponse.data.addedPeriod = addedPeriod;
        }
        return contentResponse;
    }
    async getCountPeriods(paramsList) {
        this.validateParamsList(paramsList, ['startDate', 'endDate'], 'CountPeriods.Params');
        const normalizedParamsList = this.normalizeParamsList(paramsList);
        const requestParams = this.getRequestParams('count-periods', normalizedParamsList);
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        const responseData = this.getResponseData(response);
        if (responseData.length > 1) {
            contentResponse.data.countedPeriods = responseData;
        }
        else {
            const [countedPeriod] = responseData;
            contentResponse.data.countedPeriod = countedPeriod;
        }
        return contentResponse;
    }
    async getDateSchedule(paramsList) {
        this.validateParamsList(paramsList, ['frequency'], 'DateSchedule.Params');
        const [normalizedParams] = this.normalizeParamsList(paramsList);
        const requestParams = this.getRequestParams('date-schedule', normalizedParams);
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        contentResponse.data.dates = response.data;
        return contentResponse;
    }
    async getHolidays(paramsList) {
        this.validateParamsList(paramsList, ['startDate', 'endDate'], 'Holidays.Params');
        const normalizedParamsList = this.normalizeParamsList(paramsList);
        const requestParams = this.getRequestParams('holidays', normalizedParamsList);
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        const responseBody = this.getResponseData(response);
        contentResponse.data.holidays = this.prepareHolidays(responseBody);
        return contentResponse;
    }
    async getIsWorkingDay(paramsList) {
        this.validateParamsList(paramsList, ['date'], 'IsWorkingDay.Params');
        const normalizedParamsList = this.normalizeParamsList(paramsList);
        const requestParams = this.getRequestParams('is-working-day', normalizedParamsList);
        const response = await this.dataAccessor.getData(requestParams);
        const contentResponse = this.toContentResponse(response);
        const responseData = this.getResponseData(response);
        if (responseData.length > 1) {
            contentResponse.data.days = responseData;
        }
        else {
            const [day] = responseData;
            contentResponse.data.day = day;
        }
        return contentResponse;
    }
    validateParamsList(paramsList, requiredFields, instanceName) {
        paramsList.forEach(params => util_1.validateRequired(params, requiredFields, instanceName));
    }
    normalizeParamsList(paramsList) {
        return paramsList.map(params => {
            const { extendedParams } = params, restParams = __rest(params, ["extendedParams"]);
            return Object.assign(Object.assign({}, restParams), extendedParams);
        });
    }
    getRequestParams(pathName, contentBody) {
        return {
            url: this.getEndpointPath(pathName),
            method: common_1.HttpMethod.POST,
            dataAccessorContentBody: contentBody,
        };
    }
    getResponseData(response) {
        const { data } = response;
        return Array.isArray(data) ? data : [];
    }
    prepareHolidays(data) {
        return data
            .map(holidaysContent => {
            const { tag, holidays, error } = holidaysContent;
            if (error) {
                return holidaysContent;
            }
            return holidays.map(holiday => {
                const date = this.getDate(holiday.date);
                return Object.assign(Object.assign({ tag }, holiday), (date && date));
            });
        })
            .flat();
    }
    getDate(dateString) {
        const date = new Date(dateString);
        if (date.toString() === 'Invalid Date') {
            return;
        }
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        };
    }
}
exports.DatesAndCalendarsProvider = DatesAndCalendarsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXMtYW5kLWNhbGVuZGFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9kYXRlcy1hbmQtY2FsZW5kYXJzL2RhdGVzLWFuZC1jYWxlbmRhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBb0Q7QUFDcEQsK0VBQTBFO0FBRzFFLHFFQUFxRTtBQUdyRSx3Q0FBaUQ7QUFPakQsTUFBYSx5QkFBMEIsU0FBUSxtREFBdUI7SUFLbEUsWUFBWSxPQUFnQjtRQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFMWixhQUFRLEdBQXVCLE1BQU0sQ0FBQztRQUN0QyxpQkFBWSxHQUFHLDRDQUE0QyxDQUFDO1FBSy9ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxnQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUErQjtRQUN0RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFFbEYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBRWpGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEQsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7U0FDcEQ7YUFBTTtZQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDbkMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBaUM7UUFDMUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUVuRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1NBQ3REO2FBQU07WUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0RDtRQUVELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQWlDO1FBQzFELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRTFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFL0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekQsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUUzQyxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUE2QjtRQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFakYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBRTlFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEQsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuRSxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFpQztRQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUVyRSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUVwRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1NBQzVDO2FBQU07WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQzNCLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNsQztRQUVELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFTyxrQkFBa0IsQ0FBVSxVQUFxQixFQUFFLGNBQW9DLEVBQUUsWUFBb0I7UUFDakgsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHVCQUFnQixDQUFVLE1BQU0sRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU8sbUJBQW1CLENBQWlDLFVBQXFCO1FBQzdFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQixNQUFNLEVBQUUsY0FBYyxLQUFvQixNQUFNLEVBQXJCLFVBQVUsVUFBSyxNQUFNLEVBQTFDLGtCQUFpQyxDQUFTLENBQUM7WUFDakQsdUNBQVksVUFBVSxHQUFLLGNBQWMsRUFBRztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxnQkFBZ0IsQ0FBd0MsUUFBZ0IsRUFBRSxXQUFrQjtRQUNoRyxPQUFPO1lBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxtQkFBVSxDQUFDLElBQUk7WUFDdkIsdUJBQXVCLEVBQUUsV0FBVztTQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVPLGVBQWUsQ0FBQyxRQUFhO1FBQ2pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU8sZUFBZSxDQUFDLElBQWdDO1FBQ3BELE9BQU8sSUFBSTthQUNOLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNuQixNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUM7WUFFakQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsT0FBTyxlQUFlLENBQUM7YUFDMUI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV4QyxxQ0FDSSxHQUFHLElBQ0EsT0FBTyxHQUNQLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUNuQjtZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVPLE9BQU8sQ0FBQyxVQUFrQjtRQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxjQUFjLEVBQUU7WUFDcEMsT0FBTztTQUNWO1FBRUQsT0FBTztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztZQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtTQUN0QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbktELDhEQW1LQyJ9