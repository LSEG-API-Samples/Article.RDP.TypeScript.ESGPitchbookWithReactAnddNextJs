import { OMMResponseState } from '../../../delivery/stream/protocol/omm-types.interface';
import { Session } from '../../../session/session.interface';
import { StateEvents, StateManager } from '../../../state';
import { ExtendedParams } from '../../base-interfaces/extended-params';
import { OpenStreamParams } from '../stream/pricing-stream.interfaces';
export declare const SERVICE_DIRECTORY_DEFAULT_NAME = "0";
export declare const SERVICE_DIRECTORY_DEFAULT_FILTER = 3;
export declare const SOURCE_DOMAIN = "Source";
export interface Stream extends StateManager<Events> {
    readonly definition: Params;
    readonly session: Session;
    getServiceDescription(service: string | number): Data;
    onAdd(cb: AddCallback): Stream;
    onDelete(cb: DeleteCallback): Stream;
    onUpdate(cb: UpdateCallback): Stream;
    onStatus(cb: StatusCallback): Stream;
    onComplete(cb: CompleteCallback): Stream;
    onError(cb: ErrorCallback): Stream;
    open(params?: OpenStreamParams): Promise<this>;
}
export declare type Params = ExtendedParams;
export interface Data {
    Name: string;
    SupportsQoSRange: number;
    Capabilities: number[];
    QoS: QualityOfService[];
    DictionariesProvided: string[];
    DictionariesUsed: string[];
    Vendor?: string;
    AcceptingConsumerStatus?: number;
    IsSource?: number;
    ItemList?: ItemList;
    SupportsOutOfBandSnapshots?: number;
}
export interface QualityOfService {
    Timeliness: string;
    Rate: string;
    RateInfo?: number;
}
export interface ItemList {
    Type: string;
    Data?: string[];
}
export interface Response {
    Action: string;
    Key: number;
    FilterList: {
        Entries: FilterListEntries[];
    };
}
export interface FilterListEntries {
    ID: number;
    Action: string;
    Elements: RawService;
}
export interface RawService {
    [prop: string]: string | number | ServiceValue;
}
export interface ServiceValue {
    Type: string;
    Data: {
        Type: string;
        Data: any[];
    };
}
export interface ServiceDescription {
    id: number;
    description: RawService;
    action: string;
}
declare const Add: 'Add';
declare const Delete: 'Delete';
declare const Update: 'Update';
declare const Status: 'Status';
declare const Complete: 'Complete';
declare const Error: 'error';
export declare const Event: {
    Add: "Add";
    Delete: "Delete";
    Update: "Update";
    Status: "Status";
    Complete: "Complete";
    Error: "error";
};
export interface Events extends StateEvents {
    [Add]: AddCallback;
    [Delete]: DeleteCallback;
    [Update]: UpdateCallback;
    [Status]: StatusCallback;
    [Complete]: CompleteCallback;
    [Error]: ErrorCallback;
}
export declare type AddCallback = (data: Response, stream?: Stream) => void;
export declare type DeleteCallback = (data: Response, stream?: Stream) => void;
export declare type UpdateCallback = (data: Response, stream?: Stream) => void;
export declare type StatusCallback = (data: OMMResponseState, stream?: Stream) => void;
export declare type CompleteCallback = (stream?: Stream) => void;
export declare type ErrorCallback = (error: Error, stream?: Stream) => void;
export {};
