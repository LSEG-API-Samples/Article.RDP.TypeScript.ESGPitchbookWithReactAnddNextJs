"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusReplier = void 0;
const serialize_error_1 = require("serialize-error");
const server_handshake_1 = require("../handshake/server-handshake");
const stringify_ipc_bus_service_1 = require("../ipc-bus-service/stringify-ipc-bus-service");
class IpcBusReplier {
    constructor(ipcBus, service) {
        this.service = service;
        this.ipcBus = new stringify_ipc_bus_service_1.StringifyIpcBusService(ipcBus);
        this.serverHandshake = new server_handshake_1.ServerHandshake(this.ipcBus);
    }
    async connect() {
        return this.ipcBus.connect();
    }
    handleRequest(channel, handler) {
        return this.ipcBus.subscribe(channel, async (innerChannel, msg) => {
            const requestMessage = msg;
            let busReplyMessage;
            try {
                const reply = await handler(requestMessage.content);
                busReplyMessage = {
                    correlationId: requestMessage.meta.correlationId,
                    reply,
                };
            }
            catch (err) {
                busReplyMessage = {
                    correlationId: requestMessage.meta.correlationId,
                    error: serialize_error_1.serializeError(err),
                };
            }
            this.ipcBus.publish(requestMessage.meta.replyTo, busReplyMessage);
        });
    }
    async start() {
        await this.serverHandshake.connect(this.service);
    }
    disconnect() {
        this.serverHandshake.disconnect();
    }
}
exports.IpcBusReplier = IpcBusReplier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1yZXBsaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlcGxpZXIvaXBjLWJ1cy1yZXBsaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRCxvRUFBZ0U7QUFJaEUsNEZBQXNGO0FBRXRGLE1BQWEsYUFBYTtJQUl0QixZQUFZLE1BQXFCLEVBQVUsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtEQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxhQUFhLENBQUMsT0FBZSxFQUFFLE9BQTJCO1FBQzdELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFvQixFQUFFLEdBQW9CLEVBQUUsRUFBRTtZQUN2RixNQUFNLGNBQWMsR0FBeUIsR0FBMkIsQ0FBQztZQUV6RSxJQUFJLGVBQWUsQ0FBQztZQUVwQixJQUFJO2dCQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFcEQsZUFBZSxHQUFHO29CQUNkLGFBQWEsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWE7b0JBQ2hELEtBQUs7aUJBQ1IsQ0FBQzthQUNMO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsZUFBZSxHQUFHO29CQUNkLGFBQWEsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWE7b0JBQ2hELEtBQUssRUFBRSxnQ0FBYyxDQUFDLEdBQUcsQ0FBQztpQkFDN0IsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBS00sS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBS00sVUFBVTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBbERELHNDQWtEQyJ9