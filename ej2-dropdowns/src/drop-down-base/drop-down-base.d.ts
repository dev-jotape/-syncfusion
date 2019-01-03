import { Component, KeyboardEvents, EmitType, L10n } from '@syncfusion/ej2-base';
import { AnimationModel } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ChildProperty } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SortOrder } from '@syncfusion/ej2-lists';
import { DropDownBaseModel, FieldSettingsModel } from './drop-down-base-model';
import { Popup } from '@syncfusion/ej2-popups';
export declare class FieldSettings extends ChildProperty<FieldSettings> {
    /**
     * Maps the text column from data table for each list item
     * @default null
     */
    text: string;
    /**
     * Maps the value column from data table for each list item
     * @default null
     */
    value: string;
    /**
     * Maps the icon class column from data table for each list item.
     * @default null
     */
    iconCss: string;
    /**
     * Group the list items with it's related items by mapping groupBy field.
     * @default null
     */
    groupBy: string;
    /**
     * Allows additional attributes such as title, disabled, etc., to configure the elements
     * in various ways to meet the criteria.
     * @default null
     */
    htmlAttributes: string;
}
export declare const dropDownBaseClasses: DropDownBaseClassList;
export interface DropDownBaseClassList {
    root: string;
    rtl: string;
    content: string;
    selected: string;
    hover: string;
    noData: string;
    fixedHead: string;
    focus: string;
    li: string;
    disabled: string;
    group: string;
    grouping: string;
}
export interface SelectEventArgs {
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted: boolean;
    /**
     * Returns the selected list item
     */
    item: HTMLLIElement;
    /**
     * Returns the selected item as JSON Object from the data source.
     */
    itemData: FieldSettingsModel;
    /**
     * Specifies the original event arguments.
     */
    e: MouseEvent | KeyboardEvent | TouchEvent;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
}
/**
 * DropDownBase component will generate the list items based on given data and act as base class to drop-down related components
 */
export declare class DropDownBase extends Component<HTMLElement> implements INotifyPropertyChanged {
    protected listData: {
        [key: string]: Object;
    }[] | string[] | boolean[] | number[];
    protected ulElement: HTMLElement;
    protected liCollections: HTMLElement[];
    private bindEvent;
    private scrollTimer;
    protected list: HTMLElement;
    protected fixedHeaderElement: HTMLElement;
    protected keyboardModule: KeyboardEvents;
    protected enableRtlElements: HTMLElement[];
    protected rippleFun: Function;
    protected l10n: L10n;
    protected item: HTMLLIElement;
    protected itemData: {
        [key: string]: Object;
    } | string | number | boolean;
    protected isActive: boolean;
    protected isRequested: boolean;
    protected isDataFetched: boolean;
    protected queryString: string;
    private sortedData;
    /**
     * The `fields` property maps the columns of the data table and binds the data to the component.
     * * text - Maps the text column from data table for each list item.
     * * value - Maps the value column from data table for each list item.
     * * iconCss - Maps the icon class column from data table for each list item.
     * * groupBy - Group the list items with it's related items by mapping groupBy field.
     * ```html
     * <input type="text" tabindex="1" id="list"> </input>
     * ```
     * ```typescript
     *   let customers: DropDownList = new DropDownList({
     *      dataSource:new DataManager({ url:'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/' }),
     *      query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(5),
     *      fields: { text: 'ContactName', value: 'CustomerID' },
     *      placeholder: 'Select a customer'
     *   });
     *   customers.appendTo("#list");
     * ```
     * @default {text: null, value: null, iconCss: null, groupBy: null}
     */
    fields: FieldSettingsModel;
    /**
     * When set to true, enables RTL mode of the component that
     * displays the content in the right-to-left direction.
     * @default false.
     */
    enableRtl: boolean;
    /**
     * Enable or disable persisting component's state between page reloads.
     * If enabled, following list of states will be persisted.
     * 1. value
     * @default false.
     */
    enablePersistence: boolean;
    /**
     * Accepts the template design and assigns it to each list item present in the popup.
     * We have built-in [`template engine`](./template-engine.html)
     *
     * which provides options to compile template string into a executable function.
     * For EX: We have expression evolution as like ES6 expression string literals.
     * @default null.
     */
    itemTemplate: string;
    /**
     * Accepts the template design and assigns it to the group headers present in the popup list.
     * @default null.
     */
    groupTemplate: string;
    /**
     * Accepts the template design and assigns it to popup list of component
     * when no data is available on the component.
     * @default 'No Records Found'.
     */
    noRecordsTemplate: string;
    /**
     * Accepts the template and assigns it to the popup list content of the component
     * when the data fetch request from the remote server fails.
     * @default 'The Request Failed'.
     */
    actionFailureTemplate: string;
    /**
     * Specifies the `sortOrder` to sort the data source. The available type of sort orders are
     * * `None` - The data source is not sorting.
     * * `Ascending` - The data source is sorting with ascending order.
     * * `Descending` - The data source is sorting with descending order.
     * @default None.
     */
    sortOrder: SortOrder;
    /**
     * Specifies a value that indicates whether the component is enabled or not.
     * @default true.
     */
    enabled: boolean;
    /**
     * Accepts the list items either through local or remote service and binds it to the component.
     * It can be an array of JSON Objects or an instance of
     * [`DataManager`](./api-dataManager.html).
     * @default [].
     */
    dataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[];
    /**
     * Accepts the external [`Query`](./api-query.html)
     * which will execute along with the data processing.
     * @default null.
     */
    query: Query;
    /**
     * specifies the z-index value of the component popup element.
     * @default 1000
     */
    zIndex: number;
    /**
     * ignoreAccent set to true, then ignores the diacritic characters or accents when filtering.
     */
    ignoreAccent: boolean;
    /**
     * Triggers before fetching data from the remote server.
     * @event
     */
    actionBegin: EmitType<Object>;
    /**
     * Triggers after data is fetched successfully from the remote server.
     * @event
     */
    actionComplete: EmitType<Object>;
    /**
     * Triggers when the data fetch request from the remote server fails.
     * @event
     */
    actionFailure: EmitType<Object>;
    /**
     * Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation.
     * @event
     */
    select: EmitType<SelectEventArgs>;
    /**
     * Triggers when data source is populated in the popup list..
     * @event
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when the component is created.
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     * @event
     */
    destroyed: EmitType<Object>;
    /**
     * * Constructor for DropDownBase class
     */
    constructor(options?: DropDownBaseModel, element?: string | HTMLElement);
    protected getPropObject(prop: string, newProp: {
        [key: string]: string;
    }, oldProp: {
        [key: string]: string;
    }): {
        [key: string]: Object;
    };
    protected getValueByText(text: string, ignoreCase?: boolean, ignoreAccent?: boolean): string | number | boolean;
    private checkValueCase;
    private checkingAccent;
    private checkIgnoreCase;
    private checkNonIgnoreCase;
    private getItemValue;
    protected l10nUpdate(actionFailure?: boolean): void;
    protected getTextByValue(value: string | number | boolean): string;
    protected getFormattedValue(value: string): string | number | boolean;
    /**
     * Sets RTL to dropdownbase wrapper
     */
    protected setEnableRtl(): void;
    /**
     * Initialize the Component.
     */
    private initialize;
    /**
     * Get the properties to be maintained in persisted state.
     */
    protected getPersistData(): string;
    /**
     * Sets the enabled state to DropDownBase.
     */
    protected setEnabled(): void;
    private renderItemsBySelect;
    private getJSONfromOption;
    /**
     * Execute before render the list items
     * @private
     */
    protected preRender(): void;
    /**
     * Creates the list items of DropDownBase component.
     */
    private setListData;
    private bindChildItems;
    protected updateListValues(): void;
    private raiseDataBound;
    private remainingItems;
    private emptyDataRequest;
    protected showSpinner(): void;
    protected hideSpinner(): void;
    protected onActionFailure(e: Object): void;
    protected onActionComplete(ulElement: HTMLElement, list: {
        [key: string]: Object;
    }[] | boolean[] | string[] | number[], e?: Object): void;
    protected postRender(listElement: HTMLElement, list: {
        [key: string]: Object;
    }[] | number[] | string[] | boolean[], bindEvent: boolean): void;
    /**
     * Get the query to do the data operation before list item generation.
     */
    protected getQuery(query: Query): Query;
    /**
     * To render the template content for group header element.
     */
    private renderGroupTemplate;
    /**
     * To create the ul li list items
     */
    private createListItems;
    protected listOption(dataSource: {
        [key: string]: Object;
    }[] | string[] | number[] | boolean[], fields: FieldSettingsModel): FieldSettingsModel;
    protected setFloatingHeader(e: Event): void;
    private scrollStop;
    /**
     * To render the list items
     */
    private renderItems;
    protected templateListItem(dataSource: {
        [key: string]: Object;
    }[], fields: FieldSettingsModel): HTMLElement;
    protected typeOfData(items: {
        [key: string]: Object;
    }[] | string[] | number[] | boolean[]): {
        [key: string]: Object;
    };
    protected setFixedHeader(): void;
    private getSortedDataSource;
    /**
     * Return the index of item which matched with given value in data source
     */
    protected getIndexByValue(value: string | number | boolean): number;
    /**
     * To dispatch the event manually
     */
    protected dispatchEvent(element: HTMLElement, type: string): void;
    /**
     * To set the current fields
     */
    protected setFields(): void;
    /**
     * reset the items list.
     */
    protected resetList(dataSource?: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[], fields?: FieldSettingsModel, query?: Query): void;
    protected updateSelection(): void;
    protected renderList(): void;
    protected updateDataSource(props?: DropDownBaseModel): void;
    protected setUpdateInitial(props: string[], newProp: {
        [key: string]: string;
    }): void;
    /**
     * When property value changes happened, then onPropertyChanged method will execute the respective changes in this component.
     * @private
     */
    onPropertyChanged(newProp: DropDownBaseModel, oldProp: DropDownBaseModel): void;
    /**
     * Build and render the component
     * @private
     */
    render(isEmptyData?: boolean): void;
    /**
     * Return the module name of this component.
     * @private
     */
    getModuleName(): string;
    /**
     * Gets all the list items bound on this component.
     * @returns Element[].
     */
    getItems(): Element[];
    /**
     * Adds a new item to the popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     * @param  { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } itemIndex - Specifies the index to place the newly added item in the popup list.
     * @return {void}.
     */
    addItem(items: {
        [key: string]: Object;
    }[] | {
        [key: string]: Object;
    } | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    protected validationAttribute(target: HTMLElement, hidden: Element): void;
    protected setZIndex(): void;
    protected updateActionCompleteData(li: HTMLElement, item: {
        [key: string]: Object;
    }): void;
    /**
     * Gets the data Object that matches the given value.
     * @param { string | number } value - Specifies the value of the list item.
     * @returns Object.
     */
    getDataByValue(value: string | number | boolean): {
        [key: string]: Object;
    } | string | number | boolean;
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     * @method destroy
     * @return {void}.
     */
    destroy(): void;
}
export interface ResultData {
    result: {
        [key: string]: Object;
    }[];
}
export interface FilteringEventArgs {
    /**
     * To prevent the internal filtering action.
     */
    preventDefaultAction: boolean;
    /**
     * Gets the `keyup` event arguments.
     */
    baseEventArgs: Object;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel: boolean;
    /**
     * Search text value.
     */
    text: string;
    /**
     * To filter the data from given data source by using query
     * @param  {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param  {Query} query - Specify the query to filter the data.
     * @param  {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @return {void}.
     */
    updateData(dataSource: {
        [key: string]: Object;
    }[] | DataManager | string[] | number[] | boolean[], query?: Query, fields?: FieldSettingsModel): void;
}
export interface PopupEventArgs {
    /**
     * Specifies the popup Object.
     */
    popup: Popup;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Specifies the animation Object.
     */
    animation?: AnimationModel;
}
export interface FocusEventArgs {
    /**
     * Specifies the focus interacted.
     */
    isInteracted?: boolean;
    /**
     * Specifies the event.
     */
    event?: MouseEvent | FocusEvent | TouchEvent | KeyboardEvent;
}
