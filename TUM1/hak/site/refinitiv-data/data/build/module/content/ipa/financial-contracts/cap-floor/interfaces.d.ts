import { DayCountBasisConvention } from '../../ipa-common-models';
import { AdjustInterest, BusinessDayConvention, BuySell, PaymentFrequency, PaymentRollConvention, ResetType, StubRule } from '../financial-contracts.models';
export { AdjustInterest, BusinessDayConvention, BuySell, DayCountBasisConvention, PaymentFrequency, PaymentRollConvention, ResetType, StubRule, } from '../financial-contracts.models';
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
    notionalCcy: string;
    buySell: BuySell;
    capStrikePercent: number;
    adjustInterestToPaymentDate?: AdjustInterest;
    amortizationSchedule?: AmortizationItemDefinition[];
    endDate?: string;
    floorStrikePercent?: number;
    indexFixingLag?: number;
    indexFixingRic?: string;
    indexName?: string;
    indexResetFrequency?: PaymentFrequency;
    indexResetType?: ResetType;
    indexTenor?: string;
    instrumentTag?: string;
    interestCalculationMethod?: DayCountBasisConvention;
    interestPaymentFrequency?: PaymentFrequency;
    notionalAmount?: number;
    paymentBusinessDayConvention?: BusinessDayConvention;
    paymentRollConvention?: PaymentRollConvention;
    startDate?: string;
    stubRule?: StubRule;
    tenor?: string;
}
export interface PricingParameters {
    indexConvexityAdjustmentIntegrationMethod?: ConvexityAdjustmentIntegrationMethod;
    indexConvexityAdjustmentMethod?: ConvexityAdjustmentMethod;
    marketValueInDealCcy?: number;
    reportCcy?: string;
    skipFirstCapFloorlet?: boolean;
    valuationDate?: string;
}
export interface AmortizationItemDefinition {
    amortizationFrequency?: AmortizationFrequency;
    amortizationType?: AmortizationType;
    amount?: number;
    endDate?: string;
    remainingNotional?: number;
    startDate?: string;
}
export declare enum AmortizationFrequency {
    EveryCoupon = "EveryCoupon",
    Every2ndCoupon = "Every2ndCoupon",
    Every3rdCoupon = "Every3rdCoupon",
    Every4thCoupon = "Every4thCoupon",
    Every12thCoupon = "Every12thCoupon "
}
export declare enum AmortizationType {
    None = "None",
    Linear = "Linear",
    Annuity = "Annuity",
    Schedule = "Schedule "
}
export declare enum ConvexityAdjustmentIntegrationMethod {
    RiemannSum = "RiemannSum",
    RungeKutta = "RungeKutta"
}
export declare enum ConvexityAdjustmentMethod {
    None = "None",
    BlackScholes = "BlackScholes",
    Replication = "Replication",
    LinearSwapModel = "LinearSwapModel"
}
