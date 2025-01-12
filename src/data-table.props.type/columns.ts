import type { MUIDataTableColumnOptions } from 'mui-datatables'
import { DataTableSortOrderOption } from './options'
import { DataTableState } from './state'
import { ReactNode } from 'react'
import type { FilterTypeType } from './shared/filter-type-type'

export interface DataTableColumnObject {
    label?: string
    name: string
    options?: DataTableColumnObjectOptions
    // options?: {
    //     display?: boolean | 'excluded' | 'always'
    //     empty?: boolean
    //     filter?: boolean
    //     sort?: boolean
    //     print?: boolean
    //     searchable?: boolean
    //     download?: boolean
    //     viewColumns?: boolean

    //     filterList?: MUIDataTableColumnOptions['filterList']

    //     // PROPS TYPE DECLARATION
    //     // filterOptions: PropTypes.oneOfType([
    //     //     PropTypes.array,
    //     //     PropTypes.shape({
    //     //         names: PropTypes.array,
    //     //         logic: PropTypes.func,
    //     //         display: PropTypes.func
    //     //     })
    //     // ]),
    //     filterOptions?: MUIDataTableColumnOptions['filterOptions']

    //     filterType?:
    //         | 'dropdown'
    //         | 'checkbox'
    //         | 'multiselect'
    //         | 'textField'
    //         | 'custom'

    //     customHeadRender?: MUIDataTableColumnOptions['customHeadRender']
    //     customBodyRender?: MUIDataTableColumnOptions['customBodyRender']
    //     customBodyRenderLite?: MUIDataTableColumnOptions['customBodyRenderLite']
    //     customHeadLabelRender?: MUIDataTableColumnOptions['customHeadLabelRender']
    //     customFilterListOptions?: MUIDataTableColumnOptions['customFilterListOptions']

    //     /**
    //      * @deprecated  Use {@link customFilterListOptions} instead.
    //      */
    //     customFilterListRender?: MUIDataTableColumnOptions['customHeadRender']
    //     setCellProps?: (
    //         cellValue: string,
    //         rowIndex: number,
    //         columnIndex: number
    //     ) => object

    //     setCellHeaderProps?: (
    //         columnMeta: MUIDataTableCustomHeadRenderer
    //     ) => object

    //     sortThirdClickReset?: boolean
    //     sortDescFirst?: boolean
    // }
}

export interface DataTableColumnObjectOptions
    extends Omit<
        MUIDataTableColumnOptions,
        'filterType' | 'filterOptions' | 'filterList' | 'sortCompare'
    > {
    /**
     * Custom sort function for the column. Takes in an order string and returns a function that compares the two column values.
     * If this method and options.customSort are both defined, this method will take precedence.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/column-sort/index.js)
     */
    sortCompare?:
        | ((
              order: DataTableSortOrderOption['direction']
          ) => (obj1: { data: any }, obj2: { data: any }) => number)
        | undefined

    /**
     * Choice of filtering view. Takes priority over global filterType option.
     *
     * Use 'custom' is you are supplying your own rendering via filterOptions.
     *
     * @default  'dropdown'
     *
     * @see  {@link FilterTypeType}
     */
    filterType?: FilterTypeType

    /**
     * Filter value list.
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/column-filters|Column Filters Example}.
     */
    filterList?: string[]

    /**
     * These options affect the filter display and functionality from the filter dialog.
     *
     * To modify the filter chip that display after selecting filters.
     *
     * @see  {@link DataTableStateColumnFilterOptions}.
     */
    filterOptions?: DataTableStateColumnFilterOptions
}

export enum FilterTypeEnum {
    CHECKBOX = 'checkbox',
    TEXTFIELD = 'textField',
    MULTISELECT = 'multiselect',
    CUSTOM = 'custom',
    DROPDOWN = 'dropdown',
    CHIP = 'chip'
}

export interface DataTableStateColumnFilterOptions {
    /**
     * Custom names for the filter fields.
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/column-filters|Column Filters Example}.
     */
    names?: string[] | undefined

    /**
     * Custom rendering inside the filter dialog.
     *
     * `filterList` must be of the same type in the main column options, that is an array of arrays, where each array corresponds to the filter list for a given column.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    display?: (
        filterList: DataTableState['filterList'],
        onChange: (
            val: string | string[],
            index: number,
            column: DataTableColumnObject
        ) => void,
        index: number,
        column: DataTableColumnObject,
        filterData: DataTableState['filterData']
    ) => ReactNode

    /**
     * custom filter logic.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    logic?:
        | ((prop: string, filterValue: any[], row?: any[]) => boolean)
        | undefined

    /**
     * A function to customize filter choices.
     *
     * Use case: changing empty strings to `"(empty)"` in a dropdown.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    renderValue?: ((value: string) => string) | undefined

    /** Will force a filter option to take up the grid's full width. */
    fullWidth?: boolean | undefined
}
