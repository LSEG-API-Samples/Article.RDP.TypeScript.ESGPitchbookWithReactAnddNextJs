"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusRequester = void 0;
const serialize_error_1 = require("serialize-error");
const uuid_1 = require("uuid");
const client_handshake_1 = require("../handshake/client-handshake");
const stringify_ipc_bus_service_1 = require("../ipc-bus-service/stringify-ipc-bus-service");
const ipc_bus_requester_validator_1 = require("./ipc-bus-requester-validator");
const isErrorReplyMessage = (message) => {
    return message.error !== undefined && message.error !== null;
};
class IpcBusRequester {
    constructor(ipcBus, service, options = {}) {
        this.service = service;
        this.requestCount = 0;
        ipc_bus_requester_validator_1.validateBusMethods(ipcBus, 'Bus methods');
        const { disableStringify } = options;
        this.ipcBus = disableStringify ? ipcBus : new stringify_ipc_bus_service_1.StringifyIpcBusService(ipcBus);
        this.idToCallbackMap = new Map();
        this.replyChannel = uuid_1.v4();
        this.isConnected = false;
        this.clientHandshake = new client_handshake_1.ClientHandshake(this.ipcBus);
    }
    async connect() {
        if (this.isConnected) {
            return;
        }
        this.isConnected = true;
        try {
            await this.clientHandshake.connect(this.service);
            this.subscription = this.listenForResponses();
        }
        catch (error) {
            this.isConnected = false;
        }
    }
    async disconnect() {
        if (!this.isConnected) {
            return;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = void 0;
        }
        this.isConnected = false;
    }
    async request(channel, message) {
        if (!this.isConnected) {
            throw new Error('Cannot connect to the bus, please check IPC bus configuration');
        }
        return new Promise((resolve, reject) => {
            const id = `${this.replyChannel}-${this.requestCount++}`;
            this.idToCallbackMap.set(id, (err, data) => (err ? reject(err) : resolve(data)));
            const busRequestMessage = {
                content: message,
                meta: { correlationId: id, replyTo: this.replyChannel },
            };
            this.ipcBus.publish(channel, busRequestMessage);
        });
    }
    listenForResponses() {
        return this.ipcBus.subscribe(this.replyChannel, (channel, data) => {
            const replyMessage = data;
            const correlationId = replyMessage.correlationId;
            const handler = this.idToCallbackMap.get(correlationId);
            if (handler) {
                if (isErrorReplyMessage(replyMessage)) {
                    handler(serialize_error_1.deserializeError(replyMessage.error));
                }
                else {
                    handler(void 0, replyMessage.reply);
                }
                this.idToCallbackMap.delete(correlationId);
            }
        });
    }
}
exports.IpcBusRequester = IpcBusRequester;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1yZXF1ZXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVxdWVzdGVyL2lwYy1idXMtcmVxdWVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFtRDtBQUNuRCwrQkFBMEI7QUFFMUIsb0VBQWdFO0FBS2hFLDRGQUFzRjtBQUN0RiwrRUFBbUU7QUFFbkUsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQTJCLEVBQXNDLEVBQUU7SUFDNUYsT0FBUSxPQUFtQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUssT0FBbUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQzNILENBQUMsQ0FBQztBQU1GLE1BQWEsZUFBZTtJQWV4QixZQUFZLE1BQXFCLEVBQVUsT0FBZSxFQUFFLFVBQWdDLEVBQUU7UUFBbkQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUhsRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUlyQixnREFBa0IsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFMUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRXJDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxrREFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFFLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUtNLEtBQUssQ0FBQyxPQUFPO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixPQUFP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