import { DeepPartial } from '@refinitiv-data/common';
import { LogLevelDesc as LogLevel } from 'loglevel';
export { LogLevel };
import { CONFIG_FILE_UPDATED, NEW_CONFIG_VALUE_SET } from './contracts';
export interface ConfigEvents<T> {
    [CONFIG_FILE_UPDATED]: (newConfig: T, source: string) => void;
    [NEW_CONFIG_VALUE_SET]: (newConfig: T, path: string, value: any) => void;
    [event: string]: (...args: any[]) => void;
}
export declare enum StreamingType {
    OMM = "OMM",
    RDP = "RDP"
}
export interface StreamingConnectionConfig {
    url: string;
    endpoints: {
        [key: string]: StreamingConnectionEndpointConfig;
    };
}
export interface StreamingConnectionEndpointConfig {
    protocols: StreamingType[];
    locations: string[];
    path: string;
    'websocket-url': string;
}
export interface ConfigEndpoint {
    url: string;
    endpoints: {
        [subpath: string]: string;
    };
}
export interface Datagrid extends ConfigEndpoint {
    'underlying-platform': UnderlyingPlatform;
    layout: PlatformLayout;
}
export declare const enum UnderlyingPlatform {
    RDP = "rdp",
    UDF = "udf"
}
export interface PlatformLayout {
    [UnderlyingPlatform.RDP]: {
        output: string;
    };
    [UnderlyingPlatform.UDF]: {
        layout: {
            columns: LayoutItem[];
            rows: LayoutItem[];
        };
    };
}
export interface LayoutItem {
    item: string;
    [key: string]: string;
}
export interface SessionBasicConfig {
    'base-url': string;
    apis?: DeepPartial<{
        data: {
            [endpointName: string]: ConfigEndpoint;
        };
        discovery: {
            [endpointName: string]: ConfigEndpoint;
        };
        streaming: {
            [connection: string]: StreamingConnectionConfig;
        };
    }>;
}
export interface DefaultPlatformSessionConfig extends SessionBasicConfig {
    'auto-reconnect': boolean;
    auth: {
        url: string;
        authorize: string;
        token: string;
    };
    'realtime-distribution-system': {
        url: string;
        dacs: {
            username: string;
            'application-id': string;
            position: string;
        };
    };
}
export interface DefaultDesktopSessionConfig extends SessionBasicConfig {
    'platform-paths': {
        rdp: string;
        udf: string;
    };
    'handshake-url': string;
}
export interface ConfigEnvironment {
    platform: string;
    dir: string;
}
export interface ConfigConsoleTransport {
    enabled: boolean;
}
export interface ConfigFileTransport {
    enabled: boolean;
    name: string;
    size: string;
    interval: string;
    maxFiles: number;
    maxSize: string;
    history: string;
}
export interface HttpConfig {
    'request-timeout': number;
}
export interface ConfigSchema extends ConfigEnvironment {
    'config-change-notifications-enabled': boolean;
    http: HttpConfig;
    logs: {
        level: LogLevel;
        filter: string;
        transports: {
            console: ConfigConsoleTransport;
            file: ConfigFileTransport;
            [transportName: string]: any;
        };
    };
    sessions: {
        platform: {
            'default-session': DefaultPlatformSessionConfig;
            [customSession: string]: Partial<DefaultPlatformSessionConfig>;
        };
        desktop: {
            'default-session': DefaultDesktopSessionConfig;
            [customSession: string]: Partial<DefaultDesktopSessionConfig>;
        };
    };
    apis: {
        data: {
            'historical-pricing': {
                url: string;
                endpoints: {
                    events: string;
                    'interday-summaries': string;
                    'intraday-summaries': string;
                };
            };
            'quantitative-analytics-financial-contracts': {
                url: string;
                endpoints: {
                    'financial-contracts': string;
                };
            };
            'quantitative-analytics-curves-and-surfaces': {
                url: string;
                endpoints: {
                    'forward-curves': string;
                    surfaces: string;
                    'zc-curves': string;
                    'zc-curve-definitions': string;
                };
            };
            'quantitative-analytics-dates-and-calendars': {
                url: string;
                endpoints: {
                    'add-periods': string;
                    c3: string;
                    'count-periods': string;
                    'date-schedule': string;
                    holidays: string;
                    'is-working-day': string;
                };
            };
            news: {
                url: string;
                endpoints: {
                    headlines: string;
                    stories: string;
                };
            };
            'environmental-social-governance': {
                url: string;
                endpoints: {
                    universe: string;
                    basic: string;
                    'measures-full': string;
                    'measures-standard': string;
                    'scores-full': string;
                    'scores-standard': string;
                };
            };
            datagrid: {
                url: string;
                endpoints: {
                    standard: string;
                };
                'underlying-platform': UnderlyingPlatform;
                layout: PlatformLayout;
            };
            [endpointName: string]: ConfigEndpoint | Datagrid;
        };
        discovery: {
            search: {
                url: string;
                endpoints: {
                    search: string;
                    lookup: string;
                    metadata: string;
                };
            };
            [endpointName: string]: ConfigEndpoint;
        };
        streaming: {
            pricing: StreamingConnectionConfig;
            'trading-analytics': StreamingConnectionConfig;
            'quantitative-analytics': StreamingConnectionConfig;
            benchmark: StreamingConnectionConfig;
            'custom-instruments': StreamingConnectionConfig;
            [connection: string]: StreamingConnectionConfig;
        };
    };
}
