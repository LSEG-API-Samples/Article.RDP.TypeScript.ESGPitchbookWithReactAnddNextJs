import { BuySell, CallPut, ExerciseStyle, SwapLegDefinition } from '../financial-contracts.models';
export { BuySell, CallPut, ExerciseStyle, SwapLegDefinition } from '../financial-contracts.models';
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
    underlyingDefinition: SwapDefinition;
    bermudanSwaptionDefinition?: BermudanSwaptionDefinition;
    buySell?: BuySell;
    callPut?: CallPut;
    endDate?: string;
    exerciseStyle?: ExerciseStyle;
    instrumentTag?: string;
    settlementType?: OptionSettlementType;
    strikePercent?: number;
    tenor?: string;
}
export interface PricingParameters {
    marketDataRule?: SwaptionMarketDataRule;
    marketValueInDealCcy?: number;
    nbIterations?: number;
    valuationDate?: string;
}
export interface BermudanSwaptionDefinition {
    exerciseSchedule: string;
    exerciseScheduleType: ScheduleType;
    notificationDays: number;
}
export interface SwaptionMarketDataRule {
    discount?: string;
    forward?: string;
}
export declare enum ScheduleType {
    FixedLeg = "FixedLeg",
    FloatLeg = "FloatLeg",
    UserDefined = "UserDefined "
}
export declare enum OptionSettlementType {
    Cash = "Cash",
    Physical = "Physical"
}
export interface SwapDefinition {
    endDate?: string;
    instrumentCode?: string;
    instrumentTag?: string;
    isNonDeliverable?: boolean;
    legs?: SwapLegDefinition[];
    settlementCcy?: string;
    startDate?: string;
    template?: string;
    tenor?: string;
    tradeDate?: number;
}
