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
            return datesAndCalendarsProvider.getIsWorkingDay(paramsList);
        },
    };
}
exports.Definitions = Definitions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29udGVudC9pcGEvZGF0ZXMtYW5kLWNhbGVuZGFycy9pcy13b3JraW5nLWRheS9kZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpREFBMEQ7QUFDMUQsZ0VBQW1FO0FBRW5FLFNBQWdCLFdBQVcsQ0FBQyxXQUFrRDtJQUMxRSxPQUFPO1FBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFtQixvQkFBVSxFQUFFO1lBQ3pDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYyxFQUFFLENBQUMsQ0FBQztZQUU5RSxNQUFNLHlCQUF5QixHQUFHLElBQUksK0NBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekUsT0FBTyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBVkQsa0NBVUMifQ==