"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportMix = void 0;
const container_session_1 = require("../../constants/container-session");
const error_messages_1 = require("../../constants/error-messages");
const validate_required_1 = require("../../util/validate-required");
const container_session_params_interface_1 = require("./container-session-params.interface");
const transport_http_1 = require("./transport-http");
const transport_pipe_1 = require("./transport-pipe");
class TransportMix {
    constructor(params) {
        this.isInitialized = false;
        const { bus, execEnv, appKey } = params;
        const busIsMandatoryInContainer = [container_session_1.ExecutionContainer.RTK, container_session_1.ExecutionContainer.SXS_WEB, container_session_1.ExecutionContainer.WORKSPACE_SDK];
        this.execEnv = execEnv;
        if (busIsMandatoryInContainer.some(container => container === execEnv)) {
            validate_required_1.validateRequired({ bus }, ['bus'], 'IPC');
            bus.connect = bus.connect || (() => Promise.resolve(void 0));
        }
        const transportHttpParams = {
            bus: bus,
            appKey,
        };
        this.transportHttp = new transport_http_1.TransportHttp(transportHttpParams);
        this.transportPipe = new transport_pipe_1.TransportPipe(bus);
    }
    async initialize() {
        try {
            await Promise.race([
                this.transportPipe.initialize(),
                new Promise((res, rej) => setTimeout(rej, container_session_params_interface_1.PIPE_INIT_WAIT_MAX_TIMEOUT_MS)),
            ]);
        }
        catch (error) {
            this.transportPipe = this.transportHttp;
        }
        await this.transportHttp.initialize();
        this.isInitialized = true;
    }
    async authorize(authParams) {
        if (!this.isInitialized) {
            throw new Error(error_messages_1.ErrorMessages.INITIALIZE_FIRST);
        }
        await Promise.all([this.transportHttp.authorize(authParams), this.transportPipe.authorize(authParams)]);
    }
    async cleanUp() {
        await this.transportHttp.cleanUp();
        await this.transportPipe.cleanUp();
    }
    get rdpUrlRoot() {
        return this.transportHttp.rdpUrlRoot;
    }
    async request(requestParams) {
        return this.transportPipe.request(requestParams);
    }
    getStreamTransport(api, protocol) {
        return this.transportPipe.getStreamTransport(api, protocol, this.execEnv);
    }
    getStreamLoginParams() {
        return this.transportPipe.getStreamLoginParams();
    }
}
exports.TransportMix = TransportMix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LW1peC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXNzaW9uL2NvbnRhaW5lci90cmFuc3BvcnQtbWl4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlFQUF1RTtBQUN2RSxtRUFBK0Q7QUFFL0Qsb0VBQWdFO0FBRWhFLDZGQUFxRjtBQUVyRixxREFBaUQ7QUFDakQscURBQWlEO0FBR2pELE1BQWEsWUFBWTtJQU1yQixZQUFZLE1BQTBCO1FBSDlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSW5DLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN4QyxNQUFNLHlCQUF5QixHQUFHLENBQUMsc0NBQWtCLENBQUMsR0FBRyxFQUFFLHNDQUFrQixDQUFDLE9BQU8sRUFBRSxzQ0FBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6SCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsRUFBRTtZQUNwRSxvQ0FBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsR0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxNQUFNLG1CQUFtQixHQUF3QjtZQUM3QyxHQUFHLEVBQUUsR0FBb0I7WUFDekIsTUFBTTtTQUNULENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLEdBQW9CLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDbkIsSUFBSTtZQUNBLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDZixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtnQkFDL0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLGtFQUE2QixDQUFDLENBQUM7YUFDNUUsQ0FBQyxDQUFDO1NBQ047UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMzQztRQUVELE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFxQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNuRDtRQUVELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDaEIsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPLENBQUksYUFBbUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBT00sa0JBQWtCLENBQUMsR0FBVyxFQUFFLFFBQWdCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sb0JBQW9CO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3JELENBQUM7Q0FDSjtBQTFFRCxvQ0EwRUMifQ==