import EventEmitter from 'eventemitter3';
import { State, StateEvents, StateManager } from './state-manager.interface';
export declare abstract class AbstractStateManager extends EventEmitter implements StateManager<StateEvents> {
    get state(): State;
    protected get invalidStateMessage(): string;
    protected stateEventsEmitter: StateManager<StateEvents>;
    protected internalChannel: EventEmitter<string | symbol, any>;
    private _state;
    private limit;
    private pendingEvents;
    open(): Promise<this>;
    close(): Promise<void>;
    emit(event: string | symbol, ...args: any[]): boolean;
    protected abstract initialize(): Promise<void>;
    protected abstract cleanUp(): Promise<void>;
    protected validateState(): void;
    protected setState(state: State): void;
    private flushPendingEvents;
}
