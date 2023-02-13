"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectContainer = void 0;
const compare_versions_1 = require("compare-versions");
const constants_1 = require("../constants");
const error_messages_1 = require("../constants/error-messages");
function isRefinitivWorkspaceDesktop() {
    return constants_1.RW_DESKTOP_DETECTOR_REGEX.test(window.navigator.userAgent);
}
function isEikonDesktop() {
    return constants_1.EIKON_DESKTOP_DETECTOR_REGEX.test(window.navigator.userAgent) && !isRefinitivWorkspaceDesktop();
}
function isRwDesktop1_9() {
    var _a, _b, _c;
    const versionRWDesktop = (_c = (_b = (window.JET || ((_a = window.top) === null || _a === void 0 ? void 0 : _a.JET))) === null || _b === void 0 ? void 0 : _b.ContainerDescription) === null || _c === void 0 ? void 0 : _c.containerVersion;
    if (!versionRWDesktop) {
        throw new Error(error_messages_1.ErrorMessages.CONTAINER_VERSION_UNAVAILABLE);
    }
    return versionRWDesktop && compare_versions_1.compare(versionRWDesktop, '1.9', '>=') && compare_versions_1.compare(versionRWDesktop, '1.10', '<');
}
async function detectContainer() {
    var _a;
    if (!((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)) {
        return constants_1.ExecutionContainer.UNKNOWN;
    }
    const isEikon4Desktop = isEikonDesktop();
    const isRwDesktop = isRefinitivWorkspaceDesktop();
    const isWebContainer = !(isEikon4Desktop || isRwDesktop);
    if (isWebContainer) {
        return detectWebContainer();
    }
    if (isRwDesktop && isRwDesktop1_9()) {
        return constants_1.ExecutionContainer.DESKTOP_RW_1_9;
    }
    return constants_1.ExecutionContainer.DESKTOP_RW_NON_1_9_OR_EIKON;
}
exports.detectContainer = detectContainer;
function detectWebContainer() {
    const containerMap = new Map([
        [constants_1.RTK_DETECTOR_OBJECT, constants_1.ExecutionContainer.RTK],
        [constants_1.SXS_WEB_DETECTOR_OBJECT, constants_1.ExecutionContainer.SXS_WEB],
        [constants_1.WORKSPACE_SDK_DETECTOR_OBJECT, constants_1.ExecutionContainer.WORKSPACE_SDK],
    ]);
    for (const [key, value] of containerMap) {
        if (key in window) {
            return value;
        }
    }
    return window.JET ? constants_1.ExecutionContainer.WEB_RW_OR_EIKON : constants_1.ExecutionContainer.UNKNOWN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0LWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlsL2RldGVjdC1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQTJDO0FBRTNDLDRDQU9zQjtBQUN0QixnRUFBNEQ7QUFFNUQsU0FBUywyQkFBMkI7SUFDaEMsT0FBTyxxQ0FBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ25CLE9BQU8sd0NBQTRCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0FBQzNHLENBQUM7QUFFRCxTQUFTLGNBQWM7O0lBQ25CLE1BQU0sZ0JBQWdCLEdBQUcsTUFBQSxNQUFBLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSSxNQUFBLE1BQU0sQ0FBQyxHQUFHLDBDQUFFLEdBQUcsQ0FBQSxDQUFDLDBDQUFFLG9CQUFvQiwwQ0FBRSxnQkFBZ0IsQ0FBQztJQUVqRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUM7S0FDaEU7SUFFRCxPQUFPLGdCQUFnQixJQUFJLDBCQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLDBCQUFPLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hILENBQUM7QUFFTSxLQUFLLFVBQVUsZUFBZTs7SUFDakMsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsU0FBUywwQ0FBRSxTQUFTLENBQUEsRUFBRTtRQUMvQixPQUFPLDhCQUFrQixDQUFDLE9BQU8sQ0FBQztLQUNyQztJQUVELE1BQU0sZUFBZSxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sV0FBVyxHQUFHLDJCQUEyQixFQUFFLENBQUM7SUFDbEQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLGVBQWUsSUFBSSxXQUFXLENBQUMsQ0FBQztJQUV6RCxJQUFJLGNBQWMsRUFBRTtRQUNoQixPQUFPLGtCQUFrQixFQUFFLENBQUM7S0FDL0I7SUFNRCxJQUFJLFdBQVcsSUFBSSxjQUFjLEVBQUUsRUFBRTtRQUNqQyxPQUFPLDhCQUFrQixDQUFDLGNBQWMsQ0FBQztLQUM1QztJQUVELE9BQU8sOEJBQWtCLENBQUMsMkJBQTJCLENBQUM7QUFDMUQsQ0FBQztBQXRCRCwwQ0FzQkM7QUFFRCxTQUFTLGtCQUFrQjtJQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBNkI7UUFDckQsQ0FBQywrQkFBbUIsRUFBRSw4QkFBa0IsQ0FBQyxHQUFHLENBQUM7UUFDN0MsQ0FBQyxtQ0FBdUIsRUFBRSw4QkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDckQsQ0FBQyx5Q0FBNkIsRUFBRSw4QkFBa0IsQ0FBQyxhQUFhLENBQUM7S0FDcEUsQ0FBQyxDQUFDO0lBRUgsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLFlBQVksRUFBRTtRQUNyQyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw4QkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLDhCQUFrQixDQUFDLE9BQU8sQ0FBQztBQUN4RixDQUFDIn0=