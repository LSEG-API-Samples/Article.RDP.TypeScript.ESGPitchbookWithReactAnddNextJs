"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDPStream = exports.RDPStreamEvent = exports.DEFAULT_RDP_STREAMING_CONNECTION_NAME = void 0;
const default_session_1 = require("../../session/default-session");
const item_stream_interface_1 = require("./item-stream.interface");
const rdp_stream_1 = require("./rdp-stream");
exports.DEFAULT_RDP_STREAMING_CONNECTION_NAME = 'streaming/trading-analytics/redi';
const Ack = 'Ack';
const Update = 'Update';
const Response = 'Response';
const Alarm = 'Alarm';
exports.RDPStreamEvent = Object.assign(Object.assign({}, item_stream_interface_1.ItemStreamEvent), { Ack,
    Response,
    Update,
    Alarm });
class RDPStream {
    static Definition(params) {
        return {
            getStream: (session = default_session_1.getDefault()) => {
                return new rdp_stream_1.RDPStreamImpl(session, typeof params === 'string' ? { universe: params } : params);
            },
        };
    }
}
exports.RDPStream = RDPStream;
RDPStream.Event = exports.RDPStreamEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRwLXN0cmVhbS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVsaXZlcnkvc3RyZWFtL3JkcC1zdHJlYW0uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1FQUEyRDtBQUczRCxtRUFBMEQ7QUFFMUQsNkNBQTZDO0FBcUNoQyxRQUFBLHFDQUFxQyxHQUFHLGtDQUFrQyxDQUFDO0FBRXhGLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNsQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDeEIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUVULFFBQUEsY0FBYyxHQUFHLGdDQUN2Qix1Q0FBZSxLQUNsQixHQUFHO0lBQ0gsUUFBUTtJQUNSLE1BQU07SUFDTixLQUFLLEdBQ0MsQ0FBQztBQTJDWCxNQUFhLFNBQVM7SUFLWCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQXVDO1FBQzVELE9BQU87WUFDSCxTQUFTLEVBQUUsQ0FBQyxVQUFtQiw0QkFBVSxFQUFFLEVBQWEsRUFBRTtnQkFDdEQsT0FBTyxJQUFJLDBCQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xHLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQzs7QUFYTCw4QkFZQztBQVhpQixlQUFLLEdBQUcsc0JBQWMsQ0FBQyJ9