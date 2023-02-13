"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringifyIpcBusService = void 0;
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
class StringifyIpcBusService {
    constructor(ipcBusService) {
        this.ipcBusService = ipcBusService;
    }
    subscribe(channel, callback) {
        return this.ipcBusService.subscribe(channel, (subChannel, data) => {
            try {
                const parsedData = JSON.parse(data);
                callback(channel, lodash_isobject_1.default(parsedData) ? parsedData : data);
            }
            catch (err) {
                callback(subChannel, data);
            }
        });
    }
    unsubscribe(channel, callback) {
        return this.ipcBusService.unsubscribe(channel, callback);
    }
    publish(channel, data) {
        this.ipcBusService.publish(channel, lodash_isobject_1.default(data) ? JSON.stringify(data) : data);
    }
    connect() {
        return this.ipcBusService.connect();
    }
}
exports.StringifyIpcBusService = StringifyIpcBusService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LWlwYy1idXMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pcGMtYnVzLXNlcnZpY2Uvc3RyaW5naWZ5LWlwYy1idXMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFBdUM7QUFHdkMsTUFBYSxzQkFBc0I7SUFDL0IsWUFBNkIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBRyxDQUFDO0lBRXRELFNBQVMsQ0FBQyxPQUFlLEVBQUUsUUFBd0I7UUFDdEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDOUQsSUFBSTtnQkFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLENBQUMsT0FBTyxFQUFFLHlCQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0Q7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQWUsRUFBRSxRQUF3QjtRQUN4RCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sT0FBTyxDQUFDLE9BQWUsRUFBRSxJQUFTO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSx5QkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU0sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUF6QkQsd0RBeUJDIn0=