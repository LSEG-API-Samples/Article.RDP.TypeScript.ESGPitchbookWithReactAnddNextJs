import { CalendarAdjustment, ConvexityAdjustment, ExtrapolationMode, InterpolationMode, MainConstituentAssetClass, RiskType, Step, Turn } from '../common-curves.interfaces';
import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { DayCountBasisConvention, PriceSide } from '../../ipa-common-models';
export interface CurveDefinition {
    forwardCurveTag: string;
    indexTenor: string;
    forwardStartDate: string;
    forwardCurveTenors?: string[];
    forwardStartTenor?: string;
}
interface Outputs {
    outputs: string[];
}
export interface Params extends Partial<Outputs>, ExtendedParams {
    curveDefinition: SwapZcCurveDefinition;
    forwardCurveDefinitions: CurveDefinition[];
    curveParameters?: SwapZcCurveParameters;
    curveTag?: string;
}
export interface SwapZcCurveDefinition extends Partial<Outputs> {
    currency?: string;
    discountingTenor?: string;
    id?: string;
    indexName?: string;
    indexTenors?: string[];
    mainConstituentAssetClass?: MainConstituentAssetClass;
    name?: string;
    riskType?: RiskType;
    source?: string;
}
export interface SwapZcCurveParameters {
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
    valuationDate?: string;
}
export interface Content extends Partial<Outputs> {
    universe: Params[];
}
export {};
