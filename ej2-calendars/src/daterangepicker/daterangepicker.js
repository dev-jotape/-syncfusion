var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path='../calendar/calendar-model.d.ts'/>
import { Property, EventHandler, Internationalization, NotifyPropertyChanges, detach, getUniqueID } from '@syncfusion/ej2-base';
import { KeyboardEvents, Event, Browser, L10n, ChildProperty } from '@syncfusion/ej2-base';
import { addClass, createElement, remove, closest, select, prepend, removeClass, attributes, Collection } from '@syncfusion/ej2-base';
import { isNullOrUndefined, isUndefined, formatUnit, setValue, rippleEffect, merge, extend } from '@syncfusion/ej2-base';
import { CalendarBase } from '../calendar/calendar';
import { Popup } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { Input } from '@syncfusion/ej2-inputs';
import { ListBase, cssClass as ListBaseClasses } from '@syncfusion/ej2-lists';
var DATERANGEWRAPPER = 'e-date-range-wrapper';
var INPUTCONTAINER = 'e-input-group';
var DATERANGEICON = 'e-input-group-icon e-range-icon e-icons';
var POPUP = 'e-popup';
var LEFTCALENDER = 'e-left-calendar';
var RIGHTCALENDER = 'e-right-calendar';
var LEFTCONTAINER = 'e-left-container';
var RIGHTCONTAINER = 'e-right-container';
var ROOT = 'e-daterangepicker';
var ERROR = 'e-error';
var ACTIVE = 'e-active';
var STARTENDCONTAINER = 'e-start-end';
var STARTDATE = 'e-start-date';
var ENDDATE = 'e-end-date';
var STARTBUTTON = 'e-start-btn';
var INPUTFOCUS = 'e-input-focus';
var ENDBUTTON = 'e-end-btn';
var RANGEHOVER = 'e-range-hover';
var OTHERMONTH = 'e-other-month';
var STARTLABEL = 'e-start-label';
var ENDLABEL = 'e-end-label';
var DISABLED = 'e-disabled';
var SELECTED = 'e-selected';
var CALENDAR = 'e-calendar';
var NEXTICON = 'e-next';
var PREVICON = 'e-prev';
var HEADER = 'e-header';
var TITLE = 'e-title';
var ICONCONTAINER = 'e-icon-container';
var RANGECONTAINER = 'e-date-range-container';
var RANGEHEADER = 'e-range-header';
var PRESETS = 'e-presets';
var FOOTER = 'e-footer';
var RANGEBORDER = 'e-range-border';
var TODAY = 'e-today';
var FOCUSDATE = 'e-focused-date';
var CONTENT = 'e-content';
var DAYSPAN = 'e-day-span';
var WEEKNUMBER = 'e-week-number';
var DATEDISABLED = 'e-date-disabled';
var ICONDISABLED = 'e-icon-disabled';
var CALENDARCONTAINER = 'e-calendar-container';
var SEPARATOR = 'e-separator';
var APPLY = 'e-apply';
var CANCEL = 'e-cancel';
var DEVICE = 'e-device';
var OVERLAY = 'e-overlay';
var CHANGEICON = 'e-change-icon e-icons';
var LISTCLASS = ListBaseClasses.li;
var RTL = 'e-rtl';
var HOVER = 'e-hover';
var OVERFLOW = 'e-range-overflow';
var OFFSETVALUE = 4;
var PRIMARY = 'e-primary';
var FLAT = 'e-flat';
var CSS = 'e-css';
var Presets = /** @class */ (function (_super) {
    __extends(Presets, _super);
    function Presets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Presets.prototype, "label", void 0);
    __decorate([
        Property()
    ], Presets.prototype, "start", void 0);
    __decorate([
        Property()
    ], Presets.prototype, "end", void 0);
    return Presets;
}(ChildProperty));
export { Presets };
/**
 * Represents the DateRangePicker component that allows user to select the date range from the calendar
 * or entering the range through the input element.
 * ```html
 * <input id="daterangepicker"/>
 * ```
 * ```typescript
 * <script>
 *   var dateRangePickerObj = new DateRangePicker({ startDate: new Date("05/07/2017"), endDate: new Date("10/07/2017") });
 *   dateRangePickerObj.appendTo("#daterangepicker");
 * </script>
 * ```
 */
var DateRangePicker = /** @class */ (function (_super) {
    __extends(DateRangePicker, _super);
    /**
     * Constructor for creating the widget
     */
    function DateRangePicker(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isCustomRange = false;
        _this.isCustomWindow = false;
        _this.presetsItem = [];
        _this.liCollections = [];
        _this.previousEleValue = '';
        _this.isKeyPopup = false;
        _this.dateDisabled = false;
        _this.isRangeIconClicked = false;
        _this.isMaxDaysClicked = false;
        _this.disabledDays = [];
        _this.preventBlur = false;
        _this.preventFocus = false;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     * @return void
     * @private
     */
    DateRangePicker.prototype.render = function () {
        this.initialize();
        this.setProperties({ startDate: this.startValue }, true);
        this.setProperties({ endDate: this.endValue }, true);
        this.setModelValue();
    };
    /**
     * Initialize the event handler
     * @returns void
     * @private
     */
    DateRangePicker.prototype.preRender = function () {
        this.presetKeyConfig = {
            moveUp: 'uparrow',
            moveDown: 'downarrow',
            enter: 'enter',
            tab: 'tab',
            spacebar: 'space'
        };
        this.keyInputConfigs = {
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
            tab: 'tab',
            altRightArrow: 'alt+rightarrow',
            altLeftArrow: 'alt+leftarrow'
        };
        this.defaultConstant = {
            placeholder: '',
            startLabel: 'Start Date',
            endLabel: 'End Date',
            customRange: 'Custom Range',
            applyText: 'Apply',
            cancelText: 'Cancel',
            selectedDays: 'Selected Days',
            days: 'days'
        };
        /**
         * Mobile View
         */
        this.isMobile = window.matchMedia('(max-width:550px)').matches;
        this.inputElement = this.element;
        this.angularTag = null;
        if (this.element.tagName === 'EJS-DATERANGEPICKER') {
            this.angularTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        this.cloneElement = this.element.cloneNode(true);
        if (this.element.getAttribute('id')) {
            if (this.angularTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            this.element.id = getUniqueID('ej2-datetimepicker');
            if (this.angularTag !== null) {
                attributes(this.inputElement, { 'id': this.element.id + '_input' });
            }
        }
        this.initProperty();
        _super.prototype.preRender.call(this);
        this.navNextFunction = this.navNextMonth.bind(this);
        this.navPrevFunction = this.navPrevMonth.bind(this);
        this.deviceNavNextFunction = this.deviceNavNext.bind(this);
        this.deviceNavPrevFunction = this.deviceNavPrevious.bind(this);
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
        this.formElement = closest(this.element, 'form');
    };
    ;
    DateRangePicker.prototype.updateValue = function () {
        if (this.value && this.value.length > 0) {
            if (this.value[0] instanceof Date && !isNaN(+this.value[0])) {
                this.setProperties({ startDate: this.value[0] }, true);
                this.startValue = this.value[0];
            }
            else if (typeof this.value[0] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date('' + this.value[0])))) {
                    this.startValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ startDate: new Date('' + this.value[0]) }, true);
                    this.startValue = new Date('' + this.value[0]);
                }
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value[1] instanceof Date && !isNaN(+this.value[1])) {
                this.setProperties({ endDate: this.value[1] }, true);
                this.endValue = this.value[1];
            }
            else if (typeof this.value[1] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date('' + this.value[0])))) {
                    this.setProperties({ endDate: null }, true);
                    this.endValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ endDate: new Date('' + this.value[1]) }, true);
                    this.endValue = new Date('' + this.value[1]);
                    this.setValue();
                }
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (this.value && this.value.start) {
            if (this.value.start instanceof Date && !isNaN(+this.value.start)) {
                this.setProperties({ startDate: this.value.start }, true);
                this.startValue = this.value.start;
            }
            else if (typeof this.value.start === 'string') {
                this.setProperties({ startDate: new Date('' + this.value.start) }, true);
                this.startValue = new Date('' + this.value.start);
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value.end instanceof Date && !isNaN(+this.value.end)) {
                this.setProperties({ endDate: this.value.end }, true);
                this.endValue = this.value.end;
            }
            else if (typeof this.value.end === 'string') {
                this.setProperties({ endDate: new Date('' + this.value.end) }, true);
                this.endValue = new Date('' + this.value.end);
                this.setValue();
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (isNullOrUndefined(this.value)) {
            this.endValue = this.checkDateValue(new Date('' + this.endDate));
            this.startValue = this.checkDateValue(new Date('' + this.startDate));
            this.setValue();
        }
    };
    DateRangePicker.prototype.initProperty = function () {
        this.globalize = new Internationalization(this.locale);
        if (isNullOrUndefined(this.firstDayOfWeek) || this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: this.globalize.getFirstDayOfWeek() }, true);
        }
        this.updateValue();
    };
    DateRangePicker.prototype.initialize = function () {
        if (this.angularTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.checkHtmlAttributes();
        merge(this.keyConfigs, { shiftTab: 'shift+tab' });
        this.setProperties({ startDate: this.checkDateValue(new Date('' + this.startValue)) }, true); // persist the value propeerty.
        this.setProperties({ endValue: this.checkDateValue(new Date('' + this.endValue)) }, true);
        this.setValue();
        this.setProperties({ min: this.checkDateValue(new Date('' + this.min)) }, true);
        this.setProperties({ max: this.checkDateValue(new Date('' + this.max)) }, true);
        this.l10n = new L10n('daterangepicker', this.defaultConstant, this.locale);
        this.l10n.setLocale(this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        this.processPresets();
        this.createInput();
        this.setRangeAllowEdit();
        this.bindEvents();
    };
    DateRangePicker.prototype.setRangeAllowEdit = function () {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
    };
    DateRangePicker.prototype.validationAttribute = function (element, input) {
        var name = element.getAttribute('name') ? element.getAttribute('name') : element.getAttribute('id');
        input.setAttribute('name', name);
        element.removeAttribute('name');
        var attributes = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attributes.length; i++) {
            if (isNullOrUndefined(element.getAttribute(attributes[i]))) {
                continue;
            }
            var attr = element.getAttribute(attributes[i]);
            input.setAttribute(attributes[i], attr);
            element.removeAttribute(attributes[i]);
        }
    };
    DateRangePicker.prototype.processPresets = function () {
        this.presetsItem = [];
        var i = 0;
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            for (var _i = 0, _a = this.presets; _i < _a.length; _i++) {
                var range = _a[_i];
                var id = range.label.replace(/\s+/g, '') + '_' + (++i);
                if (typeof range.end === 'string') {
                    this.presetsItem.push({
                        id: id, text: range.label, end: new Date('' + range.end), start: new Date('' + range.start)
                    });
                }
                else {
                    this.presetsItem.push({ id: id, text: range.label, start: range.start, end: range.end });
                }
            }
            var startDate = isNullOrUndefined(this.startValue) ? null : new Date(+this.startValue);
            var endDate = isNullOrUndefined(this.endValue) ? null : new Date(+this.endValue);
            this.presetsItem.push({ id: 'custom_range', text: this.l10n.getConstant('customRange'), start: startDate, end: endDate });
            if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
                this.isCustomRange = true;
                this.activeIndex = this.presetsItem.length - 1;
            }
        }
    };
    DateRangePicker.prototype.bindEvents = function () {
        if (this.enabled) {
            EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler, this);
            EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
            EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
            EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
            if (this.showClearButton) {
                EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
            }
            if (!this.isMobile) {
                this.inputKeyboardModule = new KeyboardEvents(this.inputElement, {
                    eventName: 'keydown', keyAction: this.inputHandler.bind(this), keyConfigs: this.keyInputConfigs
                });
            }
            if (this.formElement) {
                EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
            }
        }
        else {
            EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
            if (this.showClearButton) {
                EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
            }
            if (!this.isMobile) {
                if (!isNullOrUndefined(this.inputKeyboardModule)) {
                    this.inputKeyboardModule.destroy();
                }
            }
            if (this.formElement) {
                EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
            }
        }
    };
    DateRangePicker.prototype.updateHiddenInput = function () {
        if (this.firstHiddenChild && this.secondHiddenChild) {
            var format = { type: 'datetime', skeleton: 'yMd' };
            if (typeof this.startDate === 'string') {
                this.startDate = this.globalize.parseDate(this.startDate, format);
            }
            if (typeof this.endDate === 'string') {
                this.endDate = this.globalize.parseDate(this.endDate, format);
            }
            this.firstHiddenChild.value = (this.startDate && this.globalize.formatDate(this.startDate, format))
                || (this.inputElement.value);
            this.secondHiddenChild.value = (this.endDate && this.globalize.formatDate(this.endDate, format)) ||
                (this.inputElement.value);
            this.dispatchEvent(this.firstHiddenChild, 'focusout');
            this.dispatchEvent(this.firstHiddenChild, 'change');
        }
    };
    DateRangePicker.prototype.inputChangeHandler = function (e) {
        e.stopPropagation();
        this.updateHiddenInput();
    };
    DateRangePicker.prototype.bindClearEvent = function () {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
    };
    DateRangePicker.prototype.resetHandler = function (e) {
        this.valueType = this.value;
        e.preventDefault();
        this.clear();
        this.changeTrigger(e);
        this.clearRange();
        this.hide(e);
    };
    DateRangePicker.prototype.formResetHandler = function (e) {
        if (this.formElement && e.target === this.formElement) {
            this.value = null;
            if (this.inputElement) {
                Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                attributes(this.inputElement, { 'aria-invalid': 'false' });
                removeClass([this.inputWrapper.container], ERROR);
            }
        }
    };
    DateRangePicker.prototype.clear = function () {
        if (this.startValue !== null) {
            this.startValue = null;
        }
        if (this.endValue !== null) {
            this.endValue = null;
        }
        if (this.value && this.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        if (this.value !== null && this.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        if (!(isNullOrUndefined(this.applyButton))) {
            this.applyButton.disabled = this.applyButton.element.disabled = true;
        }
        this.removeSelection();
    };
    DateRangePicker.prototype.rangeIconHandler = function (e) {
        if (this.isMobile) {
            this.element.setAttribute('readonly', '');
        }
        e.preventDefault();
        this.targetElement = null;
        if (this.isPopupOpen()) {
            this.applyFunction(e);
        }
        else {
            this.isRangeIconClicked = true;
            this.inputWrapper.container.children[0].focus();
            this.show(null, e);
            if (!this.isMobile) {
                if (!isNullOrUndefined(this.leftCalendar)) {
                    this.isRangeIconClicked = false;
                    this.calendarFocus();
                    this.isRangeIconClicked = true;
                }
            }
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
    };
    DateRangePicker.prototype.checkHtmlAttributes = function () {
        this.globalize = new Internationalization(this.locale);
        var attributes;
        attributes = ['startDate', 'endDate', 'minDays', 'maxDays', 'min', 'max', 'disabled',
            'readonly', 'style', 'name', 'placeholder', 'type'];
        var format = { format: this.format, type: 'date', skeleton: 'yMd' };
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        var disabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                            this.inputElement.getAttribute(prop) === '';
                        this.setProperties({ enabled: !disabled }, true);
                        break;
                    case 'readonly':
                        var readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                            this.inputElement.getAttribute(prop) === '';
                        this.setProperties({ readonly: readonly }, true);
                        break;
                    case 'placeholder':
                        if (isNullOrUndefined(this.placeholder) || this.placeholder.trim() === '') {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, true);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'min':
                        if (isNullOrUndefined(this.min) || +this.min === +new Date(1900, 0, 1)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.setProperties(setValue(prop, dateValue, {}), true);
                        }
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'max':
                        if (isNullOrUndefined(this.max) || +this.max === +new Date(2099, 11, 31)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.setProperties(setValue(prop, dateValue, {}), true);
                        }
                        break;
                    case 'startDate':
                        if (isNullOrUndefined(this.startDate)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.startValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'endDate':
                        if (isNullOrUndefined(this.endDate)) {
                            var dateValue = this.globalize.parseDate(this.inputElement.getAttribute(prop), format);
                            this.endValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'minDays':
                        if (isNullOrUndefined(this.minDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
                        }
                        break;
                    case 'maxDays':
                        if (isNullOrUndefined(this.maxDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
                        }
                        break;
                    case 'type':
                        if (this.inputElement.getAttribute(prop) !== 'text') {
                            this.inputElement.setAttribute('type', 'text');
                        }
                        break;
                }
            }
        }
    };
    DateRangePicker.prototype.createPopup = function () {
        for (var i = 0; i < this.presetsItem.length; i++) {
            if ((i !== (this.presetsItem.length - 1)) && this.presetsItem[i].id === 'custom_range') {
                this.presetsItem.splice(i, 1);
            }
        }
        this.activeIndex = this.presetsItem.length - 1;
        this.isCustomRange = true;
        for (var i = 0; i <= this.presetsItem.length - 2; i++) {
            var startDate = this.presetsItem[i].start;
            var endDate = this.presetsItem[i].end;
            if (this.startValue && this.endValue) {
                if ((+startDate.setMilliseconds(0) === +this.startValue.setMilliseconds(0)) &&
                    (+endDate.setMilliseconds(0) === +this.endValue.setMilliseconds(0))) {
                    this.activeIndex = i;
                    this.isCustomRange = false;
                }
            }
        }
        this.popupWrapper = createElement('div', { id: this.element.id + '_popup', className: ROOT + ' ' + POPUP });
        var isPreset = (!this.isCustomRange || this.isMobile);
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && isPreset) {
            this.isCustomWindow = false;
            this.createPresets();
            this.listRippleEffect();
            this.renderPopup();
        }
        else {
            this.isCustomWindow = true;
            this.renderControl();
        }
    };
    DateRangePicker.prototype.renderControl = function () {
        this.createControl();
        this.bindCalendarEvents();
        this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            this.disabledDateRender();
        }
        this.updateHeader();
    };
    DateRangePicker.prototype.clearCalendarEvents = function () {
        EventHandler.clearEvents(this.leftCalPrevIcon);
        EventHandler.clearEvents(this.leftCalNextIcon);
        EventHandler.clearEvents(this.rightCalPrevIcon);
        EventHandler.clearEvents(this.rightCalNextIcon);
    };
    DateRangePicker.prototype.updateNavIcons = function () {
        if (this.currentView() === 'Year' || this.currentView() === 'Decade') {
            return;
        }
        this.previousIcon = this.rightCalPrevIcon;
        this.nextIcon = this.leftCalNextIcon;
        this.nextIconHandler(this.compareMonths(new Date('' + this.leftCalCurrentDate), this.rightCalCurrentDate) < 1);
        this.previousIconHandler(this.compareMonths(new Date('' + this.leftCalCurrentDate), this.rightCalCurrentDate) < 1);
    };
    DateRangePicker.prototype.calendarIconEvent = function () {
        this.clearCalendarEvents();
        if (this.leftCalPrevIcon && !this.leftCalPrevIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.leftCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.leftCalNextIcon && !this.leftCalNextIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.leftCalNextIcon, 'mousedown', this.navNextFunction);
        }
        if (this.rightCalPrevIcon && !this.rightCalPrevIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.rightCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.rightCalNextIcon && !this.rightCalNextIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.rightCalNextIcon, 'mousedown', this.navNextFunction);
        }
    };
    DateRangePicker.prototype.bindCalendarEvents = function () {
        if (!this.isMobile) {
            this.updateNavIcons();
            this.calendarIconEvent();
            this.calendarIconRipple();
            this.headerTitleElement = this.popupObj.element.querySelector('.' + RIGHTCALENDER + ' .' + HEADER + ' .' + TITLE);
            this.headerTitleElement = this.popupObj.element.querySelector('.' + LEFTCALENDER + ' .' + HEADER + ' .' + TITLE);
            this.leftKeyboardModule = new KeyboardEvents(this.leftCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.keyConfigs
            });
            this.rightKeyboardModule = new KeyboardEvents(this.rightCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.keyConfigs
            });
        }
        else {
            this.deviceCalendarEvent();
            EventHandler.add(this.startButton.element, 'click', this.deviceHeaderClick, this);
            EventHandler.add(this.endButton.element, 'click', this.deviceHeaderClick, this);
        }
        this.bindCalendarCellEvents();
        this.removeFocusedDate();
    };
    DateRangePicker.prototype.calendarIconRipple = function () {
        rippleEffect(this.leftCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.leftCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
    };
    DateRangePicker.prototype.deviceCalendarEvent = function () {
        EventHandler.clearEvents(this.nextIcon);
        EventHandler.clearEvents(this.previousIcon);
        rippleEffect(this.nextIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.previousIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        if (this.nextIcon && !this.nextIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.nextIcon, 'mousedown', this.deviceNavNextFunction);
        }
        if (this.previousIcon && !this.previousIcon.classList.contains(DISABLED)) {
            EventHandler.add(this.previousIcon, 'mousedown', this.deviceNavPrevFunction);
        }
    };
    DateRangePicker.prototype.deviceNavNext = function (e) {
        var calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigateNext(e);
        this.deviceNavigation();
    };
    DateRangePicker.prototype.deviceNavPrevious = function (e) {
        var calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigatePrevious(e);
        this.deviceNavigation();
    };
    DateRangePicker.prototype.updateDeviceCalendar = function (calendar) {
        if (calendar) {
            this.previousIcon = calendar.querySelector('.' + PREVICON);
            this.nextIcon = calendar.querySelector('.' + NEXTICON);
            this.calendarElement = calendar;
            this.deviceCalendar = calendar;
            this.contentElement = calendar.querySelector('.' + CONTENT);
            this.tableBodyElement = select('.' + CONTENT + ' tbody', calendar);
            this.table = calendar.querySelector('.' + CONTENT).getElementsByTagName('table')[0];
            this.headerTitleElement = calendar.querySelector('.' + HEADER + ' .' + TITLE);
            this.headerElement = calendar.querySelector('.' + HEADER);
        }
    };
    DateRangePicker.prototype.deviceHeaderClick = function (event) {
        var element = event.currentTarget;
        if (element.classList.contains(STARTBUTTON) && !isNullOrUndefined(this.startValue)) {
            this.endButton.element.classList.remove(ACTIVE);
            this.startButton.element.classList.add(ACTIVE);
            var calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + STARTDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.startValue);
                remove(this.tableBodyElement);
                this.renderMonths();
                this.deviceNavigation();
            }
            this.removeClassDisabled();
        }
        else if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            this.startButton.element.classList.remove(ACTIVE);
            this.endButton.element.classList.add(ACTIVE);
            var calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + ENDDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.endValue);
                remove(this.tableBodyElement);
                this.renderMonths();
                this.deviceNavigation();
            }
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            this.selectableDates();
        }
    };
    DateRangePicker.prototype.inputFocusHandler = function () {
        this.preventBlur = false;
        var focusArguments = {
            model: this
        };
        if (!this.preventFocus) {
            this.preventFocus = true;
            this.trigger('focus', focusArguments);
        }
        this.updateHiddenInput();
    };
    DateRangePicker.prototype.inputBlurHandler = function (e) {
        if (!this.preventBlur) {
            var value = this.inputElement.value;
            if (!isNullOrUndefined(this.presetsItem)) {
                if (this.presetsItem.length > 0 && this.previousEleValue !== this.inputElement.value) {
                    this.activeIndex = this.presetsItem.length - 1;
                    this.isCustomRange = true;
                }
            }
            if (!isNullOrUndefined(value) && value.trim() !== '') {
                var range = value.split(' ' + this.separator + ' ');
                if (range.length > 1) {
                    var dateOptions = { format: this.format, type: 'date', skeleton: 'yMd' };
                    var startDate = this.globalize.parseDate(range[0].trim(), dateOptions);
                    var endDate = this.globalize.parseDate(range[1].trim(), dateOptions);
                    if (!isNullOrUndefined(startDate) && !isNaN(+startDate) && !isNullOrUndefined(endDate) && !isNaN(+endDate)) {
                        this.startValue = startDate;
                        this.endValue = endDate;
                        this.setValue();
                        this.refreshControl();
                        this.changeTrigger(e);
                        if (!this.preventBlur && document.activeElement !== this.inputElement) {
                            this.preventFocus = false;
                            var blurArguments = {
                                model: this
                            };
                            this.trigger('blur', blurArguments);
                        }
                        this.updateHiddenInput();
                        return;
                    }
                    else {
                        if (!this.strictMode) {
                            this.startValue = null;
                            this.endValue = null;
                            this.setValue();
                        }
                    }
                }
                else {
                    if (!this.strictMode) {
                        this.startValue = null;
                        this.endValue = null;
                        this.setValue();
                    }
                }
            }
            if (!this.strictMode) {
                this.clearRange();
                this.startValue = null;
                this.endValue = null;
                this.setValue();
            }
            else {
                Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                this.updateInput();
            }
            this.errorClass();
            this.changeTrigger(e);
            if (!this.preventBlur && document.activeElement !== this.inputElement) {
                this.preventFocus = false;
                var blurArguments = {
                    model: this
                };
                this.trigger('blur', blurArguments);
            }
        }
        this.updateHiddenInput();
    };
    DateRangePicker.prototype.clearRange = function () {
        this.previousStartValue = this.previousEndValue = null;
        this.currentDate = null;
    };
    DateRangePicker.prototype.errorClass = function () {
        var inputStr = this.inputElement.value.trim();
        if (((isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue) && inputStr !== '') ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max))
            || ((this.startValue && this.isDateDisabled(this.startValue))
                || (this.endValue && this.isDateDisabled(this.endValue)))) && inputStr !== '') {
            addClass([this.inputWrapper.container], ERROR);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else {
            if (this.inputWrapper) {
                removeClass([this.inputWrapper.container], ERROR);
                attributes(this.inputElement, { 'aria-invalid': 'false' });
            }
        }
    };
    DateRangePicker.prototype.keyCalendarUpdate = function (isLeftCalendar, ele) {
        this.removeFocusedDate();
        if (isLeftCalendar) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
            ele = this.leftCalendar;
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
            ele = this.rightCalendar;
        }
        this.updateCalendarElement(ele);
        this.table.focus();
        return ele;
    };
    DateRangePicker.prototype.navInCalendar = function (e, isLeftCalendar, leftLimit, rightLimit, ele) {
        var view = this.getViewNumber(this.currentView());
        var date;
        var min = this.min;
        var max;
        if (!isNullOrUndefined(this.maxDays) && this.isMaxDaysClicked && !isNullOrUndefined(this.startValue)) {
            max = new Date(new Date(+this.startValue).setDate(this.startValue.getDate() + (this.maxDays - 1)));
        }
        else {
            max = this.max;
        }
        switch (e.action) {
            case 'moveRight':
                date = new Date(+this.currentDate);
                this.addDay(date, 1, e, max, min);
                if (isLeftCalendar && +date === +rightLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.KeyboardNavigate(1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveLeft':
                date = new Date(+this.currentDate);
                this.addDay(date, -1, e, max, min);
                if (!isLeftCalendar) {
                    if (+date === +leftLimit) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                }
                this.KeyboardNavigate(-1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveUp':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, -7, e, max, min);
                    if (+date <= +leftLimit && !isLeftCalendar) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                    this.KeyboardNavigate(-7, view, e, max, min);
                }
                else {
                    this.KeyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                }
                this.keyNavigation(ele, e);
                break;
            case 'moveDown':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, 7, e, max, min);
                    if (isLeftCalendar && +date >= +rightLimit) {
                        ele = this.keyCalendarUpdate(false, ele);
                    }
                    this.KeyboardNavigate(7, view, e, max, min);
                }
                else {
                    this.KeyboardNavigate(4, view, e, this.max, this.min);
                }
                this.keyNavigation(ele, e);
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                remove(this.tableBodyElement);
                (view === 0) ? this.renderMonths(e) : ((view === 1) ? this.renderYears(e) : this.renderDecades(e));
                this.keyNavigation(ele, e);
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate, view);
                remove(this.tableBodyElement);
                (view === 0) ? this.renderMonths(e) : ((view === 1) ? this.renderYears(e) : this.renderDecades(e));
                this.keyNavigation(ele, e);
                break;
        }
    };
    // tslint:disable-next-line:max-func-body-length
    DateRangePicker.prototype.keyInputHandler = function (e, value) {
        var date;
        var view = this.getViewNumber(this.currentView());
        var rightDateLimit = new Date(this.rightCalCurrentDate.getFullYear(), this.rightCalCurrentDate.getMonth(), 1);
        var leftDateLimit = new Date(this.leftCalCurrentDate.getFullYear(), this.leftCalCurrentDate.getMonth() + 1, 0);
        var ele = closest(e.target, '.' + RIGHTCALENDER);
        ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
        var isLeftCalendar = ele.classList.contains(LEFTCALENDER);
        this.updateCalendarElement(ele);
        var selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        var focusedDate = ele.querySelector('tr td.' + FOCUSDATE);
        var startDate = ele.querySelector('tr td.' + STARTDATE);
        var endDate = ele.querySelector('tr td.' + ENDDATE);
        var depthValue = this.getViewNumber(this.depth);
        var levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        var leftCalendar = closest(e.target, '.' + LEFTCALENDER);
        var rightCalendar = closest(e.target, '.' + RIGHTCALENDER);
        var presetElement = closest(e.target, '.' + PRESETS);
        if (!isNullOrUndefined(focusedDate)) {
            this.currentDate = this.currentDate;
        }
        else if (!isNullOrUndefined(endDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.endValue);
        }
        else if (!isNullOrUndefined(startDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.startValue);
        }
        else if (!this.dateDisabled) {
            this.currentDate.setDate(1);
        }
        this.effect = '';
        switch (e.action) {
            case 'altUpArrow':
                if (this.isPopupOpen()) {
                    this.hide(e);
                    this.preventFocus = true;
                    this.inputElement.focus();
                    addClass([this.inputWrapper.container], [INPUTFOCUS]);
                }
                break;
            case 'select':
                if (view === 0) {
                    var element = !isNullOrUndefined(focusedDate) ? focusedDate : startDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                        this.selectRange(null, (element));
                    }
                }
                else {
                    if (!isNullOrUndefined(selectedDate) && !levelRestrict || !isNullOrUndefined(focusedDate)) {
                        if (!isNullOrUndefined(this.value)) {
                            if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                                value = this.startDate;
                            }
                            else {
                                value = this.endDate;
                            }
                        }
                        this.controlDown = e;
                        this.contentClick(null, --view, (focusedDate || selectedDate), value);
                    }
                }
                e.preventDefault();
                break;
            case 'controlHome':
                var yearDate = new Date(this.currentDate.getFullYear(), 0, 1);
                if (!isLeftCalendar && +yearDate < +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 0, 1));
                this.keyNavigation(ele, e);
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else if (!isNullOrUndefined(rightCalendar)) {
                    if (!isNullOrUndefined(this.presetElement)) {
                        this.presetElement.focus();
                        this.removeFocusedDate();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(presetElement)) {
                        this.cancelButton.element.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    if (this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(rightCalendar)) {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'controlUp':
                if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                    this.calendarNavigation(e, this.calendarElement);
                }
                else {
                    this.calendarNavigation(e, this.calendarElement);
                }
                e.preventDefault();
                break;
            case 'controlDown':
                if ((!isNullOrUndefined(selectedDate) && !levelRestrict) || !isNullOrUndefined(focusedDate)) {
                    if (!isNullOrUndefined(this.value)) {
                        if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                            value = this.startDate;
                        }
                        else {
                            value = this.endDate;
                        }
                    }
                    this.controlDown = e;
                    this.contentClick(null, --view, (selectedDate || focusedDate), value);
                }
                e.preventDefault();
                break;
            case 'controlEnd':
                yearDate = new Date(this.currentDate.getFullYear(), 11, 31);
                if (isLeftCalendar && +yearDate > +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 11, 31));
                this.keyNavigation(ele, e);
                break;
            case 'pageUp':
                date = new Date(+this.currentDate);
                this.addMonths(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addMonths(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'pageDown':
                date = new Date(+this.currentDate);
                this.addMonths(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addMonths(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageUp':
                date = new Date(+this.currentDate);
                this.addYears(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addYears(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageDown':
                date = new Date(+this.currentDate);
                this.addYears(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addYears(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftTab':
                if (!isNullOrUndefined(this.presetElement)) {
                    this.presetElement.setAttribute('tabindex', '0');
                    this.presetElement.focus();
                    this.removeFocusedDate();
                }
                e.preventDefault();
                break;
            case 'spacebar':
                if (this.applyButton && !this.applyButton.disabled) {
                    this.applyFunction(e);
                }
                break;
            default:
                this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                this.checkMinMaxDays();
        }
        this.presetHeight();
    };
    DateRangePicker.prototype.keyNavigation = function (calendar, e) {
        this.bindCalendarCellEvents(calendar);
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
        }
        this.updateNavIcons();
        this.calendarIconEvent();
        this.updateRange([calendar]);
        this.dateDisabled = this.isDateDisabled(this.currentDate);
        e.preventDefault();
    };
    DateRangePicker.prototype.inputHandler = function (e) {
        switch (e.action) {
            case 'altDownArrow':
                if (!this.isPopupOpen()) {
                    if (this.inputElement.value === '') {
                        this.clear();
                        this.changeTrigger(e);
                        this.clearRange();
                    }
                    this.show(null, e);
                    this.isRangeIconClicked = false;
                    if (!this.isMobile) {
                        if (!isNullOrUndefined(this.leftCalendar)) {
                            this.calendarFocus();
                        }
                    }
                    this.isKeyPopup = true;
                }
                break;
            case 'escape':
                if (this.isPopupOpen()) {
                    this.hide(e);
                }
                break;
            case 'enter':
                if (document.activeElement === this.inputElement) {
                    this.inputBlurHandler(e);
                    this.hide(e);
                }
                break;
            case 'tab':
                if (document.activeElement === this.inputElement && this.isPopupOpen()) {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    };
    DateRangePicker.prototype.bindCalendarCellEvents = function (calendar) {
        var tdCells;
        if (calendar) {
            tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
        }
        else {
            tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
        }
        for (var _i = 0, tdCells_1 = tdCells; _i < tdCells_1.length; _i++) {
            var cell = tdCells_1[_i];
            EventHandler.clearEvents(cell);
            var disabledCell = void 0;
            disabledCell = cell.classList.contains(DISABLED) || cell.classList.contains(DATEDISABLED);
            if (!disabledCell && !cell.classList.contains(WEEKNUMBER)) {
                if (!this.isMobile) {
                    EventHandler.add(cell, 'mouseover', this.hoverSelection, this);
                }
                EventHandler.add(cell, 'mousedown', this.selectRange, this);
            }
        }
    };
    DateRangePicker.prototype.removeFocusedDate = function () {
        var isDate = !isNullOrUndefined(this.startValue) || !isNullOrUndefined(this.endValue);
        var focusedDate;
        focusedDate = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' .' + FOCUSDATE);
        if ((this.leftCalendar && this.leftCalendar.querySelector('.e-content').classList.contains('e-month')
            && this.rightCalendar && this.rightCalendar.querySelector('.e-content').classList.contains('e-month')) ||
            this.calendarElement && this.calendarElement.querySelector('.e-content').classList.contains('e-month')) {
            for (var _i = 0, focusedDate_1 = focusedDate; _i < focusedDate_1.length; _i++) {
                var ele = focusedDate_1[_i];
                if (!ele.classList.contains(TODAY) || (ele.classList.contains(TODAY) && (isDate))) {
                    ele.classList.remove(FOCUSDATE);
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(ENDDATE)) {
                        ele.removeAttribute('aria-label');
                    }
                }
            }
        }
    };
    DateRangePicker.prototype.hoverSelection = function (event, element) {
        var currentElement = element || event.currentTarget;
        var currentDate = this.getIdValue(null, currentElement);
        if (!isNullOrUndefined(this.startValue) && +this.startValue >= +this.min && +this.startValue <= +this.max) {
            if ((!this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)
                && isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue))
                || (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue))) {
                var tdCells = void 0;
                tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
                for (var _i = 0, tdCells_2 = tdCells; _i < tdCells_2.length; _i++) {
                    var ele = tdCells_2[_i];
                    var isDisabledCell = (!ele.classList.contains(DISABLED) || ele.classList.contains(DATEDISABLED));
                    if (!ele.classList.contains(WEEKNUMBER) && isDisabledCell) {
                        var eleDate = this.getIdValue(null, ele);
                        var startDateValue = new Date(+this.startValue);
                        var eleDateValue = new Date(+eleDate);
                        if (eleDateValue.setHours(0, 0, 0, 0) >= startDateValue.setHours(0, 0, 0, 0) && +eleDate <= +currentDate) {
                            addClass([ele], RANGEHOVER);
                        }
                        else {
                            removeClass([ele], [RANGEHOVER]);
                        }
                    }
                }
            }
        }
    };
    DateRangePicker.prototype.updateRange = function (elementCollection) {
        if (!isNullOrUndefined(this.startValue)) {
            for (var _i = 0, elementCollection_1 = elementCollection; _i < elementCollection_1.length; _i++) {
                var calendar = elementCollection_1[_i];
                var tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                for (var _a = 0, tdCells_3 = tdCells; _a < tdCells_3.length; _a++) {
                    var ele = tdCells_3[_a];
                    if (!ele.classList.contains(WEEKNUMBER) && !ele.classList.contains(DISABLED)) {
                        var eleDate = this.getIdValue(null, ele);
                        var eleDateValue = this.getIdValue(null, ele);
                        if (!isNullOrUndefined(this.endValue)) {
                            if (this.currentView() === 'Month' &&
                                +eleDateValue.setHours(0, 0, 0, 0) >= +new Date(+this.startValue).setHours(0, 0, 0, 0)
                                && +eleDateValue.setHours(0, 0, 0, 0) <= +new Date(+this.endValue).setHours(0, 0, 0, 0) &&
                                +new Date(+this.startValue).setHours(0, 0, 0, 0) !== +new Date(+this.endValue).setHours(0, 0, 0, 0) &&
                                +new Date(+this.startValue).setHours(0, 0, 0, 0) >= +this.min
                                && +new Date(+this.endValue).setHours(0, 0, 0, 0) <= +this.max
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], RANGEHOVER);
                            }
                        }
                        else {
                            removeClass([ele], [RANGEHOVER]);
                        }
                        if (!ele.classList.contains(OTHERMONTH)) {
                            var startDateValue = new Date(+this.startValue);
                            var eleDateValue_1 = new Date(+eleDate);
                            if (this.currentView() === 'Month' &&
                                +eleDateValue_1.setHours(0, 0, 0, 0) === +startDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue_1.setHours(0, 0, 0, 0) >= +startDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [STARTDATE, SELECTED]);
                                this.addSelectedAttributes(ele, this.startValue, true);
                            }
                            var endDateValue = new Date(+this.endValue);
                            if (this.currentView() === 'Month' &&
                                !isNullOrUndefined(this.endValue) &&
                                +eleDateValue_1.setHours(0, 0, 0, 0) === +endDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue_1.setHours(0, 0, 0, 0) <= +endDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [ENDDATE, SELECTED]);
                                this.addSelectedAttributes(ele, this.startValue, false);
                            }
                            if (+eleDate === +this.startValue && !isNullOrUndefined(this.endValue) && +eleDate === +this.endValue) {
                                this.addSelectedAttributes(ele, this.endValue, false, true);
                            }
                        }
                    }
                }
            }
        }
    };
    DateRangePicker.prototype.checkMinMaxDays = function () {
        if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
            if (!this.isMobile) {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + LEFTCALENDER));
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + RIGHTCALENDER));
            }
            else {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            }
        }
    };
    DateRangePicker.prototype.rangeArgs = function (e) {
        var inputValue;
        var range;
        var startDate = !isNullOrUndefined(this.startValue) ?
            this.globalize.formatDate(this.startValue, { format: this.format, type: 'date', skeleton: 'yMd' }) : null;
        var endDate = !isNullOrUndefined(this.endValue) ?
            this.globalize.formatDate(this.endValue, { format: this.format, type: 'date', skeleton: 'yMd' }) : null;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            inputValue = startDate + ' ' + this.separator + ' ' + endDate;
            range = (Math.round(Math.abs((this.startValue.getTime() - this.endValue.getTime()) / (1000 * 60 * 60 * 24))) + 1);
        }
        else {
            inputValue = '';
            range = 0;
        }
        var args = {
            value: this.value,
            startDate: this.startValue,
            endDate: this.endValue,
            daySpan: range,
            event: e || null,
            element: this.element,
            isInteracted: !isNullOrUndefined(e),
            text: inputValue
        };
        return args;
    };
    DateRangePicker.prototype.otherMonthSelect = function (ele, isStartDate, sameDate) {
        var value = +this.getIdValue(null, ele);
        var dateIdString = '*[id^="/id"]:not(.e-other-month)'.replace('/id', '' + value);
        var tdCell = this.popupObj && this.popupObj.element.querySelector(dateIdString);
        if (!isNullOrUndefined(tdCell)) {
            if (isStartDate) {
                addClass([tdCell], [STARTDATE, SELECTED]);
                this.addSelectedAttributes(tdCell, this.startValue, true);
            }
            else {
                addClass([tdCell], [ENDDATE, SELECTED]);
                this.addSelectedAttributes(tdCell, this.endValue, true);
            }
            if (sameDate) {
                this.addSelectedAttributes(ele, this.endValue, false, true);
            }
        }
    };
    // tslint:disable-next-line:max-func-body-length
    DateRangePicker.prototype.selectRange = function (event, element) {
        var leftCalendar;
        var rightCalendar;
        if (event) {
            event.preventDefault();
        }
        var date;
        date = isNullOrUndefined(event) ? this.getIdValue(null, element)
            : this.getIdValue(event, null);
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            if (!this.isMobile || this.isMobile && !this.endButton.element.classList.contains(ACTIVE)) {
                this.removeSelection();
            }
        }
        else if (this.isMobile && this.startButton.element.classList.contains(ACTIVE)) {
            this.removeSelection();
        }
        var ele = element || event.currentTarget;
        if (isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.previousStartValue)) {
                date.setHours(this.previousStartValue.getHours());
                date.setMinutes(this.previousStartValue.getMinutes());
                date.setSeconds(this.previousStartValue.getSeconds());
            }
            this.startValue = new Date('' + date);
            this.endValue = null;
            this.setValue();
            addClass([ele], STARTDATE);
            this.addSelectedAttributes(ele, this.startValue, true);
            if (ele.classList.contains(OTHERMONTH)) {
                this.otherMonthSelect(ele, true);
            }
            this.checkMinMaxDays();
            this.applyButton.disabled = true;
            this.applyButton.element.disabled = true;
            if (this.isMobile) {
                this.endButton.element.classList.add(ACTIVE);
                this.startButton.element.classList.remove(ACTIVE);
                this.endButton.element.removeAttribute('disabled');
                this.selectableDates();
            }
            this.trigger('select', this.rangeArgs(event));
        }
        else {
            if (+date === +this.startValue || +date > +this.startValue) {
                if (+date === +this.startValue && !isNullOrUndefined(this.minDays) && this.minDays > 1) {
                    return;
                }
                this.endValue = null;
                this.setValue();
                if (this.isMobile || element) {
                    this.hoverSelection(event, element);
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    date.setHours(this.previousEndValue.getHours());
                    date.setMinutes(this.previousEndValue.getMinutes());
                    date.setSeconds(this.previousEndValue.getSeconds());
                }
                this.endValue = new Date('' + date);
                this.setValue();
                var endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                if (this.isMobile) {
                    this.startButton.element.classList.remove(ACTIVE);
                    this.endButton.element.classList.add(ACTIVE);
                    for (var _i = 0, endEle_1 = endEle; _i < endEle_1.length; _i++) {
                        var ele_1 = endEle_1[_i];
                        ele_1.removeAttribute('aria-label');
                        if (!ele_1.classList.contains(STARTDATE)) {
                            ele_1.setAttribute('aria-selected', 'false');
                            removeClass([ele_1], [ENDDATE, SELECTED]);
                        }
                        else {
                            this.addSelectedAttributes(ele_1, this.startValue, true);
                            removeClass([ele_1], [ENDDATE]);
                        }
                    }
                }
                addClass([ele], ENDDATE);
                if (+this.endValue === +this.startValue) {
                    this.addSelectedAttributes(ele, this.endValue, false, true);
                }
                else {
                    this.addSelectedAttributes(ele, this.endValue, false);
                }
                if (ele.classList.contains(OTHERMONTH)) {
                    if (+this.endValue === +this.startValue) {
                        this.otherMonthSelect(ele, false, true);
                    }
                    else {
                        this.otherMonthSelect(ele, false);
                    }
                }
                endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                for (var _a = 0, endEle_2 = endEle; _a < endEle_2.length; _a++) {
                    var ele_2 = endEle_2[_a];
                    if (ele_2.classList.contains(STARTDATE)) {
                        removeClass([ele_2], [RANGEHOVER]);
                    }
                }
                this.applyButton.disabled = false;
                this.applyButton.element.disabled = false;
                if (!this.isMobile) {
                    this.removeClassDisabled();
                }
                this.disabledDateRender();
                this.trigger('select', this.rangeArgs(event));
            }
            else if (+date < +this.startValue) {
                this.removeClassDisabled();
                this.startValue = new Date('' + date);
                this.setValue();
                this.removeSelectedAttributes();
                removeClass(this.popupObj.element.querySelectorAll('.' + STARTDATE), [STARTDATE, SELECTED]);
                addClass([ele], STARTDATE);
                this.addSelectedAttributes(ele, this.startValue, true);
                if (ele.classList.contains(OTHERMONTH)) {
                    this.otherMonthSelect(ele, true);
                }
                this.checkMinMaxDays();
            }
        }
        if (event) {
            leftCalendar = closest(event.target, '.' + LEFTCALENDER);
        }
        if (!isNullOrUndefined(leftCalendar)) {
            this.leftCalendar.children[1].firstElementChild.focus();
        }
        else {
            if (event) {
                rightCalendar = event && closest(event.target, '.' + RIGHTCALENDER);
            }
            if (!isNullOrUndefined(rightCalendar)) {
                this.rightCalendar.children[1].firstElementChild.focus();
            }
        }
        addClass([ele], SELECTED);
        this.updateHeader();
        this.removeFocusedDate();
    };
    DateRangePicker.prototype.selectableDates = function () {
        if (!isNullOrUndefined(this.startValue)) {
            var tdCells = this.calendarElement.querySelectorAll('.' + CALENDAR + ' td');
            var isStartDate = false;
            if (this.currentView() === 'Month') {
                for (var _i = 0, tdCells_4 = tdCells; _i < tdCells_4.length; _i++) {
                    var ele = tdCells_4[_i];
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER)) {
                        if (!ele.classList.contains(DISABLED)) {
                            var eleDate = this.getIdValue(null, ele);
                            if (+eleDate < +this.startValue) {
                                addClass([ele], [DATEDISABLED, DISABLED, OVERLAY]);
                                EventHandler.clearEvents(ele);
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if (ele.classList.contains(STARTDATE) && !ele.classList.contains(OTHERMONTH)) {
                        isStartDate = true;
                        break;
                    }
                }
                if (isStartDate) {
                    if (!this.previousIcon.classList.contains(DISABLED)) {
                        addClass([this.previousIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                    }
                }
            }
            else {
                for (var _a = 0, tdCells_5 = tdCells; _a < tdCells_5.length; _a++) {
                    var ele = tdCells_5[_a];
                    var startMonth = this.startValue.getMonth();
                    var startYear = this.startValue.getFullYear();
                    var element = this.getIdValue(null, ele);
                    if (!this.startButton.element.classList.contains(ACTIVE) && ((this.currentView() === 'Year' &&
                        (element.getMonth() < startMonth) && (element.getFullYear() <= startYear))
                        || (this.currentView() === 'Decade' && (element.getMonth() <= startMonth) &&
                            (element.getFullYear() < startYear)))) {
                        addClass([ele], [DISABLED]);
                    }
                    else {
                        break;
                    }
                }
                if (tdCells[0].classList.contains(DISABLED)) {
                    this.previousIconHandler(true);
                }
                else if (tdCells[tdCells.length - 1].classList.contains(DISABLED)) {
                    this.nextIconHandler(true);
                }
            }
        }
    };
    DateRangePicker.prototype.updateMinMaxDays = function (calendar) {
        if (!isNullOrUndefined(this.startValue) && (isNullOrUndefined(this.endValue) || this.isMobile)) {
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
                var minDate = new Date(new Date(+this.startValue).setDate(this.startValue.getDate() + (this.minDays - 1)));
                var maxDate = new Date(new Date(+this.startValue).setDate(this.startValue.getDate() + (this.maxDays - 1)));
                minDate = (!isNullOrUndefined(this.minDays) && this.minDays > 0) ? minDate : null;
                maxDate = (!isNullOrUndefined(this.maxDays) && this.maxDays > 0) ? maxDate : null;
                var tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                var maxEle = void 0;
                for (var _i = 0, tdCells_6 = tdCells; _i < tdCells_6.length; _i++) {
                    var ele = tdCells_6[_i];
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER)) {
                        var eleDate = this.getIdValue(null, ele);
                        if (!isNullOrUndefined(minDate) && +eleDate === +minDate && ele.classList.contains(DISABLED)) {
                            minDate.setDate(minDate.getDate() + 1);
                        }
                        if (!ele.classList.contains(DISABLED)) {
                            if (+eleDate <= +this.startValue) {
                                continue;
                            }
                            if (!isNullOrUndefined(minDate) && +eleDate < +minDate) {
                                addClass([ele], [DATEDISABLED, DISABLED, OVERLAY]);
                                EventHandler.clearEvents(ele);
                            }
                            if (!isNullOrUndefined(maxDate) && +eleDate > +maxDate) {
                                addClass([ele], [DATEDISABLED, DISABLED, OVERLAY]);
                                this.isMaxDaysClicked = true;
                                EventHandler.clearEvents(ele);
                                if (isNullOrUndefined(maxEle) && !ele.classList.contains(OTHERMONTH)) {
                                    maxEle = ele;
                                }
                            }
                        }
                    }
                }
                if (!isNullOrUndefined(maxEle)) {
                    if (this.isMobile) {
                        if (!this.nextIcon.classList.contains(DISABLED)) {
                            addClass([this.nextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                        }
                    }
                    else {
                        var calendar_1 = closest(maxEle, '.' + RIGHTCALENDER);
                        calendar_1 = isNullOrUndefined(calendar_1) ? this.leftCalendar : calendar_1;
                        var isLeftCalendar = calendar_1.classList.contains(LEFTCALENDER);
                        if (!isLeftCalendar) {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                            }
                        }
                        else {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                            }
                            if (!this.leftCalNextIcon.classList.contains(DISABLED)) {
                                addClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                            }
                            if (!this.rightCalPrevIcon.classList.contains(DISABLED)) {
                                addClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED, OVERLAY]);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.isMaxDaysClicked = false;
        }
    };
    DateRangePicker.prototype.removeClassDisabled = function () {
        var tdCells;
        tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td' + '.' + DATEDISABLED);
        for (var _i = 0, tdCells_7 = tdCells; _i < tdCells_7.length; _i++) {
            var ele = tdCells_7[_i];
            if (ele.classList.contains(DATEDISABLED)) {
                removeClass([ele], [DATEDISABLED, DISABLED, OVERLAY]);
                EventHandler.add(ele, 'click', this.selectRange, this);
                if (!this.isMobile) {
                    EventHandler.add(ele, 'mouseover', this.hoverSelection, this);
                }
            }
        }
        if (this.isMobile) {
            if (this.nextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.nextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
            }
            if (this.previousIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.previousIcon], [ICONDISABLED, DISABLED, OVERLAY]);
            }
        }
        else {
            if (this.rightCalNextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
            }
            if (this.rightCalPrevIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED, OVERLAY]);
            }
            if (this.leftCalNextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED, OVERLAY]);
            }
        }
    };
    DateRangePicker.prototype.updateHeader = function () {
        var format = { type: 'date', skeleton: 'yMMMd' };
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            var range = (Math.round(Math.abs((this.startValue.getTime() - this.endValue.getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = range.toString() + ' ' + this.l10n.getConstant('days');
        }
        else {
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
        }
        if (!this.isMobile) {
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            if (!isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.startButton.element.textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
            }
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.endButton.element.textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
            }
        }
        if ((this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue)) ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue))
                    && +this.startValue > +this.endValue))) {
            if (!this.isMobile) {
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
            }
        }
        if (this.popupObj.element.querySelector('#custom_range')) {
            this.popupObj.element.querySelector('#custom_range').textContent =
                this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange') : 'Custom Range';
        }
    };
    DateRangePicker.prototype.removeSelection = function () {
        this.startValue = null;
        this.endValue = null;
        this.setValue();
        this.removeSelectedAttributes();
        if (this.popupObj) {
            if (this.popupObj.element.querySelectorAll('.' + SELECTED).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED), [STARTDATE, ENDDATE, SELECTED]);
            }
            if (this.popupObj.element.querySelectorAll('.' + FOCUSDATE).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + FOCUSDATE), FOCUSDATE);
            }
            if (this.popupObj.element.querySelectorAll('.' + RANGEHOVER).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + RANGEHOVER), [RANGEHOVER]);
            }
        }
    };
    DateRangePicker.prototype.addSelectedAttributes = function (ele, date, isStartDate, sameDate) {
        if (ele) {
            var title = this.globalize.formatDate(date, { type: 'date', skeleton: 'full' });
            if (!isNullOrUndefined(sameDate) && sameDate) {
                ele.setAttribute('aria-label', 'The current start and end date is ' + '' + title);
            }
            else {
                ele.setAttribute('aria-label', 'The current ' + (isStartDate ? 'start' : 'end') + ' date is ' + '' + title);
            }
            ele.setAttribute('aria-selected', 'true');
        }
    };
    DateRangePicker.prototype.removeSelectedAttributes = function () {
        if (this.popupObj) {
            var start = this.popupObj.element.querySelectorAll('.' + STARTDATE);
            for (var _i = 0, start_1 = start; _i < start_1.length; _i++) {
                var ele = start_1[_i];
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
            var end = this.popupObj.element.querySelectorAll('.' + ENDDATE);
            for (var _a = 0, end_1 = end; _a < end_1.length; _a++) {
                var ele = end_1[_a];
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
        }
    };
    DateRangePicker.prototype.updateCalendarElement = function (calendar) {
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.calendarElement = this.leftCalendar;
            this.currentDate = this.leftCalCurrentDate;
            this.previousIcon = this.leftCalPrevIcon;
            this.nextIcon = this.leftCalNextIcon;
        }
        else {
            this.calendarElement = this.rightCalendar;
            this.currentDate = this.rightCalCurrentDate;
            this.previousIcon = this.rightCalPrevIcon;
            this.nextIcon = this.rightCalNextIcon;
        }
        this.contentElement = calendar.querySelector('.' + CONTENT);
        this.tableBodyElement = select('.' + CONTENT + ' tbody', calendar);
        this.table = calendar.querySelector('.' + CONTENT).getElementsByTagName('table')[0];
        this.headerTitleElement = calendar.querySelector('.' + HEADER + ' .' + TITLE);
        this.headerElement = calendar.querySelector('.' + HEADER);
    };
    DateRangePicker.prototype.navPrevMonth = function (e) {
        e.preventDefault();
        var ele = closest(e.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(e.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigatePrevious(e);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    };
    DateRangePicker.prototype.deviceNavigation = function (ele) {
        this.deviceCalendarEvent();
        this.updateRange([this.popupObj.element.querySelector('.' + CALENDAR)]);
        if ((!isNullOrUndefined(this.endValue) && this.endButton.element.classList.contains(ACTIVE))) {
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
        }
        if (this.endButton.element.classList.contains(ACTIVE)) {
            this.selectableDates();
        }
        if (this.currentView() === 'Month') {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
    };
    DateRangePicker.prototype.updateControl = function (calendar) {
        if (calendar.classList.contains(RIGHTCALENDER)) {
            this.rightCalCurrentDate = new Date(+this.currentDate);
        }
        else {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        this.updateNavIcons();
        this.calendarIconEvent();
        if ((this.leftCalendar.querySelector('.e-content').classList.contains('e-month')
            && this.rightCalendar.querySelector('.e-content').classList.contains('e-month'))
            || this.isMobile) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
        this.updateRange([calendar]);
    };
    DateRangePicker.prototype.navNextMonth = function (event) {
        event.preventDefault();
        var ele = closest(event.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(event.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigateNext(event);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    };
    DateRangePicker.prototype.compareMonths = function (start, end) {
        var result;
        if (start.getFullYear() === end.getFullYear() &&
            (this.currentView() === 'Year' || this.currentView() === 'Decade')) {
            result = -1;
        }
        else if (start.getFullYear() > end.getFullYear()) {
            result = -1;
        }
        else if (start.getFullYear() < end.getFullYear()) {
            if (start.getFullYear() + 1 === end.getFullYear() && start.getMonth() === 11 && end.getMonth() === 0) {
                result = -1;
            }
            else {
                result = 1;
            }
        }
        else {
            result = start.getMonth() === end.getMonth() ? 0 : start.getMonth() + 1 === end.getMonth() ? -1 : 1;
        }
        return result;
    };
    DateRangePicker.prototype.isPopupOpen = function () {
        if (!isNullOrUndefined(this.popupObj) && this.popupObj.element.classList.contains(POPUP)) {
            return true;
        }
        return false;
    };
    DateRangePicker.prototype.createRangeHeader = function () {
        var labelContainer = this.createElement('div', { className: STARTENDCONTAINER });
        if (!this.isMobile) {
            var startLabel = this.createElement('a', { className: STARTLABEL });
            var endLabel = this.createElement('a', { className: ENDLABEL });
            var changeIcon = this.createElement('span', { className: CHANGEICON });
            attributes(startLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'Start Date', 'role': 'button' });
            attributes(endLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'End Date', 'role': 'button' });
            labelContainer.appendChild(startLabel);
            labelContainer.appendChild(changeIcon);
            labelContainer.appendChild(endLabel);
            startLabel.textContent = this.l10n.getConstant('startLabel');
            endLabel.textContent = this.l10n.getConstant('endLabel');
        }
        else {
            var endBtn = this.createElement('button', { className: ENDBUTTON });
            var startBtn = this.createElement('button', { className: STARTBUTTON });
            this.startButton = new Button({ content: this.l10n.getConstant('startLabel') }, startBtn);
            this.endButton = new Button({ content: this.l10n.getConstant('endLabel') }, endBtn);
            labelContainer.appendChild(startBtn);
            labelContainer.appendChild(endBtn);
        }
        return labelContainer;
    };
    DateRangePicker.prototype.disableInput = function () {
        if (this.strictMode) {
            if (!isNullOrUndefined(this.previousStartValue) && !isNullOrUndefined(this.previousEndValue)) {
                this.startValue = this.previousStartValue;
                this.endValue = this.previousEndValue;
                this.setValue();
                this.updateInput();
            }
        }
        else {
            this.updateInput();
            this.clearRange();
            this.setProperties({ startDate: null }, true);
            this.setProperties({ endDate: null }, true);
            this.startValue = null;
            this.endValue = null;
            this.setValue();
            this.errorClass();
        }
        this.setProperties({ enabled: false }, true);
        Input.setEnabled(this.enabled, this.inputElement);
        this.bindEvents();
    };
    DateRangePicker.prototype.validateMinMax = function () {
        this.min = isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (!(this.min <= this.max)) {
            this.disableInput();
            return;
        }
        if (!isNullOrUndefined(this.minDays) && !isNullOrUndefined(this.maxDays)) {
            if (this.maxDays > 0 && this.minDays > 0 && (this.minDays > this.maxDays)) {
                this.maxDays = null;
            }
        }
        if (!isNullOrUndefined(this.minDays) && this.minDays < 0) {
            this.minDays = null;
        }
        if (!isNullOrUndefined(this.maxDays) && this.maxDays < 0) {
            this.maxDays = null;
        }
    };
    DateRangePicker.prototype.validateRangeStrict = function () {
        if (!isNullOrUndefined(this.startValue)) {
            if (+this.startValue <= +this.min) {
                this.startValue = this.min;
                this.setValue();
            }
            else if (+this.startValue >= +this.min && +this.startValue >= +this.max) {
                this.startValue = this.max;
            }
        }
        if (!isNullOrUndefined(this.endValue)) {
            if (+this.endValue > +this.max) {
                this.endValue = this.max;
                this.setValue();
            }
            else if (+this.endValue < +this.min) {
                this.endValue = this.min;
                this.setValue();
            }
        }
        this.validateMinMaxDays();
    };
    DateRangePicker.prototype.validateRange = function () {
        this.validateMinMaxDays();
    };
    DateRangePicker.prototype.validateMinMaxDays = function () {
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            var range = (Math.round(Math.abs((this.startValue.getTime() - this.endValue.getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) && !(range >= this.minDays)) {
                if (this.strictMode) {
                    var date = new Date(+this.startValue);
                    date.setDate(date.getDate() + (this.minDays - 1));
                    if (+date > +this.max) {
                        this.endValue = this.max;
                        this.setValue();
                    }
                    else {
                        this.endValue = date;
                        this.setValue();
                    }
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
            if ((!isNullOrUndefined(this.maxDays) && this.maxDays > 0) && !(range <= this.maxDays)) {
                if (this.strictMode) {
                    this.endValue = new Date(+this.startValue);
                    this.endValue.setDate(this.endValue.getDate() + (this.maxDays - 1));
                    this.setValue();
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
        }
    };
    DateRangePicker.prototype.renderCalendar = function () {
        this.calendarElement = this.createElement('div');
        this.calendarElement.classList.add(CALENDAR);
        if (this.enableRtl) {
            this.calendarElement.classList.add(RTL);
        }
        attributes(this.calendarElement, { 'role': 'calendar' });
        _super.prototype.createHeader.call(this);
        _super.prototype.createContent.call(this);
    };
    DateRangePicker.prototype.isSameMonth = function (start, end) {
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return true;
        }
        return false;
    };
    DateRangePicker.prototype.startMonthCurrentDate = function () {
        if (this.isSameMonth(this.min, this.max) || +this.currentDate > +this.max || this.isSameMonth(this.currentDate, this.max)) {
            this.currentDate = new Date(+this.max);
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        }
        else if (this.currentDate < this.min) {
            this.currentDate = new Date('' + this.min);
        }
    };
    DateRangePicker.prototype.selectNextMonth = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameMonth(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            return;
        }
        if ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        }
    };
    DateRangePicker.prototype.selectStartMonth = function () {
        if (!isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.max) && this.isSameMonth(this.startValue, this.max)) {
                this.currentDate = new Date(+this.max);
                this.currentDate.setDate(1);
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            }
            else if (!(this.startValue >= this.min && this.startValue <= this.max)
                || this.isDateDisabled(this.startValue)) {
                this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            }
            else {
                this.currentDate = new Date(+this.startValue);
            }
        }
        else {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.startMonthCurrentDate();
        }
        if ((!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
        this.startMonthCurrentDate();
    };
    DateRangePicker.prototype.createCalendar = function () {
        var calendarContainer = this.createElement('div', { className: CALENDARCONTAINER });
        if (!this.isMobile) {
            this.selectStartMonth();
            this.renderCalendar();
            this.leftCalCurrentDate = new Date(+this.currentDate);
            this.calendarElement.classList.add(LEFTCALENDER);
            this.leftCalPrevIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + PREVICON);
            this.leftCalNextIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + NEXTICON);
            this.leftTitle = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + TITLE);
            remove(this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + ICONCONTAINER));
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER).appendChild(this.leftCalNextIcon);
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER).appendChild(this.leftCalPrevIcon);
            prepend([this.leftCalPrevIcon], this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER));
            this.leftCalendar = this.calendarElement;
            var leftContainer = this.createElement('div', { className: LEFTCONTAINER });
            var rightContainer = this.createElement('div', { className: RIGHTCONTAINER });
            leftContainer.appendChild(this.leftCalendar);
            calendarContainer.appendChild(leftContainer);
            if (!this.isMobile) {
                EventHandler.add(this.leftTitle, 'click', this.leftNavTitle, this);
            }
            this.selectNextMonth();
            this.renderCalendar();
            this.rightCalCurrentDate = new Date(+this.currentDate);
            addClass([this.calendarElement], RIGHTCALENDER);
            this.rightCalendar = this.calendarElement;
            removeClass([this.leftCalendar && this.leftCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            removeClass([this.rightCalendar && this.rightCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            this.rightCalPrevIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + PREVICON);
            this.rightCalNextIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + NEXTICON);
            this.rightTitle = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + TITLE);
            remove(this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + ICONCONTAINER));
            this.calendarElement.querySelector('table').setAttribute('tabindex', '-1');
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER).appendChild(this.rightCalNextIcon);
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER).appendChild(this.rightCalPrevIcon);
            prepend([this.rightCalPrevIcon], this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER));
            rightContainer.appendChild(this.rightCalendar);
            calendarContainer.appendChild(rightContainer);
            if (!this.isMobile) {
                EventHandler.add(this.rightTitle, 'click', this.rightNavTitle, this);
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.currentDate = new Date(+this.startValue);
            }
            _super.prototype.validateDate.call(this);
            _super.prototype.minMaxUpdate.call(this);
            _super.prototype.render.call(this);
            var prevIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + PREVICON);
            var nextIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + NEXTICON);
            remove(this.calendarElement.querySelector('.' + CALENDAR + ' .' + ICONCONTAINER));
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER).appendChild(nextIcon);
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER).appendChild(prevIcon);
            prepend([prevIcon], this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER));
            this.deviceCalendar = this.calendarElement;
            calendarContainer.appendChild(this.calendarElement);
            this.headerTitleElement = this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER + ' .' + TITLE);
        }
        return calendarContainer;
    };
    DateRangePicker.prototype.leftNavTitle = function (e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.leftCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    };
    DateRangePicker.prototype.calendarNavigation = function (e, element) {
        this.table = element.querySelector('table');
        this.headerTitleElement = element.querySelector('.e-title');
        this.tableBodyElement = element.querySelector('tbody');
        this.tableHeadElement = element.querySelector('thead');
        this.contentElement = element.querySelector('.e-content');
        this.updateCalendarElement(element);
        _super.prototype.navigateTitle.call(this, e);
        this.updateNavIcons();
    };
    DateRangePicker.prototype.rightNavTitle = function (e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.rightCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    };
    DateRangePicker.prototype.clickEventEmitter = function (e) {
        if (!this.isMobile) {
            if (closest(e.target, '.e-calendar.e-left-calendar')) {
                this.calendarElement = this.leftCalendar;
                this.updateCalendarElement(this.leftCalendar);
            }
            else {
                this.calendarElement = this.rightCalendar;
                this.updateCalendarElement(this.rightCalendar);
            }
        }
    };
    /**
     * Gets the current view of the Calendar.
     * @returns string
     * @private
     * @hidden
     */
    DateRangePicker.prototype.currentView = function () {
        return _super.prototype.currentView.call(this);
    };
    DateRangePicker.prototype.navigatedEvent = function (e) {
        var element;
        if (this.isMobile && this.currentView() === 'Month') {
            this.bindCalendarCellEvents();
            this.deviceNavigation();
            this.removeFocusedDate();
        }
        else if (this.isMobile && (this.currentView() === 'Decade' || this.currentView() === 'Year')) {
            this.selectableDates();
        }
        else {
            if (!this.isMobile && this.currentView() === 'Month') {
                element = this.calendarElement.classList.contains('e-left-calendar') ? this.leftCalendar : this.rightCalendar;
                if (element === this.leftCalendar && ((e && !e.currentTarget.children[0].classList.contains('e-icons'))
                    || (!isNullOrUndefined(this.controlDown)))) {
                    this.leftCalCurrentDate = new Date(+this.currentDate);
                    this.rightCalCurrentDate = new Date(new Date(+this.currentDate).setMonth(new Date(+this.currentDate).getMonth() + 1));
                    this.currentDate = this.leftCalCurrentDate;
                    this.updateCalendarElement(this.leftCalendar);
                    this.updateControl(this.leftCalendar);
                    this.updateCalendarElement(this.rightCalendar);
                    this.navigateTo('Month', this.rightCalCurrentDate);
                    this.updateControl(this.rightCalendar);
                    this.updateNavIcons();
                    this.calendarIconEvent();
                    this.calendarIconRipple();
                }
                else if (e && !e.currentTarget.children[0].classList.contains('e-icons')
                    || (!isNullOrUndefined(this.controlDown))) {
                    this.rightCalCurrentDate = new Date(+this.currentDate);
                    this.leftCalCurrentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
                    this.currentDate = this.rightCalCurrentDate;
                    this.updateCalendarElement(this.rightCalendar);
                    this.updateControl(this.rightCalendar);
                    this.updateCalendarElement(this.leftCalendar);
                    if (this.startValue && (this.startValue.getMonth() < this.rightCalCurrentDate.getMonth() &&
                        this.startValue.getFullYear() <= this.rightCalCurrentDate.getFullYear())) {
                        if (isNullOrUndefined(this.endValue)) {
                            this.effect = '';
                            this.navigateTo('Month', new Date(+this.startValue));
                        }
                        else {
                            this.navigateTo('Month', this.leftCalCurrentDate);
                        }
                    }
                    else {
                        this.navigateTo('Month', this.leftCalCurrentDate);
                    }
                    this.updateControl(this.leftCalendar);
                    this.updateNavIcons();
                    this.calendarIconEvent();
                    this.calendarIconRipple();
                }
            }
            else if (!this.isMobile && (this.currentView() === 'Decade' || this.currentView() === 'Year')) {
                this.updateNavIcons();
                this.calendarIconEvent();
            }
        }
    };
    DateRangePicker.prototype.createControl = function () {
        var controlContainer = this.createElement('div', { className: RANGECONTAINER });
        var headerContainer = this.createElement('div', { className: RANGEHEADER });
        var labelContainer = this.createRangeHeader();
        headerContainer.appendChild(labelContainer);
        var daySpan = this.createElement('div', { className: DAYSPAN });
        attributes(daySpan, { 'aria-label': 'Selected Days' });
        daySpan.textContent = this.l10n.getConstant('selectedDays');
        headerContainer.appendChild(daySpan);
        var separator = this.createElement('div', { className: SEPARATOR });
        var calendarContainer = this.createCalendar();
        controlContainer.appendChild(headerContainer);
        controlContainer.appendChild(separator);
        controlContainer.appendChild(calendarContainer);
        var footerSection = this.createElement('div', { className: FOOTER });
        var cancelBtn = this.createElement('button', { className: CANCEL + ' ' + FLAT + ' ' + CSS });
        var applyBtn = this.createElement('button');
        addClass([applyBtn], [APPLY, FLAT, PRIMARY, CSS]);
        footerSection.appendChild(applyBtn);
        footerSection.appendChild(cancelBtn);
        var enable = !isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue);
        this.cancelButton = new Button({ content: this.l10n.getConstant('cancelText') }, cancelBtn);
        this.applyButton = new Button({ content: this.l10n.getConstant('applyText'), disabled: !enable }, applyBtn);
        EventHandler.add(applyBtn, 'click', this.applyFunction, this);
        EventHandler.add(cancelBtn, 'click', this.cancelFunction, this);
        this.popupWrapper.appendChild(controlContainer);
        if (!this.isMobile) {
            if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
                this.createPresets();
                this.listRippleEffect();
                addClass([controlContainer], RANGEBORDER);
                addClass([this.popupWrapper], 'e-preset-wrapper');
                var presets = this.popupWrapper.querySelector('.' + PRESETS);
                presets.style.height = this.popupWrapper.querySelector('.' + RANGECONTAINER).getBoundingClientRect().height + 'px';
            }
        }
        this.popupWrapper.appendChild(footerSection);
        if (this.isMobile) {
            this.deviceHeaderUpdate();
        }
        this.renderPopup();
    };
    DateRangePicker.prototype.cancelFunction = function (eve) {
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
        eve.preventDefault();
        if (this.isKeyPopup) {
            this.inputElement.focus();
            this.isKeyPopup = false;
        }
        this.startValue = null;
        this.endValue = null;
        this.removeSelection();
        this.hide(eve);
    };
    DateRangePicker.prototype.deviceHeaderUpdate = function () {
        if (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.endButton.element.setAttribute('disabled', '');
            this.startButton.element.classList.add(ACTIVE);
        }
        else if (!isNullOrUndefined(this.startValue)) {
            this.startButton.element.classList.add(ACTIVE);
        }
    };
    DateRangePicker.prototype.applyFunction = function (eve) {
        eve.preventDefault();
        if (this.closeEventArgs && this.closeEventArgs.cancel) {
            this.startValue = this.popupWrapper.querySelector('.e-start-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-start-date'));
            this.endValue = this.popupWrapper.querySelector('.e-end-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-end-date'));
            this.setValue();
        }
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
        if (eve.type !== 'touchstart' &&
            this.closeEventArgs && !this.closeEventArgs.cancel) {
            eve.preventDefault();
        }
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
            this.previousEleValue = this.inputElement.value;
            Input.setValue(this.rangeArgs(eve).text, this.inputElement, this.floatLabelType, this.showClearButton);
            this.changeTrigger(eve);
            this.hide(eve ? eve : null);
            this.errorClass();
        }
        else {
            this.hide(eve ? eve : null);
        }
        if (!this.isMobile) {
            this.isKeyPopup = false;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.children[1].focus();
                this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
                    eventName: 'keydown',
                    keyAction: this.popupKeyActionHandle.bind(this),
                    keyConfigs: this.keyInputConfigs
                });
            }
        }
    };
    DateRangePicker.prototype.onMouseClick = function (event, item) {
        if (event.type === 'touchstart') {
            return;
        }
        var target = item || event.target;
        var li = closest(target, '.' + LISTCLASS);
        var isClick = li && li.classList.contains(ACTIVE);
        if (li && li.classList.contains(LISTCLASS)) {
            this.setListSelection(li, event);
        }
        this.inputElement.focus();
        if (!this.isMobile) {
            this.preventFocus = true;
            if (li && li.classList.contains(LISTCLASS) && li.getAttribute('id') === 'custom_range') {
                this.leftCalendar.children[1].firstElementChild.focus();
            }
            else {
                if (!isClick && event.type === 'keydown') {
                    this.inputElement.focus();
                }
            }
        }
    };
    DateRangePicker.prototype.onMouseOver = function (event) {
        var li = closest(event.target, '.' + LISTCLASS);
        if (li && li.classList.contains(LISTCLASS) && !li.classList.contains(HOVER)) {
            addClass([li], HOVER);
        }
    };
    DateRangePicker.prototype.onMouseLeave = function (event) {
        var item = closest(event.target, '.' + HOVER);
        if (!isNullOrUndefined(item)) {
            removeClass([item], HOVER);
        }
    };
    DateRangePicker.prototype.setListSelection = function (li, event) {
        if (li && (!li.classList.contains(ACTIVE) || (this.isMobile && li.classList.contains(ACTIVE)))) {
            if (this.isMobile && li.classList.contains(ACTIVE)) {
                this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
                var values_1 = this.presetsItem[this.activeIndex];
                if (values_1.id === 'custom_range') {
                    this.renderCustomPopup();
                    return;
                }
                return;
            }
            this.removeListSelection();
            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
            addClass([li], ACTIVE);
            li.setAttribute('aria-selected', 'true');
            var values = this.presetsItem[this.activeIndex];
            if (values.id === 'custom_range') {
                this.renderCustomPopup();
            }
            else {
                this.applyPresetRange(values);
            }
        }
    };
    DateRangePicker.prototype.removeListSelection = function () {
        var item = this.presetElement.querySelector('.' + ACTIVE);
        if (!isNullOrUndefined(item)) {
            removeClass([item], ACTIVE);
            item.removeAttribute('aria-selected');
        }
    };
    DateRangePicker.prototype.setValue = function () {
        this.modelValue = [this.startValue, this.endValue];
    };
    DateRangePicker.prototype.applyPresetRange = function (values) {
        this.hide(null);
        this.presetsItem[this.presetsItem.length - 1].start = null;
        this.presetsItem[this.presetsItem.length - 1].end = null;
        this.startValue = values.start;
        this.endValue = values.end;
        this.setValue();
        this.refreshControl();
        this.trigger('select', this.rangeArgs(null));
        this.changeTrigger();
        this.previousEleValue = this.inputElement.value;
        this.isCustomRange = false;
        this.leftCalendar = this.rightCalendar = null;
        if (this.isKeyPopup) {
            this.isRangeIconClicked = false;
            this.inputElement.focus();
        }
    };
    DateRangePicker.prototype.showPopup = function (element, event) {
        this.presetHeight();
        if (this.zIndex === 1000) {
            this.popupObj.show(null, this.element);
        }
        else {
            this.popupObj.show(null, null);
        }
        if (this.isMobile) {
            this.popupObj.refreshPosition();
        }
    };
    DateRangePicker.prototype.renderCustomPopup = function () {
        this.isCustomWindow = true;
        this.popupObj.hide();
        this.popupWrapper = this.createElement('div', { id: this.element.id + '_popup', className: ROOT + ' ' + POPUP });
        this.renderControl();
        this.openEventArgs.appendTo.appendChild(this.popupWrapper);
        this.showPopup();
        this.isCustomRange = true;
        if (!this.isMobile) {
            this.calendarFocus();
        }
    };
    DateRangePicker.prototype.listRippleEffect = function () {
        for (var _i = 0, _a = this.liCollections; _i < _a.length; _i++) {
            var li = _a[_i];
            rippleEffect(li);
        }
    };
    DateRangePicker.prototype.createPresets = function () {
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            this.presetElement = this.createElement('div', { className: PRESETS, attrs: { 'tabindex': '0' } });
            var listTag = ListBase.createList(this.createElement, this.presetsItem, null, true);
            attributes(listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options' });
            this.presetElement.appendChild(listTag);
            this.popupWrapper.appendChild(this.presetElement);
            var customElement = this.presetElement.querySelector('#custom_range');
            if (!isNullOrUndefined(customElement)) {
                customElement.textContent = this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange')
                    : 'Custom Range';
            }
            this.liCollections = this.presetElement.querySelectorAll('.' + LISTCLASS);
            this.wireListEvents();
            if (this.isMobile) {
                this.presetElement.style.width = this.inputWrapper.container.getBoundingClientRect().width + 'px';
            }
            if (!isNullOrUndefined(this.activeIndex) && this.activeIndex > -1) {
                addClass([this.liCollections[this.activeIndex]], ACTIVE);
            }
        }
    };
    DateRangePicker.prototype.wireListEvents = function () {
        EventHandler.add(this.presetElement, 'click', this.onMouseClick, this);
        if (!this.isMobile) {
            EventHandler.add(this.presetElement, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.presetElement, 'mouseout', this.onMouseLeave, this);
        }
    };
    DateRangePicker.prototype.unWireListEvents = function () {
        if (!isNullOrUndefined(this.presetElement)) {
            EventHandler.remove(this.presetElement, 'click touchstart', this.onMouseClick);
            if (!this.isMobile) {
                EventHandler.remove(this.presetElement, 'mouseover', this.onMouseOver);
                EventHandler.remove(this.presetElement, 'mouseout', this.onMouseLeave);
            }
        }
    };
    // tslint:disable-next-line:max-func-body-length
    DateRangePicker.prototype.renderPopup = function () {
        var _this = this;
        this.popupWrapper.classList.add('e-control');
        var popupWidth = this.popupWrapper.getBoundingClientRect().width;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass.trim() !== '') {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (this.isMobile && this.isCustomWindow) {
            this.modal = this.createElement('div');
            document.body.appendChild(this.modal);
        }
        this.popupObj = new Popup(this.popupWrapper, {
            relateTo: this.isMobile && this.isCustomWindow ? document.body :
                (!isNullOrUndefined(this.targetElement) ? this.targetElement : this.inputWrapper.container),
            position: (this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'left', Y: 'bottom' } : { X: 'center', Y: 'center' }) :
                this.enableRtl ? { X: 'left', Y: 'bottom' } : { X: 'right', Y: 'bottom' }),
            offsetX: this.isMobile || this.enableRtl ? 0 : -popupWidth,
            offsetY: OFFSETVALUE,
            collision: this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'fit' } : { X: 'fit', Y: 'fit' }) : { X: 'fit', Y: 'flip' },
            targetType: this.isMobile && this.isCustomWindow ? 'container' : 'relative',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            open: function () {
                attributes(_this.inputElement, { 'aria-expanded': 'true' });
                addClass([_this.inputWrapper.buttons[0]], ACTIVE);
                if (!_this.isMobile) {
                    if (_this.cancelButton) {
                        _this.btnKeyboardModule = new KeyboardEvents(_this.cancelButton.element, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { tab: 'tab', altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        _this.btnKeyboardModule = new KeyboardEvents(_this.applyButton.element, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                    }
                    if (!isNullOrUndefined(_this.leftCalendar)) {
                        if (!_this.isRangeIconClicked) {
                            _this.calendarFocus();
                        }
                    }
                    if (!isNullOrUndefined(_this.presetElement)) {
                        _this.presetKeyboardModule = new KeyboardEvents(_this.presetElement, {
                            eventName: 'keydown',
                            keyAction: _this.presetKeyActionHandler.bind(_this),
                            keyConfigs: _this.presetKeyConfig
                        });
                        _this.presetKeyboardModule = new KeyboardEvents(_this.presetElement, {
                            eventName: 'keydown',
                            keyAction: _this.popupKeyActionHandle.bind(_this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        if (isNullOrUndefined(_this.leftCalendar)) {
                            _this.preventBlur = true;
                            _this.presetElement.focus();
                        }
                        else {
                            _this.presetElement.setAttribute('tabindex', '-1');
                        }
                    }
                    _this.popupKeyBoardHandler();
                }
                if (_this.isMobile && !Browser.isDevice) {
                    EventHandler.add(document, 'keydown', _this.popupCloseHandler, _this);
                }
            },
            close: function () {
                attributes(_this.inputElement, { 'aria-expanded': 'false' });
                removeClass([_this.inputWrapper.buttons[0]], ACTIVE);
                if (_this.isRangeIconClicked) {
                    _this.inputWrapper.container.children[1].focus();
                }
                if (!isUndefined(_this.presets[0].start && _this.presets[0].end && _this.presets[0].label)) {
                    _this.unWireListEvents();
                }
                if (!isNullOrUndefined(_this.popupObj)) {
                    detach(_this.popupObj.element);
                    _this.popupObj.destroy();
                    _this.popupObj = null;
                }
                if (_this.isMobile && !Browser.isDevice) {
                    EventHandler.remove(document, 'keydown', _this.popupCloseHandler);
                }
            }
        });
        if (this.isMobile) {
            this.popupObj.element.classList.add(DEVICE);
            if (!this.isMobile) {
                this.popupObj.element.classList.add('e-bigger');
            }
        }
        if (this.isMobile && this.isCustomWindow) {
            addClass([this.modal], [DEVICE, ROOT, 'e-range-modal']);
            document.body.className += ' ' + OVERFLOW;
            this.modal.style.display = 'block';
        }
        EventHandler.add(document, 'mousedown', this.documentHandler, this);
    };
    DateRangePicker.prototype.popupCloseHandler = function (e) {
        switch (e.keyCode) {
            case 27:
                this.hide(e);
                break;
        }
    };
    DateRangePicker.prototype.calendarFocus = function () {
        var startDate = this.popupObj && this.popupObj.element.querySelector('.' + STARTDATE);
        if (startDate) {
            var ele = closest(startDate, '.' + RIGHTCALENDER);
            ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                ele.children[1].firstElementChild.focus();
            }
            addClass([startDate], FOCUSDATE);
        }
        else {
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                this.leftCalendar.children[1].firstElementChild.focus();
            }
        }
    };
    DateRangePicker.prototype.presetHeight = function () {
        var presets = this.popupObj && this.popupObj.element.querySelector('.' + PRESETS);
        var rangeContainer = this.popupObj && this.popupObj.element.querySelector('.' + RANGECONTAINER);
        if (!isNullOrUndefined(presets) && !isNullOrUndefined(rangeContainer)) {
            presets.style.height = rangeContainer.getBoundingClientRect().height + 'px';
        }
    };
    DateRangePicker.prototype.presetKeyActionHandler = function (e) {
        switch (e.action) {
            case 'moveDown':
                this.listMoveDown(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'moveUp':
                this.listMoveUp(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'enter':
                var hvrItem = this.getHoverLI();
                var actItem = this.getActiveLI();
                if (!isNullOrUndefined(this.leftCalendar) && !isNullOrUndefined(actItem)) {
                    if (isNullOrUndefined(hvrItem) || (!isNullOrUndefined(actItem) && actItem === hvrItem)) {
                        this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(actItem);
                        var values = this.presetsItem[this.activeIndex];
                        if (values.id === 'custom_range') {
                            this.calendarFocus();
                            actItem.classList.remove(HOVER);
                            e.preventDefault();
                            return;
                        }
                    }
                }
                if (!isNullOrUndefined(hvrItem) || !isNullOrUndefined(actItem)) {
                    this.onMouseClick(e, hvrItem || actItem);
                }
                e.preventDefault();
                break;
            case 'tab':
                if (this.leftCalendar) {
                    var item = this.getHoverLI();
                    if (!isNullOrUndefined(item)) {
                        item.classList.remove(HOVER);
                    }
                }
                else {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    };
    DateRangePicker.prototype.listMoveDown = function (e) {
        var hvrItem = this.getHoverLI();
        var actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            var li = hvrItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            var li = actItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
        else {
            addClass([this.liCollections[0]], HOVER);
        }
    };
    DateRangePicker.prototype.listMoveUp = function (e) {
        var hvrItem = this.getHoverLI();
        var actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            var li = hvrItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            var li = actItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
    };
    DateRangePicker.prototype.getHoverLI = function () {
        var item = this.presetElement.querySelector('.' + HOVER);
        return item;
    };
    DateRangePicker.prototype.getActiveLI = function () {
        var item = this.presetElement.querySelector('.' + ACTIVE);
        return item;
    };
    DateRangePicker.prototype.popupKeyBoardHandler = function () {
        this.popupKeyboardModule = new KeyboardEvents(this.popupWrapper, {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: { escape: 'escape' }
        });
        this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: this.keyInputConfigs
        });
    };
    DateRangePicker.prototype.setScrollPosition = function () {
        var listHeight = this.presetElement.getBoundingClientRect().height;
        var hover = this.presetElement.querySelector('.' + HOVER);
        var active = this.presetElement.querySelector('.' + ACTIVE);
        var element = !isNullOrUndefined(hover) ? hover : active;
        if (!isNullOrUndefined(element)) {
            var nextEle = element.nextElementSibling;
            var height = nextEle ? nextEle.offsetTop : element.offsetTop;
            var liHeight = element.getBoundingClientRect().height;
            if ((height + element.offsetTop) > listHeight) {
                this.presetElement.scrollTop = nextEle ? (height - (listHeight / 2 + liHeight / 2)) : height;
            }
            else {
                this.presetElement.scrollTop = 0;
            }
        }
    };
    DateRangePicker.prototype.popupKeyActionHandle = function (e) {
        var presetElement = closest(e.target, '.' + PRESETS);
        switch (e.action) {
            case 'escape':
                if (this.isPopupOpen()) {
                    if (this.isKeyPopup) {
                        this.inputElement.focus();
                        this.isKeyPopup = false;
                    }
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[1].blur();
                }
                break;
            case 'enter':
                if (!this.isPopupOpen()) {
                    this.show(null, e);
                }
                else {
                    this.inputWrapper.container.children[1].focus();
                }
                break;
            case 'tab':
                this.hide(e);
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.cancelButton.element.focus();
                }
                else {
                    if (document.activeElement === this.cancelButton.element && this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else {
                    if (document.activeElement === this.applyButton.element && this.applyButton.element.disabled !== true) {
                        this.cancelButton.element.focus();
                    }
                    else {
                        if (!isNullOrUndefined(this.presetElement) && (document.activeElement === this.cancelButton.element)) {
                            this.presetElement.focus();
                        }
                        else {
                            this.rightCalendar.children[1].firstElementChild.focus();
                        }
                    }
                }
                e.preventDefault();
                break;
        }
    };
    DateRangePicker.prototype.documentHandler = function (e) {
        if (isNullOrUndefined(this.popupObj)) {
            return;
        }
        var target = e.target;
        if (!this.inputWrapper.container.contains(target) ||
            (!isNullOrUndefined(this.popupObj) && !closest(target, this.popupWrapper.id))) {
            if ((e.type === 'touchstart' || e.type === 'mousedown') ||
                this.closeEventArgs && !this.closeEventArgs.cancel) {
                e.preventDefault();
            }
        }
        if ((isNullOrUndefined(this.targetElement) ||
            (!isNullOrUndefined(this.targetElement) && !(target === this.targetElement))) &&
            !(closest(target, '#' + this.popupObj.element.id))
            && !(closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
            && !(closest(target, '.e-daterangepicker.e-popup') && (!target.classList.contains('e-day')))) {
            this.preventBlur = false;
            if (this.isPopupOpen()) {
                this.applyFunction(e);
                if (!this.isMobile) {
                    this.isRangeIconClicked = false;
                }
            }
        }
    };
    DateRangePicker.prototype.createInput = function () {
        this.inputWrapper = Input.createInput({
            floatLabelType: this.floatLabelType,
            element: this.inputElement,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: this.cssClass,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton,
            },
            buttons: [DATERANGEICON]
        }, this.createElement);
        attributes(this.inputElement, {
            'aria-readonly': this.readonly ? 'true' : 'false', 'tabindex': '0', 'aria-haspopup': 'true',
            'aria-activedescendant': 'null', 'aria-owns': this.element.id + '_popup', 'aria-expanded': 'false',
            'role': 'daterangepicker', 'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        });
        Input.addAttributes({ 'aria-label': 'select' }, this.inputWrapper.buttons[0]);
        if (!isNullOrUndefined(this.placeholder) && this.placeholder.trim() !== '') {
            Input.addAttributes({ 'aria-placeholder': this.placeholder }, this.inputElement);
        }
        this.setEleWidth(this.width);
        addClass([this.inputWrapper.container], DATERANGEWRAPPER);
        if (isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            attributes(this.inputElement, { 'name': this.element.id });
        }
        if (this.inputElement.type === 'hidden') {
            this.inputWrapper.container.style.display = 'none';
        }
        this.refreshControl();
        this.previousEleValue = this.inputElement.value;
    };
    DateRangePicker.prototype.setEleWidth = function (width) {
        if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (this.width);
        }
        else if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    };
    DateRangePicker.prototype.refreshControl = function () {
        this.validateMinMax();
        if (this.strictMode) {
            this.validateRangeStrict();
        }
        var isDisabled = this.disabledDates();
        if (this.strictMode && (isDisabled)) {
            this.startValue = this.previousStartValue;
            this.setProperties({ startDate: this.startValue }, true);
            this.endValue = this.previousEndValue;
            this.setProperties({ endDate: this.endValue }, true);
            this.setValue();
        }
        this.updateInput();
        if (!this.strictMode) {
            this.validateRange();
        }
        if (!this.strictMode && (isDisabled)) {
            this.clearRange();
        }
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !isDisabled) {
            this.disabledDateRender();
        }
        this.errorClass();
        this.previousStartValue = isNullOrUndefined(this.startValue) || isNaN(+this.startValue) ? null : new Date(+this.startValue);
        this.previousEndValue = isNullOrUndefined(this.endValue) || isNaN(+this.endValue) ? null : new Date(+this.endValue);
    };
    DateRangePicker.prototype.updateInput = function () {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            var startDate = this.globalize.formatDate(this.startValue, { format: this.format, type: 'date', skeleton: 'yMd' });
            var endDate = this.globalize.formatDate(this.endValue, { format: this.format, type: 'date', skeleton: 'yMd' });
            Input.setValue(startDate + ' ' + this.separator + ' ' + endDate, this.inputElement, this.floatLabelType, this.showClearButton);
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
        }
    };
    DateRangePicker.prototype.isDateDisabled = function (date) {
        if (isNullOrUndefined(date)) {
            return false;
        }
        var value = new Date(+date);
        if (+value < +this.min || +value > +this.max) {
            return true;
        }
        this.virtualRenderCellArgs = {
            date: value,
            isDisabled: false,
        };
        var args = this.virtualRenderCellArgs;
        this.virtualRenderCellEvent(args);
        if (args.isDisabled) {
            return true;
        }
        return false;
    };
    DateRangePicker.prototype.disabledDateRender = function () {
        this.disabledDays = [];
        this.disabledDayCnt = null;
        var localDate = new Date(+this.startValue);
        var count = 0;
        while (+localDate <= +this.endValue) {
            this.virtualRenderCellArgs = {
                date: localDate,
                isDisabled: false,
            };
            var args = this.virtualRenderCellArgs;
            this.virtualRenderCellEvent(args);
            if (args.isDisabled) {
                this.disabledDays.push(new Date(+args.date));
                if (+localDate > +this.startValue && +localDate < +this.endValue) {
                    count++;
                }
            }
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        this.disabledDayCnt = count;
    };
    DateRangePicker.prototype.virtualRenderCellEvent = function (args) {
        extend(this.virtualRenderCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    };
    DateRangePicker.prototype.disabledDates = function () {
        var isStartDisabled = false;
        var isEndDisabled = false;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            isStartDisabled = this.isDateDisabled(this.startValue);
            isEndDisabled = this.isDateDisabled(this.endValue);
            this.currentDate = null;
            this.setValue();
        }
        return (isStartDisabled || isEndDisabled);
    };
    DateRangePicker.prototype.setModelValue = function () {
        if (!this.value && this.startDate === null && this.endDate === null) {
            this.setProperties({ value: null }, true);
        }
        else if (this.value === null || this.value.start === null) {
            if (this.value === null) {
                this.setProperties({ value: [this.startDate, this.endDate] }, true);
            }
            else if (this.value.start === null) {
                this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
            }
        }
        else {
            if ((this.value && this.value.length > 0) ||
                this.valueType && this.valueType.length > 0) {
                if (+this.startDate !== +this.value[0] || +this.endDate !== +this.value[1]) {
                    this.setProperties({ value: [this.startDate, this.endDate] }, true);
                }
                if (this.value && this.value[0] == null && this.value[1] == null) {
                    this.setProperties({ value: null }, true);
                }
            }
            else {
                if ((this.value && this.value.start)) {
                    this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
                }
            }
        }
        this.createHiddenInput();
    };
    /**
     * To dispatch the event manually
     */
    DateRangePicker.prototype.dispatchEvent = function (element, type) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(type, false, true);
        element.dispatchEvent(evt);
        this.firstHiddenChild.dispatchEvent(evt);
    };
    DateRangePicker.prototype.changeTrigger = function (e) {
        if (+this.initStartDate !== +this.startValue || +this.initEndDate !== +this.endValue) {
            this.setProperties({ endDate: this.checkDateValue(this.endValue) }, true);
            this.setProperties({ startDate: this.checkDateValue(this.startValue) }, true);
            this.setModelValue();
            this.trigger('change', this.rangeArgs(e));
        }
        this.previousEleValue = this.inputElement.value;
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void
     * @hidden
     */
    DateRangePicker.prototype.navigateTo = function (view, value) {
        _super.prototype.navigateTo.call(this, view, value);
    };
    /**
     * Sets the focus to widget for interaction.
     * @returns void
     */
    DateRangePicker.prototype.focusIn = function () {
        if (document.activeElement !== this.inputElement && this.enabled) {
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.inputElement.focus();
            var focusArguments = {
                model: this
            };
            this.trigger('focus', focusArguments);
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     * @returns void
     */
    DateRangePicker.prototype.focusOut = function () {
        var isBlur = this.preventBlur;
        if (document.activeElement === this.inputElement) {
            removeClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.preventBlur = false;
            this.inputElement.blur();
            this.preventBlur = isBlur;
        }
    };
    /**
     * To destroy the widget.
     * @returns void
     */
    DateRangePicker.prototype.destroy = function () {
        this.hide(null);
        var ariaAttrs = {
            'aria-readonly': this.readonly ? 'true' : 'false', 'tabindex': '0', 'aria-haspopup': 'true',
            'aria-activedescendant': 'null', 'aria-owns': this.element.id + '_popup', 'aria-expanded': 'false',
            'role': 'daterangepicker', 'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'aria-invalid': 'false', 'spellcheck': 'false'
        };
        if (this.inputElement) {
            removeClass([this.inputElement], [ROOT]);
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            Input.removeAttributes(ariaAttrs, this.inputElement);
            this.ensureInputAttribute();
            this.inputElement.classList.remove('e-input');
            if (!isNullOrUndefined(this.inputWrapper)) {
                EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
                if (this.angularTag === null) {
                    this.inputWrapper.container.parentElement.appendChild(this.inputElement);
                }
                detach(this.inputWrapper.container);
            }
        }
        if (!isNullOrUndefined(this.inputKeyboardModule) && !this.isMobile) {
            this.inputKeyboardModule.destroy();
        }
        if (this.popupObj) {
            if (!this.isMobile) {
                this.clearCalendarEvents();
            }
        }
        _super.prototype.destroy.call(this);
        this.inputWrapper = this.popupWrapper = this.popupObj = this.cloneElement = this.presetElement = null;
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        if ((!isNullOrUndefined(this.firstHiddenChild))
            && (!isNullOrUndefined(this.secondHiddenChild))) {
            detach(this.firstHiddenChild);
            detach(this.secondHiddenChild);
            this.firstHiddenChild = this.secondHiddenChild = null;
            this.inputElement.setAttribute('name', this.element.getAttribute('data-name'));
            this.inputElement.removeAttribute('data-name');
        }
    };
    DateRangePicker.prototype.ensureInputAttribute = function () {
        for (var attr = 0; attr < this.inputElement.attributes.length; attr++) {
            var prop = this.inputElement.attributes[attr].name;
            if (isNullOrUndefined(this.cloneElement.getAttribute(prop))) {
                if (prop.toLowerCase() === 'value' || isNullOrUndefined(this.cloneElement.getAttribute('value'))) {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(prop);
            }
        }
    };
    /**
     * To get component name
     * @returns string
     * @private
     */
    DateRangePicker.prototype.getModuleName = function () {
        return 'daterangepicker';
    };
    /**
     * Return the properties that are maintained upon browser refresh.
     * @returns string
     */
    DateRangePicker.prototype.getPersistData = function () {
        var keyEntity = ['startDate', 'endDate', 'value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Return the selected range and day span in the DateRangePicker.
     * @returns Object
     */
    DateRangePicker.prototype.getSelectedRange = function () {
        var range;
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            range = (Math.round(Math.abs((this.startValue.getTime() - this.endValue.getTime()) / (1000 * 60 * 60 * 24))) + 1);
            this.disabledDateRender();
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
        }
        else {
            range = 0;
        }
        return { startDate: this.startValue, endDate: this.endValue, daySpan: range };
    };
    /**
     * To open the Popup container in the DateRangePicker component.
     * @returns void
     */
    DateRangePicker.prototype.show = function (element, event) {
        if (this.isMobile && this.popupObj) {
            this.popupObj.refreshPosition();
        }
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            if (!this.isPopupOpen()) {
                if (element) {
                    this.targetElement = element;
                }
                this.createPopup();
                this.openEventArgs = {
                    popup: this.popupObj || null,
                    cancel: false,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null,
                    appendTo: document.body
                };
                this.trigger('open', this.openEventArgs);
                if (!this.openEventArgs.cancel) {
                    this.openEventArgs.appendTo.appendChild(this.popupWrapper);
                    this.showPopup(element, event);
                    var isPreset = (!this.isCustomRange || (this.isMobile && this.isCustomRange));
                    if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && isPreset) {
                        this.setScrollPosition();
                    }
                }
            }
        }
    };
    /**
     * To close the Popup container in the DateRangePicker component.
     * @returns void
     */
    DateRangePicker.prototype.hide = function (event) {
        if (this.popupObj) {
            if (isNullOrUndefined(this.previousEndValue) && isNullOrUndefined(this.previousStartValue)) {
                this.clearRange();
            }
            else {
                if (!isNullOrUndefined(this.previousStartValue)) {
                    this.startValue = new Date('' + this.previousStartValue);
                    this.setValue();
                    this.currentDate = new Date('' + this.startValue);
                }
                else {
                    this.startValue = null;
                    this.setValue();
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    this.endValue = new Date('' + this.previousEndValue);
                    this.setValue();
                }
                else {
                    this.endValue = null;
                    this.setValue();
                }
            }
            if (this.isPopupOpen()) {
                this.closeEventArgs = {
                    cancel: false,
                    popup: this.popupObj,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null
                };
                this.trigger('close', this.closeEventArgs);
                if (!this.closeEventArgs.cancel) {
                    if (this.isMobile) {
                        if (!isNullOrUndefined(this.startButton) && !isNullOrUndefined(this.endButton)) {
                            EventHandler.remove(this.startButton.element, 'click touchstart', this.deviceHeaderClick);
                            EventHandler.remove(this.endButton.element, 'click touchstart', this.deviceHeaderClick);
                        }
                    }
                    if (this.popupObj) {
                        this.popupObj.hide();
                        if (this.preventBlur) {
                            this.inputElement.focus();
                            addClass([this.inputWrapper.container], [INPUTFOCUS]);
                        }
                    }
                    if (!this.isMobile) {
                        if (!isNullOrUndefined(this.leftKeyboardModule) && !isNullOrUndefined(this.rightKeyboardModule)) {
                            this.leftKeyboardModule.destroy();
                            this.rightKeyboardModule.destroy();
                        }
                        if (!isNullOrUndefined(this.presetElement)) {
                            this.presetKeyboardModule.destroy();
                        }
                        if (!isNullOrUndefined(this.cancelButton)) {
                            this.btnKeyboardModule.destroy();
                        }
                    }
                    this.targetElement = null;
                    removeClass([document.body], OVERFLOW);
                    EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
                    if (this.isMobile && this.modal) {
                        this.modal.style.display = 'none';
                        this.modal.outerHTML = '';
                        this.modal = null;
                    }
                    this.isKeyPopup = this.dateDisabled = false;
                }
                else {
                    removeClass([this.inputWrapper.buttons[0]], ACTIVE);
                }
            }
        }
        this.updateHiddenInput();
        if (this.isMobile && this.allowEdit && !this.readonly) {
            this.element.removeAttribute('readonly');
        }
    };
    DateRangePicker.prototype.setLocale = function () {
        this.globalize = new Internationalization(this.locale);
        this.l10n.setLocale(this.locale);
        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
        Input.setPlaceholder(this.placeholder, this.inputElement);
        this.updateInput();
        this.changeTrigger();
    };
    DateRangePicker.prototype.refreshChange = function () {
        this.refreshControl();
        this.changeTrigger();
    };
    DateRangePicker.prototype.setDate = function () {
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        this.refreshChange();
    };
    DateRangePicker.prototype.enableInput = function () {
        if (+this.min <= +this.max) {
            this.setProperties({ enabled: true }, true);
            Input.setEnabled(this.enabled, this.inputElement);
            if (this.element.hasAttribute('disabled')) {
                this.bindEvents();
            }
        }
    };
    DateRangePicker.prototype.clearModelvalue = function (newProp, oldProp) {
        this.setProperties({ startDate: null }, true);
        this.setProperties({ endDate: null }, true);
        if (oldProp.value && oldProp.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        else if (oldProp.value && oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        else if (oldProp.value && !oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        this.updateValue();
        this.setDate();
    };
    DateRangePicker.prototype.createHiddenInput = function () {
        if (isNullOrUndefined(this.firstHiddenChild) && isNullOrUndefined(this.secondHiddenChild)) {
            this.firstHiddenChild = this.createElement('input');
            this.secondHiddenChild = this.createElement('input');
        }
        if (!isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            this.inputElement.setAttribute('data-name', this.inputElement.getAttribute('name'));
            this.inputElement.removeAttribute('name');
        }
        attributes(this.firstHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name')
        });
        attributes(this.secondHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name'),
        });
        var format = { type: 'datetime', skeleton: 'yMd' };
        this.firstHiddenChild.value = this.startDate && this.globalize.formatDate(this.startDate, format);
        this.secondHiddenChild.value = this.endDate && this.globalize.formatDate(this.endDate, format);
        this.inputElement.parentElement.appendChild(this.firstHiddenChild);
        this.inputElement.parentElement.appendChild(this.secondHiddenChild);
        this.firstHiddenChild.style.display = 'none';
        this.secondHiddenChild.style.display = 'none';
    };
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    DateRangePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        var format = { format: this.format, type: 'date', skeleton: 'yMd' };
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            this.hide(null);
            switch (prop) {
                case 'width':
                    this.setEleWidth(this.width);
                    break;
                case 'separator':
                    this.previousEleValue = this.inputElement.value;
                    this.setProperties({ separator: newProp.separator }, true);
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    this.setProperties({ placeholder: newProp.placeholder }, true);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    this.inputElement.setAttribute('aria-readonly', '' + this.readonly);
                    break;
                case 'cssClass':
                    if (this.popupWrapper) {
                        this.popupWrapper.className += ' ' + newProp.cssClass;
                    }
                    this.inputWrapper.container.className += ' ' + newProp.cssClass;
                    this.setProperties({ cssClass: newProp.cssClass }, true);
                    break;
                case 'enabled':
                    this.setProperties({ enabled: newProp.enabled }, true);
                    Input.setEnabled(this.enabled, this.inputElement);
                    this.bindEvents();
                    break;
                case 'allowEdit':
                    this.setRangeAllowEdit();
                    break;
                case 'enableRtl':
                    this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    this.setLocale();
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    break;
                case 'startDate':
                    if (typeof newProp.startDate === 'string') {
                        newProp.startDate = this.globalize.parseDate(newProp.startDate, format);
                    }
                    if (+this.initStartDate !== +newProp.startDate) {
                        this.startValue = this.checkDateValue(new Date('' + newProp.startDate));
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'endDate':
                    if (typeof newProp.endDate === 'string') {
                        newProp.endDate = this.globalize.parseDate(newProp.endDate, format);
                    }
                    if (+this.initEndDate !== +newProp.endDate) {
                        this.endValue = this.checkDateValue(new Date('' + newProp.endDate));
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'value':
                    if ((!isNullOrUndefined(newProp.value) && newProp.value.length > 0)
                        || !isNullOrUndefined(newProp.value) && newProp.value.start) {
                        this.valueType = newProp.value;
                        if (newProp.value[0] === null || (newProp.value.start === null)) {
                            if (newProp.value.length === 1 || (newProp.value.start)) {
                                this.clearModelvalue(newProp, oldProp);
                            }
                            else if (newProp.value[1] === null ||
                                (newProp.value.start === null)) {
                                this.clearModelvalue(newProp, oldProp);
                            }
                        }
                        else if ((+this.initStartDate !== +newProp.value[0]
                            || +this.initEndDate !== +newProp.value[1]) ||
                            (+this.initStartDate !== +(newProp.value.start
                                || +this.initEndDate !== +newProp.value.start))) {
                            if (newProp.value.length === 1) {
                                this.modelValue = newProp.value;
                            }
                            else if (newProp.value.start) {
                                this.modelValue = newProp.value;
                            }
                            this.updateValue();
                            this.setDate();
                        }
                    }
                    else {
                        if (isNullOrUndefined(this.value)
                            || newProp.value.start == null) {
                            this.valueType = newProp.value;
                            this.startValue = null;
                            this.endValue = null;
                            this.clearModelvalue(newProp, oldProp);
                        }
                    }
                    break;
                case 'minDays':
                    this.setProperties({ minDays: newProp.minDays }, true);
                    this.refreshChange();
                    break;
                case 'maxDays':
                    this.setProperties({ maxDays: newProp.maxDays }, true);
                    this.refreshChange();
                    break;
                case 'min':
                    this.setProperties({ min: this.checkDateValue(new Date('' + newProp.min)) }, true);
                    this.previousEleValue = this.inputElement.value;
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'max':
                    this.setProperties({ max: this.checkDateValue(new Date('' + newProp.max)) }, true);
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'strictMode':
                    this.setProperties({ strictMode: newProp.strictMode }, true);
                    this.refreshChange();
                    break;
                case 'presets':
                    this.setProperties({ presets: newProp.presets }, true);
                    this.processPresets();
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    break;
            }
        }
    };
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], DateRangePicker.prototype, "enablePersistence", void 0);
    __decorate([
        Property(false)
    ], DateRangePicker.prototype, "enableRtl", void 0);
    __decorate([
        Property(new Date(1900, 0, 1))
    ], DateRangePicker.prototype, "min", void 0);
    __decorate([
        Property(new Date(2099, 11, 31))
    ], DateRangePicker.prototype, "max", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "locale", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Property(false)
    ], DateRangePicker.prototype, "weekNumber", void 0);
    __decorate([
        Property('Gregorian')
    ], DateRangePicker.prototype, "calendarMode", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "created", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "change", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "navigated", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "renderDayCell", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "startDate", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "endDate", void 0);
    __decorate([
        Collection([{}], Presets)
    ], DateRangePicker.prototype, "presets", void 0);
    __decorate([
        Property('')
    ], DateRangePicker.prototype, "width", void 0);
    __decorate([
        Property(1000)
    ], DateRangePicker.prototype, "zIndex", void 0);
    __decorate([
        Property(true)
    ], DateRangePicker.prototype, "showClearButton", void 0);
    __decorate([
        Property(true)
    ], DateRangePicker.prototype, "showTodayButton", void 0);
    __decorate([
        Property('Month')
    ], DateRangePicker.prototype, "start", void 0);
    __decorate([
        Property('Month')
    ], DateRangePicker.prototype, "depth", void 0);
    __decorate([
        Property('')
    ], DateRangePicker.prototype, "cssClass", void 0);
    __decorate([
        Property('-')
    ], DateRangePicker.prototype, "separator", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "minDays", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "maxDays", void 0);
    __decorate([
        Property(false)
    ], DateRangePicker.prototype, "strictMode", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "format", void 0);
    __decorate([
        Property(true)
    ], DateRangePicker.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], DateRangePicker.prototype, "readonly", void 0);
    __decorate([
        Property(true)
    ], DateRangePicker.prototype, "allowEdit", void 0);
    __decorate([
        Property('Never')
    ], DateRangePicker.prototype, "floatLabelType", void 0);
    __decorate([
        Property(null)
    ], DateRangePicker.prototype, "placeholder", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "open", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "close", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "select", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "focus", void 0);
    __decorate([
        Event()
    ], DateRangePicker.prototype, "blur", void 0);
    DateRangePicker = __decorate([
        NotifyPropertyChanges
    ], DateRangePicker);
    return DateRangePicker;
}(CalendarBase));
export { DateRangePicker };
