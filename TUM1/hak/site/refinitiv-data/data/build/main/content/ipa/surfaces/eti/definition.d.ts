import type { ContentDefinition } from '../../../base-interfaces';
import type { Params, RequestItem } from './interfaces';
export declare const ETI_TYPE = "Eti";
export declare function Definition(params: Params): ContentDefinition<any, RequestItem>;
export declare function Definition(params: string, surfaceTag: string): ContentDefinition<any, RequestItem>;
