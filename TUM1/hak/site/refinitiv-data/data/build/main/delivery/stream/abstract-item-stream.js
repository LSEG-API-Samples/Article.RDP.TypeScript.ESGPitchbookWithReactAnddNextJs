"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractItemStream = void 0;
const constants_1 = require("../../constants");
const state_1 = require("../../state");
const item_stream_error_1 = require("./item-stream-error");
const item_stream_interface_1 = require("./item-stream.interface");
const protocol_interface_1 = require("./protocol/protocol.interface");
const stream_connection_interface_1 = require("./stream-connection.interface");
const SERVER_MESSAGE = 'serverMessage';
const INTERNAL_ERROR = 'internalError';
class AbstractItemStream extends state_1.AbstractStateManager {
    constructor(session, protocol, api) {
        super();
        this.session = session;
        this.protocol = protocol;
        this.api = api;
        this.boundOnConnectionMessage = this.onConnectionMessage.bind(this);
        this.boundOnConnectionClose = this.onConnectionClose.bind(this);
    }
    async initialize() {
        try {
            await new Promise(async (resolve, reject) => {
                try {
                    this.internalChannel.once(INTERNAL_ERROR, reject);
                    this.internalChannel.on(SERVER_MESSAGE, data => {
                        const initialMessageSummary = this.protocol.getInitialMessageSummary(data);
                        if (initialMessageSummary === protocol_interface_1.ProtocolInitialMessageSummary.Success) {
                            resolve(void 0);
                        }
                        else if (initialMessageSummary === protocol_interface_1.ProtocolInitialMessageSummary.Error) {
                            const summary = this.protocol.getSummary(data);
                            reject(new item_stream_error_1.ItemStreamError(summary.errorMessage ||
                                summary.stateMessage ||
                                `${constants_1.ErrorMessages.FAILED_ITEM_STREAM_INITIALIZATION} ${this.api}`, data));
                        }
                    });
                    await this.makeStreamRequest();
                }
                catch (err) {
                    this.emitMessage(this.getStreamingErrorMessage());
                    return reject(err);
                }
            });
            this.internalChannel.removeAllListeners();
        }
        catch (err) {
            this.internalChannel.removeAllListeners();
            this.emit(item_stream_interface_1.ItemStreamEvent.Complete, this);
            await this.cleanUp();
            return Promise.reject(err);
        }
    }
    async cleanUp() {
        if (this.requestId && this.connection) {
            this.connection.closeRequest(this.requestId);
            this.connection.removeListener(stream_connection_interface_1.StreamConnectionEvent.StateChanged, this.boundOnConnectionClose);
            this.connection.removeListener(String(this.requestId), this.boundOnConnectionMessage);
        }
        this.requestId = undefined;
    }
    async makeModifyRequest() {
        if (this.requestId && this.connection) {
            await this.connection.modifyRequest(this.requestId, this.getRequestParams());
        }
    }
    onConnectionMessage(message) {
        this.emitMessage(message);
        this.internalChannel.emit(SERVER_MESSAGE, message);
        const summary = this.protocol.getSummary(message);
        if (summary.isCompleteSnapshotMessage) {
            this.emit(item_stream_interface_1.ItemStreamEvent.Complete, this);
        }
        if (summary.isClosedStatusMessage || summary.isErrorMessage) {
            this.close();
        }
    }
    async onConnectionClose() {
        if (this.session.state === state_1.State.Closed) {
            return this.closeWithError(new Error(constants_1.ErrorMessages.INVALID_SESSION_STATE_MESSAGE));
        }
        try {
            this.emitMessage(this.getStreamingRecoverMessage());
            await this.makeStreamRequest();
            this.emitMessage(this.getStreamingRecoverMessage(true));
        }
        catch (err) {
            this.emitMessage(this.getStreamingErrorMessage(true));
            this.closeWithError(err);
        }
    }
    async makeStreamRequest() {
        this.cleanUp();
        this.connection = await this.getStreamConnection();
        this.requestId = await this.connection.request(this.getRequestParams());
        this.connection.on(String(this.requestId), this.boundOnConnectionMessage);
        this.connection.on(stream_connection_interface_1.StreamConnectionEvent.StateChanged, this.boundOnConnectionClose);
    }
    getStreamingRecoverMessage(isCompleted) {
        return this.protocol.getStreamingRecoverMessage(this.api, isCompleted);
    }
    getStreamingErrorMessage(afterReconnect) {
        return this.protocol.getStreamingErrorMessage(this.api, afterReconnect);
    }
    async closeWithError(err) {
        this.internalChannel.emit(INTERNAL_ERROR, err);
        this.emit(item_stream_interface_1.ItemStreamEvent.Error, err, this);
        if (this.state === state_1.State.Opened) {
            this.close();
        }
    }
}
exports.AbstractItemStream = AbstractItemStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtaXRlbS1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVsaXZlcnkvc3RyZWFtL2Fic3RyYWN0LWl0ZW0tc3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFnRDtBQUVoRCx1Q0FBMEQ7QUFDMUQsMkRBQXNEO0FBQ3RELG1FQUFzRTtBQUN0RSxzRUFBd0Y7QUFDeEYsK0VBQTZHO0FBRTdHLE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQztBQUN2QyxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUM7QUFFdkMsTUFBc0Isa0JBQTZCLFNBQVEsNEJBQW9CO0lBTzNFLFlBQXNCLE9BQWdCLEVBQVUsUUFBNEIsRUFBVSxHQUFXO1FBQzdGLEtBQUssRUFBRSxDQUFDO1FBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUh6Riw2QkFBd0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELDJCQUFzQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFJbkUsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ25CLElBQUk7WUFDQSxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUk7b0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQzNDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FB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