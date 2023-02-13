import type { ContentDefinition } from '../../base-interfaces';
import type { FinancialContractsDefinitions, Params, Table } from './financial-contracts.interface';
export declare function Definition(definitions: FinancialContractsDefinitions): ContentDefinition<Table>;
export declare function Definition(params: Params): ContentDefinition<Table>;
