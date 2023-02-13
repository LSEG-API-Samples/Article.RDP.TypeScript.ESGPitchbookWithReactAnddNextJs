"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RW_DESKTOP_DETECTOR_REGEX = exports.EIKON_DESKTOP_DETECTOR_REGEX = exports.RTK_DETECTOR_OBJECT = exports.SXS_WEB_DETECTOR_OBJECT = exports.WORKSPACE_SDK_DETECTOR_OBJECT = exports.ExecutionContainer = exports.TransportType = exports.Platform = exports.STREAM_FIRST_REQUEST_ID = exports.APP_DEFAULT_SCOPE = exports.RW_REQUEST_PREFIX = exports.UDF_ENDPOINT_ROOT = exports.RDP_ENDPOINT_ROOT = void 0;
exports.RDP_ENDPOINT_ROOT = '/api/rdp';
exports.UDF_ENDPOINT_ROOT = '/api/udf';
exports.RW_REQUEST_PREFIX = '/eds';
exports.APP_DEFAULT_SCOPE = 'trapi';
exports.STREAM_FIRST_REQUEST_ID = 1;
var Platform;
(function (Platform) {
    Platform["ALPHA"] = "alpha";
    Platform["BETA"] = "beta";
    Platform["PROD"] = "prod";
})(Platform = exports.Platform || (exports.Platform = {}));
var TransportType;
(function (TransportType) {
    TransportType["PIPE"] = "PIPE";
    TransportType["HTTP"] = "HTTP";
    TransportType["MIX"] = "MIX";
})(TransportType = exports.TransportType || (exports.TransportType = {}));
var ExecutionContainer;
(function (ExecutionContainer) {
    ExecutionContainer["DESKTOP_RW_1_9"] = "DESKTOP_RW_1_9";
    ExecutionContainer["DESKTOP_RW_NON_1_9_OR_EIKON"] = "DESKTOP_RW_NON_1_9_OR_EIKON";
    ExecutionContainer["RTK"] = "RTK";
    ExecutionContainer["SXS_WEB"] = "SXS_WEB";
    ExecutionContainer["WORKSPACE_SDK"] = "WSDK";
    ExecutionContainer["WEB_RW_OR_EIKON"] = "WEB_RW_OR_EIKON";
    ExecutionContainer["UNKNOWN"] = "UNKNOWN";
})(ExecutionContainer = exports.ExecutionContainer || (exports.ExecutionContainer = {}));
exports.WORKSPACE_SDK_DETECTOR_OBJECT = 'WSDK';
exports.SXS_WEB_DETECTOR_OBJECT = 'sxsWeb';
exports.RTK_DETECTOR_OBJECT = 'RTK';
exports.EIKON_DESKTOP_DETECTOR_REGEX = /EikonViewer/i;
exports.RW_DESKTOP_DETECTOR_REGEX = /(TR-EikonLight|RefinitivWorkspace)/i;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uc3RhbnRzL2NvbnRhaW5lci1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdhLFFBQUEsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0FBQy9CLFFBQUEsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0FBRS9CLFFBQUEsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBSzNCLFFBQUEsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO0FBTTVCLFFBQUEsdUJBQXVCLEdBQVcsQ0FBQyxDQUFDO0FBS2pELElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNoQiwyQkFBZSxDQUFBO0lBQ2YseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBSW5CO0FBS0QsSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3JCLDhCQUFhLENBQUE7SUFDYiw4QkFBYSxDQUFBO0lBQ2IsNEJBQVcsQ0FBQTtBQUNmLENBQUMsRUFKVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUl4QjtBQUVELElBQVksa0JBb0JYO0FBcEJELFdBQVksa0JBQWtCO0lBRTFCLHVEQUFpQyxDQUFBO0lBR2pDLGlGQUEyRCxDQUFBO0lBRzNELGlDQUFXLENBQUE7SUFHWCx5Q0FBbUIsQ0FBQTtJQUduQiw0Q0FBc0IsQ0FBQTtJQUl0Qix5REFBbUMsQ0FBQTtJQUNuQyx5Q0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBcEJXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBb0I3QjtBQUVZLFFBQUEsNkJBQTZCLEdBQUcsTUFBTSxDQUFDO0FBQ3ZDLFFBQUEsdUJBQXVCLEdBQUcsUUFBUSxDQUFDO0FBQ25DLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFFBQUEsNEJBQTRCLEdBQUcsY0FBYyxDQUFDO0FBQzlDLFFBQUEseUJBQXlCLEdBQUcscUNBQXFDLENBQUMifQ==