import { DayCountBasisConvention, PriceSide } from '../../ipa-common-models';
import { CalendarAdjustment, ConvexityAdjustment, ExtrapolationMode, InterpolationMode, MainConstituentAssetClass, RiskType, Step, Turn, ZcCurveDefinition } from '../common-curves.interfaces';
import { ContentDefinition } from '../../../base-interfaces';
import { ExtendedParams } from '../../../base-interfaces/extended-params';
import * as ZcCurve from '../zc-curve/interfaces';
export interface CurveDefinition {
    currency?: string;
    discountingTenor?: string;
    id?: string;
    indexName?: string;
    indexTenors?: string[];
    mainConstituentAssetClass?: MainConstituentAssetClass;
    name?: string;
    pivotCurveDefinition?: ZcCurveDefinition;
    referenceCurveDefinition?: ZcCurveDefinition;
    riskType?: RiskType;
    source?: string;
}
interface Outputs {
    outputs: string[];
}
export interface ZcCurveMainParameters {
    calendarAdjustment?: CalendarAdjustment;
    calendars?: string[];
    convexityAdjustment?: ConvexityAdjustment;
    extrapolationMode?: ExtrapolationMode;
    interestCalculationMethod?: DayCountBasisConvention;
    interpolationMode?: InterpolationMode;
    pivotCurveParameters?: Parameters;
    priceSide?: PriceSide;
    referenceCurveParameters?: Parameters;
    referenceTenor?: string;
    steps?: Step[];
    turns?: Turn[];
    useConvexityAdjustment?: boolean;
    useMultiDimensionalSolver?: boolean;
    useSteps?: boolean;
    valuationDate?: string;
}
export interface Parameters {
    calendarAdjustment?: CalendarAdjustment;
    calendars?: string[];
    convexityAdjustment?: ConvexityAdjustment;
    extrapolationMode?: ExtrapolationMode;
    interestCalculationMethod?: DayCountBasisConvention;
    interpolationMode?: InterpolationMode;
    priceSide?: PriceSide;
    referenceTenor?: string;
    steps?: Step[];
    turns?: Turn[];
    useConvexityAdjustment?: boolean;
    useMultiDimensionalSolver?: boolean;
    useSteps?: boolean;
}
export interface RequestItem {
    curveDefinition: CurveDefinition;
    curveParameters?: ZcCurveMainParameters;
    curveTag?: string;
}
export interface Params extends Partial<Outputs>, ExtendedParams {
    universe: Array<ContentDefinition<any, ZcCurve.Params>>;
}
export declare type Content = ZcCurve.Content;
export {};
