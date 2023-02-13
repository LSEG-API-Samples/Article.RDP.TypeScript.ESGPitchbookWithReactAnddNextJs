export declare const RDP_ENDPOINT_ROOT = "/api/rdp";
export declare const UDF_ENDPOINT_ROOT = "/api/udf";
export declare const RW_REQUEST_PREFIX = "/eds";
export declare const APP_DEFAULT_SCOPE = "trapi";
export declare const STREAM_FIRST_REQUEST_ID: number;
export declare enum Platform {
    ALPHA = "alpha",
    BETA = "beta",
    PROD = "prod"
}
export declare enum TransportType {
    PIPE = "PIPE",
    HTTP = "HTTP",
    MIX = "MIX"
}
export declare enum ExecutionContainer {
    DESKTOP_RW_1_9 = "DESKTOP_RW_1_9",
    DESKTOP_RW_NON_1_9_OR_EIKON = "DESKTOP_RW_NON_1_9_OR_EIKON",
    RTK = "RTK",
    SXS_WEB = "SXS_WEB",
    WORKSPACE_SDK = "WSDK",
    WEB_RW_OR_EIKON = "WEB_RW_OR_EIKON",
    UNKNOWN = "UNKNOWN"
}
export declare const WORKSPACE_SDK_DETECTOR_OBJECT = "WSDK";
export declare const SXS_WEB_DETECTOR_OBJECT = "sxsWeb";
export declare const RTK_DETECTOR_OBJECT = "RTK";
export declare const EIKON_DESKTOP_DETECTOR_REGEX: RegExp;
export declare const RW_DESKTOP_DETECTOR_REGEX: RegExp;
