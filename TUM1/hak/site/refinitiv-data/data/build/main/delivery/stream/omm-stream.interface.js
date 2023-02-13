"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OMMStream = exports.DEFAULT_OMM_STREAMING_CONNECTION_NAME = void 0;
const default_session_1 = require("../../session/default-session");
const item_stream_interface_1 = require("./item-stream.interface");
const omm_stream_1 = require("./omm-stream");
exports.DEFAULT_OMM_STREAMING_CONNECTION_NAME = 'streaming/pricing/main';
const Status = 'Status';
const Update = 'Update';
const Refresh = 'Refresh';
const OMMStreamEvent = Object.assign(Object.assign({}, item_stream_interface_1.ItemStreamEvent), { Refresh,
    Status,
    Update });
class OMMStream {
    static Definition(params) {
        return {
            getStream: (session = default_session_1.getDefault()) => {
                return new omm_stream_1.OMMStreamImpl(session, typeof params === 'string' ? { name: params } : params);
            },
        };
    }
}
exports.OMMStream = OMMStream;
OMMStream.Event = OMMStreamEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21tLXN0cmVhbS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGVsaXZlcnkvc3RyZWFtL29tbS1zdHJlYW0uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1FQUEyRDtBQUczRCxtRUFBMEQ7QUFDMUQsNkNBQTZDO0FBdURoQyxRQUFBLHFDQUFxQyxHQUFHLHdCQUF3QixDQUFDO0FBZ0I5RSxNQUFNLE1BQU0sR0FBYSxRQUFRLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQWEsUUFBUSxDQUFDO0FBQ2xDLE1BQU0sT0FBTyxHQUFjLFNBQVMsQ0FBQztBQUVyQyxNQUFNLGNBQWMsbUNBQ2IsdUNBQWUsS0FDbEIsT0FBTztJQUNQLE1BQU07SUFDTixNQUFNLEdBQ1QsQ0FBQztBQXFDRixNQUFhLFNBQVM7SUFLWCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQXVDO1FBQzVELE9BQU87WUFDSCxTQUFTLEVBQUUsQ0FBQyxVQUFtQiw0QkFBVSxFQUFFLEVBQWEsRUFBRTtnQkFDdEQsT0FBTyxJQUFJLDBCQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlGLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQzs7QUFYTCw4QkFZQztBQVhpQixlQUFLLEdBQUcsY0FBYyxDQUFDIn0=