import { ExtendedParams } from '../../base-interfaces/extended-params';
import { Content as HistoricalPricingContent } from '../historical-pricing.interface';
export { InterdayInterval, IntradayInterval, SessionType, Table, TableRow } from '../historical-pricing.interface';
export declare type EventType = 'trade' | 'quote' | 'correction';
export declare type Adjustment = 'unadjusted ' | 'exchangeCorrection' | 'manualCorrection' | 'CCH' | 'CRE' | 'RPO' | 'RTS' | 'qualifiers';
export interface Params extends HistoricalPricingContent, ExtendedParams {
    eventTypes?: EventType[];
    adjustments?: Adjustment[];
    universe: string;
}
export declare type Content = Pick<Params, Exclude<keyof Params, 'universe'>>;
