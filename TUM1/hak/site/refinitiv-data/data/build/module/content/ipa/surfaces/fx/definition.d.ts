import type { ContentDefinition } from '../../../base-interfaces';
import type { Params, RequestItem } from './interfaces';
export declare const FX_TYPE = "Fx";
export declare function Definition(params: Params): ContentDefinition<any, RequestItem>;
export declare function Definition(params: string, surfaceTag: string): ContentDefinition<any, RequestItem>;
