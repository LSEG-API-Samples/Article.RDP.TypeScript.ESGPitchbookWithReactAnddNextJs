"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocClause = exports.Seniority = exports.CDSConvention = exports.Outputs = exports.StubRule = exports.PaymentFrequency = exports.Direction = exports.DayCountBasisConvention = exports.BusinessDayConvention = void 0;
var financial_contracts_models_1 = require("../financial-contracts.models");
Object.defineProperty(exports, "BusinessDayConvention", { enumerable: true, get: function () { return financial_contracts_models_1.BusinessDayConvention; } });
Object.defineProperty(exports, "DayCountBasisConvention", { enumerable: true, get: function () { return financial_contracts_models_1.DayCountBasisConvention; } });
Object.defineProperty(exports, "Direction", { enumerable: true, get: function () { return financial_contracts_models_1.Direction; } });
Object.defineProperty(exports, "PaymentFrequency", { enumerable: true, get: function () { return financial_contracts_models_1.PaymentFrequency; } });
Object.defineProperty(exports, "StubRule", { enumerable: true, get: function () { return financial_contracts_models_1.StubRule; } });
const financial_contracts_interface_1 = require("../financial-contracts.interface");
Object.defineProperty(exports, "Outputs", { enumerable: true, get: function () { return financial_contracts_interface_1.Outputs; } });
var CDSConvention;
(function (CDSConvention) {
    CDSConvention["ISDA"] = "ISDA";
    CDSConvention["UserDefined"] = "User-defined";
})(CDSConvention = exports.CDSConvention || (exports.CDSConvention = {}));
var Seniority;
(function (Seniority) {
    Seniority["Secured"] = "Secured";
    Seniority["SeniorUnsecured"] = "SeniorUnsecured";
    Seniority["Subordinated"] = "Subordinated";
    Seniority["JuniorSubordinated"] = "JuniorSubordinated";
    Seniority["Preference"] = "Preference";
    Seniority["None"] = "None";
})(Seniority = exports.Seniority || (exports.Seniority = {}));
var DocClause;
(function (DocClause) {
    DocClause["CumRestruct14"] = "CumRestruct14";
    DocClause["ModifiedRestruct14"] = "ModifiedRestruct14";
    DocClause["ModModRestruct14"] = "ModModRestruct14";
    DocClause["ExRestruct14"] = "ExRestruct14";
    DocClause["CumRestruct03"] = "CumRestruct03";
    DocClause["ModifiedRestruct03"] = "ModifiedRestruct03";
    DocClause["ModModRestruct03"] = "ModModRestruct03";
    DocClause["ExRestruct03"] = "ExRestruct03";
    DocClause["None"] = "None";
})(DocClause = exports.DocClause || (exports.DocClause = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9maW5hbmNpYWwtY29udHJhY3RzL2Nkcy9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRFQUFzSTtBQUE3SCxtSUFBQSxxQkFBcUIsT0FBQTtBQUFFLHFJQUFBLHVCQUF1QixPQUFBO0FBQUUsdUhBQUEsU0FBUyxPQUFBO0FBQUUsOEhBQUEsZ0JBQWdCLE9BQUE7QUFBRSxzSEFBQSxRQUFRLE9BQUE7QUFFOUYsb0ZBQXVHO0FBQzlGLHdGQUQyQix1Q0FBTyxPQUMzQjtBQXdDaEIsSUFBWSxhQUdYO0FBSEQsV0FBWSxhQUFhO0lBQ3JCLDhCQUFhLENBQUE7SUFDYiw2Q0FBNEIsQ0FBQTtBQUNoQyxDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRCxJQUFZLFNBT1g7QUFQRCxXQUFZLFNBQVM7SUFDakIsZ0NBQW1CLENBQUE7SUFDbkIsZ0RBQW1DLENBQUE7SUFDbkMsMENBQTZCLENBQUE7SUFDN0Isc0RBQXlDLENBQUE7SUFDekMsc0NBQXlCLENBQUE7SUFDekIsMEJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBUFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFPcEI7QUFFRCxJQUFZLFNBVVg7QUFWRCxXQUFZLFNBQVM7SUFDakIsNENBQStCLENBQUE7SUFDL0Isc0RBQXlDLENBQUE7SUFDekMsa0RBQXFDLENBQUE7SUFDckMsMENBQTZCLENBQUE7SUFDN0IsNENBQStCLENBQUE7SUFDL0Isc0RBQXlDLENBQUE7SUFDekMsa0RBQXFDLENBQUE7SUFDckMsMENBQTZCLENBQUE7SUFDN0IsMEJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBVlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFVcEIifQ==