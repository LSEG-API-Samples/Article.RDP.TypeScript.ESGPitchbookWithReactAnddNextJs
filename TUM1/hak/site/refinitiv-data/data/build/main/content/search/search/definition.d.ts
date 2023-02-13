import type { ContentDefinition } from '../../base-interfaces';
import type { Params, Table } from './interfaces';
export declare function Definition(universe: string): ContentDefinition<Table>;
export declare function Definition(params: Params): ContentDefinition<Table>;
