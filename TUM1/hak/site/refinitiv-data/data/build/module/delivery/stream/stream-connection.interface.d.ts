import { StreamTransport } from '@refinitiv-data/common';
import { ExtendedParams } from '../../content/base-interfaces/extended-params';
import { StateEvents, StateManager } from '../../state';
declare const AuthenticationSuccess: 'authenticationSuccess';
declare const AuthenticationFailed: 'authenticationFailed';
export declare const StreamConnectionEvent: {
    AuthenticationFailed: "authenticationFailed";
    AuthenticationSuccess: "authenticationSuccess";
    Error: "error";
    StateChanged: "stateChanged";
};
export interface StreamConnection<Res> extends StateManager<StreamConnectionEvents<Res>> {
    request(streamRequest: StreamRequestParams): Promise<number>;
    closeRequest(ID: number): Promise<void>;
    modifyRequest(ID: number, params: StreamRequestParams): Promise<void>;
    refresh(): Promise<void>;
}
export interface StreamConnectionEvents<T> extends StateEvents {
    [AuthenticationSuccess]: (streamConnection: StreamConnection<T>) => void;
    [AuthenticationFailed]: (streamConnection: StreamConnection<T>, err: Error) => void;
    [prop: string]: (...args: any) => void;
}
export declare const STREAM_FIRST_REQUEST_ID = 1;
export interface StreamLoginParams {
    authenticationToken?: string;
    nameType?: string;
    name?: string;
    appKey?: string;
    authorization?: string;
    position?: string;
    applicationId?: string;
}
export interface StreamRequestParams extends ExtendedParams {
    filter?: number;
    service?: string;
    name?: string | object | any[];
    domain?: string;
    streaming?: boolean;
    view?: string[];
    parameters?: object;
}
export declare const StreamReconnectIntervals: {
    WEB: number[];
    NODEJS: number[];
};
export declare const PING_TIMEOUT = 30;
export declare type socketCreator = () => StreamTransport;
export {};
