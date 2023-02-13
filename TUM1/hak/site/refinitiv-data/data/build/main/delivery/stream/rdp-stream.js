"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDPStreamImpl = void 0;
const abstract_item_stream_1 = require("./abstract-item-stream");
const rdp_protocol_1 = require("./protocol/rdp-protocol");
const rdp_types_interface_1 = require("./protocol/rdp-types.interface");
const rdp_stream_interface_1 = require("./rdp-stream.interface");
class RDPStreamImpl extends abstract_item_stream_1.AbstractItemStream {
    constructor(session, params) {
        super(session, new rdp_protocol_1.RdpProtocol(), params.api || rdp_stream_interface_1.DEFAULT_RDP_STREAMING_CONNECTION_NAME);
        this.params = params;
        this.itemStreamEventsEmitter = this;
        this.currentUniverse = this.params.universe;
    }
    get universe() {
        return this.currentUniverse;
    }
    onResponse(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Response, cb);
        return this;
    }
    onUpdate(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Update, cb);
        return this;
    }
    onAck(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Ack, cb);
        return this;
    }
    onAlarm(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Alarm, cb);
        return this;
    }
    onError(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Error, cb);
        return this;
    }
    onComplete(cb) {
        this.itemStreamEventsEmitter.on(rdp_stream_interface_1.RDPStream.Event.Complete, cb);
        return this;
    }
    getStreamConnection() {
        return this.session.getRDPStreamConnection(this.params.api || rdp_stream_interface_1.DEFAULT_RDP_STREAMING_CONNECTION_NAME);
    }
    async modify(params) {
        this.params = params;
        this.currentUniverse = this.params.universe;
        return this.makeModifyRequest();
    }
    getRequestParams() {
        return {
            name: this.universe,
            domain: this.params.context,
            service: this.params.service,
            view: this.params.fields,
            parameters: this.params.parameters,
            extendedParams: this.params.extendedParams,
        };
    }
    emitMessage(message) {
        switch (message.type) {
            case rdp_types_interface_1.RDPResponseType.Response:
                this.itemStreamEventsEmitter.emit(rdp_stream_interface_1.RDPStreamEvent.Response, message, this);
                break;
            case rdp_types_interface_1.RDPResponseType.Ack:
                this.itemStreamEventsEmitter.emit(rdp_stream_interface_1.RDPStreamEvent.Ack, message, this);
                break;
            case rdp_types_interface_1.RDPResponseType.Update:
                this.itemStreamEventsEmitter.emit(rdp_stream_interface_1.RDPStreamEvent.Update, message, this);
                break;
            case rdp_types_interface_1.RDPResponseType.Alarm:
                this.itemStreamEventsEmitter.emit(rdp_stream_interface_1.RDPStreamEvent.Alarm, message, this);
        }
    }
}
exports.RDPStreamImpl = RDPStreamImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRwLXN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWxpdmVyeS9zdHJlYW0vcmRwLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpRUFBNEQ7QUFDNUQsMERBQXNEO0FBQ3RELHdFQUEwRjtBQUMxRixpRUFXZ0M7QUFHaEMsTUFBYSxhQUFjLFNBQVEseUNBQTJDO0lBSTFFLFlBQVksT0FBZ0IsRUFBVSxNQUE4QjtRQUNoRSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksMEJBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksNERBQXFDLENBQUMsQ0FBQztRQURyRCxXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUY1RCw0QkFBdUIsR0FBRyxJQUFpQixDQUFDO1FBS2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sVUFBVSxDQUFDLEVBQXVCO1FBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxRQUFRLENBQUMsRUFBcUI7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxnQ0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxFQUFrQjtRQUMzQixJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLGdDQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxPQUFPLElB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