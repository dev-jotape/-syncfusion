/// <reference path="../combo-box/combo-box-model.d.ts" />
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ComboBox } from '../combo-box/combo-box';
import { AutoCompleteModel } from '../auto-complete/auto-complete-model';
import { FieldSettingsModel } from '../drop-down-base/drop-down-base-model';
import { FilteringEventArgs } from '../drop-down-base/drop-down-base';
import { FloatLabelType } from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';
export declare type FilterType = 'Contains' | 'StartsWith' | 'EndsWith';
/**
 * The AutoComplete component provides the matched suggestion list when type into the input,
 * from which the user can select one.
 * ```html
 * <input id="list" type="text"/>
 * ```
 * ```typescript
 *   let atcObj:AutoComplete = new AutoComplete();
 *   atcObj.appendTo("#list");
 * ```
 */
export declare class AutoComplete extends ComboBox {
    private isFiltered;
    /**
     * The `fields` property maps the columns of the data table and binds the data to the component.
     * * text - Maps the text column from data table for each list item
     * * value - Maps the value column from data table for each list item
     * * iconCss - Maps the icon class column from data table for each list item
     * * groupBy - Group the list items with it's related items by mapping groupBy field
     *
     * > For more details about the field mapping refer to [`Data binding`](./data-binding.html) documentation.
     * @default { value: null, iconCss: null, groupBy: null}
     */
    fields: FieldSettingsModel;
    /**
     * When set to ‘false’, consider the [`case-sensitive`](./filtering.html#case-sensitive-filtering)
     * on performing the search to find suggestions.
     * By default consider the casing.
     * @default true
     */
    ignoreCase: boolean;
    /**
     * Allows you to either show or hide the popup button on the component.
     * @default false
     */
    showPopupButton: boolean;
    /**
     * When set to ‘true’, highlight the searched characters on suggested list items.
     * > For more details about the highlight refer to [`Custom highlight search`](./how-to.html#custom-highlight-search) documentation.
     * @default false
     */
    highlight: boolean;
    /**
     * Supports the [`specified number`](./filtering.html#filter-item-count)
     * of list items on the suggestion popup.
     * @default 20
     */
    suggestionCount: number;
    /**
     * Allows additional HTML attributes such as title, name, etc., and
     * accepts n number of attributes in a key-value pair format.
     *
     * {% codeBlock src="autocomplete/html-attributes-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="autocomplete/html-attributes-api/index.html" %}{% endcodeBlock %}
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Accepts the external [`query`](./api-query.html)
     * that execute along with data processing.
     *
     * {% codeBlock src="autocomplete/query-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="autocomplete/query-api/index.html" %}{% endcodeBlock %}
     * @default null
     */
    query: Query;
    /**
     * Allows you to set [`the minimum search character length']
     * (./filtering.html#limit-the-minimum-filter-character),
     * the search action will perform after typed minimum characters.
     * @default 1
     */
    minLength: number;
    /**
     * Determines on which filter type, the component needs to be considered on search action.
     * The available [`FilterType`](./filtering.html#change-the-filter-type)
     * and its supported data types are
     *
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * FilterType<br/></td><td colSpan=1 rowSpan=1>
     * Description<br/></td><td colSpan=1 rowSpan=1>
     * Supported Types<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * StartsWith<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value begins with the specified value.<br/></td><td colSpan=1 rowSpan=1>
     * String<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * EndsWith<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value ends with specified value.<br/><br/></td><td colSpan=1 rowSpan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Contains<br/></td><td colSpan=1 rowSpan=1>
     * Checks whether a value contains with specified value.<br/><br/></td><td colSpan=1 rowSpan=1>
     * <br/>String<br/></td></tr>
     * </table>
     *
     * {% codeBlock src="autocomplete/filter-type-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="autocomplete/filter-type-api/index.html" %}{% endcodeBlock %}
     *
     * The default value set to `Contains`, all the suggestion items which contain typed characters to listed in the suggestion popup.
     * @default 'Contains'
     */
    filterType: FilterType;
    /**
     * Triggers on typing a character in the component.
     * @event
     */
    filtering: EmitType<FilteringEventArgs>;
    /**
     * Not applicable to this component.
     * @default null
     * @private
     */
    index: number;
    /**
     * Specifies whether to display the floating label above the input element.
     * Possible values are:
     * * Never: The label will never float in the input when the placeholder is available.
     * * Always: The floating label will always float above the input.
     * * Auto: The floating label will float above the input after focusing or entering a value in the input.
     *
     * {% codeBlock src="autocomplete/float-label-type-api/index.ts" %}{% endcodeBlock %}
     *
     * {% codeBlock src="autocomplete/float-label-type-api/index.html" %}{% endcodeBlock %}
     *
     * @default Syncfusion.EJ2.Inputs.FloatLabelType.Never
     * @aspType Syncfusion.EJ2.Inputs.FloatLabelType
     * @isEnumeration true
     */
    floatLabelType: FloatLabelType;
    /**
     * Not applicable to this component.
     * @default null
     * @private
     */
    valueTemplate: string;
    /**
     * Not applicable to this component.
     * @default null
     * @private
     */
    filterBarPlaceholder: string;
    /**
     * Not applicable to this component.
     * @default false
     * @private
     */
    allowFiltering: boolean;
    /**
     * Not applicable to this component.
     * @default null
     * @private
     */
    text: string;
    /**
     * * Constructor for creating the widget
     */
    constructor(options?: AutoCompleteModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void;
    protected getNgDirective(): string;
    protected getQuery(query: Query): Query;
    protected searchLists(e: KeyboardEventArgs): void;
    private filterAction;
    protected clear(e?: MouseEvent, property?: AutoCompleteModel): void;
    protected onActionComplete(ulElement: HTMLElement, list: {
        [key: string]: Object;
    }[], e?: Object, isUpdated?: boolean): void;
    private postBackAction;
    protected setSelection(li: Element, e: MouseEvent | KeyboardEventArgs | TouchEvent): void;
    protected listOption(dataSource: {
        [key: string]: Object;
    }[], fieldsSettings: FieldSettingsModel): FieldSettingsModel;
    protected isFiltering(): boolean;
    protected renderPopup(): void;
    protected isEditTextBox(): boolean;
    protected isPopupButton(): boolean;
    protected isSelectFocusItem(element: Element): boolean;
    /**
     * Search the entered text and show it in the suggestion list if available.
     * @returns void.
     */
    showPopup(): void;
    /**
     * Hides the popup if it is in open state.
     * @returns void.
     */
    hidePopup(): void;
    /**
     * Dynamically change the value of properties.
     * @private
     */
    onPropertyChanged(newProp: AutoCompleteModel, oldProp: AutoCompleteModel): void;
    /**
     * Return the module name of this component.
     * @private
     */
    getModuleName(): string;
    /**
     * To initialize the control rendering
     * @private
     */
    render(): void;
}
