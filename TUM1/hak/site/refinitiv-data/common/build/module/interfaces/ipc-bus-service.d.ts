export declare type IpcBusCallback = (channel: string, data: any) => void;
export interface IpcBusSubscription {
    unsubscribe(): void;
}
export interface IpcBusService extends BusCore {
    connect(): Promise<void>;
}
export interface WorkspaceSdkBus extends BusCore {
    connect?(): Promise<void>;
}
interface BusCore {
    subscribe(channel: string, callback: IpcBusCallback): IpcBusSubscription;
    unsubscribe(channel: string, callback: IpcBusCallback): void;
    publish(channel: string, data: any): void;
}
export {};
