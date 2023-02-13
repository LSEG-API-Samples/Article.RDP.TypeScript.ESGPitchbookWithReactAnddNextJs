"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = void 0;
const session_1 = require("../../../../session");
const dates_and_calendars_1 = require("../dates-and-calendars");
function Definition(params) {
    return {
        getData(session = session_1.getDefault()) {
            const datesAndCalendarsProvider = new dates_and_calendars_1.DatesAndCalendarsProvider(session);
            return datesAndCalendarsProvider.getDateSchedule([params]);
        },
    };
}
exports.Definition = Definition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9kYXRlcy1hbmQtY2FsZW5kYXJzL2RhdGUtc2NoZWR1bGUvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpREFBMEQ7QUFDMUQsZ0VBQW1FO0FBRW5FLFNBQWdCLFVBQVUsQ0FBQyxNQUFjO0lBQ3JDLE9BQU87UUFDSCxPQUFPLENBQUMsVUFBbUIsb0JBQVUsRUFBRTtZQUNuQyxNQUFNLHlCQUF5QixHQUFHLElBQUksK0NBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekUsT0FBTyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQVJELGdDQVFDIn0=