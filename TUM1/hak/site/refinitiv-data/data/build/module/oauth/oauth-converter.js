"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuthConverter = exports.DEFAULT_SCOPE = void 0;
const qs_1 = __importDefault(require("qs"));
const grant_type_enum_1 = require("./grant-type.enum");
exports.DEFAULT_SCOPE = 'trapi';
const getPasswordGrantPayload = (oAuthGrantType, appKey) => {
    const { password, userName, scope, takeSignOnControl } = oAuthGrantType;
    const convertedOptions = {
        client_id: appKey,
        password,
        username: userName,
        grant_type: grant_type_enum_1.GrantType.Password,
        scope: scope || exports.DEFAULT_SCOPE,
    };
    if (takeSignOnControl !== undefined) {
        convertedOptions.takeExclusiveSignOnControl = takeSignOnControl;
    }
    return qs_1.default.stringify(convertedOptions);
};
const parseTokenResponse = (loginResponse) => {
    const { access_token, refresh_token, expires_in } = loginResponse;
    return {
        accessToken: access_token,
        expiresIn: Number(expires_in),
        refreshToken: refresh_token,
    };
};
const getRefreshGrantPayload = (oAuthGrantType, appKey, refreshToken) => {
    const { takeSignOnControl, userName } = oAuthGrantType;
    const convertedOptions = {
        client_id: appKey,
        grant_type: grant_type_enum_1.GrantType.RefreshToken,
        refresh_token: refreshToken,
        username: userName,
    };
    if (takeSignOnControl !== undefined) {
        convertedOptions.takeExclusiveSignOnControl = takeSignOnControl;
    }
    return qs_1.default.stringify(convertedOptions);
};
exports.oAuthConverter = {
    getPasswordGrantPayload,
    getRefreshGrantPayload,
    parseTokenResponse,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29hdXRoL29hdXRoLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBb0I7QUFHcEIsdURBQThDO0FBR2pDLFFBQUEsYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUVyQyxNQUFNLHVCQUF1QixHQUFHLENBQUMsY0FBNkIsRUFBRSxNQUFjLEVBQVUsRUFBRTtJQUN0RixNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxjQUFjLENBQUM7SUFFeEUsTUFBTSxnQkFBZ0IsR0FBOEI7UUFDaEQsU0FBUyxFQUFFLE1BQU07UUFDakIsUUFBUTtRQUNSLFFBQVEsRUFBRSxRQUFRO1FBRWxCLFVBQVUsRUFBRSwyQkFBUyxDQUFDLFFBQVE7UUFDOUIsS0FBSyxFQUFFLEtBQUssSUFBSSxxQkFBYTtLQUNoQyxDQUFDO0lBRUYsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUU7UUFDakMsZ0JBQWdCLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUM7S0FDbkU7SUFFRCxPQUFPLFlBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHLENBQUMsYUFBaUMsRUFBZSxFQUFFO0lBQzFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxHQUFHLGFBQWEsQ0FBQztJQUVsRSxPQUFPO1FBQ0gsV0FBVyxFQUFFLFlBQVk7UUFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDN0IsWUFBWSxFQUFFLGFBQWE7S0FDOUIsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxjQUE2QixFQUFFLE1BQWMsRUFBRSxZQUFvQixFQUFVLEVBQUU7SUFDM0csTUFBTSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxHQUFHLGNBQWMsQ0FBQztJQUV2RCxNQUFNLGdCQUFnQixHQUE2QjtRQUMvQyxTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUUsMkJBQVMsQ0FBQyxZQUFZO1FBQ2xDLGFBQWEsRUFBRSxZQUFZO1FBQzNCLFFBQVEsRUFBRSxRQUFRO0tBQ3JCLENBQUM7SUFFRixJQUFJLGlCQUFpQixLQUFLLFNBQVMsRUFBRTtRQUNqQyxnQkFBZ0IsQ0FBQywwQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQztLQUNuRTtJQUVELE9BQU8sWUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHO0lBQzFCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsa0JBQWtCO0NBQ3JCLENBQUMifQ==