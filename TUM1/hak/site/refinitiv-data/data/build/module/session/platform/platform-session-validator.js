"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlatformSessionParams = void 0;
const validate_required_1 = require("../../util/validate-required");
const validatePlatformSessionParams = (sessionParams) => {
    validate_required_1.validateRequired(sessionParams, ['appKey'], 'PlatformSessionParams');
    const { userName, password, host } = sessionParams;
    if (!host && !userName && !password) {
        throw new Error('Please provide RDP user credentials or local streaming platform details');
    }
    if (userName || password) {
        validate_required_1.validateRequired({ userName, password }, ['userName', 'password'], 'User credentials');
    }
};
exports.validatePlatformSessionParams = validatePlatformSessionParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tc2Vzc2lvbi12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2Vzc2lvbi9wbGF0Zm9ybS9wbGF0Zm9ybS1zZXNzaW9uLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvRUFBZ0U7QUFHekQsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLGFBQXVDLEVBQUUsRUFBRTtJQUNyRixvQ0FBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQztJQUVuRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztLQUM5RjtJQUVELElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUN0QixvQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0tBQzFGO0FBQ0wsQ0FBQyxDQUFDO0FBWlcsUUFBQSw2QkFBNkIsaUNBWXhDIn0=