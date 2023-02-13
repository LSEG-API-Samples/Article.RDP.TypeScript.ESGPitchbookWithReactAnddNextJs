import type { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const FX_CROSS_INSTRUMENT_TYPE = "FxCross";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
