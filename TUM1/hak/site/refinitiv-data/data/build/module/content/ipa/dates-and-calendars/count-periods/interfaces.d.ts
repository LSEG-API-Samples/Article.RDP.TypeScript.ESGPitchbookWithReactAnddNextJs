import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { BaseDatesAndCalendars, PeriodType } from '../common-dates-and-calendars.interfaces';
import { DayCountBasisConvention } from '../../ipa-common-models';
export interface Params extends BaseDatesAndCalendars, ExtendedParams {
    tag?: string;
    endDate: string;
    startDate: string;
    periodType?: PeriodType;
    dayCountBasis?: DayCountBasisConvention;
}
