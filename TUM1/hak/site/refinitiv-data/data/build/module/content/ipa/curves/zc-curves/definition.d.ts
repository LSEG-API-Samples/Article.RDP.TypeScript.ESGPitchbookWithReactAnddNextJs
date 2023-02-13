import type { ContentDefinition } from '../../../base-interfaces';
import * as ZcCurve from '../zc-curve/interfaces';
import type { Params } from './interfaces';
export declare function Definition(definitions: Array<ContentDefinition<any, ZcCurve.Params>>, outputs?: string[]): ContentDefinition;
export declare function Definition(params: Params): ContentDefinition;
