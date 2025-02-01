import type { DataTableSortOrderOption } from './options'
import type { DataTableState } from './state'
import type { ReactNode } from 'react'
import type { FilterTypeType } from './shared/filter-type-type'
import type DataTableMeta from './table-meta'
import type {
    CustomHeadLabelRenderOptions,
    MUIDataTableCustomFilterListOptions,
    MUIDataTableCustomHeadRenderer
} from 'mui-datatables'

export interface DataTableColumnObject<T> {
    label?: string
    name: string
    options?: DataTableColumnObjectOptions<T>
}

export interface DataTableColumnObjectOptions<T> {
    /**
     * Function that returns a string or React component.
     * Used to display data within all table cells of a given column.
     * The value returned from this function will be used for filtering in the filter dialog.
     * If this isn't need, you may want to consider customBodyRenderLite instead.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/component/index.js)
     */
    customBodyRender?: (
        value: any,
        tableMeta: DataTableMeta<T>,
        updateValue: (value: string) => void
    ) => ReactNode

    /**
     * Similar to and performing better than `customBodyRender`, however with the following caveats:
     * 1. The value returned from this function is not used for filtering, so the filter dialog will use the raw data from the data array.
     * 2. This method only gives you the dataIndex and rowIndex, leaving you to lookup the column value.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/large-data-set/index.js)
     */
    customBodyRenderLite?:
        | ((dataIndex: number, rowIndex: number) => string | React.ReactNode)
        | undefined

    /**
     * Function that returns a string or React component.
     * Used for creating a custom header to a column.
     * This method only affects the display in the table's header, other areas of the table (such as the View Columns popover), will use the column's label.
     */
    customHeadLabelRender?:
        | ((options: CustomHeadLabelRenderOptions) => string | React.ReactNode)
        | undefined

    /**
     * These options only affect the filter chips that display after filter are selected.
     * To modify the filters themselves, see filterOptions.
     */
    customFilterListOptions?: MUIDataTableCustomFilterListOptions

    /** @deprecated use customFilterListOptions.render */
    customFilterListRender?: ((value: any) => string) | undefined

    /** Function that returns a string or React component. Used as display for column header. */
    customHeadRender?:
        | ((
              columnMeta: MUIDataTableCustomHeadRenderer,
              handleToggleColumn: (columnIndex: number) => void,
              sortOrder: DataTableSortOrderOption
          ) => string | React.ReactNode)
        | undefined

    /**
     * Determines if the column can be dragged.
     * The draggableColumns.enabled option must also be true.
     * @default true
     */
    draggable?: boolean | undefined

    /**
     * Display the column.
     * Possible values:
     * - true: Column is visible and toggleable via the View Columns Popover
     * - false: Column is not visible but can be made so in the View Columns Popover
     * - 'excluded': Column is not visible and not toggleable in the View Column Popover
     *
     * @default true
     */
    display?: Boolean | 'excluded'

    /**
     * Display column in the CSV download file.
     * @default true
     */
    download?: boolean | undefined

    /**
     * This denote whether the column has data or not.
     * For use with intentionally empty columns.
     * @default false
     */
    empty?: boolean | undefined

    /**
     * Display column in filter list
     * @default true
     */
    filter?: boolean | undefined

    /** Display hint icon with string as tooltip on hover. */
    hint?: string | undefined

    /**
     * Display column when printing.
     * @default true
     */
    print?: boolean | undefined

    /**
     * Exclude/include column from search results.
     * @default true
     */
    searchable?: boolean | undefined

    /**
     * Is called for each header cell and allows you to return custom props for the header cell based on its data.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/customize-styling/index.js)
     */
    setCellHeaderProps?:
        | ((columnMeta: MUIDataTableCustomHeadRenderer) => object)
        | undefined

    /**
     * Is called for each cell and allows to you return custom props for this cell based on its data.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/customize-styling/index.js)
     */
    setCellProps?:
        | ((cellValue: string, rowIndex: number, columnIndex: number) => object)
        | undefined

    /**
     * Enable/disable sorting on column.
     * @default true
     */
    sort?: boolean

    /**
     * Causes the first click on a column to sort by desc rather than asc.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/customize-columns/index.js)
     *
     * @default false
     */
    sortDescFirst?: boolean | undefined

    /**
     * Allows for a third click on a column header to undo any sorting on the column.
     *
     * [Example](https://github.com/gregnb/mui-datatables/blob/master/examples/customize-columns/index.js)
     *
     * @default false
     */
    sortThirdClickReset?: boolean | undefined

    /** @deprecated use `sortOrder` instead */
    sortDirection?: 'asc' | 'desc' | 'none' | undefined

    /**
     * Allow user to toggle column visibility through 'View Column' list.
     * @default true
     */
    viewColumns?: boolean | undefined

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
    filterOptions?: DataTableStateColumnFilterOptions<T>
}

export interface DataTableStateColumnFilterOptions<T> {
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
        filterList: DataTableState<T>['filterList'],
        onChange: (
            val: string | string[],
            index: number,
            column: DataTableColumnObject<T>
        ) => void,
        index: number,
        column: DataTableColumnObject<T>,
        filterData: DataTableState<T>['filterData']
    ) => ReactNode

    /**
     * custom filter logic.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    logic?:
        | ((prop: string, filterValue: string[], row?: any[]) => boolean)
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
