"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const omm_stream_interface_1 = require("../../../delivery/stream/omm-stream.interface");
const default_session_1 = require("../../../session/default-session");
const service_directory_1 = require("./service-directory");
function Definition(params) {
    return {
        getStream(session = default_session_1.getDefault(), api = omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME) {
            return new service_directory_1.ServiceDirectoryProvider(session, api, params);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvc2VydmljZS1kaXJlY3RvcnkvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3RkFBc0c7QUFDdEcsc0VBQThEO0FBRzlELDJEQUErRDtBQUsvRCxTQUFnQixVQUFVLENBQUMsTUFBZTtJQUN0QyxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQW1CLDRCQUFVLEVBQUUsRUFBRSxNQUFjLDREQUFxQztZQUMxRixPQUFPLElBQUksNENBQXdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RCxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFORCxnQ0FNQyJ9