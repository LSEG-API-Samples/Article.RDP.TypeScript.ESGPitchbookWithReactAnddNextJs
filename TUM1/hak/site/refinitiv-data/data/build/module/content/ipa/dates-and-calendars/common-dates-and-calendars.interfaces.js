"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = exports.Frequency = exports.PeriodType = exports.EndOfMonthConvention = exports.DateMovingConvention = exports.HolidayOutput = void 0;
var HolidayOutput;
(function (HolidayOutput) {
    HolidayOutput["Date"] = "Date";
    HolidayOutput["Names"] = "Names";
    HolidayOutput["Calendars"] = "Calendars";
    HolidayOutput["Countries"] = "Countries";
})(HolidayOutput = exports.HolidayOutput || (exports.HolidayOutput = {}));
var DateMovingConvention;
(function (DateMovingConvention) {
    DateMovingConvention["NoMoving"] = "NoMoving";
    DateMovingConvention["PreviousBusinessDay"] = "PreviousBusinessDay";
    DateMovingConvention["NextBusinessDay"] = "NextBusinessDay";
    DateMovingConvention["ModifiedFollowing"] = "ModifiedFollowing";
    DateMovingConvention["BbswModifiedFollowing"] = "BbswModifiedFollowing";
    DateMovingConvention["EveryThirdWednesday"] = "EveryThirdWednesday";
})(DateMovingConvention = exports.DateMovingConvention || (exports.DateMovingConvention = {}));
var EndOfMonthConvention;
(function (EndOfMonthConvention) {
    EndOfMonthConvention["Last"] = "Last";
    EndOfMonthConvention["Same"] = "Same";
    EndOfMonthConvention["Last28"] = "Last28";
    EndOfMonthConvention["Same28"] = "Same28";
})(EndOfMonthConvention = exports.EndOfMonthConvention || (exports.EndOfMonthConvention = {}));
var PeriodType;
(function (PeriodType) {
    PeriodType["Day"] = "Day";
    PeriodType["Year"] = "Year";
    PeriodType["WorkingDay"] = "WorkingDay";
    PeriodType["NonWorkingDay"] = "NonWorkingDay";
    PeriodType["NearestTenor"] = "NearestTenor";
})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
var Frequency;
(function (Frequency) {
    Frequency["Daily"] = "Daily";
    Frequency["Weekly"] = "Weekly";
    Frequency["BiWeekly"] = "BiWeekly";
    Frequency["Monthly"] = "Monthly";
    Frequency["Yearly"] = "Yearly";
})(Frequency = exports.Frequency || (exports.Frequency = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Sunday"] = "Sunday";
    DayOfWeek["Monday"] = "Monday";
    DayOfWeek["Tuesday"] = "Tuesday";
    DayOfWeek["Wednesday"] = "Wednesday";
    DayOfWeek["Thursday"] = "Thursday";
    DayOfWeek["Friday"] = "Friday";
    DayOfWeek["Saturday"] = "Saturday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWRhdGVzLWFuZC1jYWxlbmRhcnMuaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb250ZW50L2lwYS9kYXRlcy1hbmQtY2FsZW5kYXJzL2NvbW1vbi1kYXRlcy1hbmQtY2FsZW5kYXJzLmludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3JCLDhCQUFhLENBQUE7SUFDYixnQ0FBZSxDQUFBO0lBQ2Ysd0NBQXVCLENBQUE7SUFDdkIsd0NBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUxXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBS3hCO0FBRUQsSUFBWSxvQkFPWDtBQVBELFdBQVksb0JBQW9CO0lBQzVCLDZDQUFxQixDQUFBO0lBQ3JCLG1FQUEyQyxDQUFBO0lBQzNDLDJEQUFtQyxDQUFBO0lBQ25DLCtEQUF1QyxDQUFBO0lBQ3ZDLHVFQUErQyxDQUFBO0lBQy9DLG1FQUEyQyxDQUFBO0FBQy9DLENBQUMsRUFQVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQU8vQjtBQUVELElBQVksb0JBS1g7QUFMRCxXQUFZLG9CQUFvQjtJQUM1QixxQ0FBYSxDQUFBO0lBQ2IscUNBQWEsQ0FBQTtJQUNiLHlDQUFpQixDQUFBO0lBQ2pCLHlDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFMVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUsvQjtBQUVELElBQVksVUFNWDtBQU5ELFdBQVksVUFBVTtJQUNsQix5QkFBVyxDQUFBO0lBQ1gsMkJBQWEsQ0FBQTtJQUNiLHVDQUF5QixDQUFBO0lBQ3pCLDZDQUErQixDQUFBO0lBQy9CLDJDQUE2QixDQUFBO0FBQ2pDLENBQUMsRUFOVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU1yQjtBQUVELElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsa0NBQXFCLENBQUE7SUFDckIsZ0NBQW1CLENBQUE7SUFDbkIsOEJBQWlCLENBQUE7QUFDckIsQ0FBQyxFQU5XLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBTXBCO0FBRUQsSUFBWSxTQVFYO0FBUkQsV0FBWSxTQUFTO0lBQ2pCLDhCQUFpQixDQUFBO0lBQ2pCLDhCQUFpQixDQUFBO0lBQ2pCLGdDQUFtQixDQUFBO0lBQ25CLG9DQUF1QixDQUFBO0lBQ3ZCLGtDQUFxQixDQUFBO0lBQ3JCLDhCQUFpQixDQUFBO0lBQ2pCLGtDQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFSVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVFwQiJ9