import { TableInterface } from '../base-interfaces';
export declare type SessionType = 'normal' | 'pre' | 'post';
export interface Content {
    start?: string;
    end?: string;
    count?: number;
    fields?: string[];
    sessions?: SessionType[];
}
export declare enum IntradayInterval {
    ONE_MINUTE = "PT1M",
    FIVE_MINUTES = "PT5M",
    TEN_MINUTES = "PT10M",
    THIRTY_MINUTES = "PT30M",
    SIXTY_MINUTES = "PT60M",
    ONE_HOUR = "PT1H"
}
export declare enum InterdayInterval {
    DAILY = "P1D",
    SEVEN_DAYS = "P7D",
    WEEKLY = "P1W",
    MONTHLY = "P1M",
    QUARTERLY = "P3M",
    TWELVE_MONTHS = "P12M",
    YEARLY = "P1Y"
}
export declare type Table = TableInterface<TableRow>;
export interface TableRow {
    [key: string]: string | number;
}
