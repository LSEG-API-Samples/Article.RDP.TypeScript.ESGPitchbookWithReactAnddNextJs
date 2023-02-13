"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FxCrossLegType = exports.FxCrossType = exports.Outputs = exports.PriceSide = exports.FxSwapCalculationMethod = exports.BuySell = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "BuySell", { enumerable: true, get: function () { return financial_contracts_models_1.BuySell; } });
Object.defineProperty(exports, "FxSwapCalculationMethod", { enumerable: true, get: function () { return financial_contracts_models_1.FxSwapCalculationMethod; } });
Object.defineProperty(exports, "PriceSide", { enumerable: true, get: function () { return financial_contracts_models_1.PriceSide; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var FxCrossType;
(function (FxCrossType) {
    FxCrossType["FxSpot"] = "FxSpot";
    FxCrossType["FxForward"] = "FxForward";
    FxCrossType["FxNonDeliverableForward"] = "FxNonDeliverableForward";
    FxCrossType["FxSwap"] = "FxSwap";
    FxCrossType["FxForwardForward"] = "FxForwardForward";
})(FxCrossType = exports.FxCrossType || (exports.FxCrossType = {}));
var FxCrossLegType;
(function (FxCrossLegType) {
    FxCrossLegType["FxSpot"] = "FxSpot";
    FxCrossLegType["FxForward"] = "FxForward";
    FxCrossLegType["FxNonDeliverableForward"] = "FxNonDeliverableForward";
    FxCrossLegType["SwapNear"] = "SwapNear";
    FxCrossLegType["SwapFar"] = "SwapFar";
})(FxCrossLegType = exports.FxCrossLegType || (exports.FxCrossLegType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2Z4LWNyb3NzL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNEVBQTRGO0FBQW5GLHFIQUFBLE9BQU8sT0FBQTtBQUFFLHFJQUFBLHVCQUF1QixPQUFBO0FBQUUsdUhBQUEsU0FBUyxPQUFBO0FBRXBELG9GQUF1RztBQUM5Rix3RkFEMkIsdUNBQU8sT0FDM0I7QUFpQ2hCLElBQVksV0FNWDtBQU5ELFdBQVksV0FBVztJQUNuQixnQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBdUIsQ0FBQTtJQUN2QixrRUFBbUQsQ0FBQTtJQUNuRCxnQ0FBaUIsQ0FBQTtJQUNqQixvREFBcUMsQ0FBQTtBQUN6QyxDQUFDLEVBTlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFNdEI7QUFjRCxJQUFZLGNBTVg7QUFORCxXQUFZLGNBQWM7SUFDdEIsbUNBQWlCLENBQUE7SUFDakIseUNBQXVCLENBQUE7SUFDdkIscUVBQW1ELENBQUE7SUFDbkQsdUNBQXFCLENBQUE7SUFDckIscUNBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQU5XLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBTXpCIn0=