import { DeepPartial, HttpResponse } from '@refinitiv-data/common';
import { socketCreator, StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { AbstractSession } from '../abstract/abstract-session';
import { ApiEndpoints, SessionDefinition, SessionRequestParams } from '../session.interface';
import { PlatformSessionParams } from './platform-session-params.interface';
export declare class PlatformSession extends AbstractSession {
    private sessionParams;
    static Definition(params: PlatformSessionParams): SessionDefinition;
    isEndpointSupported: boolean;
    private streamingTransport;
    private tokenProvider;
    private get config();
    private get baseUrl();
    private get tokenEndpoint();
    getOverriddenEndpoints(): DeepPartial<ApiEndpoints>;
    protected get cookieJarSupport(): boolean;
    protected initialize(): Promise<void>;
    protected request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    protected getSocketCreators(api: string, protocol: string): Promise<socketCreator[]>;
    protected getStreamLoginParams(): StreamLoginParams;
    protected cleanUp(): Promise<void>;
    private onRefreshSucceed;
    private onTokenExpired;
    private refreshStreamToken;
    private getStreamingTransport;
    private defineSessionProps;
    private registerTokenListeners;
    protected checkPipeErrors(): Promise<void>;
}
