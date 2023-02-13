import { DeepPartial, HttpResponse } from '@refinitiv-data/common';
import { socketCreator, StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { AbstractSession } from '../abstract/abstract-session';
import { ApiEndpoints, Session, SessionDefinition, SessionRequestParams } from '../session.interface';
import { ContainerSessionParams } from './container-session-params.interface';
export declare class ContainerSession extends AbstractSession implements Session {
    private sessionParams;
    static Definition(appKey: string): SessionDefinition;
    static Definition(params: string | ContainerSessionParams): SessionDefinition;
    rdpUrlRoot: string;
    private transportStrategy?;
    private checkPipePromise?;
    private pipeState;
    getOverriddenEndpoints(): DeepPartial<ApiEndpoints>;
    protected get cookieJarSupport(): boolean;
    protected getSocketCreators(api: string, protocol: string): Promise<socketCreator[]>;
    protected getStreamLoginParams(): StreamLoginParams;
    protected request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    protected initialize(): Promise<void>;
    protected cleanUp(): Promise<void>;
    private getAuthParams;
    private createTransport;
    private checkPipeAvailableAndSwitch;
    private waitMaxFor;
    private doSwitch;
    private switchToPipe;
    protected checkPipeErrors(): Promise<void>;
}
