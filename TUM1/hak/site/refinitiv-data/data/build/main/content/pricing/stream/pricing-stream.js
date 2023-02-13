"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingStream = void 0;
const logger_1 = require("../../../logger");
const state_manager_1 = require("../../../state/state-manager");
const state_manager_interface_1 = require("../../../state/state-manager.interface");
const validate_required_1 = require("../../../util/validate-required");
const pricing_stream_error_1 = require("./pricing-stream-error");
const pricing_stream_instrument_1 = require("./pricing-stream-instrument");
const pricing_stream_instrument_interfaces_1 = require("./pricing-stream-instrument.interfaces");
const pricing_stream_interfaces_1 = require("./pricing-stream.interfaces");
const STREAMING_PRICES_REQUEST_PARAMS = 'Pricing.Params';
class PricingStream extends state_manager_1.AbstractStateManager {
    constructor(session, parameters, api) {
        super();
        this.session = session;
        this.parameters = parameters;
        this.api = api;
        this.pricingStreamEmitter = this;
        this.instrumentStreams = new Map();
        this.nameToResolveCallback = new Map();
        this.openSingleStream = (data, stream) => {
            const resolveHandler = this.nameToResolveCallback.get(stream.name);
            this.nameToResolveCallback.delete(stream.name);
            resolveHandler();
            this.log.debug(`Streaming price for [${stream.name}] has been opened`);
        };
        this.onSingleStreamRefresh = (refresh, stream) => {
            this.pricingStreamEmitter.emit(pricing_stream_interfaces_1.StreamEvent.Refresh, refresh, stream.name, this);
        };
        this.onSingleStreamUpdate = (update, stream) => {
            this.pricingStreamEmitter.emit(pricing_stream_interfaces_1.StreamEvent.Update, update, stream.name, this);
        };
        this.onSingleStreamStatus = (status, stream) => {
            this.pricingStreamEmitter.emit(pricing_stream_interfaces_1.StreamEvent.Status, status, stream.name, this);
        };
        this.onSingleStreamError = (error, stream) => {
            this.pricingStreamEmitter.emit(pricing_stream_interfaces_1.StreamEvent.Error, new pricing_stream_error_1.StreamError(error.message, stream.name), this);
        };
        this.onSingleStreamStateChanged = () => {
            if (this.checkAllPricingStreamClosed()) {
                this.close();
            }
        };
        validate_required_1.validateRequired({ session, universe: parameters.universe }, ['session', 'universe'], STREAMING_PRICES_REQUEST_PARAMS);
        this.streamOptions = this.getDefaultStreamOptions(parameters, api);
        this.log = logger_1.logger.getLogger('pricing:stream');
    }
    get definition() {
        return this.parameters;
    }
    open(params) {
        if ((params === null || params === void 0 ? void 0 : params.withUpdates) !== undefined) {
            this.streamOptions.streaming = params.withUpdates;
        }
        return super.open();
    }
    async initialize() {
        await this.session.getOMMStreamConnection(this.api);
        const instruments = Array.from(new Set(this.streamOptions.universe));
        await Promise.all(instruments.map(name => this.openItemStream(name).catch(() => Promise.resolve(void 0))));
        this.pricingStreamEmitter.emit(pricing_stream_interfaces_1.StreamEvent.Complete, this);
        if (this.checkAllPricingStreamClosed() || !this.instrumentStreams.size) {
            this.setState(state_manager_interface_1.State.Closed);
        }
    }
    async cleanUp() {
        await Promise.all([...this.instrumentStreams.values()].map(pricingStream => pricingStream.close()));
    }
    getFieldValue(instrument, field) {
        var _a;
        return (_a = this.getInstrument(instrument)) === null || _a === void 0 ? void 0 : _a.getFieldValue(field);
    }
    getFields(instrument, fields) {
        var _a;
        return (_a = this.getInstrument(instrument)) === null || _a === void 0 ? void 0 : _a.getFields(fields);
    }
    getItemStatus(instrument) {
        var _a;
        return (_a = this.getInstrument(instrument)) === null || _a === void 0 ? void 0 : _a.itemStatus;
    }
    onRefresh(cb) {
        this.pricingStreamEmitter.on(pricing_stream_interfaces_1.StreamEvent.Refresh, cb);
        return this;
    }
    onUpdate(cb) {
        this.pricingStreamEmitter.on(pricing_stream_interfaces_1.StreamEvent.Update, cb);
        return this;
    }
    onStatus(cb) {
        this.pricingStreamEmitter.on(pricing_stream_interfaces_1.StreamEvent.Status, cb);
        return this;
    }
    onComplete(cb) {
        this.pricingStreamEmitter.on(pricing_stream_interfaces_1.StreamEvent.Complete, cb);
        return this;
    }
    onError(cb) {
        this.pricingStreamEmitter.on(pricing_stream_interfaces_1.StreamEvent.Error, cb);
        return this;
    }
    openItemStream(name) {
        return new Promise((resolve, reject) => {
            const _a = this.streamOptions, { universe } = _a, rest = __rest(_a, ["universe"]);
            const instrumentParams = Object.assign({ name }, rest);
            const pricingInstrumentStream = new pricing_stream_instrument_1.PricingInstrumentStreamProvider(this.session, instrumentParams);
            this.addPricingInstrumentListeners(pricingInstrumentStream);
            this.nameToResolveCallback.set(name, () => resolve(void 0));
            this.instrumentStreams.set(name, pricingInstrumentStream);
            pricingInstrumentStream.open().catch(e => reject(e));
        });
    }
    addPricingInstrumentListeners(pricingInstrumentStream) {
        pricingInstrumentStream.once(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Refresh, this.openSingleStream);
        pricingInstrumentStream.on(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Refresh, this.onSingleStreamRefresh);
        pricingInstrumentStream.on(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Update, this.onSingleStreamUpdate);
        pricingInstrumentStream.on(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Status, this.onSingleStreamStatus);
        pricingInstrumentStream.on(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.Error, this.onSingleStreamError);
        pricingInstrumentStream.on(pricing_stream_instrument_interfaces_1.PricingInstrumentEvent.StateChanged, this.onSingleStreamStateChanged);
    }
    checkAllPricingStreamClosed() {
        return (!!this.instrumentStreams.size &&
            [...this.instrumentStreams.values()].every(pricingInstrumentStream => pricingInstrumentStream.state === state_manager_interface_1.State.Closed));
    }
    getInstrument(name) {
        return this.instrumentStreams.get(name);
    }
    getDefaultStreamOptions(parameters, api) {
        return Object.assign(Object.assign({}, parameters), { universe: [].concat(parameters.universe), streaming: true, api, domain: pricing_stream_interfaces_1.MARKET_PRICE_DOMAIN });
    }
}
exports.PricingStream = PricingStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpY2luZy1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9wcmljaW5nL3N0cmVhbS9wcmljaW5nLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUFpRDtBQUVqRCxnRUFBb0U7QUFDcEUsb0ZBQStEO0FBQy9ELHVFQUFtRTtBQUNuRSxpRUFBcUQ7QUFDckQsMkVBQThFO0FBQzlFLGlHQUFrSTtBQUNsSSwyRUFZcUM7QUFFckMsTUFBTSwrQkFBK0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUd6RCxNQUFhLGFBQWMsU0FBUSxvQ0FBb0I7SUFPbkQsWUFBbUIsT0FBZ0IsRUFBVSxVQUFrQixFQUFVLEdBQVc7UUFDaEYsS0FBSyxFQUFFLENBQUM7UUFETyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFOMUUseUJBQW9CLEdBQUcsSUFBYyxDQUFDO1FBRXhDLHNCQUFpQixHQUF5QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3BFLDBCQUFxQixHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBb0cxRCxxQkFBZ0IsR0FBRyxDQUFDLElBQWUsRUFBRSxNQUErQixFQUFRLEVBQUU7WUFDbEYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUM7WUFDcEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsY0FBYyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBRU0sMEJBQXFCLEdBQUcsQ0FBQyxP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