import { socketCreator, StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { StreamingTransport, TransportRdpParams } from './streaming-transport.interface';
export declare class TransportRdp implements StreamingTransport {
    private params;
    private get baseUrl();
    isRefreshRequired: boolean;
    private log;
    constructor(params: TransportRdpParams);
    getSocketCreators(api: string, protocol: string): Promise<socketCreator[]>;
    getStreamLoginParams(): StreamLoginParams;
    private getStreamingDiscoveryEndpoint;
    private getWebSocketLocations;
    private requestWebSocketList;
    private buildWsUrl;
    private isLocationAllowed;
}
