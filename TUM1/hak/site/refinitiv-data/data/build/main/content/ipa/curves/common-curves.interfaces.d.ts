export declare enum MainConstituentAssetClass {
    Swap = "Swap",
    Futures = "Futures"
}
export declare enum RiskType {
    InterestRate = "InterestRate"
}
export declare enum CalendarAdjustment {
    Weekend = "Weekend",
    Calendar = "Calendar"
}
export declare enum ExtrapolationMode {
    None = "None",
    Constant = "Constant",
    Linear = "Linear"
}
export declare enum InterpolationMode {
    CubicDiscount = "CubicDiscount",
    CubicRate = "CubicRate",
    CubicSpline = "CubicSpline",
    Linear = "Linear",
    Log = "Log",
    ForwardMonotoneConvex = "ForwardMonotoneConvex"
}
export interface Step {
    date: string;
    ratePercent: number;
}
export interface Turn {
    month: number;
    ratePercent: number;
    year: number;
}
export interface ZcCurveDefinition {
    currency?: string;
    discountingTenor?: string;
    id?: string;
    indexName?: string;
    mainConstituentAssetClass?: MainConstituentAssetClass;
    name?: string;
    riskType?: RiskType;
    source?: string;
}
export interface ConvexityAdjustment {
    meanReversionPercent?: number;
    volatilityPercent?: number;
}
