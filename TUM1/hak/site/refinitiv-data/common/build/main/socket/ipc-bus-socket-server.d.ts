import EventEmitter from 'eventemitter3';
import { IpcBusService } from '../interfaces/ipc-bus-service';
export declare class IpcBusSocketServer extends EventEmitter {
    private channel;
    private serverHandshake;
    private socketHandlers;
    private subscription?;
    private ipcBus;
    constructor(ipcBus: IpcBusService, channel: string);
    connect(): Promise<void>;
    disconnect(): void;
}
