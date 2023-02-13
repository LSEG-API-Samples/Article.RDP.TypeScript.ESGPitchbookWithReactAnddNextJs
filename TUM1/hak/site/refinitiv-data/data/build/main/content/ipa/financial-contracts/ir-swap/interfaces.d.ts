import { SwapLegDefinition } from '../financial-contracts.models';
export { SwapLegDefinition } from '../financial-contracts.models';
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
    tradeDate?: string;
    startDate?: string;
    endDate?: string;
    tenor?: string;
    settlementCcy?: string;
    isNonDeliverable?: boolean;
    instrumentCode?: string;
    template?: string;
    legs?: SwapLegDefinition[];
}
export interface PricingParameters {
    valuationDate?: string;
    reportCcy?: string;
    marketDataDate?: string;
    marketValueInDealCcy?: number;
    discountingTenor?: string;
    discountingCcy?: string;
    indexConvexityAdjustmentType?: string;
}
