import { Session } from '../../session';
import { AbstractStateManager } from '../../state';
import { ItemStream } from './item-stream.interface';
import { Protocol } from './protocol/protocol.interface';
import { StreamConnection, StreamRequestParams } from './stream-connection.interface';
export declare abstract class AbstractItemStream<Req, Res> extends AbstractStateManager implements ItemStream {
    protected session: Session;
    private protocol;
    private api;
    private connection?;
    private requestId?;
    private boundOnConnectionMessage;
    private boundOnConnectionClose;
    constructor(session: Session, protocol: Protocol<Req, Res>, api: string);
    initialize(): Promise<void>;
    cleanUp(): Promise<void>;
    protected makeModifyRequest(): Promise<void>;
    protected abstract getRequestParams(): StreamRequestParams;
    protected abstract emitMessage(message: Res): void;
    protected abstract getStreamConnection(): Promise<StreamConnection<Res>>;
    protected onConnectionMessage(message: Res): void;
    private onConnectionClose;
    private makeStreamRequest;
    private getStreamingRecoverMessage;
    private getStreamingErrorMessage;
    private closeWithError;
}
