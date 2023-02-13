"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outputs = exports.VolatilityAdjustmentType = exports.DiscountingType = exports.TimeStampSelectionType = exports.InputVolatilityType = exports.AxisUnit = exports.LayoutFormat = exports.PriceSide = void 0;
var ipa_common_models_1 = require("../ipa-common-models");
Object.defineProperty(exports, "PriceSide", { enumerable: true, get: function () { return ipa_common_models_1.PriceSide; } });
var LayoutFormat;
(function (LayoutFormat) {
    LayoutFormat["Matrix"] = "Matrix";
    LayoutFormat["List"] = "List";
    LayoutFormat["NDimensionalArray"] = "NDimensionalArray";
})(LayoutFormat = exports.LayoutFormat || (exports.LayoutFormat = {}));
var AxisUnit;
(function (AxisUnit) {
    AxisUnit["Date"] = "Date";
    AxisUnit["Strike"] = "Strike";
    AxisUnit["Tenor"] = "Tenor";
    AxisUnit["Delta"] = "Delta";
    AxisUnit["Moneyness"] = "Moneyness";
    AxisUnit["Expiry"] = "Expiry";
})(AxisUnit = exports.AxisUnit || (exports.AxisUnit = {}));
var InputVolatilityType;
(function (InputVolatilityType) {
    InputVolatilityType["Default"] = "Default";
    InputVolatilityType["LogNormalVolatility"] = "LogNormalVolatility";
    InputVolatilityType["NormalizedVolatility"] = "NormalizedVolatility";
})(InputVolatilityType = exports.InputVolatilityType || (exports.InputVolatilityType = {}));
var TimeStampSelectionType;
(function (TimeStampSelectionType) {
    TimeStampSelectionType["Default"] = "Default";
    TimeStampSelectionType["Open"] = "Open";
    TimeStampSelectionType["Close"] = "Close";
    TimeStampSelectionType["Settle"] = "Settle";
})(TimeStampSelectionType = exports.TimeStampSelectionType || (exports.TimeStampSelectionType = {}));
var DiscountingType;
(function (DiscountingType) {
    DiscountingType["OisDiscounting"] = "OisDiscounting";
    DiscountingType["LiborDiscounting"] = "LiborDiscounting ";
})(DiscountingType = exports.DiscountingType || (exports.DiscountingType = {}));
var VolatilityAdjustmentType;
(function (VolatilityAdjustmentType) {
    VolatilityAdjustmentType["PbUndefined"] = "PbUndefined";
    VolatilityAdjustmentType["ConstantCaplet"] = "ConstantCaplet";
    VolatilityAdjustmentType["NormalizedCaplet"] = "NormalizedCaplet";
    VolatilityAdjustmentType["ConstantCap"] = "ConstantCap";
    VolatilityAdjustmentType["NormalizedCap"] = "NormalizedCap";
    VolatilityAdjustmentType["ShiftedCap"] = "ShiftedCap";
})(VolatilityAdjustmentType = exports.VolatilityAdjustmentType || (exports.VolatilityAdjustmentType = {}));
var Outputs;
(function (Outputs) {
    Outputs["Headers"] = "Headers";
    Outputs["DataType"] = "DataType";
    Outputs["Data"] = "Data";
    Outputs["Statuses"] = "Statuses";
    Outputs["ForwardCurve"] = "ForwardCurve";
    Outputs["CalibrationParameters"] = "CalibrationParameters";
    Outputs["Constituents"] = "Constituents";
    Outputs["Dividends"] = "Dividends";
    Outputs["InterestRateCurve"] = "InterestRateCurve";
    Outputs["GoodnessOfFit"] = "GoodnessOfFit";
    Outputs["UnderlyingSpot"] = "UnderlyingSpot";
    Outputs["DiscountCurve"] = "DiscountCurve";
    Outputs["Description"] = "Description";
    Outputs["MoneynessStrike"] = "MoneynessStrike";
})(Outputs = exports.Outputs || (exports.Outputs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZXMubW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRlbnQvaXBhL3N1cmZhY2VzL3N1cmZhY2VzLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBaUQ7QUFBeEMsOEdBQUEsU0FBUyxPQUFBO0FBRWxCLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUNwQixpQ0FBaUIsQ0FBQTtJQUNqQiw2QkFBYSxDQUFBO0lBQ2IsdURBQXVDLENBQUE7QUFDM0MsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBRUQsSUFBWSxRQU9YO0FBUEQsV0FBWSxRQUFRO0lBQ2hCLHlCQUFhLENBQUE7SUFDYiw2QkFBaUIsQ0FBQTtJQUNqQiwyQkFBZSxDQUFBO0lBQ2YsMkJBQWUsQ0FBQTtJQUNmLG1DQUF1QixDQUFBO0lBQ3ZCLDZCQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFQVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU9uQjtBQUVELElBQVksbUJBSVg7QUFKRCxXQUFZLG1CQUFtQjtJQUMzQiwwQ0FBbUIsQ0FBQTtJQUNuQixrRUFBMkMsQ0FBQTtJQUMzQyxvRUFBNkMsQ0FBQTtBQUNqRCxDQUFDLEVBSlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFJOUI7QUFFRCxJQUFZLHNCQUtYO0FBTEQsV0FBWSxzQkFBc0I7SUFDOUIsNkNBQW1CLENBQUE7SUFDbkIsdUNBQWEsQ0FBQTtJQUNiLHlDQUFlLENBQUE7SUFDZiwyQ0FBaUIsQ0FBQTtBQUNyQixDQUFDLEVBTFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7QUFFRCxJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDdkIsb0RBQWlDLENBQUE7SUFDakMseURBQXNDLENBQUE7QUFDMUMsQ0FBQyxFQUhXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBRzFCO0FBRUQsSUFBWSx3QkFPWDtBQVBELFdBQVksd0JBQXdCO0lBQ2hDLHVEQUEyQixDQUFBO0lBQzNCLDZEQUFpQyxDQUFBO0lBQ2pDLGlFQUFxQyxDQUFBO0lBQ3JDLHVEQUEyQixDQUFBO0lBQzNCLDJEQUErQixDQUFBO0lBQy9CLHFEQUF5QixDQUFBO0FBQzdCLENBQUMsRUFQVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQU9uQztBQUVELElBQVksT0FlWDtBQWZELFdBQVksT0FBTztJQUNmLDhCQUFtQixDQUFBO0lBQ25CLGdDQUFxQixDQUFBO0lBQ3JCLHdCQUFhLENBQUE7SUFDYixnQ0FBcUIsQ0FBQTtJQUNyQix3Q0FBNkIsQ0FBQTtJQUM3QiwwREFBK0MsQ0FBQTtJQUMvQyx3Q0FBNkIsQ0FBQTtJQUM3QixrQ0FBdUIsQ0FBQTtJQUN2QixrREFBdUMsQ0FBQTtJQUN2QywwQ0FBK0IsQ0FBQTtJQUMvQiw0Q0FBaUMsQ0FBQTtJQUNqQywwQ0FBK0IsQ0FBQTtJQUMvQixzQ0FBMkIsQ0FBQTtJQUMzQiw4Q0FBbUMsQ0FBQTtBQUN2QyxDQUFDLEVBZlcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBZWxCIn0=