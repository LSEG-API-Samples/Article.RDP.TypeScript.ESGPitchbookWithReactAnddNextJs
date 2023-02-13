import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare const TIMEOUT_CONFIG_PATH = "http.request-timeout";
export declare type HttpClientRequestConfig = AxiosRequestConfig;
export declare type HttpClientResponse<T = any> = AxiosResponse<T>;
export declare type HttpClientError<T = any> = AxiosError<T>;
export interface HttpClient {
    readonly defaultConfig: HttpClientRequestConfig;
    request<T = any, R = HttpClientResponse<T>>(config: HttpClientRequestConfig): Promise<R>;
    post<T = any, R = HttpClientResponse<T>>(url: string, data?: any, config?: HttpClientRequestConfig): Promise<R>;
}
