import { AbstractItemStream } from './abstract-item-stream';
import { OMMStream, OMMStreamCompleteCb, OMMStreamErrorCb, OMMStreamRefreshCb, OMMStreamStatusCb, OMMStreamUpdateCb } from './omm-stream.interface';
import { OMMRequest, OMMResponse } from './protocol/omm-types.interface';
import { StreamConnection, StreamRequestParams } from './stream-connection.interface';
export declare class OMMStreamImpl extends AbstractItemStream<OMMRequest, OMMResponse> implements OMMStream {
    private params;
    readonly name: string;
    private itemStreamEventsEmitter;
    onRefresh(cb: OMMStreamRefreshCb): this;
    onUpdate(cb: OMMStreamUpdateCb): this;
    onStatus(cb: OMMStreamStatusCb): this;
    onError(cb: OMMStreamErrorCb): this;
    onComplete(cb: OMMStreamCompleteCb): this;
    protected getStreamConnection(): Promise<StreamConnection<OMMResponse>>;
    protected getRequestParams(): StreamRequestParams;
    protected emitMessage(message: OMMResponse): void;
}
