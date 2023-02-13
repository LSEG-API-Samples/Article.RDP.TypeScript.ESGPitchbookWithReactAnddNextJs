"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSessionInstance = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
function isSessionInstance(obj) {
    return (obj instanceof eventemitter3_1.default &&
        'state' in obj &&
        'open' in obj &&
        typeof obj.open === 'function' &&
        'close' in obj &&
        typeof obj.close === 'function');
}
exports.isSessionInstance = isSessionInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtc2Vzc2lvbi1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL2lzLXNlc3Npb24taW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQXlDO0FBR3pDLFNBQWdCLGlCQUFpQixDQUFDLEdBQVE7SUFDdEMsT0FBTyxDQUNILEdBQUcsWUFBWSx1QkFBWTtRQUMzQixPQUFPLElBQUksR0FBRztRQUNkLE1BQU0sSUFBSSxHQUFHO1FBQ2IsT0FBUSxHQUFXLENBQUMsSUFBSSxLQUFLLFVBQVU7UUFDdkMsT0FBTyxJQUFJLEdBQUc7UUFDZCxPQUFRLEdBQVcsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUMzQyxDQUFDO0FBQ04sQ0FBQztBQVRELDhDQVNDIn0=