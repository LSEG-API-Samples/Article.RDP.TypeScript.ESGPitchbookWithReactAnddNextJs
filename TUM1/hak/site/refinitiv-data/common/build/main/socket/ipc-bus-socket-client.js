"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusSocketClient = void 0;
const uuid_1 = require("uuid");
const client_handshake_1 = require("../handshake/client-handshake");
const ipc_bus_socket_1 = require("../interfaces/ipc-bus-socket");
const stringify_ipc_bus_service_1 = require("../ipc-bus-service/stringify-ipc-bus-service");
const ipc_bus_socket_2 = require("./ipc-bus-socket");
class IpcBusSocketClient extends ipc_bus_socket_2.IpcBusSocket {
    constructor(ipcBus, channelName, streamApi, streamProtocol, options) {
        super();
        this.channelName = channelName;
        this.streamApi = streamApi;
        this.streamProtocol = streamProtocol;
        const { disableStringify } = options || {};
        this.ipcBus = disableStringify ? ipcBus : new stringify_ipc_bus_service_1.StringifyIpcBusService(ipcBus);
        this.clientHandshake = new client_handshake_1.ClientHandshake(this.ipcBus);
    }
    close() {
        if (!this.subscription) {
            return;
        }
        const closeMessage = {
            type: ipc_bus_socket_1.IpcBusSocketMessageType.Close,
            reason: 'Client closes the connection',
        };
        this.sendRawMessage(closeMessage);
        this.subscription.unsubscribe();
        this.subscription = void 0;
        this.stopPing();
    }
    async connect() {
        if (this.subscription) {
            return;
        }
        await this.clientHandshake.connect(this.channelName);
        const { serverChannel, clientChannel } = this.generateChannelsName();
        this.serverChannel = serverChannel;
        this.clientChannel = clientChannel;
        const initMessage = {
            serverChannel,
            clientChannel,
            data: {
                streamApi: this.streamApi,
                streamProtocol: this.streamProtocol,
            },
        };
        this.subscription = this.ipcBus.subscribe(this.serverChannel, (channel, data) => this.onMessage(data));
        this.ipcBus.publish(this.channelName, initMessage);
        this.startPing();
    }
    send(message) {
        this.sendRawMessage(this.formatMessage(message));
    }
    sendRawMessage(message) {
        if (this.subscription) {
            this.ipcBus.publish(this.clientChannel, message);
        }
    }
    generateChannelsName() {
        const uuid = uuid_1.v4();
        const serverChannel = `${uuid}-server`;
        const clientChannel = `${uuid}-client`;
        return { serverChannel, clientChannel };
    }
}
exports.IpcBusSocketClient = IpcBusSocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1zb2NrZXQtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NvY2tldC9pcGMtYnVzLXNvY2tldC1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTBCO0FBRTFCLG9FQUFnRTtBQUdoRSxpRUFBNEg7QUFDNUgsNEZBQXNGO0FBQ3RGLHFEQUFnRDtBQU1oRCxNQUFhLGtCQUFtQixTQUFRLDZCQUFZO0lBc0JoRCxZQUNJLE1BQXFCLEVBQ2IsV0FBbUIsRUFDbkIsU0FBaUMsRUFDakMsY0FBc0IsRUFDOUIsT0FBOEI7UUFFOUIsS0FBSyxFQUFFLENBQUM7UUFMQSxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUF3QjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUs5QixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRTNDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxrREFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUtNLEtBQUs7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixPQUFPO1NBQ1Y7UUFFRCxNQUFNLFlBQVksR0FBNkI7WUFDM0MsSUFBSSxFQUFFLHdDQUF1QixDQUFDLEtBQUs7WUFDbkMsTUFBTSxFQUFFLDhCQUE4QjtTQUN6QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFLTSxLQUFLLENBQUMsT0FBTztRQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxNQUFNLFdBQVcsR0FBOEI7WUFDM0MsYUFBYTtZQUNiLGFBQWE7WUFDYixJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7YUFDdEM7U0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFNTSxJQUFJLENBQUMsT0FBZTtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBTU0sY0FBYyxDQUFDLE9BQXdCO1FBQzFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUtPLG9CQUFvQjtRQUN4QixNQUFNLElBQUksR0FBRyxTQUFFLEVBQUUsQ0FBQztRQUNsQixNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3ZDLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFFdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7QUFsSEQsZ0RBa0hDIn0=