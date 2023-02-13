import EventEmitter from 'eventemitter3';
import StrictEventEmitter from 'strict-event-emitter-types';
export declare const StateEvent: {
    Error: "error";
    StateChanged: "stateChanged";
};
export declare enum State {
    Opened = "Opened",
    Closed = "Closed",
    Pending = "Pending"
}
export interface StateEvents {
    [StateEvent.StateChanged]: <T extends StateEvents>(stateManager: StateManager<T>, state: State) => void;
    [StateEvent.Error]: (error: Error, stateManager: any) => void;
}
export interface StateManager<T extends StateEvents> extends StrictEventEmitter<EventEmitter, T> {
    readonly state: State;
    open(): Promise<this>;
    close(): Promise<void>;
}
