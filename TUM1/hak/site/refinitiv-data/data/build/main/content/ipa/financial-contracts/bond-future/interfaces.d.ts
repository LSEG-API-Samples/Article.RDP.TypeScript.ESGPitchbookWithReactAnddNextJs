import * as Bond from '../bond';
import { PriceSide } from '../financial-contracts.models';
export { PriceSide } from '../financial-contracts.models';
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
    instrumentCode: string;
    instrumentTag?: string;
    notionalAmount?: number;
    underlyingInstruments?: Bond.FinancialInstrument[];
}
export interface PricingParameters {
    valuationDate?: string;
    marketDataDate?: string;
    reportCcy?: string;
    priceSide?: PriceSide;
    price?: number;
    marketValueInDealCcy?: number;
    marketValueInReportCcy?: number;
    repoRatePercent?: number;
}
