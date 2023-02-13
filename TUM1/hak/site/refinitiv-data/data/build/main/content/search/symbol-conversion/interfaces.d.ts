import { CountryCode } from '../../../constants';
import { ExtendedParams } from '../../base-interfaces/extended-params';
export { CountryCode } from '../../../constants';
import { View } from '../search.interface';
export { View } from '../search.interface';
export declare enum SymbolType {
    CUSIP = "CUSIP",
    ISIN = "IssueISIN",
    SEDOL = "SEDOL",
    RIC = "RIC",
    Ticker = "TickerSymbol",
    LipperId = "FundClassLipperID",
    IMO = "IMO",
    OAPermId = "IssuerOAPermID",
    Description = "DocumentTitle"
}
export declare const SearchToSymbolConversion: {
    CUSIP: string;
    IssueISIN: string;
    SEDOL: string;
    RIC: string;
    TickerSymbol: string;
    FundClassLipperID: string;
    IMO: string;
    IssuerOAPermID: string;
    DocumentTitle: string;
};
export declare enum AssetClass {
    Commodities = "Commodities",
    EquityOrIndexOptions = "EquityOrIndexOptions",
    BondAndSTIRFuturesAndOptions = "BondAndSTIRFuturesAndOptions",
    Warrants = "Warrants",
    Equities = "Equities",
    Indices = "Indices",
    EquityIndexFutures = "EquityIndexFutures",
    Funds = "Funds",
    Certificates = "Certificates",
    Bonds = "Bonds",
    ReverseConvertible = "ReverseConvertible",
    MiniFuture = "MiniFuture",
    FXAndMoney = "FXAndMoney"
}
export declare type SupportedSearchAllCategory = AssetClass.Commodities | AssetClass.EquityOrIndexOptions | AssetClass.BondAndSTIRFuturesAndOptions | AssetClass.Equities | AssetClass.EquityIndexFutures | AssetClass.Funds | AssetClass.Bonds | AssetClass.FXAndMoney;
export declare type SupportedRCSAssetCategoryGenealogy = AssetClass.Warrants | AssetClass.Certificates | AssetClass.Indices | AssetClass.ReverseConvertible | AssetClass.MiniFuture;
export declare enum AssetState {
    Active = "Active",
    Inactive = "Inactive"
}
export declare type Table = {
    [index in string]: any;
};
export interface Params extends ExtendedParams {
    symbols: string | string[];
    fromSymbolType?: SymbolType;
    toSymbolType?: SymbolType | SymbolType[];
    preferredCountryCode?: CountryCode;
    assetClass?: AssetClass | AssetClass[];
    assetState?: AssetState;
}
export interface NormalizedParams extends ExtendedParams {
    symbols: string[];
    toSymbolType: SymbolType[];
    fromSymbolType?: SymbolType;
    preferredCountryCode?: CountryCode;
    assetClass?: AssetClass | AssetClass[];
    assetState?: AssetState;
}
export interface Content {
    View: View;
    Scope: string;
    Terms: string;
    Select: string;
    Boost?: string;
    Filter?: string;
}
