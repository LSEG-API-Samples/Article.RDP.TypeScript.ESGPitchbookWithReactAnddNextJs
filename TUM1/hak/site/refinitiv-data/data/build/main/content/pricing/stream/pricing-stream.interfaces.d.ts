import { OMMStreamRequestParams } from '../../../delivery/stream/omm-stream.interface';
import { OMMFields, OMMFieldValue, OMMResponseState } from '../../../delivery/stream/protocol/omm-types.interface';
import { Session } from '../../../session';
import { StateEvents, StateManager } from '../../../state/state-manager.interface';
import { StreamError } from './pricing-stream-error';
export declare const MARKET_PRICE_DOMAIN = "MarketPrice";
export interface OpenStreamParams {
    withUpdates: boolean;
}
export interface Params extends Pick<OMMStreamRequestParams, Exclude<keyof OMMStreamRequestParams, 'domain' | 'streaming' | 'filter' | 'api' | 'name'>> {
    universe: string | string[];
}
export declare const StreamEvent: {
    Refresh: "Refresh";
    Status: "Status";
    Update: "Update";
    Complete: "Complete";
    Error: "error";
    StateChanged: "stateChanged";
};
export declare type StreamRefreshCallback = (refresh: OMMFields, instrument?: string, stream?: Stream) => void;
export declare type StreamUpdateCallback = (update: OMMFields, instrument?: string, stream?: Stream) => void;
export declare type StreamStatusCallback = (status: OMMResponseState, instrument?: string, stream?: Stream) => void;
export declare type StreamCompleteCallback = (stream?: Stream) => void;
export declare type StreamErrorCallback = (error: StreamError, stream?: Stream) => void;
export interface StreamEvents extends StateEvents {
    [StreamEvent.Refresh]: StreamRefreshCallback;
    [StreamEvent.Update]: StreamUpdateCallback;
    [StreamEvent.Status]: StreamStatusCallback;
    [StreamEvent.Complete]: StreamCompleteCallback;
    [StreamEvent.Error]: StreamErrorCallback;
}
export interface Stream extends StateManager<StreamEvents> {
    readonly definition: Params;
    readonly session: Session;
    getFieldValue(instrument: string, field: string): OMMFieldValue | undefined;
    getFields(instrument: string, fields?: string[]): OMMFields | undefined;
    getItemStatus(instrument: string): OMMResponseState | undefined;
    onRefresh(cb: StreamRefreshCallback): Stream;
    onUpdate(cb: StreamUpdateCallback): Stream;
    onStatus(cb: StreamStatusCallback): Stream;
    onComplete(cb: StreamCompleteCallback): Stream;
    onError(cb: StreamErrorCallback): Stream;
    open(params?: OpenStreamParams): Promise<this>;
}
