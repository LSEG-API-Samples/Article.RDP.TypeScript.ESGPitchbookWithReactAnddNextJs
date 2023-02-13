import { Dacs } from '../index';
export interface RdpAuthParams {
    accessToken: string;
    userName: string;
    dacs?: Dacs;
}
