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
            return datesAndCalendarsProvider.getCountPeriods([params]);
        },
        getInstrument() {
            return lodash_1.cloneDeep(params);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9kYXRlcy1hbmQtY2FsZW5kYXJzL2NvdW50LXBlcmlvZHMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFJbkMsaURBQTBEO0FBQzFELGdFQUFtRTtBQUVuRSxTQUFnQixVQUFVLENBQUMsTUFBYztJQUNyQyxPQUFPO1FBQ0gsT0FBTyxDQUFDLFVBQW1CLG9CQUFVLEVBQUU7WUFDbkMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLCtDQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpFLE9BQU8seUJBQXlCLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBR0QsYUFBYTtZQUNULE9BQU8sa0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFiRCxnQ0FhQyJ9