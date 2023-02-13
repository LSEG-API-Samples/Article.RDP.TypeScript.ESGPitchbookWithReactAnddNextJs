import { ContentDefinition } from '../../../base-interfaces/content-definition';
import { ExtendedParams } from '../../../base-interfaces/extended-params';
import * as ZcCurveDefinition from '../zc-curve-definition/interfaces';
export interface Params extends ExtendedParams {
    universe: Array<ContentDefinition<any, ZcCurveDefinition.Params>>;
}
export declare type Content = ZcCurveDefinition.Content;
