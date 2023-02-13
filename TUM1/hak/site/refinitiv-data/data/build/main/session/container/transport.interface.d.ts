import { ContainerSessionAuthorize, HttpResponse, IpcBusService, StreamTransport } from '@refinitiv-data/common';
import { WorkspaceSdkBus } from '@refinitiv-data/common/build/main/interfaces/ipc-bus-service';
import { ExecutionContainer } from '../../constants';
import { StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { SessionRequestParams } from '../session.interface';
import { HttpClient } from '../../http-client';
export interface Transport {
    readonly rdpUrlRoot: string;
    initialize(): Promise<void>;
    authorize(authParams: ContainerSessionAuthorize): Promise<void>;
    cleanUp(): Promise<void>;
    request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    getStreamTransport(api: string, protocol: string, execEnv?: ExecutionContainer | undefined): () => StreamTransport;
    getStreamLoginParams(): StreamLoginParams;
}
export interface TransportState {
    ready: boolean;
    error?: Error;
}
export interface TransportHttpParams {
    bus?: IpcBusService;
    httpClient?: HttpClient;
    appKey: string;
}
export interface TransportMixParams {
    bus?: IpcBusService | WorkspaceSdkBus;
    execEnv?: ExecutionContainer;
    appKey: string;
}
