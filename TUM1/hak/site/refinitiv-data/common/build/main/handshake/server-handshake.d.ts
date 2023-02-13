import { IpcBusService } from '../interfaces/ipc-bus-service';
export declare class ServerHandshake {
    private ipcBus;
    private subscription;
    constructor(ipcBus: IpcBusService);
    connect(channel: string): Promise<void>;
    disconnect(): void;
}
