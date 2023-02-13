"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const object_hash_1 = __importDefault(require("object-hash"));
const os_1 = __importDefault(require("os"));
const util_1 = __importDefault(require("util"));
const detect_environment_1 = require("../util/detect-environment");
const base_config_1 = require("./base-config");
const config_util_1 = require("./config-util");
const contracts_1 = require("./contracts");
class LibraryConfig extends base_config_1.BaseConfig {
    constructor(schema) {
        super(schema);
        this.configFileChangedHandler = this.configFileChangedHandler.bind(this);
        this.watchedFiles = [];
        this.init();
    }
    get isBrowser() {
        return detect_environment_1.detectEnvironment() === "WEB";
    }
    get CONFIG_FILE_UPDATED() {
        return contracts_1.CONFIG_FILE_UPDATED;
    }
    get CONFIG_SET() {
        return contracts_1.NEW_CONFIG_VALUE_SET;
    }
    set(name, value) {
        const setResult = super.set(name, value);
        this.emit(this.CONFIG_SET, this.get(), name, value);
        return setResult;
    }
    getConfigFilesPath() {
        const env = this.get('platform');
        const configDir = this.get('dir');
        const userConfigFilePath = config_util_1.getConfigFilePath(env, os_1.default.homedir());
        const projectConfigFilePath = config_util_1.getConfigFilePath(env, configDir);
        return Array.from(new Set([userConfigFilePath, projectConfigFilePath]));
    }
    notifyConfigUpdated(event = contracts_1.CONFIG_FILE_UPDATED, data = this.get(), source) {
        return this.emit(event, data, source);
    }
    watch() {
        if (this.isBrowser) {
            return;
        }
        this.getConfigFilesPath().forEach(file => {
            if (this.watchedFiles.includes(file)) {
                return;
            }
            fs_1.default.watchFile(file, (curr, prev) => this.configFileChangedHandler(curr, prev, file));
            this.watchedFiles.push(file);
        });
    }
    unwatch() {
        if (this.isBrowser) {
            return;
        }
        this.watchedFiles.forEach(file => fs_1.default.unwatchFile(file));
        this.watchedFiles = [];
    }
    extendDefault(configExtend) {
        this.registerExtendedDefault(configExtend);
        this.resetConfig();
        this.init();
    }
    init() {
        if (this.isBrowser) {
            return;
        }
        const configFileList = this.getConfigFilesPath();
        for (const configFile of configFileList) {
            try {
                const fileContent = fs_1.default.readFileSync(configFile, { encoding: 'utf-8' });
                const withReplacedTemplates = config_util_1.replaceConfigTemplates(fileContent);
                this.load(withReplacedTemplates);
            }
            catch (error) { }
        }
    }
    async configFileChangedHandler(current, prev, source) {
        if (current.isFile() || prev.isFile()) {
            const previousConfig = this.get();
            this.resetConfig();
            for (const file of this.getConfigFilesPath()) {
                try {
                    const fileContent = await util_1.default.promisify(fs_1.default.readFile)(file, { encoding: 'utf-8' });
                    const replacedTemplates = config_util_1.replaceConfigTemplates(fileContent);
                    this.load(replacedTemplates);
                }
                catch (error) { }
            }
            const currentConfig = this.get();
            if (object_hash_1.default(previousConfig) !== object_hash_1.default(currentConfig)) {
                this.notifyConfigUpdated(undefined, undefined, source);
            }
        }
    }
}
exports.LibraryConfig = LibraryConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicmFyeS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2xpYnJhcnktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDRDQUFvQjtBQUNwQiw4REFBK0I7QUFDL0IsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUV4QixtRUFBNEU7QUFDNUUsK0NBQTJDO0FBQzNDLCtDQUEwRTtBQUMxRSwyQ0FBd0U7QUFpQnhFLE1BQWEsYUFBdUIsU0FBUSx3QkFBYTtJQVVyRCxZQUFZLE1BQVM7UUFDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFoQkQsSUFBWSxTQUFTO1FBQ2pCLE9BQU8sc0NBQWlCLEVBQUUsVUFBb0IsQ0FBQztJQUNuRCxDQUFDO0lBb0JELElBQVcsbUJBQW1CO1FBQzFCLE9BQU8sK0JBQW1CLENBQUM7SUFDL0IsQ0FBQztJQUtELElBQVcsVUFBVTtRQUNqQixPQUFPLGdDQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFZTSxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQU9NLGtCQUFrQjtRQUNyQixNQUFNLEdBQUcsR0FBSSxJQUFJLENBQUMsR0FB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