"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusSocketServerHandler = void 0;
const ipc_bus_socket_1 = require("../interfaces/ipc-bus-socket");
const ipc_bus_socket_2 = require("./ipc-bus-socket");
class IpcBusSocketServerHandler extends ipc_bus_socket_2.IpcBusSocket {
    constructor(ipcBus, clientChannel, serverChannel, onDisconnect) {
        super();
        this.ipcBus = ipcBus;
        this.clientChannel = clientChannel;
        this.serverChannel = serverChannel;
        this.onDisconnect = onDisconnect;
        this.isDisconnected = false;
        const initMessage = { type: ipc_bus_socket_1.IpcBusSocketMessageType.Init };
        this.subscription = this.ipcBus.subscribe(this.clientChannel, (channel, data) => this.onMessage(data));
        this.sendRawMessage(initMessage);
        this.startPing();
    }
    send(message) {
        this.sendRawMessage(this.formatMessage(message));
    }
    sendRawMessage(message) {
        if (!this.isDisconnected) {
            this.ipcBus.publish(this.serverChannel, message);
        }
    }
    close() {
        if (this.isDisconnected) {
            return;
        }
        const closeMessage = {
            type: ipc_bus_socket_1.IpcBusSocketMessageType.Close,
            reason: 'Server closes the connection',
        };
        this.sendRawMessage(closeMessage);
        this.subscription.unsubscribe();
        this.stopPing();
        this.isDisconnected = true;
        this.onDisconnect();
    }
}
exports.IpcBusSocketServerHandler = IpcBusSocketServerHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1zb2NrZXQtc2VydmVyLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29ja2V0L2lwYy1idXMtc29ja2V0LXNlcnZlci1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlFQUEwSDtBQUMxSCxxREFBZ0Q7QUFLaEQsTUFBYSx5QkFBMEIsU0FBUSw2QkFBWTtJQVd2RCxZQUNZLE1BQXFCLEVBQ3JCLGFBQXFCLEVBQ3JCLGFBQXFCLEVBQ3JCLFlBQXdCO1FBRWhDLEtBQUssRUFBRSxDQUFDO1FBTEEsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQVg3QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQWVuQyxNQUFNLFdBQVcsR0FBNEIsRUFBRSxJQUFJLEVBQUUsd0NBQXVCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFNTSxJQUFJLENBQUMsT0FBZTtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBTU0sY0FBYyxDQUFDLE9BQXdCO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBS00sS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixPQUFPO1NBQ1Y7UUFFRCxNQUFNLFlBQVksR0FBNkI7WUFDM0MsSUFBSSxFQUFFLHdDQUF1QixDQUFDLEtBQUs7WUFDbkMsTUFBTSxFQUFFLDhCQUE4QjtTQUN6QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBakVELDhEQWlFQyJ9