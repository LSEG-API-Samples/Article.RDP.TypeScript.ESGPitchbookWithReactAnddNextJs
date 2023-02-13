"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEnvironment = exports.Environment = void 0;
const detect_browser_1 = require("detect-browser");
var Environment;
(function (Environment) {
    Environment["WEB"] = "WEB";
    Environment["NODEJS"] = "NODEJS";
})(Environment = exports.Environment || (exports.Environment = {}));
const detectEnvironment = () => {
    const env = detect_browser_1.detect();
    if (env && env.type === 'browser') {
        return "WEB";
    }
    return "NODEJS";
};
exports.detectEnvironment = detectEnvironment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0LWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvZGV0ZWN0LWVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUF3QztBQUV4QyxJQUFrQixXQUdqQjtBQUhELFdBQWtCLFdBQVc7SUFDekIsMEJBQVcsQ0FBQTtJQUNYLGdDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFIaUIsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHNUI7QUFFTSxNQUFNLGlCQUFpQixHQUFHLEdBQWdCLEVBQUU7SUFDL0MsTUFBTSxHQUFHLEdBQUcsdUJBQU0sRUFBRSxDQUFDO0lBRXJCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQy9CLGFBQXVCO0tBQzFCO0lBRUQsZ0JBQTBCO0FBQzlCLENBQUMsQ0FBQztBQVJXLFFBQUEsaUJBQWlCLHFCQVE1QiJ9