export interface IpcBusRequesterInterface {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    request(channel: string, message: object): Promise<any>;
}
export interface IpcBusRequestMessage {
    meta: {
        replyTo: string;
        correlationId: string;
    };
    content: any;
}
