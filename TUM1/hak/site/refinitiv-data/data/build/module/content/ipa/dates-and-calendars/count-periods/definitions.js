"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definitions = void 0;
const session_1 = require("../../../../session");
const dates_and_calendars_1 = require("../dates-and-calendars");
function Definitions(definitions) {
    return {
        async getData(session = session_1.getDefault()) {
            const paramsList = definitions.map(definition => definition.getInstrument());
            const datesAndCalendarsProvider = new dates_and_calendars_1.DatesAndCalendarsProvider(session);
            return datesAndCalendarsProvider.getCountPeriods(paramsList);
        },
    };
}
exports.Definitions = Definitions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9pcGEvZGF0ZXMtYW5kLWNhbGVuZGFycy9jb3VudC1wZXJpb2RzL2RlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQUEwRDtBQUMxRCxnRUFBbUU7QUFFbkUsU0FBZ0IsV0FBVyxDQUFDLFdBQWtEO0lBQzFFLE9BQU87UUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQW1CLG9CQUFVLEVBQUU7WUFDekMsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFjLEVBQUUsQ0FBQyxDQUFDO1lBRTlFLE1BQU0seUJBQXlCLEdBQUcsSUFBSSwrQ0FBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6RSxPQUFPLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFWRCxrQ0FVQyJ9