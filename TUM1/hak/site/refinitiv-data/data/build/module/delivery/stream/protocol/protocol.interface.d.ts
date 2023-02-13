import { StreamingType } from '../../../config';
import { StreamLoginParams, StreamRequestParams } from '../stream-connection.interface';
export declare enum ProtocolInitialMessageSummary {
    Success = "Success",
    Error = "Error",
    Pending = "Pending"
}
export interface ProtocolResponseSummary {
    isCompleteSnapshotMessage: boolean;
    isErrorMessage: boolean;
    isClosedStatusMessage: boolean;
    isOpenStatusMessage: boolean;
    responseId?: number;
    stateMessage?: string;
    errorMessage?: string;
    pingTimeout?: number;
}
export interface ProtocolPingPongConfig<Req, Res> {
    getPongMessage(): Req;
    getPingMessage(): Req;
    isPingMessage(res: Res): boolean;
    isPongMessage(res: Res): boolean;
}
export interface Protocol<Req, Res> {
    getProtocolName(): string;
    getProtocolType(): StreamingType;
    getPingPongConfig(): ProtocolPingPongConfig<Req, Res> | undefined;
    getSummary(res: Res): Partial<ProtocolResponseSummary>;
    getInitialMessageSummary(res: Res): ProtocolInitialMessageSummary;
    createRequest(id: number, params: StreamRequestParams): Req;
    createCloseRequest(id: number): Req;
    createModifyRequest?(id: number, params: StreamRequestParams): Partial<Req>;
    getLoginMessage(loginParams: StreamLoginParams): Req;
    getStreamingRecoverMessage(name: string, isCompleted?: boolean): Res;
    getStreamingErrorMessage(name: string, afterReconnect?: boolean): Res;
}
