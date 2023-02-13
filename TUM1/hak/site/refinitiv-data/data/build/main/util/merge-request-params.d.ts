import { HttpHeaders } from '@refinitiv-data/common';
import { HttpClientRequestConfig } from '../http-client';
import { SessionRequestParams } from '../session/session.interface';
export declare const mergeRequestParams: (baseURL: string, requestParams: SessionRequestParams, headers?: HttpHeaders | undefined, paramsSerializer?: ((params: any) => string) | undefined) => HttpClientRequestConfig;
