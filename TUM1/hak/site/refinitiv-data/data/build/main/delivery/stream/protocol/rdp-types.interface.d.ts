export declare enum RDPRequestType {
    Close = "Close",
    Auth = "Auth",
    Subscribe = "Subscribe",
    Push = "Push",
    Modify = "Modify"
}
export declare enum RDPResponseType {
    Response = "Response",
    Update = "Update",
    Ack = "Ack",
    Alarm = "Alarm"
}
export declare enum RDPResponseStateType {
    Open = "Open",
    Closed = "Closed",
    ClosedRecover = "ClosedRecover",
    NonStreaming = "NonStreaming",
    Redirected = "Redirected"
}
export interface RDPLoginRequest {
    streamID: string;
    method: RDPRequestType.Auth;
    token?: string;
    authorization?: string;
    appKey?: string;
}
export interface RDPSubscribeRequest<T = RDPRequestType.Subscribe> {
    streamID: string;
    method: T;
    service?: string;
    context?: string;
    uuid?: string;
    universe?: any[];
    view?: string[];
    parameters?: any;
}
export interface RDPCloseRequest {
    streamID: string;
    method: RDPRequestType.Close;
}
export interface RDPModifyRequest<T = RDPRequestType.Modify> extends RDPSubscribeRequest<T> {
}
export interface RDPPushRequest {
    streamID: string;
    method: RDPRequestType.Push;
    universe: any;
}
export interface RDPResponseState {
    code: number;
    status: string;
    message?: string;
    stream?: RDPResponseStateType;
}
export interface RDPAckResponse {
    streamID?: string;
    type: RDPResponseType.Ack;
    state: RDPResponseState;
}
export interface RDPAlarmResponse {
    streamID?: string;
    type: RDPResponseType.Alarm;
    data: any;
}
export interface RDPResponseResponse {
    streamID: string;
    type: RDPResponseType.Response;
    headers?: any[];
    data?: any[][];
    fields?: {
        [field: string]: string | number | null | boolean;
    };
    name?: string;
    messages?: any[];
}
export interface RDPUpdateResponse {
    streamID: string;
    type: RDPResponseType.Update;
    fields?: {
        [field: string]: string | number | null | boolean;
    };
    headers?: any[];
    data?: any[][];
    name?: string;
    updateType?: string;
    messages?: any[];
    update?: any[];
    remove?: any[];
}
export interface RDPResponseResponseWithState extends RDPResponseResponse {
    state: RDPResponseState;
}
export declare type RDPRequest = RDPSubscribeRequest | RDPCloseRequest | RDPLoginRequest | RDPPushRequest | RDPModifyRequest;
export declare type RDPResponse = RDPAckResponse | RDPResponseResponse | RDPUpdateResponse | RDPAlarmResponse | RDPResponseResponseWithState;
