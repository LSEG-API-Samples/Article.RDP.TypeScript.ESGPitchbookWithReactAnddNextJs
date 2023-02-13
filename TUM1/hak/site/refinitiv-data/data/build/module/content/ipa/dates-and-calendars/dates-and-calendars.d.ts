import { AbstractContentProvider } from '../../abstract-content-provider';
import { ApiEndpoints, Session } from '../../../session';
import { ContentResponse } from '../../base-interfaces';
import * as AddPeriods from './add-periods';
import * as CountPeriods from './count-periods';
import * as DateSchedule from './date-schedule';
import * as Holidays from './holidays';
import * as IsWorkingDay from './is-working-day';
export declare class DatesAndCalendarsProvider extends AbstractContentProvider {
    apiGroup: keyof ApiEndpoints;
    endpointName: string;
    private dataAccessor;
    constructor(session: Session);
    getAddPeriods(paramsList: AddPeriods.Params[]): Promise<ContentResponse>;
    getCountPeriods(paramsList: CountPeriods.Params[]): Promise<ContentResponse>;
    getDateSchedule(paramsList: DateSchedule.Params[]): Promise<ContentResponse>;
    getHolidays(paramsList: Holidays.Params[]): Promise<ContentResponse>;
    getIsWorkingDay(paramsList: IsWorkingDay.Params[]): Promise<ContentResponse>;
    private validateParamsList;
    private normalizeParamsList;
    private getRequestParams;
    private getResponseData;
    private prepareHolidays;
    private getDate;
}
