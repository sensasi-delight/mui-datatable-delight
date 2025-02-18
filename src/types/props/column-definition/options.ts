import type { TableCellProps } from '@mui/material/TableCell'
import type { DataTableSortOrderOption } from '../../options'
import type { DataTableState } from '../../state'
import type { JSX, ReactNode } from 'react'
import type { FilterTypeType } from '../../shared/filter-type-type'
import type { ColumnState } from '../../state/column'
import type { FilterList } from '../../state/filter-list'
import type { DisplayDataState } from '@src/types/state/display-data'

export type CustomHeadRenderer<T> = {
    index: number
} & ColumnState<T>

export interface ColumnDefinitionOptions<T> {
    /**
     * Function that returns a string or React component.
     * Used to display data within all table cells of a given column.
     * The value returned from this function will be used for filtering in the filter dialog.
     * If this isn't need, you may want to consider {@link ColumnDefinitionOptions.customBodyRenderLite | `customBodyRenderLite`} instead.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/component)
     */
    customBodyRender?: (
        /**
         * The value of the cell column
         *
         * `any` type is used because user can pass any value
         */
        value: T[keyof T] | any, // eslint-disable-line @typescript-eslint/no-explicit-any

        /**
         * The index of the row
         */
        rowIndex: number,

        /**
         * The index of the column
         */
        columnIndex: number,

        /**
         * The current state of the table
         */
        state: DataTableState<T>,

        /**
         * A function to update the value of the cell
         *
         * `any` type is used because user can pass any value
         */
        updateValue: (value: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => JSX.Element | ReactNode

    /**
     * Similar to and performing better than {@link ColumnDefinitionOptions.customBodyRender | `customBodyRender`}, however with the following caveats:
     *
     * 1. The value returned from this function is not used for filtering, so the filter dialog will use the raw data from the data array.
     * 2. This method only gives you the dataIndex and rowIndex, leaving you to lookup the column value.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/large-data-set)
     */
    customBodyRenderLite?: (
        /**
         * The index of the item in the data array.
         */
        dataIndex: number,

        /**
         * The index of the row in the current page table.
         */
        rowIndex: number
    ) => JSX.Element | ReactNode

    /**
     * Function that returns a string or React component.
     * Used for creating a custom header to a column.
     * This method only affects the display in the table's header, other areas of the table (such as the View Columns popover), will use the column's label.
     */
    customHeadLabelRender?:
        | ((
              options: {
                  index: number
                  colPos: number
              } & ColumnState<T>
          ) => string | ReactNode)
        | undefined

    /**
     * These options only affect the filter chips that display after filter are selected.
     * To modify the filters themselves, see filterOptions.
     */
    customFilterListOptions?: {
        /**
         * Function that return a string or array of strings use as the chip label(s).
         *
         * @see
         * [Example](https://mui-datatable-delight.vercel.app/examples/customize-filter)
         */
        render?: (value: ReactNode) => ReactNode
        /**
         * Function that returns a filterList allowing for custom filter updates
         * when removing the filter chip. FilterType must be set to 'custom'.
         *
         * @see
         * [Example](https://mui-datatable-delight.vercel.app/examples/customize-filter)
         */
        update?: (
            filterList: FilterList,
            filterPos: number,
            index: number
        ) => FilterList
    }

    /** @deprecated use customFilterListOptions.render */
    customFilterListRender?: ((value: unknown) => string) | undefined

    /** Function that returns a string or React component. Used as display for column header. */
    customHeadRender?:
        | ((
              columnMeta: CustomHeadRenderer<T>,
              handleToggleColumn: (columnIndex: number) => void,
              sortOrder?: DataTableSortOrderOption
          ) => string | ReactNode)
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
    display: boolean | 'excluded'

    /**
     * Display column in the CSV download file.
     *
     * @default true
     */
    download: boolean

    /**
     * This denote whether the column has data or not.
     * For use with intentionally empty columns.
     * @default false
     */
    empty?: boolean | undefined

    /**
     * Display column in filter list
     *
     * @default true
     */
    filter: boolean

    /** Display hint icon with string as tooltip on hover. */
    hint?: string | undefined

    /**
     * Display column when printing.
     *
     * @default true
     */
    print: boolean

    /**
     * Exclude/include column from search results.
     *
     * @default true
     */
    searchable: boolean

    /**
     * Is called for each header cell and allows you to return custom props for the header cell based on its data.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/customize-styling)
     */
    setCellHeaderProps?:
        | ((columnMeta: CustomHeadRenderer<T>) => object)
        | undefined

    /**
     * Is called for each cell and allows to you return custom props for this cell based on its data.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/customize-styling)
     */
    setCellProps?: (
        cellValue: DisplayDataState<T>[number]['data'][number],
        rowIndex: number,
        columnIndex: number
    ) => TableCellProps

    /**
     * Enable/disable sorting on column.
     *
     * @default true
     */
    sort: boolean

    /**
     * Causes the first click on a column to sort by desc rather than asc.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/customize-columns)
     *
     * @default false
     */
    sortDescFirst: boolean

    /**
     * Allows for a third click on a column header to undo any sorting on the column.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/customize-columns)
     *
     * @default false
     */
    sortThirdClickReset?: boolean | undefined

    /** @deprecated use `sortOrder` instead */
    sortDirection?: 'asc' | 'desc' | 'none' | undefined

    /**
     * Allow user to toggle column visibility through 'View Column' list.
     *
     * @default true
     */
    viewColumns: boolean

    /**
     * Custom sort function for the column. Takes in an order string and returns a function that compares the two column values.
     * If this method and options.customSort are both defined, this method will take precedence.
     *
     * @see
     * [Example](https://mui-datatable-delight.vercel.app/examples/column-sort)
     */
    sortCompare?: (
        order: DataTableSortOrderOption['direction']
    ) => (obj1: { data: unknown }, obj2: { data: unknown }) => number

    /**
     * Choice of filtering view. Takes priority over global filterType option.
     *
     * Use 'custom' is you are supplying your own rendering via filterOptions.
     *
     * @default 'dropdown'
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
            value: string | string[],
            index: number,
            column: ColumnState<T>
        ) => void,
        index: number,
        column: ColumnState<T>,
        filterData: DataTableState<T>['filterData']
    ) => ReactNode

    /**
     * custom filter logic.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    logic?: (prop: string, filterValue: string[], row: T) => boolean

    /**
     * A function to customize filter choices.
     *
     * Use case: changing empty strings to `"(empty)"` in a dropdown.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    renderValue?: <V>(value: V) => V

    /** Will force a filter option to take up the grid's full width. */
    fullWidth?: boolean | undefined
}
