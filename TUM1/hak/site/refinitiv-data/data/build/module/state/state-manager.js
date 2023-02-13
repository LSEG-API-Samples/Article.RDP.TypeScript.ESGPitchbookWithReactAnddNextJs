"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractStateManager = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const p_limit_1 = __importDefault(require("p-limit"));
const constants_1 = require("../constants");
const state_manager_interface_1 = require("./state-manager.interface");
class AbstractStateManager extends eventemitter3_1.default {
    constructor() {
        super(...arguments);
        this.stateEventsEmitter = this;
        this.internalChannel = new eventemitter3_1.default();
        this._state = state_manager_interface_1.State.Closed;
        this.limit = p_limit_1.default(1);
        this.pendingEvents = [];
    }
    get state() {
        return this._state;
    }
    get invalidStateMessage() {
        return constants_1.ErrorMessages.INVALID_STATE_MESSAGE;
    }
    async open() {
        await this.limit(async () => {
            if (this.state === state_manager_interface_1.State.Opened) {
                return;
            }
            this.setState(state_manager_interface_1.State.Pending);
            try {
                await this.initialize();
                if (this.state === state_manager_interface_1.State.Pending) {
                    this.setState(state_manager_interface_1.State.Opened);
                }
            }
            catch (err) {
                await this.cleanUp().catch(() => void 0);
                this.setState(state_manager_interface_1.State.Closed);
                throw err;
            }
        });
        return this;
    }
    async close() {
        return this.limit(async () => {
            this.setState(state_manager_interface_1.State.Closed);
            await this.cleanUp();
        });
    }
    emit(event, ...args) {
        this.internalChannel.emit(event, ...args);
        if (event === state_manager_interface_1.StateEvent.StateChanged) {
            return super.emit(event, ...args);
        }
        if (this.state === state_manager_interface_1.State.Pending) {
            this.pendingEvents.push({ event, args });
            return true;
        }
        if (this.state === state_manager_interface_1.State.Closed) {
            return true;
        }
        return super.emit(event, ...args);
    }
    validateState() {
        if (this.state !== state_manager_interface_1.State.Opened) {
            throw new Error(this.invalidStateMessage);
        }
    }
    setState(state) {
        if (this.state === state) {
            return;
        }
        this._state = state;
        if (state === state_manager_interface_1.State.Closed) {
            this.flushPendingEvents();
        }
        this.stateEventsEmitter.emit(state_manager_interface_1.StateEvent.StateChanged, this, this.state);
        if (state === state_manager_interface_1.State.Opened) {
            this.flushPendingEvents();
        }
    }
    flushPendingEvents() {
        const events = this.pendingEvents;
        this.pendingEvents = [];
        events.forEach(({ event, args }) => super.emit(event, ...args));
    }
}
exports.AbstractStateManager = AbstractStateManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdGF0ZS9zdGF0ZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtFQUF5QztBQUN6QyxzREFBNkI7QUFFN0IsNENBQTZDO0FBQzdDLHVFQUF5RjtBQUV6RixNQUFzQixvQkFBcUIsU0FBUSx1QkFBWTtJQUEvRDs7UUFTYyx1QkFBa0IsR0FBRyxJQUFpQyxDQUFDO1FBQ3ZELG9CQUFlLEdBQUcsSUFBSSx1QkFBWSxFQUFFLENBQUM7UUFFdkMsV0FBTSxHQUFVLCtCQUFLLENBQUMsTUFBTSxDQUFDO1FBQzdCLFVBQUssR0FBRyxpQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxCLGtCQUFhLEdBQW1ELEVBQUUsQ0FBQztJQXNGL0UsQ0FBQztJQXBHRyxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQWMsbUJBQW1CO1FBQzdCLE9BQU8seUJBQWEsQ0FBQyxxQkFBcUIsQ0FBQztJQUMvQyxDQUFDO0lBVU0sS0FBSyxDQUFDLElBQUk7UUFDYixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLCtCQUFLLENBQUMsTUFBTSxFQUFFO2dCQUM3QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFN0IsSUFBSTtnQkFDQSxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLCtCQUFLLENBQUMsT0FBTyxFQUFFO29CQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFD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