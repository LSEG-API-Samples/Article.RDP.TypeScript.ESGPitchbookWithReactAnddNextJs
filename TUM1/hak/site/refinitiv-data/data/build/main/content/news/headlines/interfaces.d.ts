import { TableInterface } from '../../base-interfaces';
import { ExtendedParams } from '../../base-interfaces/extended-params';
export declare enum SortDirection {
    NewToOld = "newToOld",
    OldToNew = "oldToNew"
}
export interface Params extends Pick<Content, Exclude<keyof Content, 'limit' | 'cursor'>>, ExtendedParams {
    count?: number;
}
export interface Content {
    query: string;
    limit?: number;
    cursor?: string;
    sort?: SortDirection;
    dateFrom?: string;
    dateTo?: string;
    relevance?: Relevancy;
}
export declare enum Relevancy {
    High = "High",
    Medium = "Medium",
    All = "All"
}
export declare type Table = TableInterface<TableRow>;
export interface TableRow {
    [key: string]: any;
}
