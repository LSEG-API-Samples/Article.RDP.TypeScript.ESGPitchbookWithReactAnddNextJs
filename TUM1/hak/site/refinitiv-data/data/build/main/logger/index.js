"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerWrapper = void 0;
const loglevel_1 = __importDefault(require("loglevel"));
const logger_wrapper_1 = require("./logger-wrapper");
Object.defineProperty(exports, "LoggerWrapper", { enumerable: true, get: function () { return logger_wrapper_1.LoggerWrapper; } });
const file_strategy_1 = require("./strategies/file-strategy");
const dummy_logger_1 = require("./util/dummy-logger");
let logger;
exports.logger = logger;
if (process.env.NODE_ENV === 'test') {
    exports.logger = logger = dummy_logger_1.dummyLogger;
}
else {
    const wrapper = new logger_wrapper_1.LoggerWrapper(loglevel_1.default);
    wrapper.register(new file_strategy_1.FileStrategy());
    exports.logger = logger = wrapper.getWrappedLogger();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUF1RztBQUV2RyxxREFBaUQ7QUFNVSw4RkFObEQsOEJBQWEsT0FNa0Q7QUFMeEUsOERBQTBEO0FBRTFELHNEQUFrRDtBQUtsRCxJQUFJLE1BQWtCLENBQUM7QUFlZCx3QkFBTTtBQVJmLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO0lBQ2pDLGlCQUFBLE1BQU0sR0FBRywwQkFBVyxDQUFDO0NBQ3hCO0tBQU07SUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFhLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSw0QkFBWSxFQUFFLENBQUMsQ0FBQztJQUNyQyxpQkFBQSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Q0FDdkMifQ==