"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamConnectionImpl = void 0;
const constants_1 = require("../../constants");
const logger_1 = require("../../logger");
const reconnect_state_manager_1 = require("../../state/reconnect-state-manager");
const state_manager_interface_1 = require("../../state/state-manager.interface");
const stream_connection_interface_1 = require("./stream-connection.interface");
const stream_message_converter_1 = require("./stream-message-converter");
class StreamConnectionImpl extends reconnect_state_manager_1.AbstractReconnectStateManager {
    constructor(protocol, socketCreatorsList, getStreamLoginParams, hashGenerator) {
        super();
        this.protocol = protocol;
        this.socketCreatorsList = socketCreatorsList;
        this.getStreamLoginParams = getStreamLoginParams;
        this.hashGenerator = hashGenerator;
        this.streamEventsEmitter = this;
        this.isAlive = false;
        this.pingPongConfig = this.protocol.getPingPongConfig();
        this.log = logger_1.logger.getLogger('stream:connection');
    }
    get invalidStateMessage() {
        return constants_1.ErrorMessages.INVALID_STREAM_CONNECTION_STATE_MESSAGE;
    }
    async initialize(socketIndex = 0) {
        try {
            this.log.debug(`Initialize connection. socketIndex=${socketIndex}`);
            this.connection = this.socketCreatorsList[socketIndex]();
            await new Promise((resolve, reject) => {
                this.internalChannel.once(stream_connection_interface_1.StreamConnectionEvent.AuthenticationSuccess, resolve);
                this.internalChannel.once(stream_connection_interface_1.StreamConnectionEvent.Error, reject);
                this.connection = this.connection;
                this.connection.binaryType = 'arraybuffer';
                this.connection.onerror = (err) => this.onStreamError(err);
                this.connection.onclose = () => this.onStreamError(new Error(constants_1.ErrorMessages.DROPPED_STREAM_INITIALIZATION));
                this.connection.onmessage = this.onStreamMessage.bind(this);
                this.connection.onopen = this.login.bind(this);
            });
            this.internalChannel.removeAllListeners();
        }
        catch (err) {
            this.internalChannel.removeAllListeners();
            if (socketIndex === this.socketCreatorsList.length - 1) {
                throw err;
            }
            this.log.info(`Streaming connection has failed. Trying the next one...`);
            return this.initialize(socketIndex + 1);
        }
    }
    async cleanUp() {
        if (this.connection) {
            this.connection.onerror = undefined;
            this.connection.onclose = undefined;
            this.connection.onmessage = undefined;
            this.connection.onopen = undefined;
            this.connection.close();
        }
        this.clearPingTimeout();
    }
    async request(streamRequest) {
        this.validateState();
        const ID = this.hashGenerator.generateHash();
        const request = this.protocol.createRequest(ID, streamRequest);
        this.log.debug('Streaming request:', request);
        await this.sendMessage(request);
        return ID;
    }
    async closeRequest(ID) {
        if (this.state === state_manager_interface_1.State.Opened) {
            const closeMessage = this.protocol.createCloseRequest(ID);
            await this.sendMessage(closeMessage);
        }
    }
    async modifyRequest(ID, params) {
        if (this.state === state_manager_interface_1.State.Opened) {
            if (!this.protocol.createModifyRequest) {
                return Promise.resolve();
            }
            const request = this.protocol.createModifyRequest(ID, params);
            await this.sendMessage(request);
        }
    }
    async refresh() {
        if (this.state === state_manager_interface_1.State.Opened) {
            return this.login();
        }
    }
    async login() {
        await this.sendMessage(this.protocol.getLoginMessage(this.getStreamLoginParams()));
    }
    async sendMessage(data) {
        try {
            return this.connection.send(JSON.stringify(data));
        }
        catch (err) {
            await this.onStreamError(err);
        }
    }
    async onStreamError(err) {
        this.streamEventsEmitter.emit(stream_connection_interface_1.StreamConnectionEvent.Error, err, this);
        this.cleanUp();
        if (this.state === state_manager_interface_1.State.Opened) {
            this.log.debug(`closeWithKeptReconnect()`);
            await this.closeWithKeptReconnect();
        }
    }
    async onAuthMessage(message) {
        const { isClosedStatusMessage, isErrorMessage, errorMessage, stateMessage } = this.protocol.getSummary(message);
        if (!isClosedStatusMessage && !isErrorMessage) {
            this.streamEventsEmitter.emit(stream_connection_interface_1.StreamConnectionEvent.AuthenticationSuccess, this);
            if (this.pingPongConfig) {
                this.isAlive = true;
                this.heartbeat();
            }
            return;
        }
        const description = errorMessage || stateMessage || `Error details are missed`;
        this.log.debug('Auth issue:', description);
        const error = new Error(`${constants_1.ErrorMessages.FAILED_STREAM_AUTHENTICATION}. Details: ${description}`);
        this.streamEventsEmitter.emit(stream_connection_interface_1.StreamConnectionEvent.AuthenticationFailed, this, error);
        await this.onStreamError(error);
    }
    async onStreamMessage({ data }) {
        const responses = stream_message_converter_1.parseResponseMessage(data);
        responses.forEach(async (response) => {
            var _a, _b;
            if ((_a = this.pingPongConfig) === null || _a === void 0 ? void 0 : _a.isPingMessage(response)) {
                return this.sendMessage(this.pingPongConfig.getPongMessage());
            }
            if ((_b = this.pingPongConfig) === null || _b === void 0 ? void 0 : _b.isPongMessage(response)) {
                this.isAlive = true;
                return;
            }
            const { responseId, isErrorMessage, errorMessage } = this.protocol.getSummary(response);
            if (responseId === stream_connection_interface_1.STREAM_FIRST_REQUEST_ID) {
                return this.onAuthMessage(response);
            }
            if (isErrorMessage && !responseId) {
                return this.onStreamError(new Error(errorMessage || 'Stream received an error without ID'));
            }
            if (responseId) {
                return this.streamEventsEmitter.emit(responseId.toString(), response);
            }
            this.log.warn('Received an unsupported message', response);
        });
    }
    heartbeat() {
        if (this.pingTimeout) {
            return;
        }
        const healthCheck = () => {
            if (!this.isAlive) {
                this.clearPingTimeout();
                this.onStreamError(new Error(constants_1.ErrorMessages.CLOSED_STREAM_CONNECTION_TIMEOUT));
            }
            else {
                this.isAlive = false;
                this.sendMessage(this.pingPongConfig.getPingMessage());
                this.pingTimeout = setTimeout(healthCheck, stream_connection_interface_1.PING_TIMEOUT * 1000);
            }
        };
        this.pingTimeout = setTimeout(healthCheck, stream_connection_interface_1.PING_TIMEOUT * 1000);
    }
    clearPingTimeout() {
        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
        }
    }
}
exports.StreamConnectionImpl = StreamConnectionImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWNvbm5lY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVsaXZlcnkvc3RyZWFtL3N0cmVhbS1jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLCtDQUFnRDtBQUNoRCx5Q0FBc0M7QUFDdEMsaUZBQW9GO0FBQ3BGLGlGQUE0RDtBQUU1RCwrRUFRdUM7QUFDdkMseUVBQWtFO0FBR2xFLE1BQWEsb0JBQStCLFNBQVEsdURBQTZCO0lBVTdFLFlBQ1ksUUFBNEIsRUFDNUIsa0JBQW1DLEVBQ25DLG9CQUE2QyxFQUM3QyxhQUE0QztRQUVwRCxLQUFLLEVBQUUsQ0FBQztRQUxBLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQzVCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBaUI7UUFDbkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF5QjtRQUM3QyxrQkFBYSxHQUFiLGFBQWEsQ0FBK0I7UUFiOUMsd0JBQW1CLEdBQUcsSUFBNkIsQ0FBQztRQUt0RCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBWTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFjLG1CQUFtQjtRQUM3QixPQUFPLHlCQUFhLENBQUMsdUNBQXVDLENBQUM7SUFDakUsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBc0IsQ0FBQztRQUMzQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0NBQXNDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUV6RCxNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxtREFBcUIsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsbURBQXFCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUUvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUE2QixDQUFDO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUMzRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0M7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUxQyxJQUFJLFdBQVcsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEQsTUFBTSxHQUFHLENBQUM7YUFDYjtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxDQUFDLENBQUM7WUFFekUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNoQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBRW5DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFrQztRQUNuRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBVTtRQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssK0JBQUssQ0FBQyxNQUFNLEVBQUU7WUFDN0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFVLEVBQUUsTUFBMkI7UUFDOUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLCtCQUFLLENBQUMsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO2dCQUNwQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM1QjtZQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTlELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFjLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssK0JBQUssQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLEtBQUs7UUFDZixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQVM7UUFDL0IsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLFVBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBWSxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFVO1FBQ2xDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsbURBQXFCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssK0JBQUssQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBWTtRQUNwQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtREFBcUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVqRixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7WUFFRCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLFdBQVcsR0FBRyxZQUFZLElBQUksWUFBWSxJQUFJLDBCQUEwQixDQUFDO1FBQy9FLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLHlCQUFhLENBQUMsNEJBQTRCLGNBQWMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG1EQUFxQixDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2RixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQTRCO1FBQzVELE1BQU0sU0FBUyxHQUFHLCtDQUFvQixDQUFNLElBQUksQ0FBQyxDQUFDO1FBRWxELFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFOztZQUMvQixJQUFJLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2FBQ2pFO1lBRUQsSUFBSSxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLE9BQU87YUFDVjtZQUVELE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhGLElBQUksVUFBVSxLQUFLLHFEQUF1QixFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkM7WUFFRCxJQUFJLGNBQWMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxxQ0FBcUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Y7WUFFRCxJQUFJLFVBQVUsRUFBRTtnQkFDWixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sU0FBUztRQUNiLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixPQUFPO1NBQ1Y7UUFFRCxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7YUFDakY7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsMENBQVksR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNuRTtRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSwwQ0FBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0NBQ0o7QUEvTUQsb0RBK01DIn0=