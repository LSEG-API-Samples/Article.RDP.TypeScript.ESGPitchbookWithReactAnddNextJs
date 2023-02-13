import { IpcBusReplyHandler } from '../interfaces/ipc-bus-replier';
import { IpcBusService, IpcBusSubscription } from '../interfaces/ipc-bus-service';
export declare class IpcBusReplier {
    private service;
    private serverHandshake;
    private ipcBus;
    constructor(ipcBus: IpcBusService, service: string);
    connect(): Promise<void>;
    handleRequest(channel: string, handler: IpcBusReplyHandler): IpcBusSubscription;
    start(): Promise<void>;
    disconnect(): void;
}
