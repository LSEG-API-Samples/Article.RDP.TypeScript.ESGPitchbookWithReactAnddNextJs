"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractReconnectStateManager = void 0;
const p_limit_1 = __importDefault(require("p-limit"));
const stream_connection_interface_1 = require("../delivery/stream/stream-connection.interface");
const logger_1 = require("../logger");
const detect_environment_1 = require("../util/detect-environment");
const time_1 = require("../util/time");
const connection_error_1 = require("./connection-error");
const recover_error_1 = require("./recover-error");
const state_manager_1 = require("./state-manager");
const state_manager_interface_1 = require("./state-manager.interface");
class AbstractReconnectStateManager extends state_manager_1.AbstractStateManager {
    constructor() {
        super(...arguments);
        this.log = logger_1.logger.getLogger('reconnect-manager');
        this.environment = detect_environment_1.detectEnvironment();
        this.reconnectLimit = p_limit_1.default(1);
        this.firstInitFailed = false;
        this.firstInitSuccess = false;
        this.reconnectFailed = false;
    }
    async open() {
        await this.reconnectLimit(async () => {
            if (!this.firstInitSuccess) {
                await this.openFirstTime();
            }
            if (this.state === state_manager_interface_1.State.Closed) {
                await this.reconnect();
            }
        });
        return this;
    }
    async close() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        if (this.onCleanUp) {
            this.onCleanUp();
        }
        this.reconnectFailed = true;
        return this.reconnectLimit(async () => {
            this.firstInitFailed = false;
            this.firstInitSuccess = false;
            this.reconnectFailed = false;
            await super.close();
        });
    }
    async closeWithKeptReconnect() {
        return super.close();
    }
    async reopen() {
        const intervals = [...stream_connection_interface_1.StreamReconnectIntervals[this.environment]];
        await this.recover(intervals);
    }
    async openFirstTime() {
        if (this.firstInitFailed) {
            throw new connection_error_1.ConnectionError('The first initialization failed!');
        }
        try {
            await super.open();
            this.firstInitSuccess = true;
        }
        catch (err) {
            this.firstInitFailed = true;
            throw err;
        }
    }
    async reconnect() {
        if (this.reconnectFailed) {
            this.log.error('Recover has failed!');
            throw new recover_error_1.RecoverError('Recover has failed!');
        }
        try {
            await this.reopen();
            this.log.warn('Reopened successfully!');
        }
        catch (err) {
            this.reconnectFailed = true;
            this.log.error('Reconnect error', err);
            throw err;
        }
    }
    async recover(intervals) {
        this.log.debug(`Start recovering. Intervals:`, intervals);
        return new Promise(async (resolve, reject) => {
            this.onCleanUp = reject.bind(null, new Error('Initialization dropped due to close() action'));
            try {
                await super.open();
                resolve(void 0);
            }
            catch (err) {
                if (intervals.length === 0) {
                    reject(err);
                    return;
                }
                this.reconnectTimeout = setTimeout(() => {
                    if (!(intervals.length === 1 && this.environment === "NODEJS")) {
                        intervals.shift();
                    }
                    resolve(this.recover(intervals));
                }, intervals[0] * 1000);
                this.log.info(`Next reconnection attempt is in ${time_1.formatTime(intervals[0])}`);
            }
        });
    }
}
exports.AbstractReconnectStateManager = AbstractReconnectStateManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb25uZWN0LXN0YXRlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RhdGUvcmVjb25uZWN0LXN0YXRlLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTZCO0FBRTdCLGdHQUEwRjtBQUMxRixzQ0FBbUM7QUFDbkMsbUVBQTRFO0FBQzVFLHVDQUEwQztBQUMxQyx5REFBcUQ7QUFDckQsbURBQStDO0FBQy9DLG1EQUF1RDtBQUN2RCx1RUFBa0Q7QUFFbEQsTUFBc0IsNkJBQThCLFNBQVEsb0NBQW9CO0lBQWhGOztRQUNjLFFBQUcsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFOUMsZ0JBQVcsR0FBRyxzQ0FBaUIsRUFBRSxDQUFDO1FBRWxDLG1CQUFjLEdBQUcsaUJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUEwRzdDLENBQUM7SUF0R1UsS0FBSyxDQUFDLElBQUk7UUFDYixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDOUI7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssK0JBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzFCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDZCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixZQUFZLENBQUMsSUFBSSxDQUFD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