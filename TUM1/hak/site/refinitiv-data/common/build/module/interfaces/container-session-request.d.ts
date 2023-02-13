import { HttpErrorResponse, HttpHeaders, HttpMethod, HttpResponse } from './http';
export interface ContainerSessionRequest {
    url: string;
    appKey: string;
    scope?: string;
    handleAutoRedirect?: boolean;
    method?: HttpMethod;
    query?: {};
    body?: {};
    headers?: HttpHeaders;
    path?: {};
}
export declare type ContainerSessionRequestStatus = HttpErrorResponse | HttpResponse;
