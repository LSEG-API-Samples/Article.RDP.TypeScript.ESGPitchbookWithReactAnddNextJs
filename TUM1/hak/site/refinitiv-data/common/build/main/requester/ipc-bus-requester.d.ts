import { IpcBusRequesterInterface } from '../interfaces/ipc-bus-requester';
import { IpcBusService } from '../interfaces/ipc-bus-service';
import { IpcBusServiceOptions } from '../interfaces/ipc-bus-service-options';
export declare class IpcBusRequester implements IpcBusRequesterInterface {
    private service;
    private idToCallbackMap;
    private subscription?;
    private replyChannel;
    private isConnected;
    private clientHandshake;
    private requestCount;
    private ipcBus;
    constructor(ipcBus: IpcBusService, service: string, options?: IpcBusServiceOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    request(channel: string, message: object): Promise<any>;
    private listenForResponses;
}
