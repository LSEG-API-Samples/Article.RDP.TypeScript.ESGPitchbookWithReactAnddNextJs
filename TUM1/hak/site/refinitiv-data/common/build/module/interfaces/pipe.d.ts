/// <reference types="node" />
export declare type OnMessageCallback = (message: {
    data: string | Buffer | ArrayBuffer | Buffer[];
    type: string;
    target: any;
}) => void;
export declare type OnCloseCallback = (details: {
    reason: string;
    wasClean: boolean;
    target: any;
    code: number;
}) => void;
export declare type OnErrorCallback = (details: {
    error: Error;
    message: string;
    type: string;
    target: any;
}) => void;
export declare type OnOpenCallback = (details: {
    target: any;
}) => void;
export interface StreamTransport {
    onmessage?: OnMessageCallback;
    onclose?: OnCloseCallback;
    onerror?: OnErrorCallback;
    onopen?: OnOpenCallback;
    protocol?: string;
    binaryType: string;
    send(message: string): void;
    close(code?: number, data?: string): void;
}
