"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundamentalReferenceUtil = void 0;
const constants_1 = require("../../constants");
const content_1 = require("../../constants/content");
const platform_session_1 = require("../../session/platform/platform-session");
class FundamentalReferenceUtil {
    static isNonRealTimeField(field) {
        const name = typeof field === 'object' ? field.name : field;
        if (!name) {
            throw new Error(constants_1.ErrorMessages.FIELD_NAME_MISSING);
        }
        return name.startsWith('TR.');
    }
    static filterRealTimeFields(fields) {
        if (Array.isArray(fields)) {
            const filteredFields = fields.filter(FundamentalReferenceUtil.isNonRealTimeField);
            if (!filteredFields.length) {
                throw new Error(constants_1.ErrorMessages.NON_REAL_TIME_FIELDS_REQUIRED);
            }
            return filteredFields;
        }
        if (this.isNonRealTimeField(fields)) {
            return fields;
        }
        throw new Error(constants_1.ErrorMessages.NON_REAL_TIME_FIELDS_REQUIRED);
    }
    static formatItems(items) {
        return Array.isArray(items) ? items : [items];
    }
    static formatUdfFields(fields) {
        const fieldsArray = Array.isArray(fields) ? fields : [fields];
        return fieldsArray.map(field => (typeof field === 'object' ? field : { name: field }));
    }
    static getWaitDuration(duration) {
        return duration < content_1.UDF_TRACK_REQUEST_MAX_DELAY ? duration : content_1.UDF_TRACK_REQUEST_MAX_DELAY;
    }
    static formatResponseHeaders(headers) {
        return headers[0].map((header) => {
            const { field, displayName } = header;
            const name = field ? field : displayName;
            return { name };
        });
    }
    static validateUdfErrors(response) {
        const { ErrorCode, ErrorMessage } = response;
        if (ErrorCode && ErrorMessage) {
            throw new Error(`Fundamental & Reference response error. Error code: ${ErrorCode}; Error message: ${ErrorMessage}`);
        }
    }
    static isPlatformSession(session) {
        return session instanceof platform_session_1.PlatformSession;
    }
}
exports.FundamentalReferenceUtil = FundamentalReferenceUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuZGFtZW50YWwtcmVmZXJlbmNlLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udGVudC9mdW5kYW1lbnRhbC1yZWZlcmVuY2UvZnVuZGFtZW50YWwtcmVmZXJlbmNlLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQWdEO0FBQ2hELHFEQUFzRTtBQUV0RSw4RUFBMEU7QUFHMUUsTUFBYSx3QkFBd0I7SUFDekIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQWdEO1FBQzlFLE1BQU0sSUFBSSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRTVELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLG9CQUFvQixDQUM5QixNQUFvRztRQUVwRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRWxGLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNoRTtZQUVELE9BQU8sY0FBYyxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FDckIsS0FBbUc7UUFFbkcsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUdNLE1BQU0sQ0FBQyxlQUFlLENBQ3pCLE1BQW9HO1FBRXBHLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUdNLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBZ0I7UUFDMUMsT0FBTyxRQUFRLEdBQUcscUNBQTJCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMscUNBQTJCLENBQUM7SUFDM0YsQ0FBQztJQUdNLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFzRDtRQUN0RixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFpRCxFQUFFLEVBQUU7WUFDeEUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN6QyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQWE7UUFDekMsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFN0MsSUFBSSxTQUFTLElBQUksWUFBWSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELFNBQVMsb0JBQW9CLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDdkg7SUFDTCxDQUFDO0lBR00sTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQWdCO1FBQzVDLE9BQU8sT0FBTyxZQUFZLGtDQUFlLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBdkVELDREQXVFQyJ9