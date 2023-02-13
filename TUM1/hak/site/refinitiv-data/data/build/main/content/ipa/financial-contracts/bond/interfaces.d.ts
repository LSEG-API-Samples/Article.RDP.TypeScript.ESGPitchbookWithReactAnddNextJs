import { BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention, PriceSide } from '../financial-contracts.models';
export { BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention, PriceSide } from '../financial-contracts.models';
import { FinancialInstrumentParams, Outputs } from '../financial-contracts.interface';
export { Outputs };
export interface Params extends InstrumentDefinition, FinancialInstrumentParams {
    pricingParameters?: PricingParameters;
}
export interface InstrumentDefinition {
    instrumentCode: string;
    instrumentTag?: string;
    notionalAmount?: number;
    fixedRatePercent?: number;
    issueDate?: string;
    endDate?: string;
    notionalCcy?: string;
    interestPaymentFrequency?: string;
    interestCalculationMethod?: DayCountBasisConvention;
    accruedCalculationMethod?: DayCountBasisConvention;
    paymentBusinessDayConvention?: BusinessDayConvention;
    paymentRollConvention?: PaymentRollConvention;
}
export interface PricingParameters {
    valuationDate?: string;
    marketDataDate?: string;
    settlementConvention?: string;
    reportCcy?: string;
    priceSide?: PriceSide;
    redemptionDateType?: RedemptionDateType;
    redemptionDate?: string;
    yieldType?: YieldType;
    taxOnIncomeGainPercent?: number;
    taxOnCapitalGainPercent?: number;
    taxOnYieldPercent?: number;
    taxOnPricePercent?: number;
    concessionFee?: number;
    benchmarkYieldSelectionMode?: BenchmarkYieldSelectionMode;
    price?: number;
    yieldPercent?: number;
    cleanPrice?: number;
    dirtyPrice?: number;
    netPrice?: number;
    cashAmount?: number;
    discountMarginBp?: number;
    simpleMarginBp?: number;
    neutralYieldPercent?: number;
    currentYieldPercent?: number;
    stripYieldPercent?: number;
    discountPercent?: number;
    zSpreadBp?: number;
    assetSwapSpreadBp?: number;
    optionAdjustedSpreadBp?: number;
    swapSpreadBp?: number;
    swapYieldPercent?: number;
    governmentSpreadBp?: number;
    governmentBenchmarkCurveYieldPercent?: number;
    govCountrySpreadBp?: number;
    govCountryBenchmarkCurveYieldPercent?: number;
    ratingSpreadBp?: number;
    ratingBenchmarkCurveYieldPercent?: number;
    sectorRatingSpreadBp?: number;
    sectorRatingBenchmarkCurveYieldPercent?: number;
    edsfSpreadBp?: number;
    edsfBenchmarkCurveYieldPercent?: number;
    issuerSpreadBp?: number;
    issuerBenchmarkCurveYieldPercent?: number;
    projectedIndexPercent?: number;
    iborRatePercent?: number;
    iborSpotLag?: string;
    marketValueFeesInDealCcy?: number;
    marketValueInDealCcy?: number;
    marketValueInReportCcy?: number;
    projectedIndexCalculationMethod?: ProjectedIndexCalculationMethod;
    computeCashFlowFromIssueDate?: boolean;
    roundingParameters?: RoundingParameters;
    computeCashFlowWithReportCcy?: boolean;
}
export interface FinancialInstrument {
    instrumentType: string;
    instrumentDefinition: InstrumentDefinition;
    pricingParameters?: PricingParameters;
}
export declare enum RedemptionDateType {
    RedemptionAtMaturityDate = "RedemptionAtMaturityDate",
    RedemptionAtCallDate = "RedemptionAtCallDate",
    RedemptionAtPutDate = "RedemptionAtPutDate",
    RedemptionAtWorstDate = "RedemptionAtWorstDate",
    RedemptionAtBestDate = "RedemptionAtBestDate",
    RedemptionAtSinkDate = "RedemptionAtSinkDate",
    RedemptionAtParDate = "RedemptionAtParDate",
    RedemptionAtPremiumDate = "RedemptionAtPremiumDate",
    RedemptionAtMakeWholeCallDate = "RedemptionAtMakeWholeCallDate",
    RedemptionAtCustomDate = "RedemptionAtCustomDate"
}
export declare enum YieldType {
    Native = "Native",
    UsGovt = "UsGovt",
    UsTBills = "UsTBills",
    Isma = "Isma",
    Euroland = "Euroland",
    Discount_Actual_360 = "Discount_Actual_360",
    Discount_Actual_365 = "Discount_Actual_365",
    MoneyMarket_Actual_360 = "MoneyMarket_Actual_360",
    MoneyMarket_Actual_365 = "MoneyMarket_Actual_365",
    MoneyMarket_Actual_Actual = "MoneyMarket_Actual_Actual",
    Bond_Actual_364 = "Bond_Actual_364",
    Japanese_Simple = "Japanese_Simple",
    Japanese_Compounded = "Japanese_Compounded",
    Moosmueller = "Moosmueller",
    Braess_Fangmeyer = "Braess_Fangmeyer",
    Weekend = "Weekend",
    TurkishCompounded = "TurkishCompounded"
}
export declare enum BenchmarkYieldSelectionMode {
    Nearest = "Nearest",
    Interpolate = "Interpolate"
}
export declare enum ProjectedIndexCalculationMethod {
    ConstantIndex = "ConstantIndex",
    ForwardIndex = "ForwardIndex"
}
export declare enum Rounding {
    Zero = "Zero",
    One = "One",
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
    Six = "Six",
    Seven = "Seven",
    Eight = "Eight",
    Default = "Default",
    Unrounded = "Unrounded"
}
export declare enum RoundingType {
    Default = "Default",
    Near = "Near",
    Up = "Up",
    Down = "Down",
    Floor = "Floor",
    Ceil = "Ceil"
}
export interface RoundingParameters {
    accruedRounding?: Rounding;
    accruedRoundingType?: RoundingType;
    priceRounding?: Rounding;
    priceRoundingType?: RoundingType;
    yieldRounding?: Rounding;
    yieldRoundingType?: RoundingType;
}
