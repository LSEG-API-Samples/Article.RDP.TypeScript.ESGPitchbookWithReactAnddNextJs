"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
const convict_1 = __importDefault(require("convict"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const object_hash_1 = __importDefault(require("object-hash"));
class BaseConfig extends eventemitter3_1.default {
    constructor(initialSchema) {
        super();
        this.initialSchema = initialSchema;
        this.defaultConfigExtensions = [];
        this.config = this.defaultConfig;
    }
    get defaultConfig() {
        const defaultConfig = convict_1.default(this.initialSchema);
        this.defaultConfigExtensions.forEach(extension => defaultConfig.load(extension));
        return defaultConfig;
    }
    get(name) {
        try {
            return this.config.get(name);
        }
        catch (error) {
            return void 0;
        }
    }
    set(name, value) {
        return this.config.set(name, value);
    }
    default(name) {
        return this.config.default(name);
    }
    has(name) {
        return this.config.has(name);
    }
    load(conf) {
        return this.config.load(conf);
    }
    loadFile(files) {
        return this.config.loadFile(files);
    }
    validate(options) {
        return this.config.validate(options);
    }
    getProperties() {
        return this.config.getProperties();
    }
    getSchema() {
        return this.config.getSchema();
    }
    toString() {
        return this.config.toString();
    }
    getSchemaString() {
        return this.config.getSchemaString();
    }
    registerExtendedDefault(configExtend) {
        const alreadyRegistered = this.defaultConfigExtensions.find(config => object_hash_1.default(config) === object_hash_1.default(configExtend));
        if (alreadyRegistered) {
            return;
        }
        this.defaultConfigExtensions.push(configExtend);
    }
    resetConfig() {
        this.config = this.defaultConfig;
        return this.config;
    }
}
exports.BaseConfig = BaseConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2Jhc2UtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQVVpQjtBQUNqQixrRUFBeUM7QUFDekMsOERBQStCO0FBTS9CLE1BQWEsVUFBYyxTQUFRLHVCQUE2QjtJQVc1RCxZQUFvQixhQUFnQjtRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQURRLGtCQUFhLEdBQWIsYUFBYSxDQUFHO1FBRWhDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFaRCxJQUFXLGFBQWE7UUFDcEIsTUFBTSxhQUFhLEdBQUcsaUJBQU8sQ0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVqRixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBaUJNLEdBQUcsQ0FBQyxJQUFVO1FBQ2pCLElBQUk7WUFDQSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPLEtBQUssQ0FBQyxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQVlNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsS0FBVTtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBV00sT0FBTyxDQUFDLElBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTU0sR0FBRyxDQUFDLElBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sSUFBSSxDQUFJLElBQU87UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sUUFBUSxDQUFJLEtBQXdCO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUksS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxPQUFxQztRQUNqRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVTLHVCQUF1QixDQUFDLFlBQWlCO1FBQy9DLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUsscUJBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzNHLElBQUksaUJBQWlCLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVMsV0FBVztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFakMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQS9HRCxnQ0ErR0MifQ==