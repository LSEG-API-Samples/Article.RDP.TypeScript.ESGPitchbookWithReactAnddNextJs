"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStrategy = void 0;
const detect_browser_1 = require("detect-browser");
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const rfs = __importStar(require("rotating-file-stream"));
const config_1 = require("../../config");
class FileStrategy {
    constructor() {
        this.applyConfig = this.applyConfig.bind(this);
        config_1.config.on(config_1.config.CONFIG_FILE_UPDATED, this.applyConfig);
        config_1.config.on(config_1.config.CONFIG_SET, this.applyConfig);
    }
    get configuration() {
        return config_1.config.get('logs').transports.file;
    }
    write(methodName, ...args) {
        if (this.writer) {
            const message = this.buildStreamMessage(methodName, args);
            this.writer.write(message);
        }
    }
    initialize() {
        var _a, _b;
        try {
            const isWriteToFile = this.configuration.enabled && ((_a = detect_browser_1.detect()) === null || _a === void 0 ? void 0 : _a.type) === 'node';
            (_b = this.writer) === null || _b === void 0 ? void 0 : _b.end();
            this.writer = undefined;
            if (isWriteToFile) {
                const { size, maxFiles, interval, maxSize, history } = this.configuration;
                this.writer = rfs.createStream(this.fileNameGenerator.bind(this), {
                    size,
                    maxFiles,
                    interval,
                    maxSize,
                    history: `${history}-${process.pid}.txt`,
                });
            }
            this.prevConfig = cloneDeep_1.default(this.configuration);
        }
        catch (error) {
            console.error('File stream creation error.', error);
        }
    }
    applyConfig() {
        if (isEqual_1.default(this.prevConfig, this.configuration)) {
            return;
        }
        this.initialize();
    }
    buildStreamMessage(methodName, messages) {
        let message = messages.reduce((prev, curr) => {
            let currString = curr;
            if (typeof curr === 'function') {
                currString = '[Function]';
            }
            if (curr instanceof Error) {
                currString = curr.stack;
            }
            if (typeof currString !== 'string') {
                currString = json_stringify_safe_1.default(curr);
            }
            return prev + currString + ' ';
        }, '');
        if (methodName.toLowerCase() === 'trace') {
            message = 'Trace: ' + message;
            message += this.getStackTrace();
        }
        message += '\n';
        return message;
    }
    getStackTrace(object = this) {
        Error.captureStackTrace(object);
        return object.stack.replace('Error:', '');
    }
    fileNameGenerator(time, index) {
        const date = typeof time === 'number' ? new Date(time) : time || new Date(Date.now());
        const month = date.getUTCFullYear() + (date.getUTCMonth() + 1 + '').padStart(2, '0');
        const day = (date.getUTCDate() + '').padStart(2, '0');
        const hour = (date.getUTCHours() + '').padStart(2, '0');
        const minute = (date.getUTCMinutes() + '').padStart(2, '0');
        let fileName = `${month}${day}-${hour}${minute}`;
        if (time) {
            fileName += `-${index}`;
        }
        fileName += `-${process.pid}-${this.configuration.name}`;
        return fileName;
    }
}
exports.FileStrategy = FileStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2dnZXIvc3RyYXRlZ2llcy9maWxlLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBd0M7QUFDeEMsOEVBQTRDO0FBQzVDLGlFQUF5QztBQUN6Qyw2REFBcUM7QUFFckMsMERBQTRDO0FBQzVDLHlDQUFvRDtBQUlwRCxNQUFhLFlBQVk7SUFPckI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLGVBQU0sQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxlQUFNLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFWRCxJQUFZLGFBQWE7UUFDckIsT0FBTyxlQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQVVNLEtBQUssQ0FBQyxVQUFrQixFQUFFLEdBQUcsSUFBVztRQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVNLFVBQVU7O1FBQ2IsSUFBSTtZQUNBLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxJQUFJLENBQUEsTUFBQSx1QkFBTSxFQUFFLDBDQUFFLElBQUksTUFBSyxNQUFNLENB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