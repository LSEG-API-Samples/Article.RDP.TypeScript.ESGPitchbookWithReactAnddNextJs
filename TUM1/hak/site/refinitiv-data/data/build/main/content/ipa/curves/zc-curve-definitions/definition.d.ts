import { ContentDefinition } from '../../../base-interfaces';
import * as ZcCurveDefinition from '../zc-curve-definition/interfaces';
import * as ZcCurveDefinitions from './interfaces';
export declare function Definition(definitions: Array<ContentDefinition<any, ZcCurveDefinition.Params>>): ContentDefinition;
export declare function Definition(params: ZcCurveDefinitions.Params): ContentDefinition;
