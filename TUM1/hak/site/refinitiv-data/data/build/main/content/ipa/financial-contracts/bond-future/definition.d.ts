import type { ContentDefinition } from '../../../base-interfaces';
import * as Bond from '../bond';
import type { Table } from '../financial-contracts.interface';
import type { FinancialInstrument, Params } from './interfaces';
export declare const BOND_FUTURE_INSTRUMENT_TYPE = "BondFuture";
export declare function Definition(params: Params): ContentDefinition<Table, FinancialInstrument>;
export declare function BondFutureUnderlyingContract(params: Bond.Params): Bond.FinancialInstrument;
export declare function BondFutureUnderlyingContract(universe: string): Bond.FinancialInstrument;
