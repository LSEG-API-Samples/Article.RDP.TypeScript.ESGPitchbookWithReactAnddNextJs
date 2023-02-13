import { SessionRequiredParams } from '../session.interface';
export interface DesktopSessionParams extends SessionRequiredParams {
    readonly port?: number;
    readonly scope?: string;
}
export interface DesktopAuthParams {
    appKey: string;
    accessToken?: string;
    tokenType?: string;
}
export declare const APPLICATION_ID_HEADER = "x-tr-applicationid";
export declare const AUTHORIZATION_HEADER = "Authorization";
