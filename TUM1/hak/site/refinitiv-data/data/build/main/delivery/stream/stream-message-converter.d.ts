/// <reference types="node" />
export declare const parseResponseMessage: <Res>(data: string | Buffer | ArrayBuffer | Buffer[]) => Res[];
export declare const getStreamConnectionError: (api: string) => string;
export declare const getStreamConnectionRecover: (api: string) => string;
export declare const getStreamConnectionReconnected: (api: string) => string;
export declare const getStreamConnectionRecoverError: (api: string) => string;
