import { ExtendedParams } from '../../../base-interfaces/extended-params';
import { BaseDatesAndCalendars, HolidayOutput } from '../common-dates-and-calendars.interfaces';
export interface Params extends BaseDatesAndCalendars, ExtendedParams {
    tag?: string;
    startDate: string;
    endDate: string;
    holidayOutputs?: HolidayOutput[];
}
export interface HolidaysContent {
    tag?: string;
    holidays: Holiday[];
    error?: any;
}
interface Holiday {
    date: string;
    names?: any[];
    calendars?: string[];
    currencies?: string[];
}
export interface HolidaysContentResponse extends Holiday, Partial<Date> {
    tag?: string;
}
export interface Date {
    year: number;
    month: number;
    day: number;
}
export {};
