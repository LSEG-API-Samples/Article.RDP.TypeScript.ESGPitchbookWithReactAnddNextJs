import { ContentDefinition } from '../../base-interfaces/content-definition';
import { LayoutFormat, Outputs } from './surfaces.models';
import { ExtendedParams } from '../../base-interfaces/extended-params';
import * as Cap from './cap/interfaces';
import * as Eti from './eti/interfaces';
import * as Fx from './fx/interfaces';
import * as Swaption from './swaption/interfaces';
export { Outputs };
export declare type SurfacesDefinitions = Array<ContentDefinition<any, RequestItem>>;
export interface Params extends InstrumentParams {
    definitions: SurfacesDefinitions;
}
export interface InstrumentParams extends ExtendedParams {
    outputs?: Outputs[];
}
export interface LayoutDataPoint {
    x: number;
    y: number;
}
export interface Layout {
    format: LayoutFormat;
    dataPoints?: LayoutDataPoint[];
    xPointCount?: number;
    xValues?: string[];
    yPointCount?: number;
    yValues?: string[];
    zPointCount?: number;
    zValues?: string[];
}
export declare type RequestItem = Cap.RequestItem | Eti.RequestItem | Fx.RequestItem | Swaption.RequestItem;
export interface BaseItemParams<T> {
    surfaceLayout?: Layout;
    surfaceTag?: string;
    surfaceParameters?: T;
}
export interface BaseRequestItem {
    underlyingType: string;
    surfaceLayout?: Layout;
    surfaceTag?: string;
}
export interface Content {
    universe: RequestItem[];
    outputs?: Outputs[];
}
