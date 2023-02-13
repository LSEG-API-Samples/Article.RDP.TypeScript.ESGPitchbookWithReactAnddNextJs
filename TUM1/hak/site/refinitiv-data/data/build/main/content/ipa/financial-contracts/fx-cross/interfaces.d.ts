import { BuySell, FxSwapCalculationMethod, PriceSide } from '../financial-contracts.models';
export { BuySell, FxSwapCalculationMethod, PriceSide } from '../financial-contracts.models';
import { FinancialInstrumentParams, Outputs, Table, TableRow } from '../financial-contracts.interface';
export { Outputs, Table, TableRow };
export interface Params extends InstrumentDefinition, FinancialInstrumentParams {
    pricingParameters?: PricingParameters;
}
export interface FinancialInstrument {
    instrumentType: string;
    instrumentDefinition: InstrumentDefinition;
    pricingParameters?: PricingParameters;
}
export interface InstrumentDefinition {
    instrumentTag?: string;
    fxCrossCode: string;
    fxCrossType: FxCrossType;
    tradedCrossRate?: number;
    tradedSwapPoints?: number;
    referenceSpotRate?: number;
    referenceSwapPoints?: number;
    ndfFixingSettlementCcy?: string;
    legs?: FxCrossLegDefinition[];
}
export interface PricingParameters {
    valuationDate?: string;
    marketDataDate?: string;
    reportCcy?: string;
    ignoreRefCcyHolidays?: boolean;
    fxSwapCalculationMethod?: FxSwapCalculationMethod;
    priceSide?: PriceSide;
}
export declare enum FxCrossType {
    FxSpot = "FxSpot",
    FxForward = "FxForward",
    FxNonDeliverableForward = "FxNonDeliverableForward",
    FxSwap = "FxSwap",
    FxForwardForward = "FxForwardForward"
}
export interface FxCrossLegDefinition {
    legTag?: string;
    fxLegType?: FxCrossLegType;
    dealCcy?: string;
    dealCcyBuySell?: BuySell;
    dealAmount?: number;
    contraAmount?: number;
    contraCcy?: string;
    endDate?: string;
    tenor?: string;
}
export declare enum FxCrossLegType {
    FxSpot = "FxSpot",
    FxForward = "FxForward",
    FxNonDeliverableForward = "FxNonDeliverableForward",
    SwapNear = "SwapNear",
    SwapFar = "SwapFar"
}
