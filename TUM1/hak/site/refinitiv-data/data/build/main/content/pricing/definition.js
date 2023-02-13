"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const omm_stream_interface_1 = require("../../delivery/stream/omm-stream.interface");
const default_session_1 = require("../../session/default-session");
const pricing_stream_1 = require("./stream/pricing-stream");
function Definition(params) {
    const parameters = isPlainObject_1.default(params) ? params : { universe: params };
    return {
        getStream(session = default_session_1.getDefault(), api = omm_stream_interface_1.DEFAULT_OMM_STREAMING_CONNECTION_NAME) {
            return new pricing_stream_1.PricingStream(session, parameters, api);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5RUFBaUQ7QUFFakQscUZBQW1HO0FBQ25HLG1FQUEyRDtBQUczRCw0REFBd0Q7QUFLeEQsU0FBZ0IsVUFBVSxDQUFDLE1BQWtDO0lBQ3pELE1BQU0sVUFBVSxHQUFXLHVCQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLE1BQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQTJCLEVBQUUsQ0FBQztJQUVsSCxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQW1CLDRCQUFVLEVBQUUsRUFBRSxNQUFjLDREQUFxQztZQUMxRixPQUFPLElBQUksOEJBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQVJELGdDQVFDIn0=