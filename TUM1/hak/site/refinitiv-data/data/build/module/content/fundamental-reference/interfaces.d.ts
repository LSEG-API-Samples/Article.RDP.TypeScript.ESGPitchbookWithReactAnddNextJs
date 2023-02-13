import { TableInterface } from '../base-interfaces';
import { ExtendedParams } from '../base-interfaces/extended-params';
export interface FieldGlobalParameters {
    SDate?: string;
    EDate?: string;
    Frq?: string;
    Period?: string;
    Scale?: number;
}
export interface Params extends ExtendedParams {
    universe: string | string[];
    fields: string | UdfField | Array<string | UdfField>;
    parameters?: FieldGlobalParameters;
    rowHeaders?: RowHeaders;
}
export declare enum RowHeaders {
    None = "None",
    Date = "Date"
}
export interface UdfRequestBody extends ExtendedParams {
    instruments: string[];
    fields: UdfField[];
    parameters?: FieldGlobalParameters;
}
export interface UdfTrackRequestBody {
    ticket: string;
}
export interface UdfParams {
    Entity: {
        E: string;
        W: {
            requests: Array<UdfRequestBody | UdfTrackRequestBody>;
        };
    };
}
export declare type Table = TableInterface<TableRow>;
export interface TableRow {
    [key: string]: string | number | null;
}
export interface ResponseHeader {
    name: string;
    title?: string;
    type?: string;
    description?: string;
    decimalChar?: string;
}
export interface UdfResponseHeader {
    displayName: string;
    field?: string;
}
export declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}
export interface UdfField {
    name: string;
    sort?: SortOrder;
    sortPriority?: number;
    parameters?: {
        Scale?: number;
        Lag?: string;
        Curn?: string;
    };
}
