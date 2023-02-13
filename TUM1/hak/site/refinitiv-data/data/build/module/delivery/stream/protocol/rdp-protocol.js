"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdpProtocol = void 0;
const isArray_1 = __importDefault(require("lodash/isArray"));
const config_1 = require("../../../config");
const stream_connection_interface_1 = require("../stream-connection.interface");
const stream_message_converter_1 = require("../stream-message-converter");
const protocol_interface_1 = require("./protocol.interface");
const rdp_types_interface_1 = require("./rdp-types.interface");
const lodash_1 = require("lodash");
class RdpProtocol {
    getProtocolName() {
        return 'rdp_streaming';
    }
    getProtocolType() {
        return config_1.StreamingType.RDP;
    }
    getPingPongConfig() {
        return void 0;
    }
    getInitialMessageSummary(res) {
        const { isClosedStatusMessage, isCompleteSnapshotMessage, isOpenStatusMessage } = this.getSummary(res);
        if (isOpenStatusMessage || isCompleteSnapshotMessage) {
            return protocol_interface_1.ProtocolInitialMessageSummary.Success;
        }
        else if (isClosedStatusMessage) {
            return protocol_interface_1.ProtocolInitialMessageSummary.Error;
        }
        return protocol_interface_1.ProtocolInitialMessageSummary.Pending;
    }
    getSummary(res) {
        const isClosedStatusMessage = !!('state' in res &&
            (res.state.code >= 300 ||
                res.state.stream === rdp_types_interface_1.RDPResponseStateType.NonStreaming ||
                res.state.stream === rdp_types_interface_1.RDPResponseStateType.Closed));
        const isOpenStatusMessage = !!('state' in res &&
            res.state.code >= 200 &&
            res.state.code < 300 &&
            res.state.stream !== rdp_types_interface_1.RDPResponseStateType.NonStreaming &&
            res.state.stream !== rdp_types_interface_1.RDPResponseStateType.Closed);
        const isCompleteSnapshotMessage = res.type === rdp_types_interface_1.RDPResponseType.Response;
        const responseId = res.streamID ? Number(res.streamID) : void 0;
        const stateMessage = 'state' in res ? res.state.message : void 0;
        return {
            isClosedStatusMessage,
            isOpenStatusMessage,
            isCompleteSnapshotMessage,
            isErrorMessage: false,
            errorMessage: void 0,
            stateMessage,
            responseId,
        };
    }
    createRequest(id, params) {
        return this.createBasicRequest(id, params);
    }
    createCloseRequest(id) {
        return {
            streamID: String(id),
            method: rdp_types_interface_1.RDPRequestType.Close,
        };
    }
    createModifyRequest(id, params) {
        const basicRequest = this.createBasicRequest(id, params, rdp_types_interface_1.RDPRequestType.Modify);
        return lodash_1.omitBy(basicRequest, lodash_1.isEmpty);
    }
    createBasicRequest(id, params, method = rdp_types_interface_1.RDPRequestType.Subscribe) {
        const { name = [], domain, service, view, parameters } = params;
        return Object.assign({ streamID: String(id), method, context: domain, service,
            view, universe: isArray_1.default(name) ? name : [name], parameters: Object.assign({}, parameters) }, params.extendedParams);
    }
    getLoginMessage(loginParams) {
        const { authenticationToken, appKey, authorization } = loginParams;
        return {
            method: rdp_types_interface_1.RDPRequestType.Auth,
            streamID: String(stream_connection_interface_1.STREAM_FIRST_REQUEST_ID),
            token: authenticationToken,
            appKey,
            authorization,
        };
    }
    getStreamingRecoverMessage(api, isCompleted) {
        return {
            state: {
                code: 503,
                message: isCompleted ? stream_message_converter_1.getStreamConnectionReconnected(api) : stream_message_converter_1.getStreamConnectionRecover(api),
                status: isCompleted ? 'FailoverCompleted' : 'FailoverStarted',
                stream: rdp_types_interface_1.RDPResponseStateType.Open,
            },
            type: rdp_types_interface_1.RDPResponseType.Ack,
        };
    }
    getStreamingErrorMessage(api, afterReconnect) {
        return {
            state: {
                code: 500,
                message: afterReconnect ? stream_message_converter_1.getStreamConnectionRecoverError(api) : stream_message_converter_1.getStreamConnectionError(api),
                status: 'Error',
                stream: rdp_types_interface_1.RDPResponseStateType.Closed,
            },
            type: rdp_types_interface_1.RDPResponseType.Ack,
        };
    }
}
exports.RdpProtocol = RdpProtocol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRwLXByb3RvY29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RlbGl2ZXJ5L3N0cmVhbS9wcm90b2NvbC9yZHAtcHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkRBQXFDO0FBRXJDLDRDQUFnRDtBQUNoRCxnRkFBaUg7QUFDakgsMEVBS3FDO0FBQ3JDLDZEQUFnSTtBQUNoSSwrREFBdUg7QUFDdkgsbUNBQXlDO0FBRXpDLE1BQWEsV0FBVztJQUNiLGVBQWU7UUFDbEIsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVNLGVBQWU7UUFDbEIsT0FBTyxzQkFBYSxDQUFDLEdBQUcsQ0FBQztJQUM3QixDQUFDO0lBRU0saUJBQWlCO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLHdCQUF3QixDQUFDLEdBQWdCO1FBQzVDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkcsSUFBSSxtQkFBbUIsSUFBSSx5QkFBeUIsRUFBRTtZQUNsRCxPQUFPLGtEQUE2QixDQUFDLE9BQU8sQ0FBQztTQUNoRDthQUFNLElBQUkscUJBQXFCLEVBQUU7WUFDOUIsT0FBTyxrREFBNkIsQ0FBQyxLQUFLLENBQUM7U0FDOUM7UUFFRCxPQUFPLGtEQUE2QixDQUFDLE9BQU8sQ0FBQztJQUNqRCxDQUFDO0lBRU0sVUFBVSxDQUFDLEdBQWdCO1FBQzlCLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDLENBQzVCLE9BQU8sSUFBSSxHQUFHO1lBQ2QsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHO2dCQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSywwQ0FBb0IsQ0FBQyxZQUFZO2dCQUN0RCxHQUFHLENBQUMsS0FBSyxDQUFD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