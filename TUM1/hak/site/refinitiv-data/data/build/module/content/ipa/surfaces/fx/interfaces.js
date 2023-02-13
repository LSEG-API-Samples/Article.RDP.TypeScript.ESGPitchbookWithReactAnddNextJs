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
exports.VolatilityModel = exports.SwapCalculationMethod = void 0;
__exportStar(require("../surfaces.models"), exports);
__exportStar(require("../surfaces.interface"), exports);
var SwapCalculationMethod;
(function (SwapCalculationMethod) {
    SwapCalculationMethod["FxSwap"] = "FxSwap";
    SwapCalculationMethod["FxSwapImpliedFromDeposit"] = "FxSwapImpliedFromDeposit";
    SwapCalculationMethod["DepositCcy1ImpliedFromFxSwap"] = "DepositCcy1ImpliedFromFxSwap";
    SwapCalculationMethod["DepositCcy2ImpliedFromFxSwap"] = "DepositCcy2ImpliedFromFxSwap";
})(SwapCalculationMethod = exports.SwapCalculationMethod || (exports.SwapCalculationMethod = {}));
var VolatilityModel;
(function (VolatilityModel) {
    VolatilityModel["SVI"] = "SVI";
    VolatilityModel["SABR"] = "SABR";
    VolatilityModel["CubicSpline"] = "CubicSpline";
    VolatilityModel["TwinLognormal"] = "TwinLognormal";
})(VolatilityModel = exports.VolatilityModel || (exports.VolatilityModel = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9zdXJmYWNlcy9meC9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQSxxREFBbUM7QUFDbkMsd0RBQXNDO0FBYXRDLElBQVkscUJBS1g7QUFMRCxXQUFZLHFCQUFxQjtJQUM3QiwwQ0FBaUIsQ0FBQTtJQUNqQiw4RUFBcUQsQ0FBQTtJQUNyRCxzRkFBNkQsQ0FBQTtJQUM3RCxzRkFBNkQsQ0FBQTtBQUNqRSxDQUFDLEVBTFcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFLaEM7QUFFRCxJQUFZLGVBS1g7QUFMRCxXQUFZLGVBQWU7SUFDdkIsOEJBQVcsQ0FBQTtJQUNYLGdDQUFhLENBQUE7SUFDYiw4Q0FBMkIsQ0FBQTtJQUMzQixrREFBK0IsQ0FBQTtBQUNuQyxDQUFDLEVBTFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFLMUIifQ==