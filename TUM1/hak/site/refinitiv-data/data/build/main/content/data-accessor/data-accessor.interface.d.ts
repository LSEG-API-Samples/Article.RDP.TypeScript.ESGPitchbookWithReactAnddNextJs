import { HttpMethod } from '@refinitiv-data/common';
import { FundamentalAndReference, HistoricalPricing, IPA, News, Search, SymbolConversion } from '../index';
export declare type DataAccessorContentQuery = News.Headlines.Content | News.Story.Content | HistoricalPricing.Events.Content | HistoricalPricing.Summaries.Content;
export declare type DataAccessorContentBody = SymbolConversion.Content | Search.Content | IPA.FinancialContracts.Content | IPA.Surfaces.Eti.Content | IPA.Surfaces.Fx.Content | IPA.Surfaces.Cap.Content | IPA.Surfaces.Swaption.Content | IPA.Curves.ForwardCurve.Content | IPA.Curves.ForwardCurves.Content | IPA.Curves.ZcCurveDefinition.Content | IPA.Curves.ZcCurveDefinitions.Content | IPA.Curves.ZcCurve.Content | IPA.Curves.ZcCurves.Content | IPA.DatesAndCalendars.AddPeriods.Params[] | IPA.DatesAndCalendars.CountPeriods.Params[] | IPA.DatesAndCalendars.DateSchedule.Params | IPA.DatesAndCalendars.Holidays.Params[] | IPA.DatesAndCalendars.IsWorkingDay.Params[] | FundamentalAndReference.Params | FundamentalAndReference.UdfParams;
export interface DataAccessorRequest<TQuery extends DataAccessorContentQuery = any, TBody extends DataAccessorContentBody = any> {
    readonly url: string;
    readonly method?: HttpMethod;
    readonly dataAccessorContentQuery?: TQuery;
    readonly dataAccessorContentBody?: TBody;
    postGetDataHandler?(data: any): any;
}
export interface DataAccessor {
    getData<TRequest extends DataAccessorRequest>(request: TRequest): Promise<any>;
}
