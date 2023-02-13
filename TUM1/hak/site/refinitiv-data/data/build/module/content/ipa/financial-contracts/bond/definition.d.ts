import { ContentDefinition } from '../../../base-interfaces';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const BOND_INSTRUMENT_TYPE = "Bond";
export declare function Definition(instrumentCode: string): ContentDefinition<Table, FinancialInstrument>;
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
