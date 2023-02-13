import { BaseItemParams, BaseRequestItem, InstrumentParams } from '../surfaces.interface';
import { AxisUnit, LayoutFormat, Outputs, PriceSide, TimeStampSelectionType } from '../surfaces.models';
export { AxisUnit, LayoutFormat, Outputs, PriceSide, TimeStampSelectionType };
export * from '../surfaces.interface';
export interface Params extends BaseItemParams<CalculationParams>, SurfaceDefinition, InstrumentParams {
}
export interface RequestItem extends BaseRequestItem {
    underlyingDefinition: SurfaceDefinition;
    surfaceParameters?: CalculationParams;
}
export interface SurfaceDefinition {
    instrumentCode?: string;
    cleanInstrumentCode?: string;
    exchange?: string;
    isFutureUnderlying?: boolean;
}
export declare enum InputVolatilityType {
    Implied = "Implied",
    Settle = "Settle",
    Quoted = "Quoted"
}
export declare enum MoneynessType {
    Spot = "Spot",
    Fwd = "Fwd",
    Sigma = "Sigma"
}
export declare enum VolatilityModel {
    SVI = "SVI",
    SSVI = "SSVI"
}
export interface MoneynessWeight {
    maxMoneyness: number;
    minMoneyness: number;
    weight: number;
}
export interface MaturityFilter {
    maxMaturity?: string;
    minMaturity?: string;
    minOfMedianNbOfStrikesPercent?: number;
}
export interface StrikeFilter {
    maxOfMedianImpliedVol: number;
    minOfMedianImpliedVol: number;
}
export interface SurfaceFilters {
    atmToleranceIntervalPercent?: number;
    ensurePricesMonotonicity?: boolean;
    maturityFilterRange?: MaturityFilter;
    strikeRangePercent?: StrikeFilter;
    useOnlyCalls?: boolean;
    useOnlyPuts?: boolean;
    useWeeklyOptions?: boolean;
}
export interface CalculationParams {
    xAxis: AxisUnit;
    yAxis: AxisUnit;
    calculationDate?: string;
    filters?: SurfaceFilters;
    inputVolatilityType?: InputVolatilityType;
    moneynessType?: MoneynessType;
    priceSide?: PriceSide;
    timeStamp?: TimeStampSelectionType;
    volatilityModel?: VolatilityModel;
    weights?: MoneynessWeight[];
}
