import { StreamingConnectionApi } from './streaming-connection-api';
export declare enum IpcBusSocketMessageType {
    Init = "init",
    Data = "data",
    Close = "close",
    Ping = "ping",
    Pong = "pong"
}
export interface SocketData {
    streamApi: StreamingConnectionApi;
    streamProtocol: string;
    [key: string]: any;
}
export interface IpcBusSocketCreateMessage {
    clientChannel: string;
    serverChannel: string;
    data: SocketData;
}
export interface IpcBusSocketInitMessage {
    type: IpcBusSocketMessageType.Init;
}
export interface IpcBusSocketDataMessage {
    type: IpcBusSocketMessageType.Data;
    data: string;
}
export interface IpcBusSocketCloseMessage {
    type: IpcBusSocketMessageType.Close;
    reason: string;
}
export interface IpcBusSocketPingMessage {
    type: IpcBusSocketMessageType.Ping;
}
export interface IpcBusSocketPongMessage {
    type: IpcBusSocketMessageType.Pong;
}
export declare type IpcBusSocketMessage = IpcBusSocketInitMessage | IpcBusSocketDataMessage | IpcBusSocketCloseMessage | IpcBusSocketPingMessage | IpcBusSocketPongMessage;
