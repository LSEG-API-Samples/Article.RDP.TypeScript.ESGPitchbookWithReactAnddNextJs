"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportHost = void 0;
const stream_login_request_converter_1 = require("../../util/stream-login-request-converter");
const webSocket_helper_1 = require("../../util/webSocket-helper");
class TransportHost {
    constructor(host, dacs) {
        this.host = host;
        this.dacs = dacs;
        this.isRefreshRequired = false;
    }
    getStreamLoginParams() {
        return stream_login_request_converter_1.buildLocalSessionLoginData(this.dacs);
    }
    async getSocketCreators(api, protocol) {
        if (protocol !== 'tr_json2' && protocol !== 'rdp_streaming') {
            throw new Error(`"${protocol}" streaming connection type is not supported!`);
        }
        const wsEndpoint = `ws://${this.host}/WebSocket`;
        return [webSocket_helper_1.prepareSocketCreator(wsEndpoint, protocol)];
    }
}
exports.TransportHost = TransportHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LWhvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9wbGF0Zm9ybS90cmFuc3BvcnQtaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw4RkFBdUY7QUFDdkYsa0VBQW1FO0FBSW5FLE1BQWEsYUFBYTtJQUd0QixZQUFvQixJQUFZLEVBQVUsSUFBVztRQUFqQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTztRQUY5QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFdUIsQ0FBQztJQUVsRCxvQkFBb0I7UUFDdkIsT0FBTywyREFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQU9NLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFXLEVBQUUsUUFBZ0I7UUFDeEQsSUFBSSxRQUFRLEtBQUssVUFBVSxJQUFJLFFBQVEsS0FBSyxlQUFlLEVBQUU7WUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLFFBQVEsK0NBQStDLENBQUMsQ0FBQztTQUNoRjtRQUVELE1BQU0sVUFBVSxHQUFHLFFBQVEsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDO1FBRWpELE9BQU8sQ0FBQyx1Q0FBb0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0o7QUF2QkQsc0NBdUJDIn0=