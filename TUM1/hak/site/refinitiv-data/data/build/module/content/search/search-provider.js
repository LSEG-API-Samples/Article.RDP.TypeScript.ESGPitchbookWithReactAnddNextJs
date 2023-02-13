"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProvider = void 0;
const util_1 = require("../../util");
const data_accessor_1 = require("../data-accessor/data-accessor");
const abstract_content_provider_1 = require("../abstract-content-provider");
const SearchHelpers = __importStar(require("./search/helpers"));
const SymbolConversionHelpers = __importStar(require("./symbol-conversion/helpers"));
class SearchProvider extends abstract_content_provider_1.AbstractContentProvider {
    constructor(session, tableBuilder) {
        super(session);
        this.tableBuilder = tableBuilder;
        this.apiGroup = 'discovery';
        this.endpointName = 'search';
        this.dataAccessor = new data_accessor_1.DataAccessorImpl(session);
    }
    async search(params) {
        util_1.validateRequired(params, [], 'Search.Params');
        const dataAccessorContentBody = SearchHelpers.convertParamsToBody(params);
        const request = {
            url: this.getEndpointPath('search'),
            method: SearchHelpers.method,
            dataAccessorContentBody,
        };
        const response = await this.dataAccessor.getData(request);
        const buildTable = () => this.tableBuilder.build(response.data);
        return this.toContentResponse(response, buildTable);
    }
    async getSymbology(params) {
        SymbolConversionHelpers.validateParams(params);
        const normalizedParams = SymbolConversionHelpers.getNormalizedParams(params);
        const dataAccessorContentBody = SymbolConversionHelpers.convertParamsToBody(normalizedParams);
        const request = {
            url: this.getEndpointPath('lookup'),
            method: SymbolConversionHelpers.method,
            dataAccessorContentBody,
        };
        const response = await this.dataAccessor.getData(request);
        const buildTable = () => this.tableBuilder.build({ data: response.data, params: normalizedParams });
        return this.toContentResponse(response, buildTable);
    }
}
exports.SearchProvider = SearchProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvc2VhcmNoL3NlYXJjaC1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQThDO0FBRTlDLGtFQUFrRTtBQUdsRSw0RUFBdUU7QUFFdkUsZ0VBQWtEO0FBRWxELHFGQUF1RTtBQUd2RSxNQUFhLGNBQTBDLFNBQVEsbURBQXVCO0lBTWxGLFlBQVksT0FBZ0IsRUFBVSxZQUF5QztRQUMzRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEbUIsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBTHhFLGFBQVEsR0FBdUIsV0FBVyxDQUFDO1FBQzNDLGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBTTNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxnQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFxQjtRQUNyQyx1QkFBZ0IsQ0FBZ0IsTUFBTSxFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM3RCxNQUFNLHVCQUF1QixHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRSxNQUFNLE9BQU8sR0FBNkM7WUFDdEQsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTtZQUM1Qix1QkFBdUI7U0FDMUIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFTLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUErQjtRQUNyRCx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0MsTUFBTSxnQkFBZ0IsR0FBRyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxNQUFNLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFOUYsTUFBTSxPQUFPLEdBQXVEO1lBQ2hFLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUN0Qyx1QkFBdUI7U0FDMUIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQVMsQ0FBQyxDQUFDO1FBRTNHLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFTLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0o7QUE3Q0Qsd0NBNkNDIn0=