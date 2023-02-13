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
exports.convertParamsToBody = exports.getDefaultToSymbolType = exports.isSymbolType = exports.validateToSymbolType = exports.validateFromSymbolType = exports.validateParams = exports.prepareFilter = exports.getNormalizedParams = exports.RCSAssetCategoryGenealogy = exports.SearchAllCategory = exports.method = exports.FROM_SYMBOL_TYPES_DEFAULT_VALUE = void 0;
const common_1 = require("@refinitiv-data/common");
const util_1 = require("../../../util");
const Search = __importStar(require("../search"));
const interfaces_1 = require("./interfaces");
exports.FROM_SYMBOL_TYPES_DEFAULT_VALUE = '_AllUnique';
exports.method = common_1.HttpMethod.POST;
exports.SearchAllCategory = {
    [interfaces_1.AssetClass.Commodities]: 'Commodities',
    [interfaces_1.AssetClass.EquityOrIndexOptions]: 'Options',
    [interfaces_1.AssetClass.BondAndSTIRFuturesAndOptions]: 'Exchange-Traded Rates',
    [interfaces_1.AssetClass.Equities]: 'Equities',
    [interfaces_1.AssetClass.EquityIndexFutures]: 'Futures',
    [interfaces_1.AssetClass.Funds]: 'Funds',
    [interfaces_1.AssetClass.Bonds]: 'Bond Pricing',
    [interfaces_1.AssetClass.FXAndMoney]: 'FX & Money',
};
const isSupportedSearchAllCategory = (asset) => {
    return Object.keys(exports.SearchAllCategory).includes(asset);
};
const formatSearchItem = (item) => "'" + item + "'";
exports.RCSAssetCategoryGenealogy = {
    [interfaces_1.AssetClass.Warrants]: 'A:AA',
    [interfaces_1.AssetClass.Certificates]: 'A:6N',
    [interfaces_1.AssetClass.Indices]: 'I:17',
    [interfaces_1.AssetClass.ReverseConvertible]: 'A:LE',
    [interfaces_1.AssetClass.MiniFuture]: 'A:P6',
};
const isSupportedRCSAssetCategoryGenealogy = (asset) => {
    return Object.keys(exports.RCSAssetCategoryGenealogy).includes(asset);
};
const getNormalizedParams = (params) => {
    const { fromSymbolType, toSymbolType, symbols } = params, restParams = __rest(params, ["fromSymbolType", "toSymbolType", "symbols"]);
    const toSymbol = !toSymbolType ? exports.getDefaultToSymbolType() : toSymbolType;
    const normalizedToSymbol = Array.isArray(toSymbol)
        ? [...toSymbol, interfaces_1.SymbolType.Description]
        : [toSymbol, interfaces_1.SymbolType.Description];
    return Object.assign({ symbols: Array.isArray(symbols) ? [...symbols] : symbols.split(','), fromSymbolType, toSymbolType: Array.from(new Set(normalizedToSymbol)) }, restParams);
};
exports.getNormalizedParams = getNormalizedParams;
const prepareFilter = (assetState = interfaces_1.AssetState.Active, assetClass = []) => {
    const assetStateString = assetState === interfaces_1.AssetState.Active ? "AssetState eq 'AC'" : "(AssetState ne 'AC' and AssetState ne null)";
    const assetClasses = Array.isArray(assetClass) ? [...assetClass] : [assetClass];
    const appliedSearchAllCategory = assetClasses.filter(isSupportedSearchAllCategory);
    const appliedRCSAssetCategoryGenealogy = assetClasses.filter(isSupportedRCSAssetCategoryGenealogy);
    if (!appliedSearchAllCategory.length && !appliedRCSAssetCategoryGenealogy.length) {
        return `${assetStateString}`;
    }
    const searchAllCategoryString = appliedSearchAllCategory.length
        ? `SearchAllCategoryv3 in (${appliedSearchAllCategory.map(item => formatSearchItem(exports.SearchAllCategory[item])).join(' ')})`
        : '';
    const rcsAssetCategoryGenealogyString = appliedRCSAssetCategoryGenealogy.length
        ? `RCSAssetCategoryGenealogy in (${appliedRCSAssetCategoryGenealogy
            .map(item => formatSearchItem(exports.RCSAssetCategoryGenealogy[item]))
            .join(' ')})`
        : '';
    const orString = searchAllCategoryString && rcsAssetCategoryGenealogyString ? ' or ' : '';
    return `${assetStateString} and (${searchAllCategoryString}${orString}${rcsAssetCategoryGenealogyString})`;
};
exports.prepareFilter = prepareFilter;
const validateParams = (params) => {
    util_1.validateRequired(params, ['symbols'], 'SymbolConversion.Params');
    const { fromSymbolType, toSymbolType } = params;
    exports.validateFromSymbolType(fromSymbolType);
    if (toSymbolType) {
        exports.validateToSymbolType(toSymbolType);
    }
};
exports.validateParams = validateParams;
const validateFromSymbolType = (fromSymbolType) => {
    if (fromSymbolType === undefined || exports.isSymbolType(fromSymbolType)) {
        return;
    }
    throw new Error('Parameter "fromSymbolType" is invalid.');
};
exports.validateFromSymbolType = validateFromSymbolType;
const validateToSymbolType = (toSymbolType) => {
    const symbolType = Array.isArray(toSymbolType) ? [...toSymbolType] : [toSymbolType];
    const res = symbolType.every(exports.isSymbolType);
    if (!res) {
        throw new Error('Parameter "toSymbolType" is invalid.');
    }
};
exports.validateToSymbolType = validateToSymbolType;
const isSymbolType = (symbolType) => {
    return Object.values(interfaces_1.SymbolType).includes(symbolType);
};
exports.isSymbolType = isSymbolType;
const getDefaultToSymbolType = () => {
    return Object.values(interfaces_1.SymbolType);
};
exports.getDefaultToSymbolType = getDefaultToSymbolType;
const convertParamsToBody = (params) => {
    const { symbols, toSymbolType, fromSymbolType, preferredCountryCode, assetState, assetClass, extendedParams } = params;
    const filter = exports.prepareFilter(assetState, assetClass);
    return Object.assign(Object.assign(Object.assign({ View: fromSymbolType === interfaces_1.SymbolType.Ticker ? Search.View.QuotesAndSTIRs : Search.View.SearchAll, Scope: fromSymbolType || exports.FROM_SYMBOL_TYPES_DEFAULT_VALUE, Terms: symbols.join(','), Select: toSymbolType.join(',') }, (preferredCountryCode && { Boost: `RCSExchangeCountry eq '${preferredCountryCode}'` })), (filter && { Filter: filter })), extendedParams);
};
exports.convertParamsToBody = convertParamsToBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zeW1ib2wtY29udmVyc2lvbi9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFvRDtBQUVwRCx3Q0FBaUQ7QUFDakQsa0RBQW9DO0FBQ3BDLDZDQVNzQjtBQUVULFFBQUEsK0JBQStCLEdBQUcsWUFBWSxDQUFDO0FBRS9DLFFBQUEsTUFBTSxHQUFlLG1CQUFVLENBQUMsSUFBSSxDQUFDO0FBRXJDLFFBQUEsaUJBQWlCLEdBQUc7SUFDN0IsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGFBQWE7SUFDdkMsQ0FBQyx1QkFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsU0FBUztJQUM1QyxDQUFDLHVCQUFVLENBQUMsNEJBQTRCLENBQUMsRUFBRSx1QkFBdUI7SUFDbEUsQ0FBQyx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVU7SUFDakMsQ0FBQyx1QkFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsU0FBUztJQUMxQyxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTztJQUMzQixDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsY0FBYztJQUNsQyxDQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWTtDQUN4QyxDQUFDO0FBRUYsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLEtBQWlCLEVBQXVDLEVBQUU7SUFDNUYsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFZLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBRXZE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