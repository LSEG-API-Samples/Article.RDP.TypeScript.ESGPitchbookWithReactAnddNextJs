import { Dacs } from '@refinitiv-data/common';
import { SessionRequiredParams } from '../session.interface';
export declare type PlatformSessionParamsAll = Partial<CombinedParams>;
export declare type PlatformSessionParams = HostParams | RdpParams | CombinedParams;
export declare type CombinedParams = RdpParams & HostParams;
export interface RdpParams extends SessionRequiredParams {
    readonly userName: string;
    readonly password: string;
    readonly scope?: string;
    readonly takeSignOnControl?: boolean;
    readonly dacs?: Dacs;
}
export interface HostParams extends SessionRequiredParams {
    readonly host?: string;
    readonly dacs?: Dacs;
}
