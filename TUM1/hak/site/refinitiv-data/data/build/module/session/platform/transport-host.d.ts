import { Dacs } from '@refinitiv-data/common';
import { socketCreator, StreamLoginParams } from '../../delivery/stream/stream-connection.interface';
import { StreamingTransport } from './streaming-transport.interface';
export declare class TransportHost implements StreamingTransport {
    private host;
    private dacs?;
    isRefreshRequired: boolean;
    constructor(host: string, dacs?: Dacs | undefined);
    getStreamLoginParams(): StreamLoginParams;
    getSocketCreators(api: string, protocol: string): Promise<socketCreator[]>;
}
