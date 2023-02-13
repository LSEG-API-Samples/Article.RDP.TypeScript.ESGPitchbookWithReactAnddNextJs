"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionState = exports.SessionEventCode = exports.SessionEvent = void 0;
const state_1 = require("../state");
const EventReceived = 'eventReceived';
exports.SessionEvent = Object.assign(Object.assign({}, state_1.StateEvent), { EventReceived });
var SessionEventCode;
(function (SessionEventCode) {
    SessionEventCode["AuthenticationFailed"] = "authenticationFailed";
    SessionEventCode["AuthenticationSucceeded"] = "authenticationSucceeded";
    SessionEventCode["RefreshFailed"] = "refreshFailed";
    SessionEventCode["RefreshSucceeded"] = "refreshSucceeded";
})(SessionEventCode = exports.SessionEventCode || (exports.SessionEventCode = {}));
var SessionState;
(function (SessionState) {
    SessionState["Opened"] = "Opened";
    SessionState["Closed"] = "Closed";
    SessionState["Pending"] = "Pending";
})(SessionState = exports.SessionState || (exports.SessionState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2Vzc2lvbi9zZXNzaW9uLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxvQ0FBaUU7QUFFakUsTUFBTSxhQUFhLEdBQW9CLGVBQWUsQ0FBQztBQUUxQyxRQUFBLFlBQVksbUNBQVEsa0JBQVUsS0FBRSxhQUFhLElBQUc7QUFFN0QsSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQ3hCLGlFQUE2QyxDQUFBO0lBQzdDLHVFQUFtRCxDQUFBO0lBQ25ELG1EQUErQixDQUFBO0lBQy9CLHlEQUFxQyxDQUFBO0FBQ3pDLENBQUMsRUFMVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUszQjtBQUVELElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUNwQixpQ0FBaUIsQ0FBQTtJQUNqQixpQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkIifQ==