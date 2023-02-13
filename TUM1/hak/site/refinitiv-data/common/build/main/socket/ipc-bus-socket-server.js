"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusSocketServer = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const server_handshake_1 = require("../handshake/server-handshake");
const stringify_ipc_bus_service_1 = require("../ipc-bus-service/stringify-ipc-bus-service");
const ipc_bus_socket_server_handler_1 = require("./ipc-bus-socket-server-handler");
class IpcBusSocketServer extends eventemitter3_1.default {
    constructor(ipcBus, channel) {
        super();
        this.channel = channel;
        this.socketHandlers = [];
        this.ipcBus = new stringify_ipc_bus_service_1.StringifyIpcBusService(ipcBus);
        this.serverHandshake = new server_handshake_1.ServerHandshake(this.ipcBus);
    }
    async connect() {
        if (this.subscription) {
            return;
        }
        await this.ipcBus.connect();
        this.subscription = this.ipcBus.subscribe(this.channel, (channel, message) => {
            const { clientChannel, serverChannel, data } = message;
            const handler = new ipc_bus_socket_server_handler_1.IpcBusSocketServerHandler(this.ipcBus, clientChannel, serverChannel, () => {
                this.socketHandlers = this.socketHandlers.filter(socketHandler => !socketHandler.isDisconnected);
            });
            handler.protocol = data.streamProtocol;
            this.socketHandlers.push(handler);
            this.emit('connection', handler, data);
        });
        await this.serverHandshake.connect(this.channel);
    }
    disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = void 0;
        }
        this.socketHandlers.forEach(socketHandler => socketHandler.close());
        this.serverHandshake.disconnect();
    }
}
exports.IpcBusSocketServer = IpcBusSocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1zb2NrZXQtc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NvY2tldC9pcGMtYnVzLXNvY2tldC1zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQXlDO0FBRXpDLG9FQUFnRTtBQUdoRSw0RkFBc0Y7QUFDdEYsbUZBQTRFO0FBSzVFLE1BQWEsa0JBQW1CLFNBQVEsdUJBQVk7SUFPaEQsWUFBWSxNQUFxQixFQUFVLE9BQWU7UUFDdEQsS0FBSyxFQUFFLENBQUM7UUFEK0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUxsRCxtQkFBYyxHQUFnQyxFQUFFLENBQUM7UUFRckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtEQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBS00sS0FBSyxDQUFDLE9BQU87UUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUVELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDekUsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBb0MsQ0FBQztZQUVwRixNQUFNLE9BQU8sR0FBRyxJQUFJLHlEQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUU7Z0JBQzFGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUV2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBS00sVUFBVTtRQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBbkRELGdEQW1EQyJ9