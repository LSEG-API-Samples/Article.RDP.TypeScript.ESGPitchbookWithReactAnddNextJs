"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCode = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnRlcmZhY2VzL2h0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBaUJBLElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNsQix5QkFBVyxDQUFBO0lBQ1gsMkJBQWEsQ0FBQTtJQUNiLHlCQUFXLENBQUE7SUFDWCwrQkFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUErRUQsSUFBWSxRQVFYO0FBUkQsV0FBWSxRQUFRO0lBQ2hCLHFDQUFRLENBQUE7SUFDUixpRUFBc0IsQ0FBQTtJQUN0Qix1REFBaUIsQ0FBQTtJQUNqQixtREFBZSxDQUFBO0lBQ2YsbURBQWUsQ0FBQTtJQUNmLCtEQUFxQixDQUFBO0lBQ3JCLDJFQUEyQixDQUFBO0FBQy9CLENBQUMsRUFSVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVFuQiJ9