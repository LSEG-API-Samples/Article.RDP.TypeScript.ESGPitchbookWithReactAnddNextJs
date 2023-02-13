import type { ExtendedParams } from '../../content/base-interfaces/extended-params';
import type { Session } from '../../session/session.interface';
import type { StateEvents, StateManager } from '../../state/state-manager.interface';
import { RDPAckResponse, RDPAlarmResponse, RDPResponseResponse, RDPUpdateResponse } from './protocol/rdp-types.interface';
export interface RDPStreamRequestParams extends ExtendedParams {
    universe: string | string[];
    service?: string;
    context?: string;
    fields?: string[];
    parameters?: object;
    api?: string;
}
export declare const DEFAULT_RDP_STREAMING_CONNECTION_NAME = "streaming/trading-analytics/redi";
declare const Ack = "Ack";
declare const Update = "Update";
declare const Response = "Response";
declare const Alarm = "Alarm";
export declare const RDPStreamEvent: {
    readonly Ack: "Ack";
    readonly Response: "Response";
    readonly Update: "Update";
    readonly Alarm: "Alarm";
    readonly Complete: "Complete";
    readonly Error: "error";
    readonly StateChanged: "stateChanged";
};
export declare type RDPStreamMessageEvent = typeof Response | typeof Ack | typeof Update;
export declare type RDPStreamResponseCb = (data: RDPResponseResponse, stream: RDPStream) => void;
export declare type RDPStreamUpdateCb = (data: RDPUpdateResponse, stream: RDPStream) => void;
export declare type RDPStreamAckCb = (data: RDPAckResponse, stream: RDPStream) => void;
export declare type RDPStreamAlarmCb = (data: RDPAlarmResponse, stream: RDPStream) => void;
export declare type RDPStreamErrorCb = (error: Error, stream: RDPStream) => void;
export declare type RDPStreamCompleteCb = (stream: RDPStream) => void;
export interface RDPStreamEvents extends StateEvents {
    [Response]: RDPStreamResponseCb;
    [Update]: RDPStreamUpdateCb;
    [Ack]: RDPStreamAckCb;
    [Alarm]: RDPStreamAlarmCb;
    [RDPStreamEvent.Error]: RDPStreamErrorCb;
    [RDPStreamEvent.Complete]: RDPStreamCompleteCb;
}
export interface RDPStream extends StateManager<RDPStreamEvents> {
    readonly universe?: string | object;
    onResponse(cb: RDPStreamResponseCb): this;
    onUpdate(cb: RDPStreamUpdateCb): this;
    onAck(cb: RDPStreamAckCb): this;
    onAlarm(cb: RDPStreamAlarmCb): this;
    onError(cb: RDPStreamErrorCb): this;
    onComplete(cb: RDPStreamCompleteCb): this;
    modify(params: RDPStreamRequestParams): void;
}
export interface RDPStreamDefinition {
    getStream(session?: Session): RDPStream;
}
export declare class RDPStream {
    static Event: {
        readonly Ack: "Ack";
        readonly Response: "Response";
        readonly Update: "Update";
        readonly Alarm: "Alarm";
        readonly Complete: "Complete";
        readonly Error: "error";
        readonly StateChanged: "stateChanged";
    };
    static Definition(universe: string): RDPStreamDefinition;
    static Definition(params: RDPStreamRequestParams): RDPStreamDefinition;
}
export {};
