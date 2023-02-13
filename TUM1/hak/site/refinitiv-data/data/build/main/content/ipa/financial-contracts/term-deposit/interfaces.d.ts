import { BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention, PriceSide } from '../financial-contracts.models';
export { BusinessDayConvention, DayCountBasisConvention, PaymentRollConvention, PriceSide } from '../financial-contracts.models';
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
    calendar?: string;
    endDate?: string;
    fixedRatePercent?: number;
    instrumentCode?: string;
    instrumentTag?: string;
    notionalAmount?: number;
    notionalCcy?: string;
    paymentBusinessDayConvention?: BusinessDayConvention;
    paymentRollConvention?: PaymentRollConvention;
    startDate?: string;
    tenor?: string;
    yearBasis?: DayCountBasisConvention;
}
export interface PricingParameters {
    incomeTaxPercent?: number;
    priceSide?: PriceSide;
    valuationDate?: string;
}
