export { PriceSide } from '../ipa-common-models';
export declare enum LayoutFormat {
    Matrix = "Matrix",
    List = "List",
    NDimensionalArray = "NDimensionalArray"
}
export declare enum AxisUnit {
    Date = "Date",
    Strike = "Strike",
    Tenor = "Tenor",
    Delta = "Delta",
    Moneyness = "Moneyness",
    Expiry = "Expiry"
}
export declare enum InputVolatilityType {
    Default = "Default",
    LogNormalVolatility = "LogNormalVolatility",
    NormalizedVolatility = "NormalizedVolatility"
}
export declare enum TimeStampSelectionType {
    Default = "Default",
    Open = "Open",
    Close = "Close",
    Settle = "Settle"
}
export declare enum DiscountingType {
    OisDiscounting = "OisDiscounting",
    LiborDiscounting = "LiborDiscounting "
}
export declare enum VolatilityAdjustmentType {
    PbUndefined = "PbUndefined",
    ConstantCaplet = "ConstantCaplet",
    NormalizedCaplet = "NormalizedCaplet",
    ConstantCap = "ConstantCap",
    NormalizedCap = "NormalizedCap",
    ShiftedCap = "ShiftedCap"
}
export declare enum Outputs {
    Headers = "Headers",
    DataType = "DataType",
    Data = "Data",
    Statuses = "Statuses",
    ForwardCurve = "ForwardCurve",
    CalibrationParameters = "CalibrationParameters",
    Constituents = "Constituents",
    Dividends = "Dividends",
    InterestRateCurve = "InterestRateCurve",
    GoodnessOfFit = "GoodnessOfFit",
    UnderlyingSpot = "UnderlyingSpot",
    DiscountCurve = "DiscountCurve",
    Description = "Description",
    MoneynessStrike = "MoneynessStrike"
}
