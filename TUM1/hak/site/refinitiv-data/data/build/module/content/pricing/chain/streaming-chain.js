"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingChainImpl = void 0;
const constants_1 = require("../../../constants");
const delivery_1 = require("../../../delivery");
const omm_stream_1 = require("../../../delivery/stream/omm-stream");
const state_1 = require("../../../state");
const util_1 = require("../../../util");
const chain_record_1 = require("./chain-record");
const streaming_chain_error_1 = require("./streaming-chain-error");
const streaming_chain_helpers_1 = require("./streaming-chain.helpers");
const streaming_chain_interface_1 = require("./streaming-chain.interface");
const STREAMING_CHAINS_PARAMS = 'Streaming.Chain.Params';
const DEFAULT_PARAMS_VALUES = {
    skipEmpty: true,
    skipSummaryLinks: true,
    nameGuessingQuantity: streaming_chain_interface_1.QUANTITY_CHAIN_RECORDS_TO_REQUEST,
};
class StreamingChainImpl extends state_1.AbstractStateManager {
    constructor(session, name, params = {}) {
        super();
        this.session = session;
        this.name = name;
        this.streamingChainEmitter = this;
        this.constituentList = [];
        this.chainRecordsNames = [];
        this.chainRecordNameToItemStream = new Map();
        this.chainRecordNameToResolveCallback = new Map();
        this.chainRecordNameToStatus = new Map();
        this.chainRecordNameToChainRecord = new Map();
        this.chainRecordNameToOffset = new Map();
        this.chainRecordNameToUpdateData = new Map();
        this.chainRecordNameToError = new Map();
        this.isDecodingComplete = false;
        this.onRefresh = (data, stream) => {
            const resolveHandler = this.chainRecordNameToResolveCallback.get(stream.name);
            resolveHandler();
            this.chainRecordNameToItemStream.set(stream.name, stream);
            this.processChainRecord(stream.name, data);
            this.chainRecordNameToResolveCallback.delete(stream.name);
        };
        this.onUpdateOMMStream = (data, stream) => {
            if (!this.isDecodingComplete) {
                this.chainRecordNameToUpdateData.set(stream.name, data);
                return;
            }
            this.updateChainRecord(stream.name, data);
        };
        this.onStatus = (data, stream) => {
            const { State: state } = data;
            if (state) {
                this.chainRecordNameToStatus.set(stream.name, state);
            }
        };
        this.onStateChanged = () => {
            if (this.checkAllChainRecordsClosed()) {
                this.close();
            }
        };
        util_1.validateRequired({ session, name }, ['session', 'name'], STREAMING_CHAINS_PARAMS);
        this.params = Object.assign(Object.assign({}, DEFAULT_PARAMS_VALUES), params);
        this.chainRecordsNames = streaming_chain_helpers_1.generateChainRecordsNames(name, this.params.nameGuessingQuantity);
    }
    get definition() {
        return Object.assign({ name: this.name }, this.params);
    }
    async initialize() {
        this.validateSessionState();
        while (true) {
            try {
                await this.parallelDecode();
                const [lastName] = this.chainRecordsNames.slice(-1);
                const nextName = streaming_chain_helpers_1.getNextChainRecordName(lastName);
                this.chainRecordNameToError = new Map();
                this.chainRecordsNames = streaming_chain_helpers_1.generateChainRecordsNames(nextName, this.params.nameGuessingQuantity);
            }
            catch (e) {
                break;
            }
        }
        this.processRemainingUpdateData();
        this.isDecodingComplete = true;
        this.streamingChainEmitter.emit(streaming_chain_interface_1.Event.Complete, this.constituentList, this);
        if (this.checkAllChainRecordsClosed() || !this.chainRecordNameToItemStream.size) {
            this.emitItemStreamError([...this.chainRecordNameToError.keys()]);
            throw new Error(constants_1.ErrorMessages.STREAMING_CHAINS_CANNOT_OPEN);
        }
    }
    async cleanUp() {
        await Promise.all([...this.chainRecordNameToItemStream.values()].map(itemStream => itemStream.close()));
    }
    get isChain() {
        return this.isDecodingComplete;
    }
    get constituents() {
        const numOfSummaryLinks = this.getNumberOfSummaryLinks();
        let constituentsList = this.constituentList;
        if (this.params.skipSummaryLinks) {
            constituentsList = constituentsList.slice(numOfSummaryLinks);
        }
        if (this.params.skipEmpty) {
            constituentsList = constituentsList.filter(v => !!v);
        }
        return constituentsList;
    }
    get summaryLinks() {
        const numOfSummaryLinks = this.getNumberOfSummaryLinks();
        let summaryLinks = this.constituentList.slice(0, numOfSummaryLinks);
        if (this.params.skipEmpty) {
            summaryLinks = summaryLinks.filter(v => !!v);
        }
        return summaryLinks;
    }
    onAdd(cb) {
        this.on(streaming_chain_interface_1.Event.Add, cb);
        return this;
    }
    onRemove(cb) {
        this.on(streaming_chain_interface_1.Event.Remove, cb);
        return this;
    }
    onUpdate(cb) {
        this.on(streaming_chain_interface_1.Event.Update, cb);
        return this;
    }
    onComplete(cb) {
        this.on(streaming_chain_interface_1.Event.Complete, cb);
        return this;
    }
    onError(cb) {
        this.on(streaming_chain_interface_1.Event.Error, cb);
        return this;
    }
    processRemainingUpdateData() {
        this.chainRecordNameToUpdateData.forEach((data, name) => {
            this.updateChainRecord(name, data);
        });
    }
    async parallelDecode() {
        return new Promise(async (resolve, reject) => {
            let isError = false;
            await Promise.all(this.chainRecordsNames.map(name => this.openItemStreamForChainRecord(name, streaming_chain_helpers_1.getItemStreamInitParams(name, this.params)).catch(() => (isError = true))));
            this.extractConstituents();
            if (isError) {
                this.processErrors();
                reject();
                return;
            }
            resolve(void 0);
        });
    }
    openItemStreamForChainRecord(name, params) {
        return new Promise((resolve, reject) => {
            const itemStream = new omm_stream_1.OMMStreamImpl(this.session, params);
            this.addItemStreamListeners(itemStream);
            this.chainRecordNameToResolveCallback.set(name, () => resolve(void 0));
            itemStream.open().catch(err => {
                this.chainRecordNameToError.set(name, err);
                reject();
            });
        });
    }
    processErrors() {
        const nextRecordsNames = [...this.chainRecordNameToChainRecord.values()]
            .map((chainRecord) => chainRecord.nextCR)
            .filter((nextRecord) => !!nextRecord && this.chainRecordNameToError.has(nextRecord));
        this.emitItemStreamError(nextRecordsNames);
    }
    emitItemStreamError(recordsNames) {
        recordsNames.forEach(name => {
            const error = this.chainRecordNameToError.get(name);
            this.streamingChainEmitter.emit(streaming_chain_interface_1.Event.Error, new streaming_chain_error_1.StreamingChainError(error.message, name), this);
        });
    }
    addItemStreamListeners(itemStream) {
        itemStream.on(delivery_1.OMMStream.Event.Refresh, this.onRefresh);
        itemStream.on(delivery_1.OMMStream.Event.Update, this.onUpdateOMMStream);
        itemStream.on(delivery_1.OMMStream.Event.Status, this.onStatus);
        itemStream.on(delivery_1.OMMStream.Event.StateChanged, this.onStateChanged);
    }
    validateSessionState() {
        if (this.session.state !== state_1.State.Opened) {
            throw new Error(this.invalidStateMessage);
        }
    }
    hasChainRecord(name) {
        return this.chainRecordNameToChainRecord.has(name);
    }
    checkAllChainRecordsClosed() {
        return (!!this.chainRecordNameToItemStream.size &&
            [...this.chainRecordNameToItemStream.values()].every(itemStream => itemStream.state === state_1.State.Closed));
    }
    processChainRecord(name, data) {
        const { Fields: fields = {} } = data;
        const chainRecord = new chain_record_1.ChainRecordImpl(fields);
        if (!chainRecord.isValidChainRecord) {
            return;
        }
        this.chainRecordNameToChainRecord.set(name, chainRecord);
        if (!this.displayTemplate) {
            this.displayTemplate = chainRecord.displayTemplate;
        }
    }
    updateChainRecord(name, data) {
        const { Fields: fields = {} } = data;
        const chainRecord = this.chainRecordNameToChainRecord.get(name);
        const offset = this.chainRecordNameToOffset.get(name);
        const updatedIndexes = chainRecord.updateChainRecord(fields);
        updatedIndexes.forEach(pos => {
            const index = offset + pos;
            const oldConstituent = this.constituentList[index];
            const newConstituent = chainRecord.linkFields[pos];
            if (!oldConstituent && newConstituent) {
                this.appendConstituent(index, newConstituent);
                return;
            }
            if (oldConstituent && !newConstituent) {
                this.removeConstituent(index, oldConstituent);
                return;
            }
            this.updateConstituent(index, oldConstituent, newConstituent);
        });
    }
    extractConstituents() {
        let chainRecordName = this.chainRecordsNames[0];
        while (this.hasChainRecord(chainRecordName)) {
            const { linkFields, nextCR } = this.chainRecordNameToChainRecord.get(chainRecordName);
            this.chainRecordNameToOffset.set(chainRecordName, this.constituentList.length);
            linkFields.forEach(linkField => this.appendConstituent(this.constituentList.length, linkField));
            chainRecordName = nextCR;
        }
    }
    appendConstituent(index, constituent) {
        this.constituentList.push(constituent);
        this.streamingChainEmitter.emit(streaming_chain_interface_1.Event.Add, constituent, index, this);
    }
    updateConstituent(index, oldConstituent, newConstituent) {
        this.constituentList[index] = newConstituent;
        this.streamingChainEmitter.emit(streaming_chain_interface_1.Event.Update, newConstituent, oldConstituent, index, this);
    }
    removeConstituent(index, constituent) {
        this.constituentList[index] = '';
        this.streamingChainEmitter.emit(streaming_chain_interface_1.Event.Remove, constituent, index, this);
    }
    getNumberOfSummaryLinks() {
        return this.params.overrideSummaryLinks || (this.displayTemplate && chain_record_1.DisplayTemplate[this.displayTemplate]) || 0;
    }
}
exports.StreamingChainImpl = StreamingChainImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLWNoYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvcHJpY2luZy9jaGFpbi9zdHJlYW1pbmctY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQW1EO0FBQ25ELGdEQUFzRTtBQUN0RSxvRUFBb0U7QUFRcEUsMENBQTZEO0FBQzdELHdDQUFpRDtBQUNqRCxpREFBb0c7QUFDcEcsbUVBQThEO0FBQzlELHVFQUF1SDtBQUN2SCwyRUFXcUM7QUFFckMsTUFBTSx1QkFBdUIsR0FBRyx3QkFBd0IsQ0FBQztBQUN6RCxNQUFNLHFCQUFxQixHQUFrQjtJQUN6QyxTQUFTLEVBQUUsSUFBSTtJQUNmLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsb0JBQW9CLEVBQUUsNkRBQWlDO0NBQzFELENBQUM7QUFFRixNQUFhLGtCQUFtQixTQUFRLDRCQUFvQjtJQWdCeEQsWUFBb0IsT0FBZ0IsRUFBUyxJQUFZLEVBQUUsU0FBd0IsRUFBRTtRQUNqRixLQUFLLEVBQUUsQ0FBQztRQURRLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBZi9DLDBCQUFxQixHQUFHLElBQWMsQ0FBQztRQUd6QyxvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUUvQixzQkFBaUIsR0FBYSxFQUFFLENBQUM7UUFDakMsZ0NBQTJCLEdBQTJCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEUscUNBQWdDLEdBQTJCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckUsNEJBQXVCLEdBQWtDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbkUsaUNBQTRCLEdBQTZCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbkUsNEJBQXVCLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekQsZ0NBQTJCLEdBQW1DLElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEUsMkJBQXNCLEdBQXVCLElBQUksR0FB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