import type { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const IR_SWAP_INSTRUMENT_TYPE = "Swap";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
