import { BuySell, CallPut, ExerciseStyle, FxSwapCalculationMethod, PriceSide } from '../financial-contracts.models';
export { BuySell, CallPut, ExerciseStyle, FxSwapCalculationMethod, PriceSide } from '../financial-contracts.models';
import { FinancialInstrumentParams, Outputs } from '../financial-contracts.interface';
export { Outputs };
export interface Params extends InstrumentDefinition, FinancialInstrumentParams {
    pricingParameters?: PricingParameters;
}
export interface FinancialInstrument {
    instrumentType: string;
    instrumentDefinition: InstrumentDefinition;
    pricingParameters?: PricingParameters;
}
export interface InstrumentDefinition {
    instrumentCode?: string;
    instrumentTag?: string;
    strike?: number;
    buySell?: BuySell;
    callPut?: CallPut;
    exerciseStyle?: ExerciseStyle;
    endDate?: string;
    underlyingType: UnderlyingType;
    underlyingDefinition?: EtiUnderlyingDefinition | FxUnderlyingDefinition;
    barrierDefinition?: EtiOptionBarrierDefinition | FxOptionBarrierDefinition;
    doubleBarriersDefinition?: FxOptionDoubleBarriersDefinition;
    binaryDefinition?: EtiOptionBinaryDefinition | FxOptionBinaryDefinition;
    doubleBinaryDefinition?: FxOptionDoubleBinaryDefinition;
    cBBCDefinition?: EtiOptionCBBCDefinition;
    lotSize?: number;
    dealContract?: number;
    tenor?: string;
    deliveryDate?: string;
    notionalAmount?: number;
    notionalCcy?: string;
    dualCurrencyDefinition?: FxDualCurrencyDefinition;
}
export interface PricingParameters {
    valuationDate?: string;
    marketDataDate?: string;
    reportCcy?: string;
    marketValueInDealCcy?: number;
    pricingModelType?: PricingModelType;
    dividendType?: DividendType;
    dividendYieldPercent?: number;
    volatilityPercent?: number;
    riskFreeRatePercent?: number;
    underlyingPrice?: number;
    volatilityType?: VolatilityType;
    optionPriceSide?: PriceSide;
    optionTimeStamp?: TimeStamp;
    underlyingPriceSide?: PriceSide;
    underlyingTimeStamp?: TimeStamp;
    priceSide?: PriceSide;
    volatilityModel?: VolatilityModel;
    fxSwapCalculationMethod?: FxSwapCalculationMethod;
    fxSpotObject?: BidAskMid;
    atmVolatilityObject?: BidAskMid;
    riskReversal10DObject?: BidAskMid;
    riskReversal25DObject?: BidAskMid;
    butterfly10DObject?: BidAskMid;
    forwardPointsObject?: BidAskMid;
    foreignDepositRatePercentObject?: BidAskMid;
    domesticDepositRatePercentObject?: BidAskMid;
    impliedVolatilityObject?: BidAskMid;
    cutoffTimeZone?: TimeZone;
    cutoffTime?: string;
}
export declare enum VolatilityModel {
    SABR = "SABR",
    CubicSpline = "CubicSpline",
    SVI = "SVI",
    TwinLognormal = "TwinLognormal",
    VannaVolga = "VannaVolga"
}
export declare enum TimeStamp {
    Open = "Open",
    Close = "Close",
    Default = "Default"
}
export declare enum VolatilityType {
    Implied = "Implied",
    SVISurface = "SVISurface"
}
export declare enum DividendType {
    None = "None",
    ForecastTable = "ForecastTable",
    HistoricalYield = "HistoricalYield",
    ForecastYield = "ForecastYield",
    ImpliedYield = "ImpliedYield",
    ImpliedTable = "ImpliedTable"
}
export declare enum PricingModelType {
    BlackScholes = "BlackScholes",
    Whaley = "Whaley",
    Binomial = "Binomial",
    Trinomial = "Trinomial",
    VannaVolga = "VannaVolga"
}
export declare enum UnderlyingType {
    Eti = "Eti",
    Fx = "Fx"
}
export interface FxUnderlyingDefinition {
    fxCrossCode: string;
}
export interface EtiUnderlyingDefinition {
    instrumentCode: string;
}
export declare enum UpOrDown {
    Up = "Up",
    Down = "Down"
}
export declare enum InOrOut {
    In = "In",
    Out = "Out"
}
export declare enum BarrierMode {
    European = "European",
    American = "American",
    ForwardStartWindow = "ForwardStartWindow",
    EarlyEndWindow = "EarlyEndWindow"
}
export interface EtiOptionBarrierDefinition {
    upOrDown?: UpOrDown;
    level: number;
    inOrOut?: InOrOut;
}
export interface FxOptionBarrierDefinition {
    barrierMode?: BarrierMode;
    upOrDown?: UpOrDown;
    level: number;
    inOrOut?: InOrOut;
    windowStartDate?: string;
    windowEndDate?: string;
    rebateAmount?: number;
}
export interface FxOptionDoubleBarriersDefinition {
    barrierMode?: BarrierMode;
    barrierUp: DoubleBarrierInfo;
    barrierDown: DoubleBarrierInfo;
}
export interface DoubleBarrierInfo {
    level: number;
    rebateAmount?: number;
    inOrOut?: InOrOut;
}
export declare enum BinaryType {
    OneTouch = "OneTouch",
    NoTouch = "NoTouch",
    Digital = "Digital",
    OneTouchImmediate = "OneTouchImmediate",
    OneTouchDeferred = "OneTouchDeferred"
}
export declare enum DoubleBinaryType {
    DoubleNoTouch = "DoubleNoTouch"
}
export declare enum SettlementType {
    Cash = "Cash",
    Asset = "Asset"
}
export interface EtiOptionBinaryDefinition {
    binaryType: BinaryType;
    level: number;
    upOrDown?: UpOrDown;
    notionalAmount?: number;
}
export interface FxOptionBinaryDefinition {
    binaryType: BinaryType;
    settlementType?: SettlementType;
    trigger: number;
    payoutAmount?: number;
    payoutCcy?: string;
}
export interface FxOptionDoubleBinaryDefinition {
    doublebinaryType: DoubleBinaryType;
    settlementType?: SettlementType;
    triggerUp: number;
    triggerDown: number;
    payoutAmount?: number;
    payoutCcy?: string;
}
export interface EtiOptionCBBCDefinition {
    level: number;
    conversionRatio?: number;
}
export interface FxDualCurrencyDefinition {
    depositStartDate?: string;
    marginPercent?: number;
}
export interface BidAskMid {
    bid: number;
    ask: number;
    mid: number;
}
export declare enum TimeZone {
    BJS = "BJS",
    BKK = "BKK",
    BOM = "BOM",
    BUD = "BUD",
    FFT = "FFT",
    HKG = "HKG",
    KUL = "KUL",
    LON = "LON",
    MNL = "MNL",
    NYC = "NYC",
    SAO = "SAO",
    SEL = "SEL",
    SIN = "SIN",
    TPE = "TPE",
    TOK = "TOK",
    WAW = "WAW",
    GMT = "GMT"
}
