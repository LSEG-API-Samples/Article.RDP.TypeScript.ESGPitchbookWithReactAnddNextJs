"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCode = exports.Event = exports.State = exports.Platform = exports.Desktop = exports.Container = exports.setDefault = exports.getDefault = void 0;
const session_interface_1 = require("./session.interface");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return session_interface_1.SessionEvent; } });
Object.defineProperty(exports, "EventCode", { enumerable: true, get: function () { return session_interface_1.SessionEventCode; } });
Object.defineProperty(exports, "State", { enumerable: true, get: function () { return session_interface_1.SessionState; } });
__exportStar(require("./desktop/desktop-session-params.interface"), exports);
__exportStar(require("./platform/platform-session-params.interface"), exports);
const desktop_session_1 = require("./desktop/desktop-session");
Object.defineProperty(exports, "Desktop", { enumerable: true, get: function () { return desktop_session_1.DesktopSession; } });
const platform_session_1 = require("./platform/platform-session");
Object.defineProperty(exports, "Platform", { enumerable: true, get: function () { return platform_session_1.PlatformSession; } });
__exportStar(require("./container/container-session-params.interface"), exports);
__exportStar(require("./container/jet-bus-browser"), exports);
__exportStar(require("./container/transport.interface"), exports);
const container_session_1 = require("./container/container-session");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_session_1.ContainerSession; } });
var default_session_1 = require("./default-session");
Object.defineProperty(exports, "getDefault", { enumerable: true, get: function () { return default_session_1.getDefault; } });
Object.defineProperty(exports, "setDefault", { enumerable: true, get: function () { return default_session_1.setDefault; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2Vzc2lvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsMkRBVTZCO0FBcUJ6QixzRkExQmdCLGdDQUFLLE9BMEJoQjtBQUNMLDBGQTFCb0Isb0NBQVMsT0EwQnBCO0FBRlQsc0ZBckJnQixnQ0FBSyxPQXFCaEI7QUFsQlQsNkVBQTJEO0FBQzNELCtFQUE2RDtBQUU3RCwrREFBc0U7QUFhbEUsd0ZBYnVCLGdDQUFPLE9BYXZCO0FBWlgsa0VBQTBFO0FBYXRFLHlGQWJ3QixrQ0FBUSxPQWF4QjtBQVhaLGlGQUErRDtBQUMvRCw4REFBNEM7QUFDNUMsa0VBQWdEO0FBQ2hELHFFQUE4RTtBQU0xRSwwRkFOeUIsb0NBQVMsT0FNekI7QUFKYixxREFBMkQ7QUFBbEQsNkdBQUEsVUFBVSxPQUFBO0FBQUUsNkdBQUEsVUFBVSxPQUFBIn0=