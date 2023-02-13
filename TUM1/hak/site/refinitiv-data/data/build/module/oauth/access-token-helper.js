"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowedHttpErrorToReconnect = exports.isHttpTimeoutError = exports.AXIOS_HTTP_TIMEOUT_ERROR_CODE = void 0;
const common_1 = require("@refinitiv-data/common");
exports.AXIOS_HTTP_TIMEOUT_ERROR_CODE = 'ECONNABORTED';
const ACCESS_DENIED_MESSAGE = 'access_denied';
const TOKEN_ERROR_DESCRIPTION_COOKIE = 'iPlanet session has been expired';
const TOKEN_ERROR_DESCRIPTION_NOT_EXISTS = 'Refresh token does not exist';
function isHttpTimeoutError(error) {
    var _a;
    return ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === common_1.HttpCode.REQUEST_TIMEOUT || (error === null || error === void 0 ? void 0 : error.code) === exports.AXIOS_HTTP_TIMEOUT_ERROR_CODE;
}
exports.isHttpTimeoutError = isHttpTimeoutError;
function isAllowedHttpErrorToReconnect(error) {
    return isIPlanetExpiredError(error) || isRefreshTokenNotExistsError(error);
}
exports.isAllowedHttpErrorToReconnect = isAllowedHttpErrorToReconnect;
function isAccessDeniedError(error) {
    return error.response.status === common_1.HttpCode.BAD_REQUEST && error.response.data.error === ACCESS_DENIED_MESSAGE;
}
function isIPlanetExpiredError(error) {
    var _a, _b;
    const description = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_description;
    if (!description) {
        return false;
    }
    return isAccessDeniedError(error) && description.indexOf(TOKEN_ERROR_DESCRIPTION_COOKIE) >= 0;
}
function isRefreshTokenNotExistsError(error) {
    var _a, _b;
    const description = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_description;
    if (!description) {
        return false;
    }
    return isAccessDeniedError(error) && description.indexOf(TOKEN_ERROR_DESCRIPTION_NOT_EXISTS) >= 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLXRva2VuLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vYXV0aC9hY2Nlc3MtdG9rZW4taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFrRDtBQUVyQyxRQUFBLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztBQUc1RCxNQUFNLHFCQUFxQixHQUFHLGVBQWUsQ0FBQztBQUM5QyxNQUFNLDhCQUE4QixHQUFHLGtDQUFrQyxDQUFDO0FBQzFFLE1BQU0sa0NBQWtDLEdBQUcsOEJBQThCLENBQUM7QUFFMUUsU0FBZ0Isa0JBQWtCLENBQUMsS0FBVTs7SUFDekMsT0FBTyxDQUFBLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsMENBQUUsTUFBTSxNQUFLLGlCQUFRLENBQUMsZUFBZSxJQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksTUFBSyxxQ0FBNkIsQ0FBQztBQUNqSCxDQUFDO0FBRkQsZ0RBRUM7QUFFRCxTQUFnQiw2QkFBNkIsQ0FBQyxLQUFVO0lBQ3BELE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUZELHNFQUVDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxLQUFVO0lBQ25DLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssaUJBQVEsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLHFCQUFxQixDQUFDO0FBQ2pILENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLEtBQVU7O0lBQ3JDLE1BQU0sV0FBVyxHQUF1QixNQUFBLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsMENBQUUsSUFBSSwwQ0FBRSxpQkFBaUIsQ0FBQztJQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2QsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUVELFNBQVMsNEJBQTRCLENBQUMsS0FBVTs7SUFDNUMsTUFBTSxXQUFXLEdBQXVCLE1BQUEsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSwwQ0FBRSxJQUFJLDBDQUFFLGlCQUFpQixDQUFDO0lBQ2pGLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDZCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELE9BQU8sbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0RyxDQUFDIn0=