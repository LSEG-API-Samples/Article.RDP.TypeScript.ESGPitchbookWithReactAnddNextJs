"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetState = exports.AssetClass = exports.SearchToSymbolConversion = exports.SymbolType = exports.View = exports.CountryCode = void 0;
var constants_1 = require("../../../constants");
Object.defineProperty(exports, "CountryCode", { enumerable: true, get: function () { return constants_1.CountryCode; } });
var search_interface_1 = require("../search.interface");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return search_interface_1.View; } });
var SymbolType;
(function (SymbolType) {
    SymbolType["CUSIP"] = "CUSIP";
    SymbolType["ISIN"] = "IssueISIN";
    SymbolType["SEDOL"] = "SEDOL";
    SymbolType["RIC"] = "RIC";
    SymbolType["Ticker"] = "TickerSymbol";
    SymbolType["LipperId"] = "FundClassLipperID";
    SymbolType["IMO"] = "IMO";
    SymbolType["OAPermId"] = "IssuerOAPermID";
    SymbolType["Description"] = "DocumentTitle";
})(SymbolType = exports.SymbolType || (exports.SymbolType = {}));
exports.SearchToSymbolConversion = {
    CUSIP: 'CUSIP',
    IssueISIN: 'ISIN',
    SEDOL: 'SEDOL',
    RIC: 'RIC',
    TickerSymbol: 'Ticker',
    FundClassLipperID: 'LipperId',
    IMO: 'IMO',
    IssuerOAPermID: 'OAPermId',
    DocumentTitle: 'Description',
};
var AssetClass;
(function (AssetClass) {
    AssetClass["Commodities"] = "Commodities";
    AssetClass["EquityOrIndexOptions"] = "EquityOrIndexOptions";
    AssetClass["BondAndSTIRFuturesAndOptions"] = "BondAndSTIRFuturesAndOptions";
    AssetClass["Warrants"] = "Warrants";
    AssetClass["Equities"] = "Equities";
    AssetClass["Indices"] = "Indices";
    AssetClass["EquityIndexFutures"] = "EquityIndexFutures";
    AssetClass["Funds"] = "Funds";
    AssetClass["Certificates"] = "Certificates";
    AssetClass["Bonds"] = "Bonds";
    AssetClass["ReverseConvertible"] = "ReverseConvertible";
    AssetClass["MiniFuture"] = "MiniFuture";
    AssetClass["FXAndMoney"] = "FXAndMoney";
})(AssetClass = exports.AssetClass || (exports.AssetClass = {}));
var AssetState;
(function (AssetState) {
    AssetState["Active"] = "Active";
    AssetState["Inactive"] = "Inactive";
})(AssetState = exports.AssetState || (exports.AssetState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3NlYXJjaC9zeW1ib2wtY29udmVyc2lvbi9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGdEQUFpRDtBQUF4Qyx3R0FBQSxXQUFXLE9BQUE7QUFFcEIsd0RBQTJDO0FBQWxDLHdHQUFBLElBQUksT0FBQTtBQUViLElBQVksVUFVWDtBQVZELFdBQVksVUFBVTtJQUNsQiw2QkFBZSxDQUFBO0lBQ2YsZ0NBQWtCLENBQUE7SUFDbEIsNkJBQWUsQ0FBQTtJQUNmLHlCQUFXLENBQUE7SUFDWCxxQ0FBdUIsQ0FBQTtJQUN2Qiw0Q0FBOEIsQ0FBQTtJQUM5Qix5QkFBVyxDQUFBO0lBQ1gseUNBQTJCLENBQUE7SUFDM0IsMkNBQTZCLENBQUE7QUFDakMsQ0FBQyxFQVZXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBVXJCO0FBRVksUUFBQSx3QkFBd0IsR0FBRztJQUNwQyxLQUFLLEVBQUUsT0FBTztJQUNkLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLEtBQUssRUFBRSxPQUFPO0lBQ2QsR0FBRyxFQUFFLEtBQUs7SUFDVixZQUFZLEVBQUUsUUFBUTtJQUN0QixpQkFBaUIsRUFBRSxVQUFVO0lBQzdCLEdBQUcsRUFBRSxLQUFLO0lBQ1YsY0FBYyxFQUFFLFVBQVU7SUFDMUIsYUFBYSxFQUFFLGFBQWE7Q0FDL0IsQ0FBQztBQUVGLElBQVksVUFjWDtBQWRELFdBQVksVUFBVTtJQUNsQix5Q0FBMkIsQ0FBQTtJQUMzQiwyREFBNkMsQ0FBQTtJQUM3QywyRUFBNkQsQ0FBQTtJQUM3RCxtQ0FBcUIsQ0FBQTtJQUNyQixtQ0FBcUIsQ0FBQTtJQUNyQixpQ0FBbUIsQ0FBQTtJQUNuQix1REFBeUMsQ0FBQTtJQUN6Qyw2QkFBZSxDQUFBO0lBQ2YsMkNBQTZCLENBQUE7SUFDN0IsNkJBQWUsQ0FBQTtJQUNmLHVEQUF5QyxDQUFBO0lBQ3pDLHVDQUF5QixDQUFBO0lBQ3pCLHVDQUF5QixDQUFBO0FBQzdCLENBQUMsRUFkVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQWNyQjtBQW1CRCxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDekIsQ0FBQyxFQUhXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBR3JCIn0=