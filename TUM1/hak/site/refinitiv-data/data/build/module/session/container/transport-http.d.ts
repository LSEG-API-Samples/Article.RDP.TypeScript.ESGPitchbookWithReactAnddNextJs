import { ContainerSessionAuthorize, HttpResponse, StreamTransport } from '@refinitiv-data/common';
import { StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { SessionRequestParams } from '../session.interface';
import { Transport, TransportHttpParams } from './transport.interface';
export declare class TransportHttp implements Transport {
    private readonly appKey?;
    private readonly bus?;
    private httpClient;
    private log;
    private static get rdpPlatformHost();
    private environment;
    private isInitialized;
    constructor(params: TransportHttpParams);
    initialize(): Promise<void>;
    authorize(authParams: ContainerSessionAuthorize): Promise<void>;
    cleanUp(): Promise<void>;
    get rdpUrlRoot(): string;
    request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
    getStreamTransport(): () => StreamTransport;
    getStreamLoginParams(): StreamLoginParams;
    private getEnvironment;
    private addBaggageHeader;
    private deserializeBaggage;
    private serializeBaggage;
    private isValid;
}
