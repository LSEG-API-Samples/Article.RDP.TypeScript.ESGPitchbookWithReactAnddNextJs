"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSocketCreator = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const logger_1 = require("../logger");
const prepareSocketCreator = (wsEndpoint, protocol, options) => {
    const log = logger_1.logger.getLogger('websocket-creator');
    return () => {
        log.info(`Connecting to the streaming endpoint ${wsEndpoint}, protocol '${protocol}'${(options === null || options === void 0 ? void 0 : options.headers) ? ', headers: ' + Object.keys(options.headers) : ''}`);
        return new isomorphic_ws_1.default(wsEndpoint, protocol, options);
    };
};
exports.prepareSocketCreator = prepareSocketCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViU29ja2V0LWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL3dlYlNvY2tldC1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQXNDO0FBR3RDLHNDQUFtQztBQUU1QixNQUFNLG9CQUFvQixHQUFHLENBQUMsVUFBa0IsRUFBRSxRQUFnQixFQUFFLE9BQWlDLEVBQWlCLEVBQUU7SUFDM0gsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sR0FBRyxFQUFFO1FBQ1IsR0FBRyxDQUFDLElBQUksQ0FDSix3Q0FBd0MsVUFBVSxlQUFlLFFBQVEsSUFDckUsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3RFLEVBQUUsQ0FDTCxDQUFDO1FBRUYsT0FBTyxJQUFJLHVCQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7QUFYVyxRQUFBLG9CQUFvQix3QkFXL0IifQ==