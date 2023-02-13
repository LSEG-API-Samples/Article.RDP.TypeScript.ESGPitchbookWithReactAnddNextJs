import { ContentDefinition } from '../../../base-interfaces';
import { ExtendedParams } from '../../../base-interfaces/extended-params';
import * as ForwardCurve from '../forward-curve/interfaces';
interface Outputs {
    outputs: string[];
}
export interface Params extends Partial<Outputs>, ExtendedParams {
    universe: Array<ContentDefinition<any, ForwardCurve.Params>>;
}
export declare type Content = ForwardCurve.Content;
export {};
