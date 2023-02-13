import { HttpClient, HttpClientRequestConfig, HttpClientResponse } from './http-client.interface';
export declare class HttpClientImpl implements HttpClient {
    get defaultConfig(): HttpClientRequestConfig;
    private get httpConfig();
    static getInstance(): HttpClient;
    private static instance;
    private log;
    private constructor();
    request<T = any, R = HttpClientResponse<T>>(config: HttpClientRequestConfig): Promise<R>;
    post<T = any, R = HttpClientResponse<T>>(url: string, data?: any, config?: HttpClientRequestConfig): Promise<R>;
    private mergeDefaults;
    private isValidTimeoutNumber;
    private getTimeoutSetting;
}
