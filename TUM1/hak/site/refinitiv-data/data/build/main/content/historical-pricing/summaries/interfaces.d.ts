import { ExtendedParams } from '../../base-interfaces/extended-params';
import { Content as HistoricalPricingContent, InterdayInterval, IntradayInterval } from '../historical-pricing.interface';
export { InterdayInterval, IntradayInterval, SessionType, Table, TableRow } from '../historical-pricing.interface';
export declare type TimestampLabel = 'startPeriod' | 'endPeriod';
export declare type Adjustment = 'unadjusted ' | 'exchangeCorrection' | 'manualCorrection' | 'CCH' | 'CRE' | 'RPO' | 'RTS';
export interface Params extends HistoricalPricingContent, ExtendedParams {
    interval?: InterdayInterval | IntradayInterval;
    adjustments?: Adjustment[];
    summaryTimestampLabel?: TimestampLabel;
    universe: string;
}
export declare type Content = Pick<Params, Exclude<keyof Params, 'universe'>>;
