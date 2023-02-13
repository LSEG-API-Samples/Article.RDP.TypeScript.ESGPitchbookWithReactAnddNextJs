"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = void 0;
const ip_1 = __importDefault(require("ip"));
const os_1 = __importDefault(require("os"));
const detect_environment_1 = require("./detect-environment");
function getPosition() {
    if (detect_environment_1.detectEnvironment() === "NODEJS") {
        return `${ip_1.default.address()}/${os_1.default.hostname()}`;
    }
    return 'browser';
}
exports.getPosition = getPosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvZ2V0LXBvc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFvQjtBQUNwQiw0Q0FBb0I7QUFDcEIsNkRBQXNFO0FBS3RFLFNBQWdCLFdBQVc7SUFDdkIsSUFBSSxzQ0FBaUIsRUFBRSxhQUF1QixFQUFFO1FBQzVDLE9BQU8sR0FBRyxZQUFFLENBQUMsT0FBTyxFQUFFLElBQUksWUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7S0FDN0M7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBTkQsa0NBTUMifQ==