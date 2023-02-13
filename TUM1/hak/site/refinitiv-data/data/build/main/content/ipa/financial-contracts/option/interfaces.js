"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZone = exports.SettlementType = exports.DoubleBinaryType = exports.BinaryType = exports.BarrierMode = exports.InOrOut = exports.UpOrDown = exports.UnderlyingType = exports.PricingModelType = exports.DividendType = exports.VolatilityType = exports.TimeStamp = exports.VolatilityModel = exports.Outputs = exports.PriceSide = exports.FxSwapCalculationMethod = exports.ExerciseStyle = exports.CallPut = exports.BuySell = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "BuySell", { enumerable: true, get: function () { return financial_contracts_models_1.BuySell; } });
Object.defineProperty(exports, "CallPut", { enumerable: true, get: function () { return financial_contracts_models_1.CallPut; } });
Object.defineProperty(exports, "ExerciseStyle", { enumerable: true, get: function () { return financial_contracts_models_1.ExerciseStyle; } });
Object.defineProperty(exports, "FxSwapCalculationMethod", { enumerable: true, get: function () { return financial_contracts_models_1.FxSwapCalculationMethod; } });
Object.defineProperty(exports, "PriceSide", { enumerable: true, get: function () { return financial_contracts_models_1.PriceSide; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var VolatilityModel;
(function (VolatilityModel) {
    VolatilityModel["SABR"] = "SABR";
    VolatilityModel["CubicSpline"] = "CubicSpline";
    VolatilityModel["SVI"] = "SVI";
    VolatilityModel["TwinLognormal"] = "TwinLognormal";
    VolatilityModel["VannaVolga"] = "VannaVolga";
})(VolatilityModel = exports.VolatilityModel || (exports.VolatilityModel = {}));
var TimeStamp;
(function (TimeStamp) {
    TimeStamp["Open"] = "Open";
    TimeStamp["Close"] = "Close";
    TimeStamp["Default"] = "Default";
})(TimeStamp = exports.TimeStamp || (exports.TimeStamp = {}));
var VolatilityType;
(function (VolatilityType) {
    VolatilityType["Implied"] = "Implied";
    VolatilityType["SVISurface"] = "SVISurface";
})(VolatilityType = exports.VolatilityType || (exports.VolatilityType = {}));
var DividendType;
(function (DividendType) {
    DividendType["None"] = "None";
    DividendType["ForecastTable"] = "ForecastTable";
    DividendType["HistoricalYield"] = "HistoricalYield";
    DividendType["ForecastYield"] = "ForecastYield";
    DividendType["ImpliedYield"] = "ImpliedYield";
    DividendType["ImpliedTable"] = "ImpliedTable";
})(DividendType = exports.DividendType || (exports.DividendType = {}));
var PricingModelType;
(function (PricingModelType) {
    PricingModelType["BlackScholes"] = "BlackScholes";
    PricingModelType["Whaley"] = "Whaley";
    PricingModelType["Binomial"] = "Binomial";
    PricingModelType["Trinomial"] = "Trinomial";
    PricingModelType["VannaVolga"] = "VannaVolga";
})(PricingModelType = exports.PricingModelType || (exports.PricingModelType = {}));
var UnderlyingType;
(function (UnderlyingType) {
    UnderlyingType["Eti"] = "Eti";
    UnderlyingType["Fx"] = "Fx";
})(UnderlyingType = exports.UnderlyingType || (exports.UnderlyingType = {}));
var UpOrDown;
(function (UpOrDown) {
    UpOrDown["Up"] = "Up";
    UpOrDown["Down"] = "Down";
})(UpOrDown = exports.UpOrDown || (exports.UpOrDown = {}));
var InOrOut;
(function (InOrOut) {
    InOrOut["In"] = "In";
    InOrOut["Out"] = "Out";
})(InOrOut = exports.InOrOut || (exports.InOrOut = {}));
var BarrierMode;
(function (BarrierMode) {
    BarrierMode["European"] = "European";
    BarrierMode["American"] = "American";
    BarrierMode["ForwardStartWindow"] = "ForwardStartWindow";
    BarrierMode["EarlyEndWindow"] = "EarlyEndWindow";
})(BarrierMode = exports.BarrierMode || (exports.BarrierMode = {}));
var BinaryType;
(function (BinaryType) {
    BinaryType["OneTouch"] = "OneTouch";
    BinaryType["NoTouch"] = "NoTouch";
    BinaryType["Digital"] = "Digital";
    BinaryType["OneTouchImmediate"] = "OneTouchImmediate";
    BinaryType["OneTouchDeferred"] = "OneTouchDeferred";
})(BinaryType = exports.BinaryType || (exports.BinaryType = {}));
var DoubleBinaryType;
(function (DoubleBinaryType) {
    DoubleBinaryType["DoubleNoTouch"] = "DoubleNoTouch";
})(DoubleBinaryType = exports.DoubleBinaryType || (exports.DoubleBinaryType = {}));
var SettlementType;
(function (SettlementType) {
    SettlementType["Cash"] = "Cash";
    SettlementType["Asset"] = "Asset";
})(SettlementType = exports.SettlementType || (exports.SettlementType = {}));
var TimeZone;
(function (TimeZone) {
    TimeZone["BJS"] = "BJS";
    TimeZone["BKK"] = "BKK";
    TimeZone["BOM"] = "BOM";
    TimeZone["BUD"] = "BUD";
    TimeZone["FFT"] = "FFT";
    TimeZone["HKG"] = "HKG";
    TimeZone["KUL"] = "KUL";
    TimeZone["LON"] = "LON";
    TimeZone["MNL"] = "MNL";
    TimeZone["NYC"] = "NYC";
    TimeZone["SAO"] = "SAO";
    TimeZone["SEL"] = "SEL";
    TimeZone["SIN"] = "SIN";
    TimeZone["TPE"] = "TPE";
    TimeZone["TOK"] = "TOK";
    TimeZone["WAW"] = "WAW";
    TimeZone["GMT"] = "GMT";
})(TimeZone = exports.TimeZone || (exports.TimeZone = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL29wdGlvbi9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRFQUFvSDtBQUEzRyxxSEFBQSxPQUFPLE9BQUE7QUFBRSxxSEFBQSxPQUFPLE9BQUE7QUFBRSwySEFBQSxhQUFhLE9BQUE7QUFBRSxxSUFBQSx1QkFBdUIsT0FBQTtBQUFFLHVIQUFBLFNBQVMsT0FBQTtBQUU1RSxvRkFBc0Y7QUFDN0Usd0ZBRDJCLHVDQUFPLE9BQzNCO0FBb0VoQixJQUFZLGVBTVg7QUFORCxXQUFZLGVBQWU7SUFDdkIsZ0NBQWEsQ0FBQTtJQUNiLDhDQUEyQixDQUFBO0lBQzNCLDhCQUFXLENBQUE7SUFDWCxrREFBK0IsQ0FBQTtJQUMvQiw0Q0FBeUIsQ0FBQTtBQUM3QixDQUFDLEVBTlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFNMUI7QUFFRCxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDakIsMEJBQWEsQ0FBQTtJQUNiLDRCQUFlLENBQUE7SUFDZixnQ0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIscUNBQW1CLENBQUE7SUFDbkIsMkNBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBRUQsSUFBWSxZQU9YO0FBUEQsV0FBWSxZQUFZO0lBQ3BCLDZCQUFhLENBQUE7SUFDYiwrQ0FBK0IsQ0FBQTtJQUMvQixtREFBbUMsQ0FBQTtJQUNuQywrQ0FBK0IsQ0FBQTtJQUMvQiw2Q0FBNkIsQ0FBQTtJQUM3Qiw2Q0FBNkIsQ0FBQTtBQUNqQyxDQUFDLEVBUFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFPdkI7QUFFRCxJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIsaURBQTZCLENBQUE7SUFDN0IscUNBQWlCLENBQUE7SUFDakIseUNBQXFCLENBQUE7SUFDckIsMkNBQXVCLENBQUE7SUFDdkIsNkNBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQU5XLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBTTNCO0FBRUQsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3RCLDZCQUFXLENBQUE7SUFDWCwyQkFBUyxDQUFBO0FBQ2IsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBVUQsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2hCLHFCQUFTLENBQUE7SUFDVCx5QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUduQjtBQUVELElBQVksT0FHWDtBQUhELFdBQVksT0FBTztJQUNmLG9CQUFTLENBQUE7SUFDVCxzQkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUhXLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQUdsQjtBQUVELElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNuQixvQ0FBcUIsQ0FBQTtJQUNyQixvQ0FBcUIsQ0FBQTtJQUNyQix3REFBeUMsQ0FBQTtJQUN6QyxnREFBaUMsQ0FBQTtBQUNyQyxDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7QUE4QkQsSUFBWSxVQU1YO0FBTkQsV0FBWSxVQUFVO0lBQ2xCLG1DQUFxQixDQUFBO0lBQ3JCLGlDQUFtQixDQUFBO0lBQ25CLGlDQUFtQixDQUFBO0lBQ25CLHFEQUF1QyxDQUFBO0lBQ3ZDLG1EQUFxQyxDQUFBO0FBQ3pDLENBQUMsRUFOVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU1yQjtBQUVELElBQVksZ0JBRVg7QUFGRCxXQUFZLGdCQUFnQjtJQUN4QixtREFBK0IsQ0FBQTtBQUNuQyxDQUFDLEVBRlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFFM0I7QUFFRCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDdEIsK0JBQWEsQ0FBQTtJQUNiLGlDQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBMENELElBQVksUUFrQlg7QUFsQkQsV0FBWSxRQUFRO0lBQ2hCLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0lBQ1gsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCx1QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQWxCVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQWtCbkIifQ==