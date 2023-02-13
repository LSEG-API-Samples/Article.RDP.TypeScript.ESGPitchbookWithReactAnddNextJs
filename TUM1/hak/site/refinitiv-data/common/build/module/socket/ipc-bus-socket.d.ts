import { IpcBusSocketDataMessage } from '../interfaces/ipc-bus-socket';
import { OnCloseCallback, OnErrorCallback, OnMessageCallback, OnOpenCallback, StreamTransport } from '../interfaces/pipe';
export declare const PING_TIMEOUT: number;
export declare abstract class IpcBusSocket implements StreamTransport {
    onmessage?: OnMessageCallback;
    onclose?: OnCloseCallback;
    onerror?: OnErrorCallback;
    onopen?: OnOpenCallback;
    protocol?: string;
    binaryType: string;
    protected pingSuccess: boolean;
    private timerId;
    abstract send(message: string): void;
    abstract close(): void;
    protected abstract sendRawMessage(message: string | object): void;
    protected startPing(): void;
    protected stopPing(): void;
    protected formatMessage(message: string): IpcBusSocketDataMessage;
    protected onMessage(message: object | string): void;
}
