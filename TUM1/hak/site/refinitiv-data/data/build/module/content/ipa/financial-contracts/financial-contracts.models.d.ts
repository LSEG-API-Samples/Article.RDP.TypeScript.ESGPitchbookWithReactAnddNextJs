import { DayCountBasisConvention } from '../ipa-common-models';
export { DayCountBasisConvention, PriceSide } from '../ipa-common-models';
export declare enum PaymentRollConvention {
    Last = "Last",
    Same = "Same",
    Last28 = "Last28",
    Same28 = "Same28"
}
export declare enum Direction {
    Paid = "Paid",
    Received = "Received"
}
export declare enum PaymentFrequency {
    Annual = "Annual",
    SemiAnnual = "SemiAnnual",
    Quarterly = "Quarterly",
    Monthly = "Monthly",
    BiMonthly = "BiMonthly",
    Everyday = "Everyday",
    Every7Days = "Every7Days",
    Every14Days = "Every14Days",
    Every28Days = "Every28Days",
    Every30Days = "Every30Days",
    Every91Days = "Every91Days",
    Every182Days = "Every182Days",
    Every364Days = "Every364Days",
    Every365Days = "Every365Days",
    Every90Days = "Every90Days",
    Every92Days = "Every92Days",
    Every93Days = "Every93Days",
    Every180Days = "Every180Days",
    Every183Days = "Every183Days",
    Every184Days = "Every184Days",
    Every4Months = "Every4Months",
    R2 = "R2",
    R4 = "R4",
    Zero = "Zero"
}
export declare enum StubRule {
    Issue = "Issue",
    Maturity = "Maturity",
    ShortFirstProRata = "ShortFirstProRata",
    ShortFirstFull = "ShortFirstFull",
    LongFirstFull = "LongFirstFull",
    ShortLastProRata = "ShortLastProRata"
}
export interface SwapLegDefinition {
    legTag?: string;
    direction: Direction;
    interestType: InterestType;
    notionalCcy: string;
    notionalAmount?: number;
    fixedRatePercent?: number;
    indexName?: string;
    indexTenor?: string;
    indexFixingRIC?: string;
    spreadBp?: number;
    interestPaymentFrequency: PaymentFrequency;
    interestCalculationMethod: DayCountBasisConvention;
    accruedCalculationMethod?: DayCountBasisConvention;
    paymentBusinessDayConvention?: BusinessDayConvention;
    paymentRollConvention?: PaymentRollConvention;
    indexResetFrequency?: ResetFrequency;
    indexResetType?: ResetType;
    indexFixingLag?: number;
    firstRegularPaymentDate?: string;
    lastRegularPaymentDate?: string;
    amortizationSchedule?: any;
    paymentBusinessDays?: string;
    notionalExchange?: NotionalExchange;
    adjustInterestToPaymentDate?: AdjustInterest;
    indexCompoundingMethod?: IndexCalculationMethod;
    interestPaymentDelay?: number;
    stubRule?: StubRule;
}
export declare enum InterestType {
    Fixed = "Fixed",
    Float = "Float"
}
export declare enum ResetFrequency {
    Annual = "Annual",
    SemiAnnual = "SemiAnnual",
    Quarterly = "Quarterly",
    Monthly = "Monthly",
    BiMonthly = "BiMonthly",
    Zero = "Zero",
    Everyday = "Everyday",
    Every7Days = "Every7Days",
    Every14Days = "Every14Days",
    Every28Days = "Every28Days",
    Every91Days = "Every91Days",
    Every182Days = "Every182Days",
    Every364Days = "Every364Days"
}
export declare enum ResetType {
    InAdvance = "InAdvance",
    InArrears = "InArrears"
}
export declare enum NotionalExchange {
    None = "None",
    Start = "Start",
    End = "End",
    Both = "Both",
    EndAdjustment = "EndAdjustment"
}
export declare enum IndexCalculationMethod {
    Compounded = "Compounded",
    Average = "Average",
    Constant = "Constant",
    AdjustedCompounded = "AdjustedCompounded",
    MexicanCompounded = "MexicanCompounded"
}
export declare enum AdjustInterest {
    Unadjusted = "Unadjusted",
    Adjusted = "Adjusted"
}
export declare enum BusinessDayConvention {
    PreviousBusinessDay = "PreviousBusinessDay",
    NextBusinessDay = "NextBusinessDay",
    ModifiedFollowing = "ModifiedFollowing",
    NoMoving = "NoMoving",
    BBSWModifiedFollowing = "BBSWModifiedFollowing"
}
export declare enum BuySell {
    Buy = "Buy",
    Sell = "Sell"
}
export declare enum FxSwapCalculationMethod {
    FxSwap = "FxSwap",
    DepositCcy1ImpliedFromFxSwap = "DepositCcy1ImpliedFromFxSwap",
    DepositCcy2ImpliedFromFxSwap = "DepositCcy2ImpliedFromFxSwap",
    FxSwapImpliedFromDeposit = "FxSwapImpliedFromDeposit"
}
export declare enum CallPut {
    Call = "Call",
    Put = "Put"
}
export declare enum ExerciseStyle {
    Euro = "EURO",
    Amer = "AMER",
    Berm = "BERM "
}
