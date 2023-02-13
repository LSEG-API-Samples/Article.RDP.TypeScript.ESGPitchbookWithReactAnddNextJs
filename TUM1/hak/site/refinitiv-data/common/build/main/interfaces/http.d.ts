export interface HttpHeaders {
    [header: string]: number | string | string[] | undefined;
}
export interface HttpConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    headers?: HttpHeaders;
    params?: any;
    data?: any;
    maxRedirects?: number;
}
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export interface HttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: HttpHeaders;
    config: HttpConfig;
    request?: any;
}
export interface APIProxyHttpResponse {
    body?: string;
    headers?: HttpHeaders;
    statusCode: number;
    statusMessage?: string;
}
export interface HttpErrorResponse {
    config: HttpConfig;
    code?: string;
    request?: any;
    response?: HttpResponse;
}
export declare enum HttpCode {
    OK = 200,
    MULTIPLE_CHOICES = 300,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    REQUEST_TIMEOUT = 408,
    INTERNAL_SERVER_ERROR = 500
}
