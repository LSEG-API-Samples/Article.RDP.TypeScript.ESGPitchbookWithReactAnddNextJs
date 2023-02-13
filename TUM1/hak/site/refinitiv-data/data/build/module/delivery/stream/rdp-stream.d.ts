import { Session } from '../../session';
import { AbstractItemStream } from './abstract-item-stream';
import { RDPRequest, RDPResponse } from './protocol/rdp-types.interface';
import { RDPStream, RDPStreamAckCb, RDPStreamAlarmCb, RDPStreamCompleteCb, RDPStreamErrorCb, RDPStreamRequestParams, RDPStreamResponseCb, RDPStreamUpdateCb } from './rdp-stream.interface';
import { StreamConnection, StreamRequestParams } from './stream-connection.interface';
export declare class RDPStreamImpl extends AbstractItemStream<RDPRequest, RDPResponse> implements RDPStream {
    private params;
    private currentUniverse;
    private itemStreamEventsEmitter;
    constructor(session: Session, params: RDPStreamRequestParams);
    get universe(): string | string[] | undefined;
    onResponse(cb: RDPStreamResponseCb): this;
    onUpdate(cb: RDPStreamUpdateCb): this;
    onAck(cb: RDPStreamAckCb): this;
    onAlarm(cb: RDPStreamAlarmCb): this;
    onError(cb: RDPStreamErrorCb): this;
    onComplete(cb: RDPStreamCompleteCb): this;
    protected getStreamConnection(): Promise<StreamConnection<RDPResponse>>;
    modify(params: RDPStreamRequestParams): Promise<void>;
    protected getRequestParams(): StreamRequestParams;
    protected emitMessage(message: RDPResponse): void;
}
