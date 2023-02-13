import type { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import { FinancialInstrument, Params } from './interfaces';
export declare const OPTION_INSTRUMENT_TYPE = "Option";
export declare function Definition(instrumentCode: string): ContentDefinition<Table, FinancialInstrument>;
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
