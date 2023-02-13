import type { ContentDefinition } from '../../base-interfaces/content-definition';
import { Params, Table } from './interfaces';
export declare function Definition(query: string): ContentDefinition<Table>;
export declare function Definition(params: Params): ContentDefinition<Table>;
