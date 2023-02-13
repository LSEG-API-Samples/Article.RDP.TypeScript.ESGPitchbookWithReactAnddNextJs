import { Dacs, HttpResponse } from '@refinitiv-data/common';
import { socketCreator, StreamLoginParams } from '../../delivery';
import { SessionRequestParams } from '../session.interface';
export interface StreamingTransport {
    isRefreshRequired: boolean;
    getSocketCreators(api: string, protocol: string): Promise<socketCreator[]>;
    getStreamLoginParams(): StreamLoginParams;
}
export interface TransportRdpParams {
    userName: string;
    dacs?: Dacs;
    getAccessToken: () => string;
    request<T>(requestParams: SessionRequestParams): Promise<HttpResponse<T>>;
}
