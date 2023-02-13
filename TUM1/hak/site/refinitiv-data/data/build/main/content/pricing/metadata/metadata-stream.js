"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingMetadataImpl = void 0;
const zip_1 = __importDefault(require("lodash/zip"));
const error_messages_1 = require("../../../constants/error-messages");
const stream_1 = require("../../../delivery/stream");
const omm_stream_1 = require("../../../delivery/stream/omm-stream");
const state_1 = require("../../../state");
const util_1 = require("../../../util");
const metadata_stream_interface_1 = require("./metadata-stream.interface");
class StreamingMetadataImpl extends state_1.AbstractStateManager {
    constructor(session, params) {
        super();
        this.params = params;
        this.fieldsMap = new Map();
        this.nameToId = new Map();
        this.fieldItemStream = new omm_stream_1.OMMStreamImpl(session, {
            name: metadata_stream_interface_1.METADATA_FIELD_NAME,
            domain: metadata_stream_interface_1.DICTIONARY_DOMAIN,
            filter: metadata_stream_interface_1.MetadataFilter.DICTIONARY_NORMAL,
            streaming: false,
            extendedParams: params === null || params === void 0 ? void 0 : params.extendedParams,
        });
        this.enumItemStream = new omm_stream_1.OMMStreamImpl(session, {
            name: metadata_stream_interface_1.METADATA_ENUM_NAME,
            domain: metadata_stream_interface_1.DICTIONARY_DOMAIN,
            filter: metadata_stream_interface_1.MetadataFilter.DICTIONARY_NORMAL,
            streaming: false,
            extendedParams: params === null || params === void 0 ? void 0 : params.extendedParams,
        });
        this.fieldItemStream.once(stream_1.OMMStream.Event.Refresh, this.onFieldRefresh.bind(this));
        this.fieldItemStream.on(stream_1.OMMStream.Event.Error, this.onError.bind(this));
        this.enumItemStream.once(stream_1.OMMStream.Event.Refresh, this.onEnumRefresh.bind(this));
        this.enumItemStream.on(stream_1.OMMStream.Event.Error, this.onError.bind(this));
    }
    get definition() {
        return this.params || {};
    }
    getFieldDescription(field) {
        this.validateState();
        util_1.validateRequired({ field }, ['field'], metadata_stream_interface_1.FIELD_DESCRIPTION_PARAMS);
        const fieldMetadata = this.getFieldFromMap(field);
        if (!fieldMetadata) {
            throw new Error(`Unknown field ${field}.`);
        }
        const formattedField = this.formatField(fieldMetadata.description);
        return this.decodeFields(formattedField);
    }
    getFieldEnumeration(field) {
        this.validateState();
        util_1.validateRequired({ field }, ['field'], metadata_stream_interface_1.FIELD_ENUMERATION_PARAMS);
        const fieldMetadata = this.getFieldFromMap(field);
        if (!(fieldMetadata === null || fieldMetadata === void 0 ? void 0 : fieldMetadata.enum)) {
            throw new Error(`${field} field type is not enumerated.`);
        }
        return fieldMetadata.enum;
    }
    async initialize() {
        if (util_1.detectEnvironment() === "WEB") {
            throw new Error('StreamingMetadataService is not supported in the browser yet');
        }
        await this.fieldItemStream.open();
        await this.enumItemStream.open();
    }
    async cleanUp() {
        this.fieldsMap.clear();
        this.nameToId.clear();
    }
    onFieldRefresh(message) {
        var _a;
        try {
            const entries = (_a = message.Series) === null || _a === void 0 ? void 0 : _a.Entries;
            if (entries === null || entries === void 0 ? void 0 : entries.length) {
                entries.forEach(entry => {
                    const fid = entry.Elements.FID;
                    const metadata = { description: entry.Elements };
                    this.fieldsMap.set(fid.Data, metadata);
                    this.nameToId.set(entry.Elements.NAME, fid.Data);
                });
            }
        }
        catch (error) {
            throw new Error(`Field Description: incorrect incoming Refresh message. ${error.message}`);
        }
    }
    onEnumRefresh(message) {
        var _a;
        try {
            const entries = (_a = message.Series) === null || _a === void 0 ? void 0 : _a.Entries;
            if (entries === null || entries === void 0 ? void 0 : entries.length) {
                entries.forEach(entry => {
                    const fids = entry.Elements.FIDS.Data.Data;
                    fids.forEach(fid => {
                        const field = this.fieldsMap.get(fid);
                        if (field) {
                            const zipped = zip_1.default(entry.Elements.VALUE.Data.Data, entry.Elements.DISPLAY.Data.Data);
                            const mappedEnumToAsciiString = new Map(zipped);
                            field.enum = mappedEnumToAsciiString;
                        }
                    });
                });
            }
        }
        catch (error) {
            throw new Error(`Field Enumeration: incorrect incoming Refresh message. ${error.message}`);
        }
    }
    get invalidStateMessage() {
        return error_messages_1.ErrorMessages.INVALID_STREAM_CONNECTION_STATE_MESSAGE;
    }
    onError(error) {
        throw error;
    }
    getFieldFromMap(field) {
        if (typeof field === 'string') {
            const id = this.nameToId.get(field);
            return id ? this.fieldsMap.get(id) : undefined;
        }
        else {
            return this.fieldsMap.get(field);
        }
    }
    formatField(field) {
        return Object.keys(field).reduce((res, key) => {
            res[key] = this.formatValue(field[key]);
            return res;
        }, {});
    }
    formatValue(value) {
        return typeof value === 'object' ? value.Data : value;
    }
    decodeFields(formattedField) {
        var _a;
        const rippleName = (_a = this.fieldsMap.get(formattedField.RIPPLETO)) === null || _a === void 0 ? void 0 : _a.description.NAME;
        const rippleTO = rippleName ? this.decodeString(rippleName, 'RIPPLETO') : null;
        return {
            NAME: this.decodeString(formattedField.NAME, 'NAME'),
            FID: this.decodeNumber(formattedField.FID, 'FID'),
            RIPPLETO: rippleTO,
            RWFTYPE: this.decodeNumber(formattedField.RWFTYPE, 'RWFTYPE'),
            RWFLEN: this.decodeNumber(formattedField.RWFLEN, 'RWFLEN'),
            LONGNAME: this.decodeString(formattedField.LONGNAME, 'LONGNAME'),
        };
    }
    decodeString(entry, name) {
        if (typeof entry !== 'string') {
            throw new Error(`Invalid data type ('${typeof entry}') for entry field '${name}' (expected 'string').`);
        }
        return entry;
    }
    decodeNumber(entry, name) {
        if (typeof entry !== 'number') {
            throw new Error(`Invalid data type ('${typeof entry}') for entry field '${name}' (expected 'number').`);
        }
        return entry;
    }
}
exports.StreamingMetadataImpl = StreamingMetadataImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtc3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvcHJpY2luZy9tZXRhZGF0YS9tZXRhZGF0YS1zdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscURBQTZCO0FBRTdCLHNFQUFrRTtBQUNsRSxxREFBcUQ7QUFDckQsb0VBQW9FO0FBR3BFLDBDQUFzRDtBQUN0RCx3Q0FBaUY7QUFDakYsMkVBa0JxQztBQUdyQyxNQUFhLHFCQUFzQixTQUFRLDRCQUFvQjtJQU0zRCxZQUFZLE9BQWdCLEVBQVUsTUFBZTtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQUQwQixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBTDdDLGNBQVMsR0FBK0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNsRCxhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFPOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDBCQUFhLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksRUFBRSwrQ0FBbUI7WUFDekIsTUFBTSxFQUFFLDZDQUFpQjtZQUN6QixNQUFNLEVBQUUsMENBQWMsQ0FBQyxpQkFBaUI7WUFDeEMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsY0FBYyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxjQUFjO1NBQ3pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwwQkFBYSxDQUFDLE9BQU8sRUFBRTtZQUM3QyxJQUFJLEVBQUUsOENBQWtCO1lBQ3hCLE1BQU0sRUFBRSw2Q0FBaUI7WUFDekIsTUFBTSxFQUFFLDBDQUFjLENBQUMsaUJBQWlCO1lBQ3hDLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGNBQWMsRUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsY0FBYztTQUN6QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLElB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