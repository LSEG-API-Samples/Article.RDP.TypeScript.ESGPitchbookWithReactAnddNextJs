export interface IpcBusReplySuccessMessage {
    reply: any;
    correlationId: string;
}
export interface IpcBusReplyErrorMessage {
    error: any;
    correlationId: string;
}
export declare type IpcBusReplyMessage = IpcBusReplyErrorMessage | IpcBusReplySuccessMessage;
export declare type IpcBusReplyHandler = (data: any) => Promise<any>;
