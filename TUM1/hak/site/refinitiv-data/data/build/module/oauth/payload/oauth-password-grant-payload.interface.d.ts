import { GrantType } from '../grant-type.enum';
export interface OAuthPasswordGrantPayload {
    scope: string;
    grant_type: GrantType;
    username: string;
    password: string;
    takeExclusiveSignOnControl?: boolean;
    client_id: string;
}
