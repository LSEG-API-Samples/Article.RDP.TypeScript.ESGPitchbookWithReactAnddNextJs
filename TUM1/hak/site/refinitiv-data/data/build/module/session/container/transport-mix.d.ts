import { ContainerSessionAuthorize, HttpResponse, StreamTransport } from '@refinitiv-data/common';
import { StreamLoginParams } from '../../delivery';
import { SessionRequestParams } from '../session.interface';
import { Transport, TransportMixParams } from './transport.interface';
export declare class TransportMix implements Transport {
    private transportHttp;
    private transportPipe;
    private isInitialized;
    private readonly execEnv;
    constructor(params: TransportMixParams);
    initialize(): Promise<void>;
    authorize(authParams: ContainerSessionAuthorize): Promise<void>;
    cleanUp(): Promise<void>;
    get rdpUrlRoot(): string;
    request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    getStreamTransport(api: string, protocol: string): () => StreamTransport;
    getStreamLoginParams(): StreamLoginParams;
}
