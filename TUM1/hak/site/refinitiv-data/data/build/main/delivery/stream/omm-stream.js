"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMMStreamImpl = void 0;
const abstract_item_stream_1 = require("./abstract-item-stream");
const item_stream_error_1 = require("./item-stream-error");
const omm_stream_params_validator_1 = require("./omm-stream-params-validator");
const omm_stream_interface_1 = require("./omm-stream.interface");
const omm_protocol_1 = require("./protocol/omm-protocol");
const omm_types_interface_1 = require("./protocol/omm-types.interface");
class OMMStreamImpl extends abstract_item_stream_1.AbstractItemStream {
    constructor(session, params) {
        super(session, new omm_protocol_1.OmmProtocol(), params.api || omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME);
        this.params = params;
        this.itemStreamEventsEmitter = this;
        const name = this.params.name;
        omm_stream_params_validator_1.validateOMMStreamParams({ session, name });
        this.name = name;
    }
    onRefresh(cb) {
        this.itemStreamEventsEmitter.on(omm_stream_interface_1.OMMStream.Event.Refresh, cb);
        return this;
    }
    onUpdate(cb) {
        this.itemStreamEventsEmitter.on(omm_stream_interface_1.OMMStream.Event.Update, cb);
        return this;
    }
    onStatus(cb) {
        this.itemStreamEventsEmitter.on(omm_stream_interface_1.OMMStream.Event.Status, cb);
        return this;
    }
    onError(cb) {
        this.itemStreamEventsEmitter.on(omm_stream_interface_1.OMMStream.Event.Error, cb);
        return this;
    }
    onComplete(cb) {
        this.itemStreamEventsEmitter.on(omm_stream_interface_1.OMMStream.Event.Complete, cb);
        return this;
    }
    getStreamConnection() {
        return this.session.getOMMStreamConnection(this.params.api || omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME);
    }
    getRequestParams() {
        return {
            name: this.name,
            domain: this.params.domain,
            filter: this.params.filter,
            service: this.params.service,
            streaming: this.params.streaming,
            view: this.params.fields,
            extendedParams: this.params.extendedParams,
        };
    }
    emitMessage(message) {
        switch (message.Type) {
            case omm_types_interface_1.OMMResponseType.Refresh:
                this.itemStreamEventsEmitter.emit(omm_stream_interface_1.OMMStream.Event.Refresh, message, this);
                break;
            case omm_types_interface_1.OMMResponseType.Status:
                this.itemStreamEventsEmitter.emit(omm_stream_interface_1.OMMStream.Event.Status, message, this);
                break;
            case omm_types_interface_1.OMMResponseType.Update:
                this.itemStreamEventsEmitter.emit(omm_stream_interface_1.OMMStream.Event.Update, message, this);
                break;
            case omm_types_interface_1.OMMResponseType.Error:
                this.itemStreamEventsEmitter.emit(omm_stream_interface_1.OMMStream.Event.Error, new item_stream_error_1.ItemStreamError(message.Text, message), this);
        }
    }
}
exports.OMMStreamImpl = OMMStreamImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21tLXN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWxpdmVyeS9zdHJlYW0vb21tLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELCtFQUF3RTtBQUN4RSxpRUFTZ0M7QUFDaEMsMERBQXNEO0FBQ3RELHdFQUEwRjtBQUcxRixNQUFhLGFBQWMsU0FBUSx5Q0FBMkM7SUFLMUUsWUFBWSxPQUFnQixFQUFVLE1BQThCO1FBQ2hFLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSwwQkFBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSw0REFBcUMsQ0FBQyxDQUFDO1FBRHJELFdBQU0sR0FBTixNQUFNLENBQXdCO1FBSDVELDRCQUF1QixHQUFHLElBQWlCLENBQUM7UUFLaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFOUIscURBQXVCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sU0FBUyxDQUFDLEVBQXNCO1FBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxRQUFRLENBQUMsRUFBcUI7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxnQ0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxFQUFxQjtRQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLGdDQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTyxDQUFDLEVBQW9CO1FBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxVQUFVLENBQUMsRUFBdUI7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxnQ0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLG1CQUFtQjtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksNERBQXFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3RCLE9BQU87WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzFCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztZQUM1QixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQ2hDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYztTQUM3QyxDQUFDO0lBQ04sQ0FBQztJQUVTLFdBQVcsQ0FBQyxPQUFvQjtRQUN0QyxRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDbEIsS0FBSyxxQ0FBZSxDQUFDLE9BQU87Z0JBQ3hCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUUsTUFBTTtZQUNWLEtBQUsscUNBQWUsQ0FBQyxNQUFNO2dCQUN2QixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGdDQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pFLE1BQU07WUFDVixLQUFLLHFDQUFlLENBQUMsTUFBTTtnQkFDdkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxnQ0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1YsS0FBSyxxQ0FBZSxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsZ0NBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksbUNBQWUsQ0FBYyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9IO0lBQ0wsQ0FBQztDQUNKO0FBdEVELHNDQXNFQyJ9