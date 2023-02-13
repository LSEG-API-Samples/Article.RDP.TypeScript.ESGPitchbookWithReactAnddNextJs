import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { BaseDatesAndCalendars, HolidayOutput, DateMovingConvention, EndOfMonthConvention } from '../common-dates-and-calendars.interfaces';
export interface Params extends BaseDatesAndCalendars, ExtendedParams {
    tag?: string;
    period: string;
    startDate: string;
    holidayOutputs?: HolidayOutput[];
    dateMovingConvention?: DateMovingConvention;
    endOfMonthConvention?: EndOfMonthConvention;
}
