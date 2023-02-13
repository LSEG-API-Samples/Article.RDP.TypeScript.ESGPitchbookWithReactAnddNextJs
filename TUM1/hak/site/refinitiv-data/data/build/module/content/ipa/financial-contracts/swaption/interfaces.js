"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionSettlementType = exports.ScheduleType = exports.Outputs = exports.ExerciseStyle = exports.CallPut = exports.BuySell = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "BuySell", { enumerable: true, get: function () { return financial_contracts_models_1.BuySell; } });
Object.defineProperty(exports, "CallPut", { enumerable: true, get: function () { return financial_contracts_models_1.CallPut; } });
Object.defineProperty(exports, "ExerciseStyle", { enumerable: true, get: function () { return financial_contracts_models_1.ExerciseStyle; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["FixedLeg"] = "FixedLeg";
    ScheduleType["FloatLeg"] = "FloatLeg";
    ScheduleType["UserDefined"] = "UserDefined ";
})(ScheduleType = exports.ScheduleType || (exports.ScheduleType = {}));
var OptionSettlementType;
(function (OptionSettlementType) {
    OptionSettlementType["Cash"] = "Cash";
    OptionSettlementType["Physical"] = "Physical";
})(OptionSettlementType = exports.OptionSettlementType || (exports.OptionSettlementType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL3N3YXB0aW9uL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNEVBQW1HO0FBQTFGLHFIQUFBLE9BQU8sT0FBQTtBQUFFLHFIQUFBLE9BQU8sT0FBQTtBQUFFLDJIQUFBLGFBQWEsT0FBQTtBQUV4QyxvRkFBdUc7QUFDOUYsd0ZBRDJCLHVDQUFPLE9BQzNCO0FBMkNoQixJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDcEIscUNBQXFCLENBQUE7SUFDckIscUNBQXFCLENBQUE7SUFDckIsNENBQTRCLENBQUE7QUFDaEMsQ0FBQyxFQUpXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBSXZCO0FBRUQsSUFBWSxvQkFHWDtBQUhELFdBQVksb0JBQW9CO0lBQzVCLHFDQUFhLENBQUE7SUFDYiw2Q0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBSFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFHL0IifQ==