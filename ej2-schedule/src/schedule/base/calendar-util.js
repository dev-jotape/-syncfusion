import { HijriParser } from '@syncfusion/ej2-base';
var Gregorian = /** @class */ (function () {
    function Gregorian() {
    }
    Gregorian.prototype.firstDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth());
    };
    Gregorian.prototype.lastDateOfMonth = function (dt) {
        return new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    };
    Gregorian.prototype.isMonthStart = function (date) {
        return (date.getDate() === 1);
    };
    return Gregorian;
}());
export { Gregorian };
var Islamic = /** @class */ (function () {
    function Islamic() {
    }
    Islamic.prototype.firstDateOfMonth = function (date) {
        var hDate = HijriParser.getHijriDate(date);
        var gDate = HijriParser.toGregorian(hDate.year, hDate.month, 1);
        return gDate;
    };
    Islamic.prototype.lastDateOfMonth = function (dt) {
        var hDate = HijriParser.getHijriDate(dt);
        var gDate = HijriParser.toGregorian(hDate.year, hDate.month, this.getDaysInMonth(hDate.month, hDate.year));
        var finalGDate = new Date(gDate.getTime());
        new Date(finalGDate.setDate(finalGDate.getDate() + 1));
        var finalHDate = HijriParser.getHijriDate(finalGDate);
        if (hDate.month === finalHDate.month) {
            return finalGDate;
        }
        finalHDate = HijriParser.getHijriDate(gDate);
        if (hDate.month === finalHDate.month) {
            return gDate;
        }
        return new Date(gDate.setDate(gDate.getDate() - 1));
    };
    Islamic.prototype.isMonthStart = function (date) {
        var hijriDate = HijriParser.getHijriDate(date);
        return (hijriDate.date === 1);
    };
    Islamic.prototype.isLeapYear = function (year) {
        return (14 + 11 * year) % 30 < 11;
    };
    Islamic.prototype.getDaysInMonth = function (month, year) {
        var length = 0;
        length = 29 + ((month + 1) % 2);
        if (month === 11 && this.isLeapYear(year)) {
            length++;
        }
        return length;
    };
    return Islamic;
}());
export { Islamic };
