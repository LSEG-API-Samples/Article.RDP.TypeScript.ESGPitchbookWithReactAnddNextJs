"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvexityAdjustmentMethod = exports.ConvexityAdjustmentIntegrationMethod = exports.AmortizationType = exports.AmortizationFrequency = exports.Outputs = exports.StubRule = exports.ResetType = exports.PaymentRollConvention = exports.PaymentFrequency = exports.DayCountBasisConvention = exports.BuySell = exports.BusinessDayConvention = exports.AdjustInterest = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "AdjustInterest", { enumerable: true, get: function () { return financial_contracts_models_1.AdjustInterest; } });
Object.defineProperty(exports, "BusinessDayConvention", { enumerable: true, get: function () { return financial_contracts_models_1.BusinessDayConvention; } });
Object.defineProperty(exports, "BuySell", { enumerable: true, get: function () { return financial_contracts_models_1.BuySell; } });
Object.defineProperty(exports, "DayCountBasisConvention", { enumerable: true, get: function () { return financial_contracts_models_1.DayCountBasisConvention; } });
Object.defineProperty(exports, "PaymentFrequency", { enumerable: true, get: function () { return financial_contracts_models_1.PaymentFrequency; } });
Object.defineProperty(exports, "PaymentRollConvention", { enumerable: true, get: function () { return financial_contracts_models_1.PaymentRollConvention; } });
Object.defineProperty(exports, "ResetType", { enumerable: true, get: function () { return financial_contracts_models_1.ResetType; } });
Object.defineProperty(exports, "StubRule", { enumerable: true, get: function () { return financial_contracts_models_1.StubRule; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var AmortizationFrequency;
(function (AmortizationFrequency) {
    AmortizationFrequency["EveryCoupon"] = "EveryCoupon";
    AmortizationFrequency["Every2ndCoupon"] = "Every2ndCoupon";
    AmortizationFrequency["Every3rdCoupon"] = "Every3rdCoupon";
    AmortizationFrequency["Every4thCoupon"] = "Every4thCoupon";
    AmortizationFrequency["Every12thCoupon"] = "Every12thCoupon ";
})(AmortizationFrequency = exports.AmortizationFrequency || (exports.AmortizationFrequency = {}));
var AmortizationType;
(function (AmortizationType) {
    AmortizationType["None"] = "None";
    AmortizationType["Linear"] = "Linear";
    AmortizationType["Annuity"] = "Annuity";
    AmortizationType["Schedule"] = "Schedule ";
})(AmortizationType = exports.AmortizationType || (exports.AmortizationType = {}));
var ConvexityAdjustmentIntegrationMethod;
(function (ConvexityAdjustmentIntegrationMethod) {
    ConvexityAdjustmentIntegrationMethod["RiemannSum"] = "RiemannSum";
    ConvexityAdjustmentIntegrationMethod["RungeKutta"] = "RungeKutta";
})(ConvexityAdjustmentIntegrationMethod = exports.ConvexityAdjustmentIntegrationMethod || (exports.ConvexityAdjustmentIntegrationMethod = {}));
var ConvexityAdjustmentMethod;
(function (ConvexityAdjustmentMethod) {
    ConvexityAdjustmentMethod["None"] = "None";
    ConvexityAdjustmentMethod["BlackScholes"] = "BlackScholes";
    ConvexityAdjustmentMethod["Replication"] = "Replication";
    ConvexityAdjustmentMethod["LinearSwapModel"] = "LinearSwapModel";
})(ConvexityAdjustmentMethod = exports.ConvexityAdjustmentMethod || (exports.ConvexityAdjustmentMethod = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2NhcC1mbG9vci9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVVBLDRFQVN1QztBQVJuQyw0SEFBQSxjQUFjLE9BQUE7QUFDZCxtSUFBQSxxQkFBcUIsT0FBQTtBQUNyQixxSEFBQSxPQUFPLE9BQUE7QUFDUCxxSUFBQSx1QkFBdUIsT0FBQTtBQUN2Qiw4SEFBQSxnQkFBZ0IsT0FBQTtBQUNoQixtSUFBQSxxQkFBcUIsT0FBQTtBQUNyQix1SEFBQSxTQUFTLE9BQUE7QUFDVCxzSEFBQSxRQUFRLE9BQUE7QUFHWixvRkFBdUc7QUFDOUYsd0ZBRDJCLHVDQUFPLE9BQzNCO0FBdURoQixJQUFZLHFCQU1YO0FBTkQsV0FBWSxxQkFBcUI7SUFDN0Isb0RBQTJCLENBQUE7SUFDM0IsMERBQWlDLENBQUE7SUFDakMsMERBQWlDLENBQUE7SUFDakMsMERBQWlDLENBQUE7SUFDakMsNkRBQW9DLENBQUE7QUFDeEMsQ0FBQyxFQU5XLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBTWhDO0FBRUQsSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQ3hCLGlDQUFhLENBQUE7SUFDYixxQ0FBaUIsQ0FBQTtJQUNqQix1Q0FBbUIsQ0FBQTtJQUNuQiwwQ0FBc0IsQ0FBQTtBQUMxQixDQUFDLEVBTFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFLM0I7QUFFRCxJQUFZLG9DQUdYO0FBSEQsV0FBWSxvQ0FBb0M7SUFDNUMsaUVBQXlCLENBQUE7SUFDekIsaUVBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQUhXLG9DQUFvQyxHQUFwQyw0Q0FBb0MsS0FBcEMsNENBQW9DLFFBRy9DO0FBRUQsSUFBWSx5QkFLWDtBQUxELFdBQVkseUJBQXlCO0lBQ2pDLDBDQUFhLENBQUE7SUFDYiwwREFBNkIsQ0FBQTtJQUM3Qix3REFBMkIsQ0FBQTtJQUMzQixnRUFBbUMsQ0FBQTtBQUN2QyxDQUFDLEVBTFcseUJBQXlCLEdBQXpCLGlDQUF5QixLQUF6QixpQ0FBeUIsUUFLcEMifQ==