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
exports.convertParamsToBody = exports.method = void 0;
const common_1 = require("@refinitiv-data/common");
const Search = __importStar(require("."));
const convert_map_to_string_1 = require("../../../util/convert-map-to-string");
exports.method = common_1.HttpMethod.POST;
const convertParamsToBody = (params) => {
    const { query, view, filter, orderBy, boost, select, top, skip, groupBy, groupCount, navigators, features, extendedParams } = params;
    return Object.assign({ Query: query, View: view ? view : Search.View.SearchAll, Filter: filter, OrderBy: orderBy instanceof Map ? convert_map_to_string_1.convertMapToString(orderBy) : orderBy, Boost: boost, Select: Array.isArray(select) ? select.toString() : select, Top: top, Skip: skip, GroupBy: groupBy, GroupCount: groupCount, Navigators: navigators, Features: Array.isArray(features) ? features.toString() : features }, extendedParams);
};
exports.convertParamsToBody = convertParamsToBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zZWFyY2gvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQW9EO0FBRXBELDBDQUE0QjtBQUM1QiwrRUFBeUU7QUFFNUQsUUFBQSxNQUFNLEdBQWUsbUJBQVUsQ0FBQyxJQUFJLENBQUM7QUFFM0MsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE1BQXFCLEVBQWtCLEVBQUU7SUFDekUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUVySSx1QkFDSSxLQUFLLEVBQUUsS0FBSyxFQUNaLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQ3pDLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE9BQU8sWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQ3ZFLEtBQUssRUFBRSxLQUFLLEVBQ1osTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUMxRCxHQUFHLEVBQUUsR0FBRyxFQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLE9BQU8sRUFDaEIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQXFCLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFDbkYsY0FBYyxFQUNuQjtBQUNOLENBQUMsQ0FBQztBQWxCVyxRQUFBLG1CQUFtQix1QkFrQjlCIn0=