"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequired = void 0;
const validateRequired = (params, requiredFields, instanceName) => {
    if (!params) {
        throw new Error(`${instanceName} are missing`);
    }
    requiredFields.forEach(field => {
        if (!params[field]) {
            throw new Error(`${instanceName} ${field} is missing`);
        }
    });
};
exports.validateRequired = validateRequired;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtcmVxdWlyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbC92YWxpZGF0ZS1yZXF1aXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxNQUFNLGdCQUFnQixHQUFHLENBQUksTUFBUyxFQUFFLGNBQThCLEVBQUUsWUFBb0IsRUFBUSxFQUFFO0lBQ3pHLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsWUFBWSxjQUFjLENBQUMsQ0FBQztLQUNsRDtJQUVELGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsWUFBWSxJQUFJLEtBQUssYUFBYSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQVZXLFFBQUEsZ0JBQWdCLG9CQVUzQiJ9