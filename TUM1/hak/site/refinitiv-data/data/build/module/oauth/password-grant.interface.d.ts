export interface PasswordGrant {
    scope?: string;
    takeSignOnControl?: boolean;
    userName: string;
    password: string;
}
