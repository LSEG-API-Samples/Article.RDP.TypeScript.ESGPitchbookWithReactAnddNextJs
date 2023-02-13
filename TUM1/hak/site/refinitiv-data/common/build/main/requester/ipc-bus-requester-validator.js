"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBusMethods = void 0;
const validate_required_1 = require("../util/validate-required");
const validateBusMethods = (bus, name) => {
    const requiredMethods = ['subscribe', 'unsubscribe', 'publish', 'connect'];
    validate_required_1.validateRequired(bus, requiredMethods, name);
};
exports.validateBusMethods = validateBusMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBjLWJ1cy1yZXF1ZXN0ZXItdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlcXVlc3Rlci9pcGMtYnVzLXJlcXVlc3Rlci12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUVBQTZEO0FBRXRELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxHQUFrQixFQUFFLElBQVksRUFBRSxFQUFFO0lBQ25FLE1BQU0sZUFBZSxHQUErQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXZHLG9DQUFnQixDQUFnQixHQUFHLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQztBQUpXLFFBQUEsa0JBQWtCLHNCQUk3QiJ9