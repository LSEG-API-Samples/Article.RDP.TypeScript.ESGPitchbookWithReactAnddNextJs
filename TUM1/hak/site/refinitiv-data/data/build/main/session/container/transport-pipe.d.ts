import { ContainerSessionAuthorize, HttpResponse, IpcBusService, IpcBusServiceOptions, StreamTransport } from '@refinitiv-data/common';
import { ExecutionContainer } from '../../constants/container-session';
import { StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { SessionRequestParams } from '../session.interface';
import { Transport } from './transport.interface';
export declare class TransportPipe implements Transport {
    private options?;
    private busRequester;
    private bus;
    private authParams;
    private isInitialized;
    constructor(bus?: IpcBusService, options?: IpcBusServiceOptions | undefined);
    initialize(): Promise<void>;
    authorize(authParams: ContainerSessionAuthorize): Promise<void>;
    cleanUp(): Promise<void>;
    get rdpUrlRoot(): string;
    request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    getStreamTransport(api: string, protocol: string, execEnv?: ExecutionContainer | undefined): () => StreamTransport;
    getStreamLoginParams(): StreamLoginParams;
    private validateResponseStatus;
    private prepareRequestHeaders;
    private toHttpResponse;
}
