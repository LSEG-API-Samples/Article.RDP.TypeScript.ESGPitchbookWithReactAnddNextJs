import { IpcBusService } from '../interfaces/ipc-bus-service';
import { IpcBusSocket } from './ipc-bus-socket';
export declare class IpcBusSocketServerHandler extends IpcBusSocket {
    private ipcBus;
    private clientChannel;
    private serverChannel;
    private onDisconnect;
    isDisconnected: boolean;
    private subscription;
    constructor(ipcBus: IpcBusService, clientChannel: string, serverChannel: string, onDisconnect: () => void);
    send(message: string): void;
    sendRawMessage(message: string | object): void;
    close(): void;
}
