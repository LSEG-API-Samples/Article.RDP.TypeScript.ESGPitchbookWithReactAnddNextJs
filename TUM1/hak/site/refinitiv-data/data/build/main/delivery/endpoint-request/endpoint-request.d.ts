import { HttpHeaders, HttpMethod } from '@refinitiv-data/common';
import type { Session } from '../../session/session.interface';
import { EndpointRequestDefinition, EndpointRequestDefinitionParams, EndpointResponse } from './endpoint-request.interface';
export declare class EndpointRequest implements EndpointRequestDefinition {
    private requestParams;
    get url(): string;
    get method(): HttpMethod;
    get query(): {} | undefined;
    get body(): {} | undefined;
    get path(): {} | undefined;
    get headers(): HttpHeaders | undefined;
    get handleAutoRedirect(): boolean | undefined;
    static Method: typeof HttpMethod;
    static Definition(url: string): EndpointRequestDefinition;
    static Definition(params: EndpointRequestDefinitionParams): EndpointRequestDefinition;
    private static parseUrl;
    private static prepareEndpointResponse;
    getData<T>(session?: Session): Promise<EndpointResponse<T>>;
    private handleAxiosError;
}
