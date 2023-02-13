export interface BaseDatesAndCalendars {
    calendars?: string[];
    currencies?: string[];
}
export declare enum HolidayOutput {
    Date = "Date",
    Names = "Names",
    Calendars = "Calendars",
    Countries = "Countries"
}
export declare enum DateMovingConvention {
    NoMoving = "NoMoving",
    PreviousBusinessDay = "PreviousBusinessDay",
    NextBusinessDay = "NextBusinessDay",
    ModifiedFollowing = "ModifiedFollowing",
    BbswModifiedFollowing = "BbswModifiedFollowing",
    EveryThirdWednesday = "EveryThirdWednesday"
}
export declare enum EndOfMonthConvention {
    Last = "Last",
    Same = "Same",
    Last28 = "Last28",
    Same28 = "Same28"
}
export declare enum PeriodType {
    Day = "Day",
    Year = "Year",
    WorkingDay = "WorkingDay",
    NonWorkingDay = "NonWorkingDay",
    NearestTenor = "NearestTenor"
}
export declare enum Frequency {
    Daily = "Daily",
    Weekly = "Weekly",
    BiWeekly = "BiWeekly",
    Monthly = "Monthly",
    Yearly = "Yearly"
}
export declare enum DayOfWeek {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday"
}
