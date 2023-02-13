import type { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const CDS_INSTRUMENT_TYPE = "Cds";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
