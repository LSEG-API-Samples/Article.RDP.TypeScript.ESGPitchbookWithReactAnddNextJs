"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingInstrumentStreamProvider = void 0;
const omm_stream_1 = require("../../../delivery/stream/omm-stream");
const omm_types_interface_1 = require("../../../delivery/stream/protocol/omm-types.interface");
const pricing_stream_instrument_interfaces_1 = require("./pricing-stream-instrument.interfaces");
class PricingInstrumentStreamProvider extends omm_stream_1.OMMStreamImpl {
    constructor(session, params) {
        super(session, params);
        this.pricingInstrumentStreamEmitter = this;
        this.fields = {};
    }
    get itemStatus() {
        return this.sourceState;
    }
    getFieldValue(name) {
        return this.fields[name];
    }
    getFields(names) {
        if (!names) {
            return this.fields;
        }
        return names.map(name => ({ [name]: this.fields[name] })).reduce((prev, cur) => (Object.assign(Object.assign({}, prev), cur)), {});
    }
    onConnectionMessage(message) {
        if ('Fields' in message && message.Fields) {
            this.fields = Object.assign(Object.assign({}, this.fields), message.Fields);
        }
        if ('State' in message && message.State) {
            this.sourceState = Object.assign(Object.assign({}, this.sourceState), message.State);
        }
        super.onConnectionMessage(message);
    }
    emitMessage(message) {
        if (message.Type === omm_types_interface_1.OMMResponseType.Refresh) {
            this.pricingInstrumentStreamEmitter.emit(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Refresh, message.Fields, this);
        }
        if (message.Type === omm_types_interface_1.OMMResponseType.Update && message.Fields) {
            this.pricingInstrumentStreamEmitter.emit(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Update, message.Fields, this);
        }
        if ('State' in message && message.State) {
            this.pricingInstrumentStreamEmitter.emit(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Status, message.State, this);
        }
        if (message.Type === omm_types_interface_1.OMMResponseType.Error) {
            this.pricingInstrumentStreamEmitter.emit(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Error, new Error(message.Text), this);
        }
    }
}
exports.PricingInstrumentStreamProvider = PricingInstrumentStreamProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2luZy1zdHJlYW0taW5zdHJ1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvc3RyZWFtL3ByaWNpbmctc3RyZWFtLWluc3RydW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQW9FO0FBQ3BFLCtGQU0rRDtBQUUvRCxpR0FBa0k7QUFHbEksTUFBYSwrQkFBZ0MsU0FBUSwwQkFBYTtJQUs5RCxZQUFZLE9BQWdCLEVBQUUsTUFBK0I7UUFDekQsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUxqQixtQ0FBOEIsR0FBRyxJQUErQixDQUFDO1FBRW5FLFdBQU0sR0FBYyxFQUFFLENBQUM7SUFJL0IsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUErQixDQUFDO0lBQ2hELENBQUM7SUFFTSxhQUFhLENBQUMsSUFBWTtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFNBQVMsQ0FBQyxLQUFnQjtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxJQUFJLEdBQUssR0FBRyxFQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVTLG1CQUFtQixDQUFDLE9BQW9CO1FBQzlDLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLG1DQUFRLElBQUksQ0FBQyxNQUFNLEdBQUssT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsbUNBQVEsSUFBSSxDQUFDLFdBQVcsR0FBSyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUM7U0FDaEU7UUFFRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLFdBQVcsQ0FBQyxPQUFvQjtRQUN0QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUsscUNBQWUsQ0FBQyxPQUFPLEVBQUU7WUFDMUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyw2REFBc0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuRztRQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxxQ0FBZSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzNELElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsNkRBQXNCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDakc7UUFFRCxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNyQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLDZEQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hHO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLHFDQUFlLENBQUMsS0FBSyxFQUFFO1lBQ3hDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsNkRBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RztJQUNMLENBQUM7Q0FDSjtBQXRERCwwRUFzREMifQ==