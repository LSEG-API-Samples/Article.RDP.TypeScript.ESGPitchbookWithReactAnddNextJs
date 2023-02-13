"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const default_session_1 = require("../../../session/default-session");
const metadata_stream_1 = require("./metadata-stream");
function Definition(params) {
    return {
        getStream(session = default_session_1.getDefault()) {
            return new metadata_stream_1.StreamingMetadataImpl(session, params);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L3ByaWNpbmcvbWV0YWRhdGEvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzRUFBOEQ7QUFHOUQsdURBQTBEO0FBSzFELFNBQWdCLFVBQVUsQ0FBQyxNQUFlO0lBQ3RDLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBbUIsNEJBQVUsRUFBRTtZQUNyQyxPQUFPLElBQUksdUNBQXFCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQU5ELGdDQU1DIn0=