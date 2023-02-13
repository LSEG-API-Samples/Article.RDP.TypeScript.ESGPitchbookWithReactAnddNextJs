import type { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const SWAPTION_INSTRUMENT_TYPE = "Swaption";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
