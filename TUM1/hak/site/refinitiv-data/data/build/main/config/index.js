"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingType = exports.DEFAULT_CONFIG_SCHEMA = exports.LibraryConfig = exports.config = void 0;
const config_schema_1 = require("./config-schema");
Object.defineProperty(exports, "DEFAULT_CONFIG_SCHEMA", { enumerable: true, get: function () { return config_schema_1.DEFAULT_CONFIG_SCHEMA; } });
const library_config_1 = require("./library-config");
Object.defineProperty(exports, "LibraryConfig", { enumerable: true, get: function () { return library_config_1.LibraryConfig; } });
const config = new library_config_1.LibraryConfig(config_schema_1.DEFAULT_CONFIG_SCHEMA);
exports.config = config;
config.on(config.CONFIG_SET, () => {
    config.validate({
        allowed: 'warn',
    });
});
const isWatchEnabled = config.get('config-change-notifications-enabled');
if (isWatchEnabled === true) {
    config.watch();
}
var config_interfaces_1 = require("./config.interfaces");
Object.defineProperty(exports, "StreamingType", { enumerable: true, get: function () { return config_interfaces_1.StreamingType; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUF3RDtBQWlCeEIsc0dBakJ2QixxQ0FBcUIsT0FpQnVCO0FBZnJELHFEQUFpRDtBQWVoQyw4RkFmUiw4QkFBYSxPQWVRO0FBYjlCLE1BQU0sTUFBTSxHQUFHLElBQUksOEJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBYS9ELHdCQUFNO0FBWGYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtJQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ1osT0FBTyxFQUFFLE1BQU07S0FDbEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFDekUsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO0lBQ3pCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUNsQjtBQWFELHlEQU82QjtBQUh6QixrSEFBQSxhQUFhLE9BQUEifQ==