import * as Bond from '../bond';
import { BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention } from '../financial-contracts.models';
import { FinancialInstrumentParams, Outputs, Table, TableRow } from '../financial-contracts.interface';
export { Outputs, BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention, Table, TableRow };
export interface Params extends InstrumentDefinition, FinancialInstrumentParams {
    pricingParameters?: PricingParameters;
}
export interface FinancialInstrument {
    instrumentType: string;
    instrumentDefinition: InstrumentDefinition;
    pricingParameters?: PricingParameters;
}
export interface PricingParameters {
    valuationDate?: string;
    marketDataDate?: string;
    settlementConvention?: string;
    reportCcy?: string;
    couponReinvestmentRatePercent?: number;
    repoCurveType?: RepoCurveType;
}
export declare enum RepoCurveType {
    RepoCurve = "RepoCurve",
    DepositCurve = "DepositCurve",
    LiborFixing = "LiborFixing"
}
export interface InstrumentDefinition {
    underlyingInstruments: RepoUnderlyingContractInstrument[];
    instrumentTag?: string;
    startDate?: string;
    endDate?: string;
    tenor?: string;
    isCouponExchanged?: boolean;
    repoRatePercent?: number;
    dayCountBasis?: DayCountBasisConvention;
}
export interface RepoUnderlyingContractInstrument {
    instrumentType: string;
    instrumentDefinition: Bond.InstrumentDefinition;
    pricingParameters?: RepoUnderlyingPricingParameters;
}
export interface RepoUnderlyingPricingParameters {
    repoParameters?: RepoParameters;
    pricingParametersAtEnd?: Bond.PricingParameters;
    pricingParametersAtStart?: Bond.PricingParameters;
    valuationDate?: string;
}
export interface RepoParameters {
    couponPaidAtHorizon?: boolean;
    haircutRatePercent?: number;
    initialMarginPercent?: number;
}
