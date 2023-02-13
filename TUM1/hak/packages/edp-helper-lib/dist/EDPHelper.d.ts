declare type IpcBusCallback = (channel: string, data: any) => void;
interface IpcBusSubscription {
    unsubscribe(): void;
}
interface IpcBusService {
    subscribe(channel: string, callback: IpcBusCallback): IpcBusSubscription;
    unsubscribe(channel: string, callback: IpcBusCallback): void;
    publish(channel: string, data: any): void;
    connect(): Promise<void>;
}
declare class EDPHelper {
    appId: string;
    scopes: string[];
    bus: IpcBusService;
    private readonly DEFAULT_TIMEOUNT_FOR_REQEUST_TOKEN;
    private whitelist;
    private isListening;
    private listener;
    private listenerFromRWContainer;
    private listenerForGetTokenRWContainer;
    private subscription;
    private channel;
    private isNotifyTokenUpdated;
    private renewTokenTimer;
    private jetSubscribeCounter;
    private debugMode;
    private debugMessages;
    private jetFlowInitialized;
    private memoryStorage;
    private busInfo;
    private ipcInstance;
    private overrodeXhrOpen;
    private setTokenProperty;
    private getTokenProperty;
    private token;
    private validUntil;
    private lastUse;
    private mainInstance;
    private edpChannel;
    debug: boolean;
    readonly isReady: boolean;
    constructor();
    private initializeJETFlow;
    private initBus;
    private setAutoExtendRefreshTokenPeriod;
    private publishMessage;
    private printConsoleMessage;
    private handleGetAccessTokenFromJET;
    private handleCheckMainInstance;
    private handleEdpChannel;
    private handleValidUntil;
    private handleReceivedMessage;
    private getAccessTokenFromJET;
    private getTokenFromContainer;
    SetAutoXMLHttpHeader(whitelist: string[]): void;
    private isBusInitialized;
    getAccessToken(timeout?: number): Promise<string>;
    private getAccessTokenFromLocalStorage;
    private checkMainInstance;
    private listenForTokenChange;
    private removeListenForTokenChange;
    private listenTokenChange;
    private setTokenForXMLHttp;
    private isWorkspace;
    enableNotifyTokenChanged(isNotifyTokenUpdated: boolean): void;
    private enableRenewTokenAutomatically;
    private listenForTokenChangeFromRWContainer;
    private removeListenForTokenChangeFromRWContainer;
    private emitTokenChanged;
    /**
     * get current timestamp
     * @returns {string} - [HH:mm:ss.l]
     */
    private getTimestamp;
    clearAccessToken(): void;
}
declare const instance: EDPHelper;
export { instance as EDP };
