import { HttpHeaders, HttpMethod } from '@refinitiv-data/common';
import { Session } from '../../session';
export interface EndpointRequestDefinition {
    readonly url?: string;
    readonly method?: HttpMethod;
    readonly query?: {};
    readonly body?: {};
    readonly path?: {};
    readonly headers?: HttpHeaders;
    readonly handleAutoRedirect?: boolean;
    getData<T>(session?: Session): Promise<EndpointResponse<T>>;
}
export interface EndpointRequestDefinitionParams {
    url: string;
    method?: HttpMethod;
    queryParameters?: {};
    bodyParameters?: {};
    headerParameters?: HttpHeaders;
    pathParameters?: {};
    handleAutoRedirect?: boolean;
}
export interface EndpointResponse<T = any> {
    data: T;
    httpStatus: number;
    httpHeaders: HttpHeaders;
}
