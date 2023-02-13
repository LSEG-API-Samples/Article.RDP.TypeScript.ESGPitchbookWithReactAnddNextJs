"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["INVALID_STATE_MESSAGE"] = "State is NOT Opened";
    ErrorMessages["INVALID_SESSION_STATE_MESSAGE"] = "Session State is NOT Opened";
    ErrorMessages["INVALID_STREAM_CONNECTION_STATE_MESSAGE"] = "StreamConnection State is NOT Opened";
    ErrorMessages["DROPPED_STREAM_INITIALIZATION"] = "Stream was closed before the connection was established!";
    ErrorMessages["FAILED_STREAM_AUTHENTICATION"] = "Stream connection authentication has failed";
    ErrorMessages["CLOSED_STREAM_CONNECTION_TIMEOUT"] = "Stream connection has been closed. No response for a long time";
    ErrorMessages["FAILED_ITEM_STREAM_INITIALIZATION"] = "Cannot open ItemStream";
    ErrorMessages["ONLY_STREAMING_CONNECTION"] = "Platform Session without Rdp credentials only supports streaming connection";
    ErrorMessages["STREAMING_PRICES_CANNOT_OPEN"] = "Cannot open PricingStream for any instrument name passed";
    ErrorMessages["STREAMING_CHAINS_CANNOT_OPEN"] = "Cannot open ItemStream for any chain records name passed";
    ErrorMessages["FIELD_NAME_MISSING"] = "Field name is missing";
    ErrorMessages["NON_REAL_TIME_FIELDS_REQUIRED"] = "Please specify only valid fields";
    ErrorMessages["TRANSPORT_MISSED"] = "Transport was not created";
    ErrorMessages["WRONG_TRANSPORT_TYPE"] = "Wrong transport type for Container Session";
    ErrorMessages["STREAMING_NOT_READY_OR_UNAVAILABLE"] = "The streaming channel is not ready yet or unavailable in this running environment. Please try again later";
    ErrorMessages["CONTAINER_VERSION_UNAVAILABLE"] = "\"containerVersion\" of JET.ContainerDescription is unavailable";
    ErrorMessages["INITIALIZE_FIRST"] = "You must initialize transports before use!";
    ErrorMessages["EDP_HELPER_UNAVAILABLE"] = "EDP helper is unavailable. Please check your container environment.";
    ErrorMessages["SURFACE_TAG_IS_MISSING"] = "Invalid input: surfaceTag is empty. Please fill it!";
})(ErrorMessages = exports.ErrorMessages || (exports.ErrorMessages = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uc3RhbnRzL2Vycm9yLW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksYUF3Q1g7QUF4Q0QsV0FBWSxhQUFhO0lBRXJCLDhEQUE2QyxDQUFBO0lBQzdDLDhFQUE2RCxDQUFBO0lBQzdELGlHQUFnRixDQUFBO0lBR2hGLDJHQUEwRixDQUFBO0lBRzFGLDZGQUE0RSxDQUFBO0lBRzVFLG9IQUFtRyxDQUFBO0lBR25HLDZFQUE0RCxDQUFBO0lBRzVELDBIQUF5RyxDQUFBO0lBR3pHLDBHQUF5RixDQUFBO0lBR3pGLDBHQUF5RixDQUFBO0lBRXpGLDZEQUE0QyxDQUFBO0lBQzVDLG1GQUFrRSxDQUFBO0lBR2xFLCtEQUE4QyxDQUFBO0lBQzlDLG9GQUFtRSxDQUFBO0lBQ25FLGlLQUFnSixDQUFBO0lBQ2hKLGtIQUErRixDQUFBO0lBQy9GLGdGQUErRCxDQUFBO0lBQy9ELCtHQUE4RixDQUFBO0lBRzlGLCtGQUE4RSxDQUFBO0FBQ2xGLENBQUMsRUF4Q1csYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUF3Q3hCIn0=