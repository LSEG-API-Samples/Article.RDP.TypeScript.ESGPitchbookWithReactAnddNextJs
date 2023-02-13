import { StateEvents, StateManager } from '../../../state';
import { ExtendedParams } from '../../base-interfaces/extended-params';
export declare type Params = ExtendedParams;
export declare const DICTIONARY_DOMAIN = "Dictionary";
export declare const METADATA_ENUM_NAME = "RWFEnum";
export declare const METADATA_FIELD_NAME = "RWFFld";
export declare const FIELD_DESCRIPTION_PARAMS = "FieldDescriptionParams";
export declare const FIELD_ENUMERATION_PARAMS = "FieldEnumerationParams";
export interface Stream extends StateManager<Events> {
    readonly definition: Params;
    getFieldDescription(field: string | number): FieldDescription;
    getFieldEnumeration(field: string | number): Map<number, string>;
}
export declare const StreamingMetadataEvent: {
    Error: "error";
    StateChanged: "stateChanged";
};
export declare type Events = StateEvents;
export declare enum MetadataFilter {
    DICTIONARY_INFO = 0,
    DICTIONARY_MINIMAL = 3,
    DICTIONARY_NORMAL = 7,
    DICTIONARY_VERBOSE = 15
}
export interface FieldParam {
    field: string | number;
}
export interface FieldDescription {
    NAME: string;
    FID: number;
    RIPPLETO: string | null;
    RWFTYPE: RWFType;
    RWFLEN: number;
    LONGNAME: string;
}
export interface EncodedFieldDescription {
    NAME: string;
    FID: number;
    RIPPLETO: number;
    TYPE: MarketFeedType;
    LENGTH: number;
    RWFTYPE: RWFType;
    RWFLEN: number;
    ENUMLENGTH: number;
    LONGNAME: string;
}
export interface FieldDictionarySummary {
    Elements: {
        Type: number;
        DictionaryId: FieldValue;
        Version: string;
    };
}
export interface FieldDictionaryResponse {
    Summary: FieldDictionarySummary;
    CountHint: number;
    Entries: FieldEntries[];
}
export interface FieldEntries {
    Elements: RawField;
}
export interface RawField {
    [prop: string]: string | number | FieldValue;
}
export interface FieldValue {
    Type: string;
    Data: number;
}
interface EnumValue {
    Type: string;
    Data: {
        Type: string;
        Data: number[];
    };
}
interface EnumDisplay {
    Type: string;
    Data: {
        Type: string;
        Data: string[];
    };
}
export interface EnumEntries {
    Elements: {
        FIDS: EnumValue;
        VALUE: EnumValue;
        DISPLAY: EnumDisplay;
    };
}
export interface EnumDictionaryResponse {
    Summary: {};
    Entries: EnumEntries[];
}
export interface FieldMetadata {
    description: RawField;
    enum?: Map<number, string>;
}
export declare const enum MarketFeedType {
    Unknown = -1,
    TimeSeconds = 0,
    Integer = 1,
    Numeric = 2,
    Date = 3,
    Price = 4,
    Alphanumeric = 5,
    Enumerated = 6,
    Time = 7,
    Binary = 8,
    LongAlphanumeric = 9,
    Opaque = 10
}
export declare const enum RWFType {
    Unknown = 0,
    Int = 3,
    UInt = 4,
    Float = 5,
    Double = 6,
    Real = 8,
    Date = 9,
    Time = 10,
    DateTime = 11,
    QOS = 12,
    Status = 13,
    Enumeration = 14,
    Array = 15,
    Buffer = 16,
    StringAscii = 17,
    StringUTF8 = 18,
    StringRMTES = 19,
    Opaque = 130,
    XML = 131,
    FieldList = 132,
    ElementList = 133,
    AnsiPage = 134,
    FilterList = 135,
    Vector = 136,
    Map = 137,
    Series = 138,
    Msg = 141
}
export {};
