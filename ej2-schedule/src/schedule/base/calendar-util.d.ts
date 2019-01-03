/**
 * Calendar functionalities
 */
export interface CalendarUtil {
    firstDateOfMonth(date: Date): Date;
    lastDateOfMonth(date: Date): Date;
    isMonthStart(date: Date): boolean;
}
export declare class Gregorian implements CalendarUtil {
    firstDateOfMonth(date: Date): Date;
    lastDateOfMonth(dt: Date): Date;
    isMonthStart(date: Date): boolean;
}
export declare class Islamic implements CalendarUtil {
    firstDateOfMonth(date: Date): Date;
    lastDateOfMonth(dt: Date): Date;
    isMonthStart(date: Date): boolean;
    private isLeapYear;
    private getDaysInMonth;
}
