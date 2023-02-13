"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerWrapper = void 0;
const detect_browser_1 = require("detect-browser");
const values_1 = __importDefault(require("lodash/values"));
const loglevel_plugin_prefix_1 = __importDefault(require("loglevel-plugin-prefix"));
const config_1 = require("../config");
const contracts_1 = require("./contracts");
class LoggerWrapper {
    constructor(logger) {
        this.logger = logger;
        this.environment = detect_browser_1.detect();
        this.namespaces = { on: [], off: [] };
        this.transports = [];
        this.filter = this.getFilterFromLocalStorage() || this.configuration.filter;
        logger.setDefaultLevel(this.configuration.level);
        this.applyFilter(this.filter);
        this.modifyMethodFactory();
        this.formatLogMessage();
        this.setupListeners();
    }
    get configuration() {
        return config_1.config.get('logs');
    }
    getWrappedLogger() {
        this.transports.forEach(t => t.initialize());
        return this.logger;
    }
    register(transport) {
        this.transports.push(transport);
    }
    modifyMethodFactory() {
        const originalFactory = this.logger.methodFactory;
        this.logger.methodFactory = (methodName, logLevel, loggerName) => {
            const rawMethod = originalFactory(methodName, logLevel, loggerName);
            return (...messages) => {
                if (this.enabled(loggerName)) {
                    this.transports.forEach(transport => {
                        transport.write(methodName, ...messages);
                    });
                    if (this.configuration.transports.console.enabled) {
                        rawMethod(...messages);
                    }
                }
            };
        };
    }
    formatLogMessage() {
        var _a;
        loglevel_plugin_prefix_1.default.reg(this.logger);
        let template = '[%t][%l][%n]';
        if (((_a = this.environment) === null || _a === void 0 ? void 0 : _a.type) === 'node') {
            template += `[${process.pid}]`;
        }
        loglevel_plugin_prefix_1.default.apply(this.logger, {
            template,
            levelFormatter(level) {
                return level.toUpperCase().padStart(5, ' ');
            },
            nameFormatter(name) {
                return name || contracts_1.ROOT_LOGGER_NAME;
            },
            timestampFormatter(date) {
                return date.toISOString();
            },
        });
    }
    applyLevel(level) {
        this.logger.setLevel(level, true);
        values_1.default(this.logger.getLoggers()).forEach(childLogger => {
            return childLogger.setLevel(level, false);
        });
    }
    applyFilter(filter) {
        var _a;
        this.namespaces.on = [];
        this.namespaces.off = [];
        const split = (typeof filter === 'string' ? filter : '').split(/[\s,]+/);
        for (const namespace of split) {
            if (!namespace) {
                continue;
            }
            const finalNamespace = namespace.replace(/\*/g, '.*?');
            if (finalNamespace[0] === '-') {
                this.namespaces.off.push(new RegExp('^' + finalNamespace.substr(1) + '$'));
            }
            else {
                this.namespaces.on.push(new RegExp('^' + finalNamespace + '$'));
            }
        }
        this.filter = filter;
        if (((_a = this.environment) === null || _a === void 0 ? void 0 : _a.type) === 'browser' && this.getFilterFromLocalStorage() !== this.filter) {
            window.localStorage.setItem(contracts_1.LOCAL_STORAGE_LOG_FILTER_KEY, this.filter);
        }
    }
    getFilterFromLocalStorage() {
        var _a;
        if (((_a = this.environment) === null || _a === void 0 ? void 0 : _a.type) === 'browser') {
            return window.localStorage.getItem(contracts_1.LOCAL_STORAGE_LOG_FILTER_KEY);
        }
        return null;
    }
    enabled(loggerName) {
        if (this.filter === '*') {
            return true;
        }
        for (const namespaceRegex of this.namespaces.off) {
            if (namespaceRegex.test(loggerName)) {
                return false;
            }
        }
        for (const namespaceRegex of this.namespaces.on) {
            if (namespaceRegex.test(loggerName)) {
                return true;
            }
        }
        return false;
    }
    setupListeners() {
        var _a, _b;
        config_1.config.on(config_1.config.CONFIG_FILE_UPDATED, newConfig => {
            this.applyLevel(newConfig.logs.level);
            this.applyFilter(newConfig.logs.filter);
        });
        config_1.config.on(config_1.config.CONFIG_SET, (newConfig, path) => {
            switch (path) {
                case 'logs.level':
                    this.applyLevel(newConfig.logs.level);
                    break;
                case 'logs.filter':
                    this.applyFilter(newConfig.logs.filter);
                    break;
            }
        });
        if (((_a = this.environment) === null || _a === void 0 ? void 0 : _a.type) !== 'browser') {
            return void 0;
        }
        window.addEventListener('storage', this.handleStorageEvent.bind(this), { passive: true });
        if (((_b = window.parent) === null || _b === void 0 ? void 0 : _b.name) === 'AppFrame') {
            window.parent.addEventListener('storage', this.handleStorageEvent.bind(this), { passive: true });
        }
    }
    handleStorageEvent(event) {
        var _a;
        try {
            if (!event.newValue) {
                return void 0;
            }
            switch ((_a = event.key) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
                case contracts_1.LOCAL_STORAGE_LOG_LEVEL_KEY:
                    this.applyLevel(event.newValue);
                    break;
                case contracts_1.LOCAL_STORAGE_LOG_FILTER_KEY:
                    this.applyFilter(event.newValue);
                    break;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.LoggerWrapper = LoggerWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL2xvZ2dlci13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1EQUF3QztBQUN4QywyREFBbUM7QUFFbkMsb0ZBQTRDO0FBRTVDLHNDQUFtQztBQUVuQywyQ0FBMEc7QUFHMUcsTUFBYSxhQUFhO0lBU3RCLFlBQW9CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFKOUIsZ0JBQVcsR0FBRyx1QkFBTSxFQUFFLENBQUM7UUFLM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFNUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBcEJELElBQVksYUFBYTtRQUNyQixPQUFPLGVBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQW9CTSxnQkFBZ0I7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FB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