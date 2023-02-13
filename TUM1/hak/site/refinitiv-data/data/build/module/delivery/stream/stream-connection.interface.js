"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PING_TIMEOUT = exports.StreamReconnectIntervals = exports.STREAM_FIRST_REQUEST_ID = exports.StreamConnectionEvent = void 0;
const state_1 = require("../../state");
const AuthenticationSuccess = 'authenticationSuccess';
const AuthenticationFailed = 'authenticationFailed';
exports.StreamConnectionEvent = Object.assign(Object.assign({}, state_1.StateEvent), { AuthenticationFailed, AuthenticationSuccess });
exports.STREAM_FIRST_REQUEST_ID = 1;
exports.StreamReconnectIntervals = {
    ["WEB"]: [5, 10, 15],
    ["NODEJS"]: [5, 10, 15, 5 * 60, 15 * 60, 60 * 60, 120 * 60],
};
exports.PING_TIMEOUT = 30;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLWNvbm5lY3Rpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlbGl2ZXJ5L3N0cmVhbS9zdHJlYW0tY29ubmVjdGlvbi5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQW9FO0FBR3BFLE1BQU0scUJBQXFCLEdBQTRCLHVCQUF1QixDQUFDO0FBQy9FLE1BQU0sb0JBQW9CLEdBQTJCLHNCQUFzQixDQUFDO0FBRS9ELFFBQUEscUJBQXFCLG1DQUFRLGtCQUFVLEtBQUUsb0JBQW9CLEVBQUUscUJBQXFCLElBQUc7QUFtQnZGLFFBQUEsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBaUQ1QixRQUFBLHdCQUF3QixHQUFHO0lBQ3BDLE9BQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM5QixVQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQztDQUN4RSxDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQUcsRUFBRSxDQUFDIn0=