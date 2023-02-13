import { StreamingType } from '../../../config';
import { StreamLoginParams, StreamRequestParams } from '../stream-connection.interface';
import { OMMRequest, OMMResponse, OMMSingleOpenRequest } from './omm-types.interface';
import { Protocol, ProtocolInitialMessageSummary, ProtocolPingPongConfig, ProtocolResponseSummary } from './protocol.interface';
export declare class OmmProtocol implements Protocol<OMMRequest, OMMResponse> {
    getProtocolName(): string;
    getProtocolType(): StreamingType;
    getPingPongConfig(): ProtocolPingPongConfig<OMMRequest, OMMResponse>;
    getInitialMessageSummary(res: OMMResponse): ProtocolInitialMessageSummary;
    getSummary(res: OMMResponse): Partial<ProtocolResponseSummary>;
    createRequest(id: number, params: StreamRequestParams): OMMSingleOpenRequest;
    createCloseRequest(id: number): OMMRequest;
    getLoginMessage(loginParams: StreamLoginParams): OMMRequest;
    getStreamingRecoverMessage(api: string, isCompleted?: boolean): OMMResponse;
    getStreamingErrorMessage(api: string, afterReconnect?: boolean): OMMResponse;
    private isSuccessStatusMessage;
    private isCompleteSnapshotMessage;
    private isErrorMessage;
    private hasOpenState;
    private hasClosedState;
}
