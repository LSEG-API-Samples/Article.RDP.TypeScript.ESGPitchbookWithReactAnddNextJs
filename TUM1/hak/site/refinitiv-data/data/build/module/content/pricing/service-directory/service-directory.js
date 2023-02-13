"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDirectoryProvider = void 0;
const omm_stream_1 = require("../../../delivery/stream/omm-stream");
const omm_stream_interface_1 = require("../../../delivery/stream/omm-stream.interface");
const state_manager_1 = require("../../../state/state-manager");
const validate_required_1 = require("../../../util/validate-required");
const ServiceDirectory = __importStar(require("./service-directory.interface"));
class ServiceDirectoryProvider extends state_manager_1.AbstractStateManager {
    constructor(session, api, definition = {}) {
        super();
        this.session = session;
        this.api = api;
        this.definition = definition;
        this.serviceDirectoryEmitter = this;
        this.serviceMap = new Map();
        this.nameToId = new Map();
    }
    getServiceDescription(service) {
        validate_required_1.validateRequired({ service }, ['service'], 'Pricing.ServiceDirectory.Params');
        const serviceDescription = this.getServiceFromMap(service);
        if (!serviceDescription) {
            throw new Error(`Unknown service ${service}.`);
        }
        return this.formatService(serviceDescription);
    }
    open(params) {
        const withUpdates = (params === null || params === void 0 ? void 0 : params.withUpdates) === undefined ? true : params.withUpdates;
        this.itemStream = this.createStream(withUpdates);
        return super.open();
    }
    onAdd(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Add, cb);
        return this;
    }
    onDelete(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Delete, cb);
        return this;
    }
    onUpdate(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Update, cb);
        return this;
    }
    onStatus(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Status, cb);
        return this;
    }
    onComplete(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Complete, cb);
        return this;
    }
    onError(cb) {
        this.serviceDirectoryEmitter.on(ServiceDirectory.Event.Error, cb);
        return this;
    }
    async initialize() {
        await this.itemStream.open();
    }
    async cleanUp() {
        var _a;
        await ((_a = this.itemStream) === null || _a === void 0 ? void 0 : _a.close());
    }
    onRefreshMessage(message) {
        var _a;
        const entries = (_a = message.Map) === null || _a === void 0 ? void 0 : _a.Entries;
        if (entries === null || entries === void 0 ? void 0 : entries.length) {
            this.serviceMap = this.createServiceMap(entries);
            entries.forEach(entry => {
                this.nameToId.set(entry.FilterList.Entries[0].Elements.Name, entry.Key);
                this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Add, entry, this);
            });
        }
        if (message.State) {
            this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Status, message.State, this);
        }
    }
    onUpdateMessage(message) {
        var _a;
        const entries = (_a = message.Map) === null || _a === void 0 ? void 0 : _a.Entries;
        if (entries === null || entries === void 0 ? void 0 : entries.length) {
            const serviceMapUpdates = this.createServiceMap(entries);
            entries.forEach(entry => {
                const id = entry.Key;
                const oldService = this.serviceMap.get(id);
                const serviceUpdates = serviceMapUpdates.get(id);
                if (serviceUpdates.action === ServiceDirectory.Event.Delete) {
                    this.serviceMap.delete(id);
                    this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Delete, entry, this);
                    return;
                }
                this.serviceMap.set(id, Object.assign(Object.assign({}, oldService), { description: Object.assign(Object.assign({}, oldService.description), serviceUpdates.description) }));
                this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Update, entry, this);
            });
        }
    }
    onCompleteMessage(stream) {
        this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Complete, this);
    }
    onStatusMessage(message) {
        this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Status, message.State, this);
    }
    onErrorMessage(error) {
        this.serviceDirectoryEmitter.emit(ServiceDirectory.Event.Error, error, this);
        this.close();
    }
    createServiceMap(entries) {
        const serviceMap = new Map();
        entries.forEach(service => {
            const serviceInfo = {
                id: service.Key,
                description: service.FilterList.Entries[0].Elements,
                action: service.Action,
            };
            serviceMap.set(service.Key, serviceInfo);
        });
        return serviceMap;
    }
    getServiceFromMap(service) {
        if (typeof service === 'string') {
            const id = this.nameToId.get(service);
            return id ? this.serviceMap.get(id) : undefined;
        }
        else {
            return this.serviceMap.get(service);
        }
    }
    formatService(service) {
        const { description } = service;
        const formattedService = Object.keys(description).reduce((res, key) => {
            res[key] = this.formatValue(description[key]);
            return res;
        }, {});
        return formattedService;
    }
    formatValue(value) {
        return typeof value === 'object' ? value.Data.Data : value;
    }
    createStream(withUpdates) {
        const itemStream = new omm_stream_1.OMMStreamImpl(this.session, {
            name: ServiceDirectory.SERVICE_DIRECTORY_DEFAULT_NAME,
            domain: ServiceDirectory.SOURCE_DOMAIN,
            filter: ServiceDirectory.SERVICE_DIRECTORY_DEFAULT_FILTER,
            api: this.api,
            extendedParams: this.definition.extendedParams,
            streaming: withUpdates,
        });
        itemStream.on(omm_stream_interface_1.OMMStream.Event.Refresh, this.onRefreshMessage.bind(this));
        itemStream.on(omm_stream_interface_1.OMMStream.Event.Update, this.onUpdateMessage.bind(this));
        itemStream.on(omm_stream_interface_1.OMMStream.Event.Complete, this.onCompleteMessage.bind(this));
        itemStream.on(omm_stream_interface_1.OMMStream.Event.Status, this.onStatusMessage.bind(this));
        itemStream.on(omm_stream_interface_1.OMMStream.Event.Error, this.onErrorMessage.bind(this));
        return itemStream;
    }
}
exports.ServiceDirectoryProvider = ServiceDirectoryProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1kaXJlY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9wcmljaW5nL3NlcnZpY2UtZGlyZWN0b3J5L3NlcnZpY2UtZGlyZWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBb0U7QUFDcEUsd0ZBQTBFO0FBRzFFLGdFQUFvRTtBQUNwRSx1RUFBbUU7QUFFbkUsZ0ZBQWtFO0FBR2xFLE1BQWEsd0JBQXlCLFNBQVEsb0NBQW9CO0lBTTlELFlBQW1CLE9BQWdCLEVBQVUsR0FBVyxFQUFrQixhQUFzQyxFQUFFO1FBQzlHLEtBQUssRUFBRSxDQUFDO1FBRE8sWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBa0IsZUFBVSxHQUFWLFVBQVUsQ0FBOEI7UUFMeEcsNEJBQXVCLEdBQUcsSUFBK0IsQ0FBQztRQUM1RCxlQUFVLEdBQXFELElBQUksR0FBRyxFQUFFLENBQUM7UUFDekUsYUFBUSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBS2xELENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxPQUF3QjtRQUNqRCxvQ0FBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztRQUU5RSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNsRDtRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxJQUFJLENBQUMsTUFBeUI7UUFDakMsTUFBTSxXQUFXLEdBQUcsQ0FBQSxNQUFNLGFB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