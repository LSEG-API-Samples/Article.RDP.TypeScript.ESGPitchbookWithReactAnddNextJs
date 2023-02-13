import { AbstractStateManager } from './state-manager';
export declare abstract class AbstractReconnectStateManager extends AbstractStateManager {
    protected log: import("loglevel").Logger;
    private reconnectTimeout?;
    private environment;
    private reconnectLimit;
    private firstInitFailed;
    private firstInitSuccess;
    private reconnectFailed;
    private onCleanUp?;
    open(): Promise<this>;
    close(): Promise<void>;
    protected closeWithKeptReconnect(): Promise<void>;
    private reopen;
    private openFirstTime;
    private reconnect;
    private recover;
}
