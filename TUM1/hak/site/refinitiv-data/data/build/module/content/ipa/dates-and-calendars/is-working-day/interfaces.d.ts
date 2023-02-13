import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { BaseDatesAndCalendars, HolidayOutput } from '../common-dates-and-calendars.interfaces';
export interface Params extends BaseDatesAndCalendars, ExtendedParams {
    tag?: string;
    date: string;
    holidayOutputs?: HolidayOutput[];
}
