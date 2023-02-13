import { ContentDefinition } from '../../base-interfaces';
import type { Table } from '../historical-pricing.interface';
import type { Params } from './interfaces';
export declare function Definition(universe: string, fields?: string[]): ContentDefinition<Table>;
export declare function Definition(params: Params): ContentDefinition<Table>;
