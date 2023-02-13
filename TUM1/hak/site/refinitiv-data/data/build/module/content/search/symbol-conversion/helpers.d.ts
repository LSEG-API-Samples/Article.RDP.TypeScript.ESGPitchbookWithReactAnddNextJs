import { HttpMethod } from '@refinitiv-data/common';
import { AssetClass, AssetState, Content, NormalizedParams, Params, SymbolType } from './interfaces';
export declare const FROM_SYMBOL_TYPES_DEFAULT_VALUE = "_AllUnique";
export declare const method: HttpMethod;
export declare const SearchAllCategory: {
    Commodities: string;
    EquityOrIndexOptions: string;
    BondAndSTIRFuturesAndOptions: string;
    Equities: string;
    EquityIndexFutures: string;
    Funds: string;
    Bonds: string;
    FXAndMoney: string;
};
export declare const RCSAssetCategoryGenealogy: {
    Warrants: string;
    Certificates: string;
    Indices: string;
    ReverseConvertible: string;
    MiniFuture: string;
};
export declare const getNormalizedParams: (params: Params) => NormalizedParams;
export declare const prepareFilter: (assetState?: AssetState, assetClass?: AssetClass | AssetClass[]) => string;
export declare const validateParams: (params: Params) => void;
export declare const validateFromSymbolType: (fromSymbolType?: SymbolType | undefined) => void;
export declare const validateToSymbolType: (toSymbolType: SymbolType | SymbolType[]) => void;
export declare const isSymbolType: (symbolType: SymbolType) => boolean;
export declare const getDefaultToSymbolType: () => SymbolType[];
export declare const convertParamsToBody: (params: NormalizedParams) => Content;
