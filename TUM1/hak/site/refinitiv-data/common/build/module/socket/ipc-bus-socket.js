"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcBusSocket = exports.PING_TIMEOUT = void 0;
const ipc_bus_socket_1 = require("../interfaces/ipc-bus-socket");
exports.PING_TIMEOUT = 10 * 1000;
class IpcBusSocket {
    constructor() {
        this.binaryType = '';
        this.pingSuccess = true;
    }
    startPing() {
        if (this.timerId) {
            return;
        }
        const onTimeout = () => {
            if (!this.pingSuccess) {
                this.timerId = void 0;
                this.close();
                if (this.onerror) {
                    this.onerror({ error: new Error('Pong timeout'), message: 'Timeout', type: 'timeout', target: this });
                }
            }
            else {
                this.pingSuccess = false;
                const pingMessage = { type: ipc_bus_socket_1.IpcBusSocketMessageType.Ping };
                this.sendRawMessage(pingMessage);
                this.timerId = setTimeout(onTimeout, exports.PING_TIMEOUT);
            }
        };
        this.timerId = setTimeout(onTimeout, exports.PING_TIMEOUT);
    }
    stopPing() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = void 0;
        }
    }
    formatMessage(message) {
        const ipcBusSocketMessage = {
            data: message,
            type: ipc_bus_socket_1.IpcBusSocketMessageType.Data,
        };
        return ipcBusSocketMessage;
    }
    onMessage(message) {
        const serverMessage = message;
        switch (serverMessage.type) {
            case ipc_bus_socket_1.IpcBusSocketMessageType.Data:
                if (this.onmessage) {
                    this.onmessage({ data: serverMessage.data, target: this, type: 'data' });
                }
                break;
            case ipc_bus_socket_1.IpcBusSocketMessageType.Close:
                this.close();
                if (this.onclose) {
                    this.onclose({ reason: serverMessage.reason, wasClean: true, target: this, code: 1006 });
                }
                break;
            case ipc_bus_socket_1.IpcBusSocketMessageType.Init:
                if (this.onopen) {
                    this.onopen({ target: this });
                }
                break;
            case ipc_bus_socket_1.IpcBusSocketMessageType.Ping:
                const pongMessage = { type: ipc_bus_socket_1.IpcBusSocketMessageType.Pong };
                this.sendRawMessage(pongMessage);
                break;
            case ipc_bus_socket_1.IpcBusSocketMessageType.Pong:
                this.pingSuccess = true;
                break;
        }
    }
}
exports.IpcBusSocket = IpcBusSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1zb2NrZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29ja2V0L2lwYy1idXMtc29ja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlFQU1zQztBQUd6QixRQUFBLFlBQVksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBS3RDLE1BQXNCLFlBQVk7SUFBbEM7UUFvQlcsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUlyQixnQkFBVyxHQUFZLElBQUksQ0FBQztJQTJHMUMsQ0FBQztJQW5GYSxTQUFTO1FBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RzthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixNQUFNLFdBQVcsR0FBNEIsRUFBRSxJQUFJLEVBQUUsd0NBQXVCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRWpDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxvQkFBWSxDQUFDLENBQUM7YUFDdEQ7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsb0JBQVksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFLUyxRQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQU1TLGFBQWEsQ0FBQyxPQUFlO1FBQ25DLE1BQU0sbUJBQW1CLEdBQTRCO1lBQ2pELElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLHdDQUF1QixDQUFDLElBQUk7U0FDckMsQ0FBQztRQUVGLE9BQU8sbUJBQW1CLENBQUM7SUFDL0IsQ0FBQztJQU1TLFNBQVMsQ0FBQyxPQUF3QjtRQUN4QyxNQUFNLGFBQWEsR0FBd0IsT0FBOEIsQ0FBQztRQUUxRSxRQUFRLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDeEIsS0FBSyx3Q0FBdUIsQ0FBQyxJQUFJO2dCQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUM1RTtnQkFDRCxNQUFNO1lBQ1YsS0FBSyx3Q0FBdUIsQ0FBQyxLQUFLO2dCQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzVGO2dCQUNELE1BQU07WUFDVixLQUFLLHdDQUF1QixDQUFDLElBQUk7Z0JBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2pDO2dCQUNELE1BQU07WUFDVixLQUFLLHdDQUF1QixDQUFDLElBQUk7Z0JBQzdCLE1BQU0sV0FBVyxHQUE0QixFQUFFLElBQUksRUFBRSx3Q0FBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFakMsTUFBTTtZQUNWLEtBQUssd0NBQXVCLENBQUMsSUFBSTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRXhCLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FDSjtBQW5JRCxvQ0FtSUMifQ==