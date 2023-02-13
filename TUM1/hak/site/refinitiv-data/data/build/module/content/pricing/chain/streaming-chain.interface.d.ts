import { StateEvents, StateManager } from '../../../state/state-manager.interface';
import { ExtendedParams } from '../../base-interfaces/extended-params';
import { StreamingChainError } from './streaming-chain-error';
export interface RequestParams extends ExtendedParams {
    service?: string;
    overrideSummaryLinks?: number;
    skipSummaryLinks?: boolean;
    skipEmpty?: boolean;
    nameGuessingQuantity?: number;
    api?: string;
}
export interface Params extends RequestParams {
    name: string;
}
declare const Add: 'Add';
declare const Update: 'Update';
declare const Remove: 'Remove';
declare const Complete: 'Complete';
export declare const Event: {
    Complete: "Complete";
    Add: "Add";
    Remove: "Remove";
    Update: "Update";
    Error: "error";
    StateChanged: "stateChanged";
};
export declare const QUANTITY_CHAIN_RECORDS_TO_REQUEST = 10;
export declare const STREAMING_CHAINS_NAME_PATTERN: RegExp;
export interface Events extends StateEvents {
    [Add]: (constituent: string, index: number, sc: Stream) => void;
    [Update]: (newConstituent: string, oldConstituent: string, index: number, sc: Stream) => void;
    [Remove]: (constituent: string, index: number, sc: Stream) => void;
    [Complete]: (constituents: string[], sc: Stream) => void;
    [Event.Error]: (err: StreamingChainError, sc: Stream) => void;
}
export interface Stream extends StateManager<Events> {
    readonly definition: Params;
    readonly name: string;
    isChain: boolean;
    summaryLinks: string[];
    readonly constituents: string[];
    onAdd(cb: OnAddCallback): this;
    onRemove(cb: OnRemoveCallback): this;
    onComplete(cb: OnCompleteCallback): this;
    onUpdate(cb: OnUpdateCallback): this;
    onError(cb: OnErrorCallback): this;
}
export declare type OnAddCallback = (constituent: string, index: number, sc: Stream) => void;
export declare type OnRemoveCallback = OnAddCallback;
export declare type OnUpdateCallback = (newConstituent: string, oldConstituent: string, index: number, sc: Stream) => void;
export declare type OnCompleteCallback = (constituents: string[], sc: Stream) => void;
export declare type OnErrorCallback = (error: Error, sc: Stream) => void;
export {};
