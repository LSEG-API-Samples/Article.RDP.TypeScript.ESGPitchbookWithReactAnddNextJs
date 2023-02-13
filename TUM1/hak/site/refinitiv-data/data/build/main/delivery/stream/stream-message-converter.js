"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamConnectionRecoverError = exports.getStreamConnectionReconnected = exports.getStreamConnectionRecover = exports.getStreamConnectionError = exports.parseResponseMessage = void 0;
const isArrayBuffer_1 = __importDefault(require("lodash/isArrayBuffer"));
const parseResponseMessage = (data) => {
    if (isArrayBuffer_1.default(data)) {
        return JSON.parse(Buffer.from(data).toString('utf8'));
    }
    return JSON.parse(data.toString());
};
exports.parseResponseMessage = parseResponseMessage;
const getStreamConnectionError = (api) => `Cannot open streaming connection "${api}"!`;
exports.getStreamConnectionError = getStreamConnectionError;
const getStreamConnectionRecover = (api) => `Streaming connection "${api}" failed. Trying to recover.`;
exports.getStreamConnectionRecover = getStreamConnectionRecover;
const getStreamConnectionReconnected = (api) => `Session successfully reconnected to the "${api}" streaming connection.`;
exports.getStreamConnectionReconnected = getStreamConnectionReconnected;
const getStreamConnectionRecoverError = (api) => `Cannot reconnect to the "${api}" streaming connection after multiple unsuccessful attempts!`;
exports.getStreamConnectionRecoverError = getStreamConnectionRecoverError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLW1lc3NhZ2UtY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlbGl2ZXJ5L3N0cmVhbS9zdHJlYW0tbWVzc2FnZS1jb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQWlEO0FBRTFDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBTSxJQUE4QyxFQUFTLEVBQUU7SUFDL0YsSUFBSSx1QkFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQztBQU5XLFFBQUEsb0JBQW9CLHdCQU0vQjtBQUVLLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRSxDQUFDLHFDQUFxQyxHQUFHLElBQUksQ0FBQztBQUFqRyxRQUFBLHdCQUF3Qiw0QkFBeUU7QUFDdkcsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLEdBQVcsRUFBVSxFQUFFLENBQUMseUJBQXlCLEdBQUcsOEJBQThCLENBQUM7QUFBakgsUUFBQSwwQkFBMEIsOEJBQXVGO0FBQ3ZILE1BQU0sOEJBQThCLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRSxDQUNsRSw0Q0FBNEMsR0FBRyx5QkFBeUIsQ0FBQztBQURoRSxRQUFBLDhCQUE4QixrQ0FDa0M7QUFDdEUsTUFBTSwrQkFBK0IsR0FBRyxDQUFDLEdBQVcsRUFBVSxFQUFFLENBQ25FLDRCQUE0QixHQUFHLDhEQUE4RCxDQUFDO0FBRHJGLFFBQUEsK0JBQStCLG1DQUNzRCJ9