"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundingType = exports.Rounding = exports.ProjectedIndexCalculationMethod = exports.BenchmarkYieldSelectionMode = exports.YieldType = exports.RedemptionDateType = exports.Outputs = exports.PriceSide = exports.PaymentRollConvention = exports.DayCountBasisConvention = exports.BusinessDayConvention = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "BusinessDayConvention", { enumerable: true, get: function () { return financial_contracts_models_1.BusinessDayConvention; } });
Object.defineProperty(exports, "DayCountBasisConvention", { enumerable: true, get: function () { return financial_contracts_models_1.DayCountBasisConvention; } });
Object.defineProperty(exports, "PaymentRollConvention", { enumerable: true, get: function () { return financial_contracts_models_1.PaymentRollConvention; } });
Object.defineProperty(exports, "PriceSide", { enumerable: true, get: function () { return financial_contracts_models_1.PriceSide; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var RedemptionDateType;
(function (RedemptionDateType) {
    RedemptionDateType["RedemptionAtMaturityDate"] = "RedemptionAtMaturityDate";
    RedemptionDateType["RedemptionAtCallDate"] = "RedemptionAtCallDate";
    RedemptionDateType["RedemptionAtPutDate"] = "RedemptionAtPutDate";
    RedemptionDateType["RedemptionAtWorstDate"] = "RedemptionAtWorstDate";
    RedemptionDateType["RedemptionAtBestDate"] = "RedemptionAtBestDate";
    RedemptionDateType["RedemptionAtSinkDate"] = "RedemptionAtSinkDate";
    RedemptionDateType["RedemptionAtParDate"] = "RedemptionAtParDate";
    RedemptionDateType["RedemptionAtPremiumDate"] = "RedemptionAtPremiumDate";
    RedemptionDateType["RedemptionAtMakeWholeCallDate"] = "RedemptionAtMakeWholeCallDate";
    RedemptionDateType["RedemptionAtCustomDate"] = "RedemptionAtCustomDate";
})(RedemptionDateType = exports.RedemptionDateType || (exports.RedemptionDateType = {}));
var YieldType;
(function (YieldType) {
    YieldType["Native"] = "Native";
    YieldType["UsGovt"] = "UsGovt";
    YieldType["UsTBills"] = "UsTBills";
    YieldType["Isma"] = "Isma";
    YieldType["Euroland"] = "Euroland";
    YieldType["Discount_Actual_360"] = "Discount_Actual_360";
    YieldType["Discount_Actual_365"] = "Discount_Actual_365";
    YieldType["MoneyMarket_Actual_360"] = "MoneyMarket_Actual_360";
    YieldType["MoneyMarket_Actual_365"] = "MoneyMarket_Actual_365";
    YieldType["MoneyMarket_Actual_Actual"] = "MoneyMarket_Actual_Actual";
    YieldType["Bond_Actual_364"] = "Bond_Actual_364";
    YieldType["Japanese_Simple"] = "Japanese_Simple";
    YieldType["Japanese_Compounded"] = "Japanese_Compounded";
    YieldType["Moosmueller"] = "Moosmueller";
    YieldType["Braess_Fangmeyer"] = "Braess_Fangmeyer";
    YieldType["Weekend"] = "Weekend";
    YieldType["TurkishCompounded"] = "TurkishCompounded";
})(YieldType = exports.YieldType || (exports.YieldType = {}));
var BenchmarkYieldSelectionMode;
(function (BenchmarkYieldSelectionMode) {
    BenchmarkYieldSelectionMode["Nearest"] = "Nearest";
    BenchmarkYieldSelectionMode["Interpolate"] = "Interpolate";
})(BenchmarkYieldSelectionMode = exports.BenchmarkYieldSelectionMode || (exports.BenchmarkYieldSelectionMode = {}));
var ProjectedIndexCalculationMethod;
(function (ProjectedIndexCalculationMethod) {
    ProjectedIndexCalculationMethod["ConstantIndex"] = "ConstantIndex";
    ProjectedIndexCalculationMethod["ForwardIndex"] = "ForwardIndex";
})(ProjectedIndexCalculationMethod = exports.ProjectedIndexCalculationMethod || (exports.ProjectedIndexCalculationMethod = {}));
var Rounding;
(function (Rounding) {
    Rounding["Zero"] = "Zero";
    Rounding["One"] = "One";
    Rounding["Two"] = "Two";
    Rounding["Three"] = "Three";
    Rounding["Four"] = "Four";
    Rounding["Five"] = "Five";
    Rounding["Six"] = "Six";
    Rounding["Seven"] = "Seven";
    Rounding["Eight"] = "Eight";
    Rounding["Default"] = "Default";
    Rounding["Unrounded"] = "Unrounded";
})(Rounding = exports.Rounding || (exports.Rounding = {}));
var RoundingType;
(function (RoundingType) {
    RoundingType["Default"] = "Default";
    RoundingType["Near"] = "Near";
    RoundingType["Up"] = "Up";
    RoundingType["Down"] = "Down";
    RoundingType["Floor"] = "Floor";
    RoundingType["Ceil"] = "Ceil";
})(RoundingType = exports.RoundingType || (exports.RoundingType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2JvbmQvaW50ZXJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0RUFBaUk7QUFBeEgsbUlBQUEscUJBQXFCLE9BQUE7QUFBRSxxSUFBQSx1QkFBdUIsT0FBQTtBQUFFLG1JQUFBLHFCQUFxQixPQUFBO0FBQUUsdUhBQUEsU0FBUyxPQUFBO0FBRXpGLG9GQUFzRjtBQUM3RSx3RkFEMkIsdUNBQU8sT0FDM0I7QUFtRmhCLElBQVksa0JBV1g7QUFYRCxXQUFZLGtCQUFrQjtJQUMxQiwyRUFBcUQsQ0FBQTtJQUNyRCxtRUFBNkMsQ0FBQTtJQUM3QyxpRUFBMkMsQ0FBQTtJQUMzQyxxRUFBK0MsQ0FBQTtJQUMvQyxtRUFBNkMsQ0FBQTtJQUM3QyxtRUFBNkMsQ0FBQTtJQUM3QyxpRUFBMkMsQ0FBQTtJQUMzQyx5RUFBbUQsQ0FBQTtJQUNuRCxxRkFBK0QsQ0FBQTtJQUMvRCx1RUFBaUQsQ0FBQTtBQUNyRCxDQUFDLEVBWFcsa0JBQWtCLEdBQWxCLDBCQUFrQixLQUFsQiwwQkFBa0IsUUFXN0I7QUFFRCxJQUFZLFNBa0JYO0FBbEJELFdBQVksU0FBUztJQUNqQiw4QkFBaUIsQ0FBQTtJQUNqQiw4QkFBaUIsQ0FBQTtJQUNqQixrQ0FBcUIsQ0FBQTtJQUNyQiwwQkFBYSxDQUFBO0lBQ2Isa0NBQXFCLENBQUE7SUFDckIsd0RBQTJDLENBQUE7SUFDM0Msd0RBQTJDLENBQUE7SUFDM0MsOERBQWlELENBQUE7SUFDakQsOERBQWlELENBQUE7SUFDakQsb0VBQXVELENBQUE7SUFDdkQsZ0RBQW1DLENBQUE7SUFDbkMsZ0RBQW1DLENBQUE7SUFDbkMsd0RBQTJDLENBQUE7SUFDM0Msd0NBQTJCLENBQUE7SUFDM0Isa0RBQXFDLENBQUE7SUFDckMsZ0NBQW1CLENBQUE7SUFDbkIsb0RBQXVDLENBQUE7QUFDM0MsQ0FBQyxFQWxCVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWtCcEI7QUFFRCxJQUFZLDJCQUdYO0FBSEQsV0FBWSwyQkFBMkI7SUFDbkMsa0RBQW1CLENBQUE7SUFDbkIsMERBQTJCLENBQUE7QUFDL0IsQ0FBQyxFQUhXLDJCQUEyQixHQUEzQixtQ0FBMkIsS0FBM0IsbUNBQTJCLFFBR3RDO0FBRUQsSUFBWSwrQkFHWDtBQUhELFdBQVksK0JBQStCO0lBQ3ZDLGtFQUErQixDQUFBO0lBQy9CLGdFQUE2QixDQUFBO0FBQ2pDLENBQUMsRUFIVywrQkFBK0IsR0FBL0IsdUNBQStCLEtBQS9CLHVDQUErQixRQUcxQztBQUVELElBQVksUUFZWDtBQVpELFdBQVksUUFBUTtJQUNoQix5QkFBYSxDQUFBO0lBQ2IsdUJBQVcsQ0FBQTtJQUNYLHVCQUFXLENBQUE7SUFDWCwyQkFBZSxDQUFBO0lBQ2YseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYix1QkFBVyxDQUFBO0lBQ1gsMkJBQWUsQ0FBQTtJQUNmLDJCQUFlLENBQUE7SUFDZiwrQkFBbUIsQ0FBQTtJQUNuQixtQ0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBWlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFZbkI7QUFFRCxJQUFZLFlBT1g7QUFQRCxXQUFZLFlBQVk7SUFDcEIsbUNBQW1CLENBQUE7SUFDbkIsNkJBQWEsQ0FBQTtJQUNiLHlCQUFTLENBQUE7SUFDVCw2QkFBYSxDQUFBO0lBQ2IsK0JBQWUsQ0FBQTtJQUNmLDZCQUFhLENBQUE7QUFDakIsQ0FBQyxFQVBXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBT3ZCIn0=