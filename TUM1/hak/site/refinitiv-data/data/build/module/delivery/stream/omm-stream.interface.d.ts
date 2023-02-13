import type { ExtendedParams } from '../../content/base-interfaces/extended-params';
import type { Session } from '../../session/session.interface';
import type { StateEvents, StateManager } from '../../state/state-manager.interface';
import { OMMRefreshResponse, OMMStatusResponse, OMMUpdateResponse } from './protocol/omm-types.interface';
export interface OMMStreamRequestParams extends ExtendedParams {
    name: string;
    service?: string;
    domain?: string;
    streaming?: boolean;
    fields?: string[];
    filter?: number;
    api?: string;
}
export declare const DEFAULT_OMM_STREAMING_CONNECTION_NAME = "streaming/pricing/main";
export interface OMMStreamRequiredParams {
    session: Session;
    name: string;
}
declare const Status: 'Status';
declare const Update: 'Update';
declare const Refresh: 'Refresh';
declare const OMMStreamEvent: {
    Refresh: "Refresh";
    Status: "Status";
    Update: "Update";
    Complete: "Complete";
    Error: "error";
    StateChanged: "stateChanged";
};
export declare type OMMStreamRefreshCb = (data: OMMRefreshResponse, stream: OMMStream) => void;
export declare type OMMStreamStatusCb = (data: OMMStatusResponse, stream: OMMStream) => void;
export declare type OMMStreamUpdateCb = (data: OMMUpdateResponse, stream: OMMStream) => void;
export declare type OMMStreamCompleteCb = (stream: OMMStream) => void;
export declare type OMMStreamErrorCb = (error: Error, stream: OMMStream) => void;
export interface OMMStreamEvents extends StateEvents {
    [Refresh]: OMMStreamRefreshCb;
    [Update]: OMMStreamUpdateCb;
    [Status]: OMMStreamStatusCb;
    [OMMStreamEvent.Error]: OMMStreamErrorCb;
    [OMMStreamEvent.Complete]: OMMStreamCompleteCb;
}
export interface OMMStream extends StateManager<OMMStreamEvents> {
    readonly name: string;
    onRefresh(cb: OMMStreamRefreshCb): this;
    onUpdate(cb: OMMStreamUpdateCb): this;
    onStatus(cb: OMMStreamStatusCb): this;
    onError(cb: OMMStreamErrorCb): this;
    onComplete(cb: OMMStreamCompleteCb): this;
}
export interface OMMStreamDefinition {
    getStream(session?: Session): OMMStream;
}
export declare class OMMStream {
    static Event: {
        Refresh: "Refresh";
        Status: "Status";
        Update: "Update";
        Complete: "Complete";
        Error: "error";
        StateChanged: "stateChanged";
    };
    static Definition(name: string): OMMStreamDefinition;
    static Definition(params: OMMStreamRequestParams): OMMStreamDefinition;
}
export {};
