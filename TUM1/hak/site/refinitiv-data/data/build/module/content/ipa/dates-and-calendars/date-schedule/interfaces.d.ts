import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { BaseDatesAndCalendars, Frequency, DayOfWeek } from '../common-dates-and-calendars.interfaces';
export interface Params extends BaseDatesAndCalendars, ExtendedParams {
    startDate?: string;
    endDate?: string;
    count?: number;
    frequency: Frequency;
    calendarDayOfMonth?: number;
    dayOfWeek?: DayOfWeek;
}
