import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { MainConstituentAssetClass, RiskType } from '../common-curves.interfaces';
export interface Params extends ExtendedParams {
    currency?: string;
    curveTag?: string;
    id?: string;
    indexName?: string;
    mainConstituentAssetClass?: MainConstituentAssetClass;
    name?: string;
    riskType?: RiskType;
    source?: string;
    valuationDate?: string;
}
export interface Content {
    universe: Params[];
}
