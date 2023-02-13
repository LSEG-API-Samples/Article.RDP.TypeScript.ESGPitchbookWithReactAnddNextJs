import { BusinessDayConvention, DayCountBasisConvention, Direction, PaymentFrequency, StubRule } from '../financial-contracts.models';
export { BusinessDayConvention, DayCountBasisConvention, Direction, PaymentFrequency, StubRule } from '../financial-contracts.models';
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
    instrumentCode?: string;
    cdsConvention?: CDSConvention;
    tradeDate?: string;
    stepInDate?: string;
    startDate?: string;
    endDate?: string;
    tenor?: string;
    startDateMovingConvention?: BusinessDayConvention;
    endDateMovingConvention?: BusinessDayConvention;
    adjustToIsdaEndDate?: boolean;
    protectionLeg?: ProtectionLegDefinition;
    premiumLeg?: PremiumLegDefinition;
    accruedBeginDate: string;
}
export interface PricingParameters {
    cashAmountInDealCcy?: number;
    cleanPricePercent?: number;
    conventionalSpreadBp?: number;
    upfrontAmountInDealCcy?: number;
    upfrontPercent?: number;
    valuationDate?: string;
    marketDataDate?: string;
    reportCcy?: string;
}
export declare enum CDSConvention {
    ISDA = "ISDA",
    UserDefined = "User-defined"
}
export declare enum Seniority {
    Secured = "Secured",
    SeniorUnsecured = "SeniorUnsecured",
    Subordinated = "Subordinated",
    JuniorSubordinated = "JuniorSubordinated",
    Preference = "Preference",
    None = "None"
}
export declare enum DocClause {
    CumRestruct14 = "CumRestruct14",
    ModifiedRestruct14 = "ModifiedRestruct14",
    ModModRestruct14 = "ModModRestruct14",
    ExRestruct14 = "ExRestruct14",
    CumRestruct03 = "CumRestruct03",
    ModifiedRestruct03 = "ModifiedRestruct03",
    ModModRestruct03 = "ModModRestruct03",
    ExRestruct03 = "ExRestruct03",
    None = "None"
}
export interface PremiumLegDefinition {
    accruedCalculationMethod?: DayCountBasisConvention;
    accruedPaidOnDefault?: boolean;
    direction: Direction;
    firstRegularPaymentDate?: string;
    fixedRatePercent?: number;
    interestCalculationMethod: DayCountBasisConvention;
    interestPaymentCcy: string;
    interestPaymentFrequency?: PaymentFrequency;
    lastRegularPaymentDate?: string;
    notionalAmount?: number;
    notionalCcy?: string;
    paymentBusinessDayConvention?: BusinessDayConvention;
    paymentBusinessDays?: string;
    stubRule?: StubRule;
}
export interface ProtectionLegDefinition {
    direction: Direction;
    docClause?: DocClause;
    indexFactor?: number;
    indexSeries?: number;
    notionalAmount?: number;
    notionalCcy?: string;
    recoveryRate?: number;
    recoveryRatePercent?: number;
    referenceEntity: string;
    seniority?: Seniority;
    settlementConvention?: string;
}
