import { Pricing } from '../../../content';
import * as Metadata from '../../../content/pricing/metadata';
export interface OMMOpenRequestKey {
    readonly Filter?: number;
    readonly Service?: string;
    readonly Name: string | string[];
}
export interface OMMOpenRequest {
    readonly ID: number;
    readonly Domain?: string;
    readonly Streaming?: boolean;
    readonly View?: string[];
    readonly Key: OMMOpenRequestKey;
    readonly Type?: OMMRequestType.Request;
}
export declare type OMMBatchOpenRequest = OMMOpenRequest & {
    Key: {
        Name: string[];
    };
};
export declare type OMMSingleOpenRequest = OMMOpenRequest & {
    Key: {
        Name: string;
    };
};
export declare enum OMMResponseStateType {
    Open = "Open",
    Closed = "Closed",
    ClosedRecover = "ClosedRecover",
    NonStreaming = "NonStreaming",
    Redirected = "Redirected"
}
export declare enum OMMResponseType {
    Status = "Status",
    Error = "Error",
    Ping = "Ping",
    Pong = "Pong",
    Update = "Update",
    Refresh = "Refresh"
}
export declare enum OMMRequestType {
    Close = "Close",
    Pong = "Pong",
    Ping = "Ping",
    Request = "Request",
    Post = "Post"
}
export interface OMMLoginRequest {
    ID: number;
    Domain: 'Login';
    Type?: OMMRequestType.Request;
    Key: {
        Elements?: {
            ApplicationId?: string;
            Position?: string;
            Authorization?: string;
            AuthenticationToken?: string;
            AppKey?: string;
        };
        Name?: string;
        NameType?: string;
    };
}
export interface OMMPongRequest {
    Type: OMMRequestType.Pong;
}
export interface OMMPingRequest {
    Type: OMMRequestType.Ping;
}
export interface OMMCloseRequest {
    Type: OMMRequestType.Close;
    ID: number;
}
export interface OMMPostRequest {
    Type: OMMRequestType.Post;
    ID: number;
}
export declare type OMMRequest = OMMPongRequest | OMMCloseRequest | OMMOpenRequest | OMMLoginRequest | OMMPostRequest | OMMPingRequest;
export interface OMMResponseState {
    Code?: number | string;
    Data: number | string;
    Stream: OMMResponseStateType;
    Text?: string;
}
export declare type OMMFieldValue = string | number | null | boolean;
export interface OMMFields {
    [field: string]: OMMFieldValue;
}
export declare type OMMResponse = OMMRefreshResponse | OMMUpdateResponse | OMMStatusResponse | OMMErrorResponse | OMMPingResponse | OMMPongResponse;
export interface OMMPingResponse {
    Type: OMMResponseType.Ping;
}
export interface OMMPongResponse {
    Type: OMMResponseType.Pong;
}
export interface OMMRefreshResponse {
    ID: number;
    Type: OMMResponseType.Refresh;
    Domain?: string;
    Complete?: boolean;
    Fields?: OMMFields;
    SeqNumber?: number;
    Elements?: any;
    Key?: any;
    State?: OMMResponseState;
    Map?: {
        KeyType: string;
        Entries: Pricing.ServiceDirectory.Response[];
    };
    Series?: Metadata.FieldDictionaryResponse | Metadata.EnumDictionaryResponse;
}
export interface OMMUpdateResponse {
    ID: number;
    Type: OMMResponseType.Update;
    Fields?: OMMFields;
    SeqNumber?: number;
    State?: OMMResponseState;
    Map?: {
        KeyType: string;
        Entries: Pricing.ServiceDirectory.Response[];
    };
    Series?: Metadata.FieldDictionaryResponse | Metadata.EnumDictionaryResponse;
}
export interface OMMStatusResponse {
    ID?: number;
    Type: OMMResponseType.Status;
    Domain?: string;
    Elements?: any;
    State: OMMResponseState;
    Key?: any;
}
export interface OMMErrorResponse {
    ID?: number;
    Type: OMMResponseType.Error;
    Debug?: {
        File: string;
        Line: number;
        Message: string;
        Offset: number;
    };
    Text: string;
}
