import { ComponentBase } from '-syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ej-schedule` represents the VueJS Schedule Component.
 * ```vue
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare class ScheduleComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }): void;
    setProperties(prop: any, muteOnChange: boolean): void;
    render(createElement: any): any;
    addEvent(data: Object | Object[]): void;
    addResource(resources: Object, name: string, index: number): void;
    addSelectedClass(cells: Object[], focusCell: Object): void;
    adjustEventWrapper(): void;
    boundaryValidation(pageY: number, pageX: number): Object;
    changeDate(selectedDate: Object, event?: Object): void;
    changeView(view: Object, event?: Object, muteOnChange?: boolean, index?: number): void;
    deleteEvent(id: string | number | undefined | undefined[], currentAction?: Object): void;
    getAllDayRow(): Object;
    getAppointmentTemplate(): Object;
    getCalendarMode(): string;
    getCellDetails(tdCol: Object | Object[]): Object;
    getCellTemplate(): Object;
    getContentTable(): Object;
    getCssProperties(): Object;
    getCurrentViewDates(): undefined;
    getCurrentViewEvents(): undefined;
    getDateFromElement(td: Object): Object;
    getDateHeaderTemplate(): Object;
    getDayNames(type: string): undefined;
    getEditorTemplate(): Object;
    getEventDetails(element: Object): Object;
    getEventTooltipTemplate(): Object;
    getEvents(): undefined;
    getHeaderTooltipTemplate(): Object;
    getIndexOfDate(collection: Object[], date: Object): number;
    getMajorSlotTemplate(): Object;
    getMinorSlotTemplate(): Object;
    getNavigateView(): Object;
    getOccurrencesByID(eventID: number | string): undefined;
    getOccurrencesByRange(startTime: Object, endTime: Object): undefined;
    getQuickInfoTemplatesContent(): Object;
    getQuickInfoTemplatesFooter(): Object;
    getQuickInfoTemplatesHeader(): Object;
    getResourceHeaderTemplate(): Object;
    getResourcesByIndex(index: number): Object;
    getSelectedElements(): undefined;
    getTableRows(): undefined;
    getTimeString(date: Object): string;
    getWorkCellElements(): undefined;
    hideSpinner(): void;
    isAllDayCell(td: Object): boolean;
    isSelectedDate(date: Object): boolean;
    isSlotAvailable(startTime: Object, endTime: Object, groupIndex?: number): boolean;
    openEditor(data: Object, action: Object, isEventData?: boolean, repeatType?: number): void;
    refreshEvents(): void;
    removeNewEventElement(): void;
    removeResource(resourceId: string | number, name: string): void;
    removeSelectedClass(): void;
    renderElements(isLayoutOnly: boolean): void;
    saveEvent(data: undefined | undefined[], currentAction?: Object): void;
    scrollTo(hour: string): void;
    selectCell(element: undefined): void;
    setWorkHours(dates: Object[], start: string, end: string, groupIndex?: number): void;
    showSpinner(): void;
    templateParser(template: string): Object;
}
export declare const SchedulePlugin: {
    name: string;
    install(Vue: any): void;
};
