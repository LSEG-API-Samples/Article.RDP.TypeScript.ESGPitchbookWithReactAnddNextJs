import { TableInterface } from '../../base-interfaces';
import { ExtendedParams } from '../../base-interfaces/extended-params';
import { View } from './../search.interface';
export { View } from './../search.interface';
export declare enum OrderByDirection {
    asc = "asc",
    desc = "desc"
}
export declare enum Feature {
    quoteperm = "quoteperm",
    spell = "spell",
    tcm = "tcm"
}
export interface Bucket {
    Count: number;
    Label: string;
    Filter?: string;
}
export interface BucketContainer {
    Buckets: Bucket[];
}
export interface Params extends ExtendedParams {
    query?: string;
    view?: View;
    filter?: string;
    orderBy?: string | Map<string, OrderByDirection>;
    boost?: string;
    select?: string | string[];
    top?: number;
    skip?: number;
    groupBy?: string;
    groupCount?: number;
    navigators?: string;
    features?: Feature | Feature[];
}
export interface Content {
    View: View;
    Query?: string;
    Filter?: string;
    OrderBy?: string | Map<string, OrderByDirection>;
    Boost?: string;
    Select?: string | string[];
    Top?: number;
    Skip?: number;
    GroupBy?: string;
    GroupCount?: number;
    Navigators?: string;
    Features?: Feature | Feature[];
}
interface Doc {
    [key: string]: any;
}
export declare type Table = TableInterface<Doc>;
