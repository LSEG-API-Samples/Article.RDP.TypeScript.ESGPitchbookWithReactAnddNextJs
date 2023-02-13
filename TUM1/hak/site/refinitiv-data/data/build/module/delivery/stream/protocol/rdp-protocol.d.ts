import { StreamingType } from '../../../config';
import { StreamLoginParams, StreamRequestParams } from '../stream-connection.interface';
import { Protocol, ProtocolInitialMessageSummary, ProtocolPingPongConfig, ProtocolResponseSummary } from './protocol.interface';
import { RDPRequest, RDPRequestType, RDPResponse } from './rdp-types.interface';
export declare class RdpProtocol implements Protocol<RDPRequest, RDPResponse> {
    getProtocolName(): string;
    getProtocolType(): StreamingType;
    getPingPongConfig(): ProtocolPingPongConfig<RDPRequest, RDPResponse> | undefined;
    getInitialMessageSummary(res: RDPResponse): ProtocolInitialMessageSummary;
    getSummary(res: RDPResponse): ProtocolResponseSummary;
    createRequest(id: number, params: StreamRequestParams): RDPRequest;
    createCloseRequest(id: number): RDPRequest;
    createModifyRequest(id: number, params: StreamRequestParams): Partial<RDPRequest>;
    createBasicRequest(id: number, params: StreamRequestParams, method?: RDPRequestType): RDPRequest;
    getLoginMessage(loginParams: StreamLoginParams): RDPRequest;
    getStreamingRecoverMessage(api: string, isCompleted?: boolean): RDPResponse;
    getStreamingErrorMessage(api: string, afterReconnect?: boolean): RDPResponse;
}
