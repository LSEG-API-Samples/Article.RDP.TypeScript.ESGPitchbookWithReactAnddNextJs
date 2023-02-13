"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmmProtocol = void 0;
const config_1 = require("../../../config");
const stream_connection_interface_1 = require("../stream-connection.interface");
const stream_message_converter_1 = require("../stream-message-converter");
const omm_types_interface_1 = require("./omm-types.interface");
const protocol_interface_1 = require("./protocol.interface");
class OmmProtocol {
    getProtocolName() {
        return 'tr_json2';
    }
    getProtocolType() {
        return config_1.StreamingType.OMM;
    }
    getPingPongConfig() {
        return {
            getPongMessage: () => ({ Type: omm_types_interface_1.OMMRequestType.Pong }),
            getPingMessage: () => ({ Type: omm_types_interface_1.OMMRequestType.Ping }),
            isPingMessage: res => res.Type === omm_types_interface_1.OMMResponseType.Ping,
            isPongMessage: res => res.Type === omm_types_interface_1.OMMResponseType.Pong,
        };
    }
    getInitialMessageSummary(res) {
        if (res.Type === omm_types_interface_1.OMMResponseType.Refresh && res.Complete === false) {
            return protocol_interface_1.ProtocolInitialMessageSummary.Pending;
        }
        if (this.isSuccessStatusMessage(res) || this.isCompleteSnapshotMessage(res)) {
            return protocol_interface_1.ProtocolInitialMessageSummary.Success;
        }
        else if (this.hasClosedState(res) || this.isErrorMessage(res)) {
            return protocol_interface_1.ProtocolInitialMessageSummary.Error;
        }
        return protocol_interface_1.ProtocolInitialMessageSummary.Pending;
    }
    getSummary(res) {
        var _a;
        const responseId = 'ID' in res ? res.ID : void 0;
        const errorMessage = res.Type === omm_types_interface_1.OMMResponseType.Error ? res.Text : void 0;
        const stateMessage = 'State' in res ? (_a = res.State) === null || _a === void 0 ? void 0 : _a.Text : void 0;
        const isOpenStatusMessage = this.hasOpenState(res);
        const isClosedStatusMessage = this.hasClosedState(res);
        const isErrorMessage = this.isErrorMessage(res);
        const isCompleteSnapshotMessage = this.isCompleteSnapshotMessage(res);
        return {
            responseId,
            stateMessage,
            errorMessage,
            isErrorMessage,
            isOpenStatusMessage,
            isClosedStatusMessage,
            isCompleteSnapshotMessage,
        };
    }
    createRequest(id, params) {
        if (typeof params.name !== 'string') {
            throw new Error('Invalid name format!');
        }
        return Object.assign({ ID: id, Key: { Name: params.name, Service: params.service, Filter: params.filter }, Domain: params.domain, Streaming: params.streaming, Type: omm_types_interface_1.OMMRequestType.Request, View: params.view }, params.extendedParams);
    }
    createCloseRequest(id) {
        return {
            ID: id,
            Type: omm_types_interface_1.OMMRequestType.Close,
        };
    }
    getLoginMessage(loginParams) {
        const { position, applicationId, authorization, appKey, name, nameType, authenticationToken } = loginParams;
        return {
            ID: stream_connection_interface_1.STREAM_FIRST_REQUEST_ID,
            Domain: 'Login',
            Key: {
                Elements: {
                    ApplicationId: applicationId,
                    AppKey: appKey,
                    Position: position,
                    Authorization: authorization,
                    AuthenticationToken: authenticationToken,
                },
                Name: name,
                NameType: nameType,
            },
        };
    }
    getStreamingRecoverMessage(api, isCompleted) {
        return {
            Type: omm_types_interface_1.OMMResponseType.Status,
            State: {
                Data: isCompleted ? 'Ok' : 'Suspect',
                Stream: omm_types_interface_1.OMMResponseStateType.Open,
                Code: isCompleted ? 'FailoverCompleted' : 'FailoverStarted',
                Text: isCompleted ? stream_message_converter_1.getStreamConnectionReconnected(api) : stream_message_converter_1.getStreamConnectionRecover(api),
            },
        };
    }
    getStreamingErrorMessage(api, afterReconnect) {
        return {
            Type: omm_types_interface_1.OMMResponseType.Status,
            State: {
                Data: 'Suspect',
                Stream: omm_types_interface_1.OMMResponseStateType.Closed,
                Code: 'Error',
                Text: afterReconnect ? stream_message_converter_1.getStreamConnectionRecoverError(api) : stream_message_converter_1.getStreamConnectionError(api),
            },
        };
    }
    isSuccessStatusMessage(res) {
        return res.Type === omm_types_interface_1.OMMResponseType.Status && res.State.Stream === omm_types_interface_1.OMMResponseStateType.Open;
    }
    isCompleteSnapshotMessage(res) {
        return (res.Type === omm_types_interface_1.OMMResponseType.Refresh &&
            res.Complete !== false &&
            (!res.State || res.State.Stream === omm_types_interface_1.OMMResponseStateType.Open || res.State.Stream === omm_types_interface_1.OMMResponseStateType.NonStreaming));
    }
    isErrorMessage(res) {
        return res.Type === omm_types_interface_1.OMMResponseType.Error;
    }
    hasOpenState(res) {
        var _a;
        return 'State' in res && ((_a = res.State) === null || _a === void 0 ? void 0 : _a.Stream) === omm_types_interface_1.OMMResponseStateType.Open;
    }
    hasClosedState(res) {
        return !!('State' in res && res.State && res.State.Stream !== omm_types_interface_1.OMMResponseStateType.Open);
    }
}
exports.OmmProtocol = OmmProtocol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21tLXByb3RvY29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RlbGl2ZXJ5L3N0cmVhbS9wcm90b2NvbC9vbW0tcHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQWdEO0FBQ2hELGdGQUFpSDtBQUNqSCwwRUFLcUM7QUFDckMsK0RBTytCO0FBQy9CLDZEQUFnSTtBQUVoSSxNQUFhLFdBQVc7SUFDYixlQUFlO1FBQ2xCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxlQUFlO1FBQ2xCLE9BQU8sc0JBQWEsQ0FBQyxHQUFHLENBQUM7SUFDN0IsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixPQUFPO1lBQ0gsY0FBYyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsb0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRCxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxvQ0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXJELGFBQWEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUsscUNBQWUsQ0FBQyxJQUFJO1lBQ3ZELGFBQWEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUsscUNBQWUsQ0FBQyxJQUFJO1NBQzFELENBQUM7SUFDTixDQUFDO0lBRU0sd0JBQXdCLENBQUMsR0FBZ0I7UUFDNUMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLHFDQUFlLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ2hFLE9BQU8sa0RBQTZCLENBQUMsT0FBTyxDQUFDO1NBQ2hEO1FBS0QsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lB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