"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseStyle = exports.CallPut = exports.FxSwapCalculationMethod = exports.BuySell = exports.BusinessDayConvention = exports.AdjustInterest = exports.IndexCalculationMethod = exports.NotionalExchange = exports.ResetType = exports.ResetFrequency = exports.InterestType = exports.StubRule = exports.PaymentFrequency = exports.Direction = exports.PaymentRollConvention = exports.PriceSide = exports.DayCountBasisConvention = void 0;
var ipa_common_models_1 = require("../ipa-common-models");
Object.defineProperty(exports, "DayCountBasisConvention", { enumerable: true, get: function () { return ipa_common_models_1.DayCountBasisConvention; } });
Object.defineProperty(exports, "PriceSide", { enumerable: true, get: function () { return ipa_common_models_1.PriceSide; } });
var PaymentRollConvention;
(function (PaymentRollConvention) {
    PaymentRollConvention["Last"] = "Last";
    PaymentRollConvention["Same"] = "Same";
    PaymentRollConvention["Last28"] = "Last28";
    PaymentRollConvention["Same28"] = "Same28";
})(PaymentRollConvention = exports.PaymentRollConvention || (exports.PaymentRollConvention = {}));
var Direction;
(function (Direction) {
    Direction["Paid"] = "Paid";
    Direction["Received"] = "Received";
})(Direction = exports.Direction || (exports.Direction = {}));
var PaymentFrequency;
(function (PaymentFrequency) {
    PaymentFrequency["Annual"] = "Annual";
    PaymentFrequency["SemiAnnual"] = "SemiAnnual";
    PaymentFrequency["Quarterly"] = "Quarterly";
    PaymentFrequency["Monthly"] = "Monthly";
    PaymentFrequency["BiMonthly"] = "BiMonthly";
    PaymentFrequency["Everyday"] = "Everyday";
    PaymentFrequency["Every7Days"] = "Every7Days";
    PaymentFrequency["Every14Days"] = "Every14Days";
    PaymentFrequency["Every28Days"] = "Every28Days";
    PaymentFrequency["Every30Days"] = "Every30Days";
    PaymentFrequency["Every91Days"] = "Every91Days";
    PaymentFrequency["Every182Days"] = "Every182Days";
    PaymentFrequency["Every364Days"] = "Every364Days";
    PaymentFrequency["Every365Days"] = "Every365Days";
    PaymentFrequency["Every90Days"] = "Every90Days";
    PaymentFrequency["Every92Days"] = "Every92Days";
    PaymentFrequency["Every93Days"] = "Every93Days";
    PaymentFrequency["Every180Days"] = "Every180Days";
    PaymentFrequency["Every183Days"] = "Every183Days";
    PaymentFrequency["Every184Days"] = "Every184Days";
    PaymentFrequency["Every4Months"] = "Every4Months";
    PaymentFrequency["R2"] = "R2";
    PaymentFrequency["R4"] = "R4";
    PaymentFrequency["Zero"] = "Zero";
})(PaymentFrequency = exports.PaymentFrequency || (exports.PaymentFrequency = {}));
var StubRule;
(function (StubRule) {
    StubRule["Issue"] = "Issue";
    StubRule["Maturity"] = "Maturity";
    StubRule["ShortFirstProRata"] = "ShortFirstProRata";
    StubRule["ShortFirstFull"] = "ShortFirstFull";
    StubRule["LongFirstFull"] = "LongFirstFull";
    StubRule["ShortLastProRata"] = "ShortLastProRata";
})(StubRule = exports.StubRule || (exports.StubRule = {}));
var InterestType;
(function (InterestType) {
    InterestType["Fixed"] = "Fixed";
    InterestType["Float"] = "Float";
})(InterestType = exports.InterestType || (exports.InterestType = {}));
var ResetFrequency;
(function (ResetFrequency) {
    ResetFrequency["Annual"] = "Annual";
    ResetFrequency["SemiAnnual"] = "SemiAnnual";
    ResetFrequency["Quarterly"] = "Quarterly";
    ResetFrequency["Monthly"] = "Monthly";
    ResetFrequency["BiMonthly"] = "BiMonthly";
    ResetFrequency["Zero"] = "Zero";
    ResetFrequency["Everyday"] = "Everyday";
    ResetFrequency["Every7Days"] = "Every7Days";
    ResetFrequency["Every14Days"] = "Every14Days";
    ResetFrequency["Every28Days"] = "Every28Days";
    ResetFrequency["Every91Days"] = "Every91Days";
    ResetFrequency["Every182Days"] = "Every182Days";
    ResetFrequency["Every364Days"] = "Every364Days";
})(ResetFrequency = exports.ResetFrequency || (exports.ResetFrequency = {}));
var ResetType;
(function (ResetType) {
    ResetType["InAdvance"] = "InAdvance";
    ResetType["InArrears"] = "InArrears";
})(ResetType = exports.ResetType || (exports.ResetType = {}));
var NotionalExchange;
(function (NotionalExchange) {
    NotionalExchange["None"] = "None";
    NotionalExchange["Start"] = "Start";
    NotionalExchange["End"] = "End";
    NotionalExchange["Both"] = "Both";
    NotionalExchange["EndAdjustment"] = "EndAdjustment";
})(NotionalExchange = exports.NotionalExchange || (exports.NotionalExchange = {}));
var IndexCalculationMethod;
(function (IndexCalculationMethod) {
    IndexCalculationMethod["Compounded"] = "Compounded";
    IndexCalculationMethod["Average"] = "Average";
    IndexCalculationMethod["Constant"] = "Constant";
    IndexCalculationMethod["AdjustedCompounded"] = "AdjustedCompounded";
    IndexCalculationMethod["MexicanCompounded"] = "MexicanCompounded";
})(IndexCalculationMethod = exports.IndexCalculationMethod || (exports.IndexCalculationMethod = {}));
var AdjustInterest;
(function (AdjustInterest) {
    AdjustInterest["Unadjusted"] = "Unadjusted";
    AdjustInterest["Adjusted"] = "Adjusted";
})(AdjustInterest = exports.AdjustInterest || (exports.AdjustInterest = {}));
var BusinessDayConvention;
(function (BusinessDayConvention) {
    BusinessDayConvention["PreviousBusinessDay"] = "PreviousBusinessDay";
    BusinessDayConvention["NextBusinessDay"] = "NextBusinessDay";
    BusinessDayConvention["ModifiedFollowing"] = "ModifiedFollowing";
    BusinessDayConvention["NoMoving"] = "NoMoving";
    BusinessDayConvention["BBSWModifiedFollowing"] = "BBSWModifiedFollowing";
})(BusinessDayConvention = exports.BusinessDayConvention || (exports.BusinessDayConvention = {}));
var BuySell;
(function (BuySell) {
    BuySell["Buy"] = "Buy";
    BuySell["Sell"] = "Sell";
})(BuySell = exports.BuySell || (exports.BuySell = {}));
var FxSwapCalculationMethod;
(function (FxSwapCalculationMethod) {
    FxSwapCalculationMethod["FxSwap"] = "FxSwap";
    FxSwapCalculationMethod["DepositCcy1ImpliedFromFxSwap"] = "DepositCcy1ImpliedFromFxSwap";
    FxSwapCalculationMethod["DepositCcy2ImpliedFromFxSwap"] = "DepositCcy2ImpliedFromFxSwap";
    FxSwapCalculationMethod["FxSwapImpliedFromDeposit"] = "FxSwapImpliedFromDeposit";
})(FxSwapCalculationMethod = exports.FxSwapCalculationMethod || (exports.FxSwapCalculationMethod = {}));
var CallPut;
(function (CallPut) {
    CallPut["Call"] = "Call";
    CallPut["Put"] = "Put";
})(CallPut = exports.CallPut || (exports.CallPut = {}));
var ExerciseStyle;
(function (ExerciseStyle) {
    ExerciseStyle["Euro"] = "EURO";
    ExerciseStyle["Amer"] = "AMER";
    ExerciseStyle["Berm"] = "BERM ";
})(ExerciseStyle = exports.ExerciseStyle || (exports.ExerciseStyle = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluYW5jaWFsLWNvbnRyYWN0cy5tb2RlbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9pcGEvZmluYW5jaWFsLWNvbnRyYWN0cy9maW5hbmNpYWwtY29udHJhY3RzLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwREFBMEU7QUFBakUsNEhBQUEsdUJBQXVCLE9BQUE7QUFBRSw4R0FBQSxTQUFTLE9BQUE7QUFFM0MsSUFBWSxxQkFLWDtBQUxELFdBQVkscUJBQXFCO0lBQzdCLHNDQUFhLENBQUE7SUFDYixzQ0FBYSxDQUFBO0lBQ2IsMENBQWlCLENBQUE7SUFDakIsMENBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBS2hDO0FBRUQsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ2pCLDBCQUFhLENBQUE7SUFDYixrQ0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFFRCxJQUFZLGdCQXlCWDtBQXpCRCxXQUFZLGdCQUFnQjtJQUN4QixxQ0FBaUIsQ0FBQTtJQUNqQiw2Q0FBeUIsQ0FBQTtJQUN6QiwyQ0FBdUIsQ0FBQTtJQUN2Qix1Q0FBbUIsQ0FBQTtJQUNuQiwyQ0FBdUIsQ0FBQTtJQUN2Qix5Q0FBcUIsQ0FBQTtJQUNyQiw2Q0FBeUIsQ0FBQTtJQUN6QiwrQ0FBMkIsQ0FBQTtJQUMzQiwrQ0FBMkIsQ0FBQTtJQUMzQiwrQ0FBMkIsQ0FBQTtJQUMzQiwrQ0FBMkIsQ0FBQTtJQUMzQixpREFBNkIsQ0FBQTtJQUM3QixpREFBNkIsQ0FBQTtJQUM3QixpREFBNkIsQ0FBQTtJQUM3QiwrQ0FBMkIsQ0FBQTtJQUMzQiwrQ0FBMkIsQ0FBQTtJQUMzQiwrQ0FBMkIsQ0FBQTtJQUMzQixpREFBNkIsQ0FBQTtJQUM3QixpREFBNkIsQ0FBQTtJQUM3Qixp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