"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOMMStreamParams = void 0;
const validate_required_1 = require("../../util/validate-required");
const validateOMMStreamParams = (itemStreamParams, name = 'OMMStreamParams') => {
    const itemStreamRequiredParams = ['session', 'name'];
    validate_required_1.validateRequired(itemStreamParams, itemStreamRequiredParams, name);
};
exports.validateOMMStreamParams = validateOMMStreamParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib21tLXN0cmVhbS1wYXJhbXMtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RlbGl2ZXJ5L3N0cmVhbS9vbW0tc3RyZWFtLXBhcmFtcy12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQWdFO0FBR3pELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxnQkFBeUMsRUFBRSxPQUFlLGlCQUFpQixFQUFFLEVBQUU7SUFDbkgsTUFBTSx3QkFBd0IsR0FBeUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFM0Ysb0NBQWdCLENBQTBCLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hHLENBQUMsQ0FBQztBQUpXLFFBQUEsdUJBQXVCLDJCQUlsQyJ9