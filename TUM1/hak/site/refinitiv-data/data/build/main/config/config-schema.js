"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG_SCHEMA = void 0;
const get_position_1 = require("../util/get-position");
const config_interfaces_1 = require("./config.interfaces");
const contracts_1 = require("./contracts");
exports.DEFAULT_CONFIG_SCHEMA = {
    platform: {
        default: contracts_1.DEFAULT_CONFIG_PLATFORM,
        doc: 'Environment variable which platform we are working on (beta/prod/feat1/....)',
        env: 'RDPLIB_ENV',
        format: String,
    },
    dir: {
        default: contracts_1.DEFAULT_CONFIG_DIR,
        doc: 'Directory where configuration files are saved',
        env: 'RDPLIB_ENV_DIR',
        format: String,
    },
    'config-change-notifications-enabled': {
        default: false,
        doc: 'Is watch mode for configuration files is enabled',
        format: Boolean,
    },
    http: {
        'request-timeout': {
            default: 10,
            doc: 'Max timeout for any HTTP request sent by a library',
            format: Number,
        },
    },
    logs: {
        level: {
            default: 'info',
            doc: 'Level of logs to be printed',
            format: [
                0,
                1,
                2,
                3,
                4,
                5,
                'trace',
                'debug',
                'info',
                'warn',
                'error',
                'silent',
                'TRACE',
                'DEBUG',
                'INFO',
                'WARN',
                'ERROR',
                'SILENT',
            ],
        },
        filter: {
            default: '*',
            doc: 'Filter logs by module name. By default all logs are printed',
            format: String,
        },
        transports: {
            console: {
                enabled: {
                    default: true,
                    doc: 'Defines if logs will be written into the console',
                    format: Boolean,
                },
            },
            file: {
                enabled: {
                    default: false,
                    doc: 'Defines if logs will be written into the file',
                    format: Boolean,
                },
                name: {
                    default: 'refinitiv-data-lib',
                    doc: 'File to save logs of the RDP TS Library',
                    format: String,
                },
                size: {
                    default: '10M',
                    doc: 'Maximum size of a single log file',
                    format: String,
                },
                interval: {
                    default: '1d',
                    doc: 'Period of log files rotation. Default to every midnight',
                    format: String,
                },
                maxFiles: {
                    default: 10,
                    doc: 'Maximum count of log files for te current process',
                    format: Number,
                },
                maxSize: {
                    default: '1G',
                    doc: 'Maximum total size of all log files together for the current process',
                    format: String,
                },
                history: {
                    default: 'log-rotation',
                    doc: 'Name of the file to save logs rotation history',
                    format: String,
                },
            },
        },
    },
    sessions: {
        platform: {
            'default-session': {
                'auto-reconnect': {
                    default: false,
                    doc: 'This flag defines should the session automatically re-authenticate when an access token becomes expired',
                },
                'base-url': {
                    default: 'https://api.refinitiv.com',
                    doc: 'Platform session base url',
                    format: String,
                },
                'realtime-distribution-system': {
                    url: {
                        default: '',
                        doc: 'Real-Time Distribution System url.',
                        format: String,
                    },
                    dacs: {
                        username: {
                            default: '',
                            doc: 'Default user name to be used for the connection through the Real-Time Distribution System.',
                            format: String,
                        },
                        'application-id': {
                            default: '',
                            doc: 'Default application id to be used for the connection through the Real-Time Distribution System.',
                            format: String,
                        },
                        position: {
                            default: get_position_1.getPosition(),
                            doc: 'Default position identifier for the Real-Time Distribution System.',
                            format: String,
                        },
                    },
                },
                auth: {
                    url: {
                        default: '/auth/oauth2/v1',
                        doc: 'Base url path for "Auth" endpoint',
                        format: String,
                    },
                    authorize: {
                        default: '/authorize',
                        doc: 'Subpath for Auth endpoint to authorize a user',
                        format: String,
                    },
                    token: {
                        default: '/token',
                        doc: 'Subpath for Auth endpoint to retrieve an access token',
                        format: String,
                    },
                },
            },
        },
        desktop: {
            'default-session': {
                'base-url': {
                    default: 'http://localhost:9000',
                    doc: 'Desktop session base url',
                    env: 'DP_PROXY_BASE_URL',
                    format: String,
                },
                'platform-paths': {
                    rdp: {
                        default: '/api/rdp',
                        doc: 'RDP platform root path',
                        format: String,
                    },
                    udf: {
                        default: '/api/udf',
                        doc: 'UDF root path',
                        format: String,
                    },
                },
                'handshake-url': {
                    default: '/api/handshake',
                    doc: 'Handshake endpoint for desktop-session handshake',
                    format: String,
                },
            },
        },
    },
    apis: {
        data: {
            'historical-pricing': {
                url: {
                    default: '/data/historical-pricing/v1',
                    doc: 'Base url path for "HistoricalPricing" endpoint',
                    format: String,
                },
                endpoints: {
                    events: {
                        default: '/views/events',
                        doc: 'Subpath for HistoricalPricing endpoint to retrieve the "events" data',
                        format: String,
                    },
                    'interday-summaries': {
                        default: '/views/interday-summaries',
                        doc: 'Subpath for HistoricalPricing endpoint to retrieve the "events" data',
                        format: String,
                    },
                    'intraday-summaries': {
                        default: '/views/intraday-summaries',
                        doc: 'Subpath for HistoricalPricing endpoint to retrieve the "events" data',
                        format: String,
                    },
                },
            },
            'quantitative-analytics-financial-contracts': {
                url: {
                    default: '/data/quantitative-analytics/v1',
                    doc: 'Base url path for the "financial-contracts" content object',
                    format: String,
                },
                endpoints: {
                    'financial-contracts': {
                        default: '/financial-contracts',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "financial-contracts" data',
                        format: String,
                    },
                },
            },
            'quantitative-analytics-curves-and-surfaces': {
                url: {
                    default: '/data/quantitative-analytics-curves-and-surfaces/v1',
                    doc: 'Base url path for the "curves-and-surfaces" content object',
                    format: String,
                },
                endpoints: {
                    'forward-curves': {
                        default: '/curves/forward-curves',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "forward-curves" data',
                        format: String,
                    },
                    surfaces: {
                        default: '/surfaces',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "surfaces" data',
                        format: String,
                    },
                    'zc-curves': {
                        default: '/curves/zc-curves',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "zc-curves" data',
                        format: String,
                    },
                    'zc-curve-definitions': {
                        default: '/curves/zc-curve-definitions',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "zc-curve-definitions" data',
                        format: String,
                    },
                },
            },
            'quantitative-analytics-dates-and-calendars': {
                url: {
                    default: '/data/quantitative-analytics-dates-and-calendars/v1',
                    doc: 'Base url path for the "dates-and-calendars" content object',
                    format: String,
                },
                endpoints: {
                    'add-periods': {
                        default: '/add-periods',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "add-periods" data',
                        format: String,
                    },
                    c3: {
                        default: '/c3',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "c3" data',
                        format: String,
                    },
                    'count-periods': {
                        default: '/count-periods',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "count-periods" data',
                        format: String,
                    },
                    'date-schedule': {
                        default: '/date-schedule',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "date-schedule" data',
                        format: String,
                    },
                    holidays: {
                        default: '/holidays',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "holidays" data',
                        format: String,
                    },
                    'is-working-day': {
                        default: '/is-working-day',
                        doc: 'Subpath for the Quantitative Analytics endpoint to retrieve the "is-working-day" data',
                        format: String,
                    },
                },
            },
            news: {
                url: {
                    default: '/data/news/v1',
                    doc: 'Base url path for the "news" content object',
                    format: String,
                },
                endpoints: {
                    headlines: {
                        default: '/headlines',
                        doc: 'Subpath for the News endpoint to retrieve the "headlines" data',
                        format: String,
                    },
                    stories: {
                        default: '/stories',
                        doc: 'Subpath for the News endpoint to retrieve the "stories" data',
                        format: String,
                    },
                },
            },
            'environmental-social-governance': {
                url: {
                    default: '/data/environmental-social-governance/v1',
                    doc: 'Base url path for the "environmental-social-governance" content object',
                    format: String,
                },
                endpoints: {
                    universe: {
                        default: '/universe',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "universe" data',
                        format: String,
                    },
                    basic: {
                        default: '/views/basic',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "basic" data',
                        format: String,
                    },
                    'measures-full': {
                        default: '/views/measures-full',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "measures-full" data',
                        format: String,
                    },
                    'measures-standard': {
                        default: '/views/measures-standard',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "measures-standard" data',
                        format: String,
                    },
                    'scores-full': {
                        default: '/views/scores-full',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "scores-full" data',
                        format: String,
                    },
                    'scores-standard': {
                        default: '/views/scores-standard',
                        doc: 'Subpath for the Environmental Social Governance endpoint to retrieve the "scores-standard" data',
                        format: String,
                    },
                },
            },
            datagrid: {
                url: {
                    default: '/api/udf',
                    doc: 'Base url path for the "datagrid" content object',
                    format: String,
                },
                endpoints: {
                    standard: {
                        default: '/',
                        doc: 'Subpath for the Datagrid endpoint to retrieve the "standard" data',
                        format: String,
                    },
                },
                'underlying-platform': {
                    default: "udf",
                    doc: 'Platform type',
                    format: ["rdp", "udf"],
                },
                layout: {
                    ["rdp"]: {
                        output: {
                            default: 'Col,T|Va,Row,In,date|',
                            doc: 'Response output formatting',
                            format: String,
                        },
                    },
                    ["udf"]: {
                        layout: {
                            columns: {
                                default: [{ item: 'dataitem' }],
                                doc: 'Udf layout columns',
                                format: Array,
                            },
                            rows: {
                                default: [{ item: 'instrument' }, { item: 'date' }],
                                doc: 'Udf layout rows',
                                format: Array,
                            },
                        },
                    },
                },
            },
        },
        discovery: {
            search: {
                url: {
                    default: '/discovery/search/v1',
                    doc: 'Base url path for the "search" content object',
                    format: String,
                },
                endpoints: {
                    search: {
                        default: '/',
                        doc: 'Subpath for the Search endpoint to retrieve all the "search" data',
                        format: String,
                    },
                    lookup: {
                        default: '/lookup',
                        doc: 'Subpath for the Search endpoint to retrieve the "lookup" data',
                        format: String,
                    },
                    metadata: {
                        default: '/metadata/views',
                        doc: 'Subpath for the Search endpoint to retrieve the "metadata" data',
                        format: String,
                    },
                },
            },
        },
        streaming: {
            pricing: {
                url: {
                    default: '/streaming/pricing/v1',
                    doc: 'Base url for the streaming pricing service discovery',
                    format: String,
                },
                endpoints: {
                    main: {
                        locations: {
                            default: [],
                            doc: 'Locations list allowed for this type of streaming connection',
                            format: Array,
                        },
                        path: {
                            default: '/',
                            doc: 'Service path',
                            format: String,
                        },
                        protocols: {
                            default: [config_interfaces_1.StreamingType.OMM],
                            doc: 'Streaming protocol types',
                            format: Array,
                        },
                        'websocket-url': {
                            default: '',
                            doc: 'Allows to force the websocket URL. When this parameter is set, the library does not need to send a request to the discovery endpoint but should just use this url to open the websocket',
                            format: String,
                        },
                    },
                },
            },
            'trading-analytics': {
                url: {
                    default: '/streaming/trading-analytics/trade-data/beta1',
                    doc: 'Base url for the trading-analytics service discovery',
                    format: String,
                },
                endpoints: {
                    redi: {
                        locations: {
                            default: [],
                            doc: 'Locations list allowed for this type of streaming connection',
                            format: Array,
                        },
                        path: {
                            default: '/redi',
                            doc: 'Service path',
                            format: String,
                        },
                        protocols: {
                            default: [config_interfaces_1.StreamingType.OMM, config_interfaces_1.StreamingType.RDP],
                            doc: 'Streaming protocol types',
                            format: Array,
                        },
                        'websocket-url': {
                            default: '',
                            doc: 'Allows to force the websocket URL. When this parameter is set, the library does not need to send a request to the discovery endpoint but should just use this url to open the websocket',
                            format: String,
                        },
                    },
                },
            },
            'quantitative-analytics': {
                url: {
                    default: '/streaming/quantitative-analytics/beta1',
                    doc: 'Base url for the QPS service discovery',
                    format: String,
                },
                endpoints: {
                    'financial-contracts': {
                        locations: {
                            default: [],
                            doc: 'Locations list allowed for this type of streaming connection',
                            format: Array,
                        },
                        path: {
                            default: '/financial-contracts',
                            doc: 'Service path',
                            format: String,
                        },
                        protocols: {
                            default: [config_interfaces_1.StreamingType.RDP],
                            doc: 'Streaming protocol types',
                            format: Array,
                        },
                        'websocket-url': {
                            default: '',
                            doc: 'Allows to force the websocket URL. When this parameter is set, the library does not need to send a request to the discovery endpoint but should just use this url to open the websocket',
                            format: String,
                        },
                    },
                },
            },
            benchmark: {
                url: {
                    default: '/streaming/benchmark/v1',
                    doc: 'Base url for the Benchmark service discovery',
                    format: String,
                },
                endpoints: {
                    resource: {
                        locations: {
                            default: [],
                            doc: 'Locations list allowed for this type of streaming connection',
                            format: Array,
                        },
                        path: {
                            default: '/resource',
                            doc: 'Service path',
                            format: String,
                        },
                        protocols: {
                            default: [config_interfaces_1.StreamingType.RDP],
                            doc: 'Streaming protocol types',
                            format: Array,
                        },
                        'websocket-url': {
                            default: '',
                            doc: 'Allows to force the websocket URL. When this parameter is set, the library does not need to send a request to the discovery endpoint but should just use this url to open the websocket',
                            format: String,
                        },
                    },
                },
            },
            'custom-instruments': {
                url: {
                    default: '/streaming/custom-instruments/v1',
                    doc: 'Base url for the streaming custom instruments service discovery',
                    format: String,
                },
                endpoints: {
                    resource: {
                        locations: {
                            default: [],
                            doc: 'Locations list allowed for this type of streaming connection',
                            format: Array,
                        },
                        path: {
                            default: '/resource',
                            doc: 'Service path',
                            format: String,
                        },
                        protocols: {
                            default: [config_interfaces_1.StreamingType.OMM],
                            doc: 'Streaming protocol types',
                            format: Array,
                        },
                        'websocket-url': {
                            default: '',
                            doc: 'Allows to force the websocket URL. When this parameter is set, the library does not need to send a request to the discovery endpoint but should just use this url to open the websocket',
                            format: String,
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWcvY29uZmlnLXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBbUQ7QUFDbkQsMkRBQXNGO0FBQ3RGLDJDQUEwRTtBQUU3RCxRQUFBLHFCQUFxQixHQUF5QjtJQUN2RCxRQUFRLEVBQUU7UUFDTixPQUFPLEVBQUUsbUNBQXVCO1FBQ2hDLEdBQUcsRUFBRSw4RUFBOEU7UUFDbkYsR0FBRyxFQUFFLFlBQVk7UUFDakIsTUFBTSxFQUFFLE1BQU07S0FDakI7SUFDRCxHQUFHLEVBQUU7UUFDRCxPQUFPLEVBQUUsOEJBQWtCO1FBQzNCLEdBQUcsRUFBRSwrQ0FBK0M7UUFDcEQsR0FBRyxFQUFFLGdCQUFnQjtRQUNyQixNQUFNLEVBQUUsTUFBTTtLQUNqQjtJQUNELHFDQUFxQyxFQUFFO1FBQ25DLE9BQU8sRUFBRSxLQUFLO1FBQ2QsR0FBRyxFQUFFLGtEQUFrRDtRQUN2RCxNQUFNLEVBQUUsT0FBTztLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLGlCQUFpQixFQUFFO1lBQ2YsT0FBTyxFQUFFLEVBQUU7WUFDWCxHQUFHLEVBQUUsb0RBQW9EO1lBQ3pELE1BQU0sRUFBRSxNQUFNO1NBQ2pCO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsTUFBTTtZQUNmLEdBQUcsRUFBRSw2QkFBNkI7WUFDbEMsTUFBTSxFQUFFO2dCQUNKLENBQUM7Z0JBQ0QsQ0FBQztnQkFDRCxDQUFDO2dCQUNELENBQUM7Z0JBQ0QsQ0FBQztnQkFDRCxDQUFDO2dCQUNELE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxRQUFRO2dCQUNSLE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxRQUFRO2FBQ1g7U0FD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
