"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commaRequestParamsSerializer = exports.repeatRequestParamsSerializer = void 0;
const qs_1 = __importDefault(require("qs"));
const repeatRequestParamsSerializer = (params) => qs_1.default.stringify(params, { arrayFormat: 'repeat' });
exports.repeatRequestParamsSerializer = repeatRequestParamsSerializer;
const commaRequestParamsSerializer = (params) => qs_1.default.stringify(params, { arrayFormat: 'comma' });
exports.commaRequestParamsSerializer = commaRequestParamsSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1wYXJhbXMtc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL3JlcXVlc3QtcGFyYW1zLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW9CO0FBRWIsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsWUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUFqRyxRQUFBLDZCQUE2QixpQ0FBb0U7QUFFdkcsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsWUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUEvRixRQUFBLDRCQUE0QixnQ0FBbUUifQ==