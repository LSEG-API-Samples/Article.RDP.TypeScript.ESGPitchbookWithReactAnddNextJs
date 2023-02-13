import { IpcBusService } from '../interfaces/ipc-bus-service';
export declare class ClientHandshake {
    private ipcBus;
    constructor(ipcBus: IpcBusService);
    connect(channel: string): Promise<void>;
}
