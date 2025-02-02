import type { TableProps } from '@mui/material/Table'
import type { ChipProps } from '@mui/material/Chip'
import type { TableRowProps } from '@mui/material/TableRow'
import type { MouseEvent, ReactNode } from 'react'
import type { DataTableState } from './state'
import type { FilterTypeType } from './shared/filter-type-type'
import { DEFAULT_TEXT_LABELS } from '../hooks/use-data-table-context/function/statics/default-text-labels'
// enums
import type RowsSelectedToolbarPlacement from '../enums/rows-selected-toolbar-placement'
import type TableAction from '../enums/table-action'
import type DataTableSearchOptions from './options/search'
import type { BooleanOrDisabled } from './values/boolean-or-disabled'
import type { DefaultDataRowItemType } from './values/default-data-row-item-type'
import type { SelectedRowDataState } from './state/selected-row-data'
import type { DisplayDataState } from './state/display-data'
import type { SelectableRowsType } from './options/selectable-rows'
import type { ColumnPropType } from './props/column'

export interface DataTableSortOrderOption {
    name: string
    direction: 'asc' | 'desc' | 'none'
}

export interface DataTableOptions<DataRowItemType = DefaultDataRowItemType>
    extends DataTableCustomsOptions<DataRowItemType>,
        DataTableSearchOptions<DataRowItemType> {
    /** Enable/disable case sensitivity for search */
    caseSensitive?: boolean

    /**
     * Works in conjunction with the customFilterDialogFooter options and make is so filters have to be confirmed before being applied to the table.
     * When this option is true, the customFilterDialogFooter callback will receive an applyFilters function which, when called will apply the filter to the table.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/serverside-filters/index.tsx
     */
    confirmFilters?: boolean

    /**
     * An array of numbers (column indices) indicating the order the columns should be displayed in.
     * Defaults to the order provided by the Columns prop.
     * This option is useful if you'd like certain columns to swap position.
     * See draggableColumns option
     */
    columnOrder?: number[]

    /** User provided override for the total number of row. */
    count?: number

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    download?: BooleanOrDisabled

    /**
     * An object of options to change the output of the csv file.
     *
     * @default downloadOptions.separator = ','
     */
    downloadOptions?: Partial<{
        filename: string
        separator: string
        filterOptions: Partial<{
            useDisplayedColumnsOnly: boolean
            useDisplayedRowsOnly: boolean
        }>
    }>

    /**
     * An object of options describing how dragging columns should work.
     * The options are:
     * `enabled: boolean` - Indicates if draggable columns are enabled. Default is `false`
     * `transitionTime: number` - The time in milliseconds it takes for columns to swap positions. Default is `300`.
     *
     * To disable the dragging of a particular column, see the "draggable" option in the columns options.
     * Dragging a column to a new position updates the columnOrder array and triggers the onColumnOrderChange callback.
     */
    draggableColumns?: {
        enabled: boolean
        transitionTime?: number | undefined
    }

    /**
     * Shadow depth applied to the `<Paper />` component.
     * @default 4
     */
    elevation?: number

    /**
     * If a non-empty string (ex: `"."`) is provided, it will use that value in the column's names to access nested data.
     *
     * For example, given a value of `"."` for `enableNestedDataAccess` and a column name of `"phone.cell"`, the column would use the value found in phone: `{ cell:"555-5555" }`
     *
     * Any amount of nesting will work.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/data-as-objects/index.tsx
     */
    enableNestedDataAccess?: string

    /**
     * Enable/disable expandable rows.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/expandable-rows/index.tsx
     *
     * @default false
     */
    expandableRows?: boolean

    /**
     * Show/hide the expand all/collapse all row header for expandable row.
     *
     * @default true
     */
    expandableRowsHeader?: boolean

    /**
     * Enable/disable expand trigger when row is clicked.
     * When false, only expand icon will trigger this action.
     *
     * @default false
     */
    expandableRowsOnClick?: boolean

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    filter?: BooleanOrDisabled

    /**
     * For array values, default checks if all the filter values are included in the array.
     * If false, checks if at least one of the filter values is in the array.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/array-value-columns/index.tsx
     *
     * @default true
     */
    filterArrayFullMatch?: boolean

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
     * Enable/disable a fixed header for the table
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/fixed-header/index.tsx
     * @default true
     */
    fixedHeader?: boolean

    /** @deprecated use `fixedHeader` for **X** axis and `fixedSelectColumn` for **Y** axis */
    fixedHeaderOptions?: {
        /** @deprecated use `fixedHeader` */
        xAxis: boolean
        /** @deprecated use `fixedSelectColumn` */
        yAxis: boolean
    }

    /**
     * Enable/disable fined select column.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/fixed-header/index.tsx
     * @default true
     */
    fixedSelectColumn?: boolean

    /**
     * Enable/disable expansion or collapse on certain expandable rows with custom function.
     * Returns `true` if not provided.
     */
    isRowExpandable?: (
        dataIndex: number,
        expandedRows: DataTableState<DataRowItemType>['expandedRows']
    ) => boolean

    /** Enable/disable selection on certain rows with custom function. Returns true if not provided. */
    isRowSelectable?: (
        dataIndex: number,
        selectedRows: DataTableState<DataRowItemType>['selectedRows']
    ) => boolean

    /**
     * When true, the option adds a dropdown to the table's footer that allows a user to navigate to a specific page.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/large-data-set/index.tsx
     * @default false
     */
    jumpToPage?: boolean

    /** Callback function that triggers when a cell is clicked. */
    onCellClick?: (
        colData: unknown,
        cellMeta: {
            colIndex: number
            rowIndex: number
            dataIndex: number
            event: MouseEvent
        }
    ) => void
    onChangePage?: (currentPage: number) => void

    /** Callback function that triggers when a page has changed. */
    onChangeRowsPerPage?: (numberOfRows: number) => void

    /** Callback function that triggers when a column has been dragged to a new location. */
    onColumnOrderChange?: (
        newColumnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) => void

    /** Callback function that triggers when a column has been sorted. */
    onColumnSortChange?: (
        changedColumn: string,
        direction: DataTableSortOrderOption['direction']
    ) => void

    /** @deprecated use `onViewColumnsChange` instead */
    onColumnViewChange?:
        | ((changedColumn: string, action: string) => void)
        | undefined

    /**
     * A callback function that triggers when the user downloads the CSV file.
     * In the callback, you can control what is written to the CSV file.
     * Return false to cancel download of file.
     *
     * @see [Download Sheet Formatted CSV example](https://mui-datatatable-delight.vercel.app/examples/download-sheet-formatted-csv)
     * @see [On Download example](https://mui-datatatable-delight.vercel.app/examples/on-download)
     */
    onDownload?: (
        buildHead: (
            columns: DataTableState<DataRowItemType>['columns']
        ) => string,
        buildBody: (data: DataTableState<DataRowItemType>['data']) => string,
        columns: DataTableState<DataRowItemType>['columns'],
        data: DataTableState<DataRowItemType>['data']
    ) =>
        | {
              data: DisplayDataState
              columns: DataTableState<DataRowItemType>['columns']
          }
        | string
        | false

    /** Callback function that triggers when filters have changed. */
    onFilterChange?: (
        changedColumn: ColumnPropType<DataRowItemType> | null,
        filterList: DataTableState<DataRowItemType>['filterList'],
        type: FilterTypeType | 'reset',
        changedColumnIndex: number | null,
        displayData: DisplayDataState
    ) => void

    /**
     * Callback function that is triggered when a user clicks the "X" on a filter chip.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/serverside-filters/index.tsx
     */
    onFilterChipClose?: (
        index: number,
        removedFilter: string | string[],
        filterList: DataTableState<DataRowItemType>['filterList']
    ) => void

    /**
     * Callback function that is triggered when a user presses the "confirm" button on the filter popover.
     * This occurs only if you've set `confirmFilters` option to `true`.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/serverside-filters/index.tsx
     */

    onFilterConfirm?: (
        filterList: DataTableState<DataRowItemType>['filterList']
    ) => void

    /** Callback function that triggers when the filter dialog closes. */
    onFilterDialogClose?: () => void

    /** Callback function that triggers when the filter dialog opens. */
    onFilterDialogOpen?: () => void

    /** Callback function that triggers when a row is clicked. */
    onRowClick?: (
        rowData: string[],
        rowMeta: { dataIndex: number; rowIndex: number },
        event: MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => void

    /**
     * Callback function that triggers when row(s) are expanded/collapsed.
     */
    onRowExpansionChange?: (
        currentRowsExpanded: unknown[],
        allRowsExpanded: unknown[],
        rowsExpanded?: unknown[]
    ) => void

    /**
     * Callback function that triggers when row(s) are deleted.
     * Returning false prevents row deletion.
     */
    onRowsDelete?: (
        rowsDeleted: {
            lookup: boolean[]
            data: SelectedRowDataState[]
        },
        newTableData: unknown[]
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    ) => void | false

    /** Callback function that triggers when row(s) are selected/deselected. */
    onRowSelectionChange?: (
        currentRowsSelected: unknown[],
        allRowsSelected: unknown[],
        rowsSelected?: unknown[]
    ) => void

    /**
     * Callback function that triggers when table state has changed.
     *
     * @see {@link TableAction} enum.
     * @see {@link DataTableState} interface.
     */
    onTableChange?: (
        action: TableAction,
        tableState: DataTableState<DataRowItemType>
    ) => void

    /**
     * Callback function that triggers when table state has been initialized.
     *
     * @see {@link TableAction} enum.
     * @see {@link DataTableState} interface.
     */
    onTableInit?: (
        action: TableAction,
        tableState: DataTableState<DataRowItemType>
    ) => void

    /** Callback function that triggers when a column view has been changed. Previously known as onColumnViewChange. */
    onViewColumnsChange?: (changedColumn: string, action: string) => void

    /** User provided page for pagination */
    page?: number

    /**
     * Enable/disable pagination.
     *
     * @default true
     */
    pagination?: boolean

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    print?: BooleanOrDisabled

    /**
     * Render Expandable rows.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/expandable-rows/index.tsx
     */
    renderExpandableRow?: (
        rowData: string[],
        rowMeta: { dataIndex: number; rowIndex: number }
    ) => ReactNode

    /**
     * Set to `true` to allow users to resize columns by dragging the edges.
     *
     * @see https://mui-datatable-delight.vercel.app/docs/features/resizable-columns
     *
     * @default false
     */
    resizableColumns?: boolean

    /**
     * Enable/disable responsive table view.
     * Options:
     * - 'vertical': In smaller view the table cells will collapse such that the heading is to the left of th cell value.
     * - 'standard': Table will stay in the standard mode but make small changes to better fit the allocated space.
     * - 'simple': On very small devices the table rows will collapse into simple display.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/simple/index.tsx
     *
     * @default 'vertical'
     */
    responsive?:
        | 'vertical'
        | 'standard'
        | 'simple'
        | 'verticalAlways' // deprecated in `/examples/simple`
        | 'scroll' // deprecated in `/examples/simple`
        | 'scrollMaxHeight' // deprecated in `/examples/simple`
        | 'stacked' // ?? FOUND in `./body.cell.tsx`
        | 'stackedFullWidth' // ?? FOUND in `./body.cell.tsx`
        | 'scrollFullHeight' // ?? FOUND in `./body.cell.tsx`
        | 'scrollFullHeightFullWidth' // ?? FOUND in `./body.cell.tsx`

    /**
     * Enable/disable hover style over row.
     *
     * @default true
     */
    rowHover?: boolean

    /** User provided expanded rows */
    rowsExpanded?: unknown[]

    /**
     * Number of rows allowed per page.
     *
     * @default 10
     */
    rowsPerPage?: number

    /**
     * Options to provide in pagination for number of rows a user can select
     *
     * @default [10, 20, 50, 100]
     */
    rowsPerPageOptions?: number[]

    /** User provided array of number (dataIndexes) which indicated the selected row. */
    rowsSelected?: unknown[]

    /**
     * Indicates if rows can be selected.
     *
     * @default  'multiple'
     */
    selectableRows?: SelectableRowsType

    /**
     * Show/hide the select all/deselect all checkbox header for selectable rows.
     * @default true
     */
    selectableRowsHeader?: boolean

    /**
     * Hides the checkboxes that appear when selectableRows is set to "multiple" or "single".
     * Can provide a more custom UX, especially when paired with selectableRowsOnClick.
     *
     * @default false
     */
    selectableRowsHideCheckboxes?: boolean

    /**
     * Enable/disable select toggle when row is clicked.
     * When False, only checkbox will trigger this action.
     *
     * @default false
     */
    selectableRowsOnClick?: boolean

    /**
     * Controls the visibility of the Select Toolbar.
     *
     * Options:
     * - 'above': Appears above the default toolbar.
     * - `always`:
     * - 'none': Select Toolbar never appears
     * - 'replace': Select toolbar replaces default toolbar.
     *
     * @default replace
     *
     * @see  {@link RowsSelectedToolbarPlacement}
     */
    selectToolbarPlacement?: RowsSelectedToolbarPlacement

    /**
     * Enable remote data source
     * @default false
     */
    serverSide?: boolean

    /**
     * Is called for each filter chip and allows you to place custom props on a filter chip.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-filter/index.tsx
     */
    setFilterChipProps?: (
        colIndex: number,
        colName: string,
        data: readonly unknown[][]
    ) => Pick<ChipProps, 'color' | 'variant' | 'className'>

    /**
     * Is called for each row and allows you to return custom props for this row based on its data.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-styling/index.tsx
     */
    setRowProps?: (
        row: unknown[],
        dataIndex: number,
        rowIndex: number
    ) => TableRowProps

    /**
     * Is called for the table and allows you to return custom props for the table based on its data.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-styling/index.tsx
     */
    setTableProps?: () => TableProps

    /**
     * Enable/disable sort on all columns.
     *
     * @default true
     */
    sort?: boolean

    /**
     * Enable/disable alphanumeric sorting of filter lists.
     *
     * @default true
     */
    sortFilterList?: boolean

    /**
     * Sets the column to sort by and its sort direction.
     * To remove/reset sorting, input in an empty object.
     * The object options are the column name and the direction.
     *
     * @see  {@link DataTableSortOrderOption}
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/customize-columns|Customize Columns Example}.
     */
    sortOrder?: DataTableSortOrderOption

    /**
     * CSS string for the height of the table.
     * @example '500px'
     * @example '100%'
     * @example 'auto'
     * @default 'auto'
     */

    tableBodyHeight?: string
    /**
     * CSS string for the height of the table.
     * @example '500px'
     * @example '100%'
     * @example 'auto'
     */
    tableBodyMaxHeight?: string

    /**
     * User provided labels to localize text.
     *
     * @deprecated Set `textLabels` prop from main component instead.
     */
    textLabels?: never

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     * @default true
     */
    viewColumns?: BooleanOrDisabled

    /**
     * Local storage key used to store the table state.
     */
    storageKey?: string

    /**
     * @deprecated  Use `onRowExpansionChange` instead.
     *
     * @see  {@link onRowExpansionChange}
     */
    onRowsExpand?: DataTableOptions<DataRowItemType>['onRowExpansionChange']

    /**
     * @deprecated Use `onRowSelectionChange` instead.
     *
     * @see  {@link onRowSelectionChange}
     */
    onRowsSelect?: DataTableOptions<DataRowItemType>['onRowSelectionChange']

    /**
     * @deprecated  in favor of the {@link confirmFilters} option.
     */
    serverSideFilterList?: DataTableState<DataRowItemType>['filterList']
}

interface DataTableCustomsOptions<DataRowItemType> {
    /** Add a custom footer to the filter dialog. */
    customFilterDialogFooter?: (
        filterList: DataTableState<DataRowItemType>['filterList'],
        applyNewFilters?: (...args: unknown[]) => unknown
    ) => ReactNode

    /**
     * Render a custom table footer.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-footer/index.tsx
     */
    customFooter?: (
        rowCount: number,
        page: number,
        rowsPerPage: number,
        changeRowsPerPage: (rowPerPage: number) => void,
        changePage: (newPage: number) => void,
        textLabels: typeof DEFAULT_TEXT_LABELS.pagination
    ) => ReactNode

    /**
     * Override default row rendering with custom function.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-rows/index.tsx
     */
    customRowRender?: (
        data: unknown[],
        dataIndex: number,
        rowIndex: number
    ) => ReactNode

    /**
     * Override default sorting with custom function.
     *
     * If you just need to override the sorting for a particular column, see the {@link ./columns/DataTableColumnObjectOptions.sortCompare} method in the Column options.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-sorting/index.tsx
     */
    customSort?: (data: unknown[], colIndex: number, order: string) => unknown[]

    /**
     * Render a footer under the table body but above the table's standard footer.
     * This is useful for creating footers for individual columns.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-footer/index.tsx
     */
    customTableBodyFooterRender?: (
        state: DataTableState<DataRowItemType>,
        options: DataTableOptions<DataRowItemType>
    ) => ReactNode

    /**
     * Render a custom Toolbar.
     *
     * @see https://github.com/sensasi-delight/mui-datatable-delight/blob/main/examples/customize-toolbar/CustomToolbar.tsx
     */
    customToolbar?: (data: { displayData: DisplayDataState }) => ReactNode

    /**
     * Render a custom selected rows ToolBar.
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/customize-toolbar-select|Custom Selected Rows ToolBar Example}
     */
    customSelectedRowsToolbar?: (
        selectedRows: {
            data: SelectedRowDataState[]
            lookup: boolean[]
        },
        displayData: DisplayDataState,
        setSelectedRows: (rows: number[]) => void
    ) => ReactNode

    /**
     * Render a custom selected row ToolBar.
     *
     * @deprecated  Use `customSelectedRowsToolbar` instead
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/customize-toolbar-select|Custom Selected Rows ToolBar Example}
     *
     */
    customToolbarSelect?: (
        selectedRows: {
            data: SelectedRowDataState[]
            lookup: boolean[]
        },
        displayData: DisplayDataState,
        setSelectedRows: (rows: number[]) => void
    ) => ReactNode
}

//     /** Options used to describe table */
//     options: PropTypes.shape({
//         caseSensitive: PropTypes.bool,
//         columnOrder: PropTypes.array,
//         count: PropTypes.number,
//         confirmFilters: PropTypes.bool,
//         consoleWarnings: PropTypes.bool,
//         draggableColumns: PropTypes.object,
//         enableNestedDataAccess: PropTypes.string,
//         expandableRows: PropTypes.bool,
//         expandableRowsHeader: PropTypes.bool,
//         expandableRowsOnClick: PropTypes.bool,
//         disableToolbarSelect: PropTypes.bool,
//         download: PropTypes.oneOf([
//             true,
//             false,
//             'true',
//             'false',
//             'disabled'
//         ]),
//         downloadOptions: PropTypes.shape({
//             filename: PropTypes.string,
//             separator: PropTypes.string,
//             filterOptions: PropTypes.shape({
//                 useDisplayedColumnsOnly: PropTypes.bool,
//                 useDisplayedRowsOnly: PropTypes.bool
//             })
//         }),
//         filter: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
//         filterArrayFullMatch: PropTypes.bool,
//         fixedHeader: PropTypes.bool,
//         fixedSelectColumn: PropTypes.bool,
//         getTextLabels: PropTypes.func,
//         isRowExpandable: PropTypes.func,
//         isRowSelectable: PropTypes.func,
//         jumpToPage: PropTypes.bool,
//         onFilterChange: PropTypes.func,
//         onFilterChipClose: PropTypes.func,
//         onFilterConfirm: PropTypes.func,
//         onFilterDialogOpen: PropTypes.func,
//         onFilterDialogClose: PropTypes.func,
//         onRowClick: PropTypes.func,
//         onRowExpansionChange: PropTypes.func,
//         onRowSelectionChange: PropTypes.func,
//         page: PropTypes.number,
//         pagination: PropTypes.bool,
//         print: PropTypes.oneOf([true, false, 'true', 'false', 'disabled']),
//         selectableRowsHeader: PropTypes.bool,
//         selectableRowsHideCheckboxes: PropTypes.bool,
//         selectableRowsOnClick: PropTypes.bool,
//         serverSide: PropTypes.bool,
//         tableBodyHeight: PropTypes.string,
//         tableBodyMaxHeight: PropTypes.string,
//         renderExpandableRow: PropTypes.func,
//         resizableColumns: PropTypes.oneOfType([
//             PropTypes.bool,
//             PropTypes.object
//         ]),
//         responsive: PropTypes.oneOf([
//             'standard',
//             'vertical',
//             'verticalAlways',
//             'simple'
//         ]),
//         rowHover: PropTypes.bool,
//         rowsExpanded: PropTypes.array,
//         rowsPerPage: PropTypes.number,
//         rowsPerPageOptions: PropTypes.array,
//         rowsSelected: PropTypes.array,
//         setFilterChipProps: PropTypes.func,
//         setRowProps: PropTypes.func,
//         setTableProps: PropTypes.func,
//         sort: PropTypes.bool,
//         storageKey: PropTypes.string,
//         viewColumns: PropTypes.oneOf([
//             true,
//             false,
//             'true',
//             'false',
//             'disabled'
//         ])
//     }),
