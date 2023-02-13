import { Session } from '../../session';
import * as FundamentalAndReference from './interfaces';
export declare class FundamentalReferenceUtil {
    private static isNonRealTimeField;
    static filterRealTimeFields(fields: string | Array<string | FundamentalAndReference.UdfField> | FundamentalAndReference.UdfField): string | Array<string | FundamentalAndReference.UdfField> | FundamentalAndReference.UdfField;
    static formatItems(items: string | Array<string | FundamentalAndReference.UdfField> | FundamentalAndReference.UdfField): string[] | FundamentalAndReference.UdfField[] | Array<string | FundamentalAndReference.UdfField>;
    static formatUdfFields(fields: string | Array<string | FundamentalAndReference.UdfField> | FundamentalAndReference.UdfField): FundamentalAndReference.UdfField[];
    static getWaitDuration(duration: number): number;
    static formatResponseHeaders(headers: FundamentalAndReference.UdfResponseHeader[][]): FundamentalAndReference.ResponseHeader[];
    static validateUdfErrors(response: any): void;
    static isPlatformSession(session: Session): boolean;
}
