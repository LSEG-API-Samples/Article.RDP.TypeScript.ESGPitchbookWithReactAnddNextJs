import type { ContentDefinition } from '../../../base-interfaces';
import * as ForwardCurve from '../forward-curve/interfaces';
import type { Params } from './interfaces';
export declare function Definition(definitions: Array<ContentDefinition<any, ForwardCurve.Params>>, outputs?: string[]): ContentDefinition;
export declare function Definition(params: Params): ContentDefinition;
