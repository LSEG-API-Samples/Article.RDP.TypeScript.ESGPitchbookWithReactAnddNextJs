import { IpcBusCallback, IpcBusService, IpcBusSubscription } from '../interfaces/ipc-bus-service';
export declare class StringifyIpcBusService implements IpcBusService {
    protected ipcBusService: IpcBusService;
    constructor(ipcBusService: IpcBusService);
    subscribe(channel: string, callback: IpcBusCallback): IpcBusSubscription;
    unsubscribe(channel: string, callback: IpcBusCallback): void;
    publish(channel: string, data: any): void;
    connect(): Promise<void>;
}
