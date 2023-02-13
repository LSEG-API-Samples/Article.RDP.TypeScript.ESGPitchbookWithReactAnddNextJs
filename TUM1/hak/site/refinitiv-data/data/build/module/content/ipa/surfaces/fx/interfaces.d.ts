import { BaseItemParams, BaseRequestItem, InstrumentParams } from '../surfaces.interface';
import { AxisUnit, PriceSide, TimeStampSelectionType } from '../surfaces.models';
export * from '../surfaces.models';
export * from '../surfaces.interface';
export interface Params extends BaseItemParams<CalculationParams>, SurfaceDefinition, InstrumentParams {
}
export interface RequestItem extends BaseRequestItem {
    underlyingDefinition?: SurfaceDefinition;
    surfaceParameters?: CalculationParams;
}
export interface SurfaceDefinition {
    fxCrossCode: string;
}
export declare enum SwapCalculationMethod {
    FxSwap = "FxSwap",
    FxSwapImpliedFromDeposit = "FxSwapImpliedFromDeposit",
    DepositCcy1ImpliedFromFxSwap = "DepositCcy1ImpliedFromFxSwap",
    DepositCcy2ImpliedFromFxSwap = "DepositCcy2ImpliedFromFxSwap"
}
export declare enum VolatilityModel {
    SVI = "SVI",
    SABR = "SABR",
    CubicSpline = "CubicSpline",
    TwinLognormal = "TwinLognormal"
}
export interface BidAskMid {
    ask: number;
    bid: number;
    mid: number;
}
export interface DayWeight {
    date: string;
    weight: number;
}
export interface InterpolationWeight {
    dayList: DayWeight[];
    holidays: number;
    weekDays: number;
    weekEnds: number;
}
export interface CalculationParams {
    xAxis: AxisUnit;
    yAxis: AxisUnit;
    atmVolatilityObject?: BidAskMid;
    butterfly10DObject?: BidAskMid;
    butterfly25DObject?: BidAskMid;
    calculationDate?: string;
    domesticDepositRatePercentObject?: BidAskMid;
    foreignDepositRatePercentObject?: BidAskMid;
    forwardPointsObject?: BidAskMid;
    fxSpotObject?: BidAskMid;
    fxSwapCalculationMethod?: SwapCalculationMethod;
    impliedVolatilityObject?: BidAskMid;
    interpolationWeight?: InterpolationWeight;
    priceSide?: PriceSide;
    riskReversal10DObject?: BidAskMid;
    riskReversal25DObject?: BidAskMid;
    timeStamp?: TimeStampSelectionType;
    volatilityModel?: VolatilityModel;
    returnAtm?: boolean;
}
