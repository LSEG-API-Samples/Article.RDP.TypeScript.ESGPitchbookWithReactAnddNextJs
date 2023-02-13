export interface OAuthRefreshGrantPayload {
    grant_type: string;
    username: string;
    refresh_token: string;
    takeExclusiveSignOnControl?: boolean;
    client_id: string;
}
