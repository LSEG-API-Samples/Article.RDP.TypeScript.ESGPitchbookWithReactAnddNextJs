import { IpcBusService } from '../interfaces/ipc-bus-service';
import { IpcBusServiceOptions } from '../interfaces/ipc-bus-service-options';
import { IpcBusSocket } from './ipc-bus-socket';
import { StreamingConnectionApi } from '../interfaces';
export declare class IpcBusSocketClient extends IpcBusSocket {
    private channelName;
    private streamApi;
    private streamProtocol;
    private serverChannel?;
    private clientChannel?;
    private subscription?;
    private clientHandshake;
    private ipcBus;
    constructor(ipcBus: IpcBusService, channelName: string, streamApi: StreamingConnectionApi, streamProtocol: string, options?: IpcBusServiceOptions);
    close(): void;
    connect(): Promise<void>;
    send(message: string): void;
    sendRawMessage(message: object | string): void;
    private generateChannelsName;
}
