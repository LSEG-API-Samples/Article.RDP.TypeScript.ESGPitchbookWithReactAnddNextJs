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
exports.FinancialContractsProvider = void 0;
const common_1 = require("@refinitiv-data/common");
const util_1 = require("../../../util");
const abstract_content_provider_1 = require("../../abstract-content-provider");
const data_accessor_1 = require("../../data-accessor/data-accessor");
class FinancialContractsProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'data';
        this.endpointName = 'quantitative-analytics-financial-contracts';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async getInstrumentAnalytics(universe, params = {}) {
        util_1.validateRequired({ universe }, ['universe'], 'FinancialContracts.Params');
        const { extendedParams } = params, restParams = __rest(params, ["extendedParams"]);
        const body = Object.assign(Object.assign({ universe }, restParams), extendedParams);
        const url = this.getEndpointPath('financial-contracts');
        const request = {
            url,
            dataAccessorContentBody: body,
            method: common_1.HttpMethod.POST,
        };
        const response = await this.dataAccessor.getData(request);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
}
exports.FinancialContractsProvider = FinancialContractsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYW5jaWFsLWNvbnRyYWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2ZpbmFuY2lhbC1jb250cmFjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBb0Q7QUFFcEQsd0NBQWlEO0FBQ2pELCtFQUEwRTtBQUUxRSxxRUFBcUU7QUFLckUsTUFBYSwwQkFBMkIsU0FBUSxtREFBdUI7SUFLbkUsWUFBWSxPQUFnQixFQUFVLFlBQXVDO1FBQ3pFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURtQixpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFKdEUsYUFBUSxHQUF1QixNQUFNLENBQUM7UUFDdEMsaUJBQVksR0FBRyw0Q0FBNEMsQ0FBQztRQU0vRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZ0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxzQkFBc0IsQ0FDL0IsUUFBK0IsRUFDL0IsU0FBb0MsRUFBRTtRQUV0Qyx1QkFBZ0IsQ0FBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUNuRixNQUFNLEVBQUUsY0FBYyxLQUFvQixNQUFNLEVBQXJCLFVBQVUsVUFBSyxNQUFNLEVBQTFDLGtCQUFpQyxDQUFTLENBQUM7UUFDakQsTUFBTSxJQUFJLGlDQUFjLFFBQVEsSUFBSyxVQUFVLEdBQUssY0FBYyxDQUFFLENBQUM7UUFDckUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sT0FBTyxHQUFzQztZQUMvQyxHQUFHO1lBQ0gsdUJBQXVCLEVBQUUsSUFBSTtZQUM3QixNQUFNLEVBQUUsbUJBQVUsQ0FBQyxJQUFJO1NBQzFCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFELE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBUSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBL0JELGdFQStCQyJ9