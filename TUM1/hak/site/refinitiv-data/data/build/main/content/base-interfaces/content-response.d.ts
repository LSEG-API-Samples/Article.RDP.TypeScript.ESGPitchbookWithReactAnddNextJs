import { EndpointResponse } from '../../delivery';
export interface ContentObjectResponse<TTable> {
    raw: any;
    table?: TTable;
    [index: string]: any;
}
export declare type ContentResponse<TTable = any, TContentObjectResponse = ContentObjectResponse<TTable>> = EndpointResponse<TContentObjectResponse>;
