import EventEmitter from 'eventemitter3';
export interface AccessTokenProvider extends EventEmitter<TokenProviderEvents> {
    login(): Promise<void>;
    getToken(): string;
    stopRefresh(): void;
}
export declare enum TokenProviderEvent {
    AuthenticationFailed = "AuthFailed",
    AuthenticationSucceeded = "AuthOk",
    RefreshFailed = "RefreshFailed",
    RefreshSucceeded = "RefreshOk",
    TokenExpired = "TokenExpired"
}
export interface TokenProviderEvents {
    [TokenProviderEvent.AuthenticationSucceeded]: (token: string) => void;
    [TokenProviderEvent.AuthenticationFailed]: (error: Error) => void;
    [TokenProviderEvent.RefreshSucceeded]: (token: string) => void;
    [TokenProviderEvent.RefreshFailed]: (error: Error) => void;
    [TokenProviderEvent.TokenExpired]: (error: Error) => void;
}
