"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const lodash_1 = require("lodash");
const session_1 = require("../../../../session");
const dates_and_calendars_1 = require("../dates-and-calendars");
function Definition(params) {
    return {
        getData(session = session_1.getDefault()) {
            const datesAndCalendarsProvider = new dates_and_calendars_1.DatesAndCalendarsProvider(session);
            return datesAndCalendarsProvider.getIsWorkingDay([params]);
        },
        getInstrument() {
            return lodash_1.cloneDeep(params);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9kYXRlcy1hbmQtY2FsZW5kYXJzL2lzLXdvcmtpbmctZGF5L2RlZmluaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBSW5DLGlEQUEwRDtBQUMxRCxnRUFBbUU7QUFFbkUsU0FBZ0IsVUFBVSxDQUFDLE1BQWM7SUFDckMsT0FBTztRQUNILE9BQU8sQ0FBQyxVQUFtQixvQkFBVSxFQUFFO1lBQ25DLE1BQU0seUJBQXlCLEdBQUcsSUFBSSwrQ0FBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6RSxPQUFPLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUdELGFBQWE7WUFDVCxPQUFPLGtCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBYkQsZ0NBYUMifQ==