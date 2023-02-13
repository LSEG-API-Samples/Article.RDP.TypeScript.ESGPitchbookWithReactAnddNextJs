import { OAuthParams, PasswordGrant } from '.';
import { OAuthTokenResponse } from './payload';
export declare const DEFAULT_SCOPE = "trapi";
export declare const oAuthConverter: {
    getPasswordGrantPayload: (oAuthGrantType: PasswordGrant, appKey: string) => string;
    getRefreshGrantPayload: (oAuthGrantType: PasswordGrant, appKey: string, refreshToken: string) => string;
    parseTokenResponse: (loginResponse: OAuthTokenResponse) => OAuthParams;
};
