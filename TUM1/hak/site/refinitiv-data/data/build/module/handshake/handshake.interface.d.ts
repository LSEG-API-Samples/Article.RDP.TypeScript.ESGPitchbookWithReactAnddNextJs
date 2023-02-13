export interface HandshakeRequest {
    AppKey: string;
    AppScope: string;
    ApiVersion: string;
    LibraryName?: string;
    LibraryVersion?: string;
    Uuid?: string;
}
export interface HandshakeResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
