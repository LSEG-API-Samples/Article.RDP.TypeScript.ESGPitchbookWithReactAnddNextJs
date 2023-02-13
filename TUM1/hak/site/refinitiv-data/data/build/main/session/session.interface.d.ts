import { HttpHeaders, HttpMethod } from '@refinitiv-data/common';
import { ConfigEndpoint, ConfigSchema, StreamingConnectionConfig } from '../config';
import { StateEvents, StateManager } from '../state';
declare const EventReceived: 'eventReceived';
export declare const SessionEvent: {
    EventReceived: "eventReceived";
    Error: "error";
    StateChanged: "stateChanged";
};
export declare enum SessionEventCode {
    AuthenticationFailed = "authenticationFailed",
    AuthenticationSucceeded = "authenticationSucceeded",
    RefreshFailed = "refreshFailed",
    RefreshSucceeded = "refreshSucceeded"
}
export declare enum SessionState {
    Opened = "Opened",
    Closed = "Closed",
    Pending = "Pending"
}
export interface SessionRequiredParams {
    appKey: string;
}
export interface SessionRequestParams {
    method: HttpMethod;
    query?: {};
    body?: {};
    headers?: HttpHeaders;
    url: string;
    handleAutoRedirect?: boolean;
}
export interface SessionEvents extends StateEvents {
    [EventReceived]: (session: Session, event: SessionEventCode, err?: Error) => void;
    [SessionEvent.Error]: (error: Error, session: Session) => void;
}
export interface Session extends StateManager<SessionEvents> {
    readonly rdpUrlRoot?: string;
}
export interface StreamingEndpoint {
    endpoint: string;
    port: string;
    location: string[];
    dataFormat: string[];
    provider: string;
    transport: string;
    locationId?: string;
    privateLink?: string;
    tier?: string;
}
export interface SessionStreamingEndpoints {
    services: StreamingEndpoint[];
}
export interface SessionDefinition {
    getSession(): Session;
}
export declare type ApiEndpoints = ConfigSchema['apis'];
export declare type ApiEndpoint = ConfigEndpoint | StreamingConnectionConfig;
export {};
