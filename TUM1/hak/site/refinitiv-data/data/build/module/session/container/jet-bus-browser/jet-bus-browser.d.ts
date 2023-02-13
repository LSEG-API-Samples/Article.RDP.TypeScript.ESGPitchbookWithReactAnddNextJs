import { IpcBusCallback, IpcBusService, IpcBusSubscription } from '@refinitiv-data/common';
export declare class JETBusBrowser implements IpcBusService {
    private JET;
    private channelMap;
    constructor();
    subscribe(channel: string, callback: IpcBusCallback): IpcBusSubscription;
    unsubscribe(channel: string, callback: IpcBusCallback): void;
    publish(channel: string, data: any): void;
    connect(): Promise<void>;
    private jetCallback;
}
