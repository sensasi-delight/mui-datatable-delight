// vendors
import type { ChipProps } from '@mui/material/Chip'
import type { MouseEvent, ReactNode } from 'react'
import type { TableProps } from '@mui/material/Table'
import type { TableRowProps } from '@mui/material/TableRow'
// locals
import type { BooleanOrDisabled } from './values/boolean-or-disabled'
import type { SelectedRowDataState } from './state/selected-row-data'
import type { DisplayDataState } from './state/display-data'
import type { SelectableRowsType } from './options/selectable-rows'
import type { ColumnState } from './state/column'
import type { DataItemState } from './state/data-item'
import type { DefaultRow } from './default-row'
import type { DataTableState } from './state'
import type { FilterTypeType } from './shared/filter-type-type'
import { DEFAULT_TEXT_LABELS } from '../hooks/use-data-table-context/function/statics/default-text-labels'
// enums
import type RowsSelectedToolbarPlacement from '../enums/rows-selected-toolbar-placement'
import type TableAction from '../enums/table-action'
import type DataTableSearchOptions from './options/search'

// Imported for linking documentation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ColumnDefinitionOptions } from './props/column-definition/options'

export interface DataTableSortOrderOption {
    /**
     * @todo  Type of name should be based on column name.
     */
    name: string
    direction: 'asc' | 'desc' | 'none'
}

export interface DataTableOptions<Row = DefaultRow>
    extends DataTableCustomsOptions<Row>,
        DataTableSearchOptions<Row> {
    /**
     * Enable/disable case sensitivity for search
     *
     * @default false
     */
    caseSensitive: boolean

    /**
     * Works in conjunction with the `customFilterDialogFooter` options and make is so filters have to be confirmed before being applied to the table.
     * When this option is `true`, the `customFilterDialogFooter` callback will receive an `applyFilters` function which, when called will apply the filter to the table.
     *
     * @see
     * [Server-side Filters Example](https://mui-datatable-delight.vercel.app/examples/server-side-filters)
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
    download: BooleanOrDisabled

    /**
     * An object of options to change the output of the csv file.
     *
     * @default downloadOptions.filename = 'tableDownload.csv'
     * @default downloadOptions.separator = ','
     */
    downloadOptions: {
        filename: string
        separator: string
        filterOptions?: {
            useDisplayedColumnsOnly?: boolean
            useDisplayedRowsOnly?: boolean
        }
    }

    /**
     * An object of options describing how dragging columns should work.
     * The options are:
     * `enabled: boolean` - Indicates if draggable columns are enabled. Default is `false`
     * `transitionTime: number` - The time in milliseconds it takes for columns to swap positions. Default is `300`.
     *
     * To disable the dragging of a particular column, see the "draggable" option in the columns options.
     * Dragging a column to a new position updates the columnOrder array and triggers the onColumnOrderChange callback.
     */
    draggableColumns: {
        enabled: boolean
        transitionTime: number
    }

    /**
     * Shadow depth applied to the `<Paper />` component.
     *
     * @default 4
     */
    elevation: number

    /**
     * If a non-empty string (ex: `"."`) is provided, it will use that value in the column's names to access nested data.
     *
     * For example, given a value of `"."` for `enableNestedDataAccess` and a column name of `"phone.cell"`, the column would use the value found in phone: `{ cell:"555-5555" }`
     *
     * Any amount of nesting will work.
     *
     * @todo  remove this and default behavior is always read nested data
     *
     * @deprecated  remove this and default behavior is always read nested data
     *
     * @see https://mui-datatable-delight.vercel.app/examples/data-as-objects
     */
    enableNestedDataAccess: string

    /**
     * Enable/disable expandable rows.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/expandable-rows
     *
     * @default false
     */
    expandableRows: boolean

    /**
     * Show/hide the expand all/collapse all row header for expandable row.
     *
     * @default true
     */
    expandableRowsHeader: boolean

    /**
     * Enable/disable expand trigger when row is clicked.
     * When false, only expand icon will trigger this action.
     *
     * @default false
     */
    expandableRowsOnClick: boolean

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    filter: BooleanOrDisabled

    /**
     * For array values, default checks if all the filter values are included in the array.
     * If false, checks if at least one of the filter values is in the array.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/array-value-columns
     *
     * @default true
     */
    filterArrayFullMatch: boolean

    /**
     * Choice of filtering view. Takes priority over global filterType option.
     *
     * Use 'custom' is you are supplying your own rendering via filterOptions.
     *
     * @default 'dropdown'
     *
     * @see  {@link FilterTypeType}
     */
    filterType: FilterTypeType

    /**
     * Enable/disable a fixed header for the table
     *
     * @see https://mui-datatable-delight.vercel.app/examples/fixed-header
     *
     * @default true
     */
    fixedHeader: boolean

    /** @deprecated use `fixedHeader` for **X** axis and `fixedSelectColumn` for **Y** axis */
    fixedHeaderOptions?: {
        /** @deprecated use `fixedHeader` */
        xAxis: boolean
        /** @deprecated use `fixedSelectColumn` */
        yAxis: boolean
    }

    /**
     * Enable/disable fixed select column.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/fixed-header
     *
     * @default true
     */
    fixedSelectColumn: boolean

    /**
     * Enable/disable expansion or collapse on certain expandable rows with custom function.
     * Returns `true` if not provided.
     */
    isRowExpandable?: (
        dataIndex: number,
        expandedRows: DataTableState<Row>['expandedRows']
    ) => boolean

    /** Enable/disable selection on certain rows with custom function. Returns true if not provided. */
    isRowSelectable?: (
        dataIndex: number,
        selectedRows: DataTableState<Row>['selectedRows']
    ) => boolean

    /**
     * When true, the option adds a dropdown to the table's footer that allows a user to navigate to a specific page.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/large-data-set
     *
     * @default false
     */
    jumpToPage: boolean

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

    /**
     * Callback function that triggers when a column has been sorted.
     */
    onColumnSortChange?: (
        /** Name of the column that was sorted */
        columnName: string,

        /** New sort order direction (`asc` or `desc`) */
        direction: DataTableSortOrderOption['direction']
    ) => void

    /**
     * @deprecated  Use {@link DataTableOptions.onColumnVisibilityChange | `onColumnVisibilityChange`} instead
     */
    onColumnViewChange?: never

    /**
     * A callback function that triggers when the user downloads the CSV file.
     * In the callback, you can control what is written to the CSV file.
     * Return false to cancel download of file.
     *
     * @see [Download Sheet Formatted CSV example](https://mui-datatatable-delight.vercel.app/examples/download-sheet-formatted-csv)
     * @see [On Download example](https://mui-datatatable-delight.vercel.app/examples/on-download)
     */
    onDownload?: (
        buildHead: (columns: ColumnState<Row>[]) => string,
        buildBody: (data: DataItemState[]) => string,
        columns: ColumnState<Row>[],
        data: DataItemState[]
    ) =>
        | {
              data: DisplayDataState
              columns: ColumnState<Row>[]
          }
        | string
        | false

    /** Callback function that triggers when filters have changed. */
    onFilterChange?: (
        changedColumn: ColumnState<Row> | null,
        filterList: DataTableState<Row>['filterList'],
        type: FilterTypeType | 'reset',
        changedColumnIndex: number | null,
        displayData: DisplayDataState
    ) => void

    /**
     * Callback function that is triggered when a user clicks the "X" on a filter chip.
     *
     * @see
     * [Server-side Filters Example](https://mui-datatable-delight.vercel.app/examples/server-side-filters)
     */
    onFilterChipClose?: (
        index: number,
        removedFilter: string | string[],
        filterList: DataTableState<Row>['filterList']
    ) => void

    /**
     * Callback function that is triggered when a user presses the "confirm" button on the filter popover.
     * This occurs only if you've set `confirmFilters` option to `true`.
     *
     * @see
     * [Server-side Filters Example](https://mui-datatable-delight.vercel.app/examples/server-side-filters)
     */

    onFilterConfirm?: (filterList: DataTableState<Row>['filterList']) => void

    /** Callback function that triggers when the filter dialog closes. */
    onFilterDialogClose?: () => void

    /** Callback function that triggers when the filter dialog opens. */
    onFilterDialogOpen?: () => void

    /** Callback function that triggers when a row is clicked. */
    onRowClick?: (
        rowData: ReactNode[],
        rowMeta: { dataIndex: number; rowIndex: number },
        event: React.MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>
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
            data: SelectedRowDataState[]
            lookup: Record<number, boolean>
        },
        newTableData: unknown[]
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    ) => void | false

    /** Callback function that triggers when row(s) are selected/deselected. */
    onRowSelectionChange?: (
        currentRowsSelected: unknown[],
        allRowsSelected: unknown[],
        rowsSelected?: number[]
    ) => void

    /**
     * Callback function that triggers when table state has changed.
     *
     * @see {@link TableAction} enum.
     * @see {@link DataTableState} interface.
     */
    onTableChange?: (
        action: TableAction,
        tableState: DataTableState<Row>
    ) => void

    /**
     * Callback function that triggers when table state has been initialized.
     *
     * @see {@link TableAction} enum.
     * @see {@link DataTableState} interface.
     */
    onTableInit?: (action: TableAction, tableState: DataTableState<Row>) => void

    /**
     * @deprecated  Use {@link DataTableOptions.onColumnVisibilityChange | `onColumnVisibilityChange`} instead
     */
    onViewColumnsChange?: (changedColumn: string, action: string) => void

    /**
     * Callback function that triggers when a column view has been changed.
     *
     * Previously known as {@link DataTableOptions.onColumnViewChange | `onColumnViewChange`} or {@link DataTableOptions.onViewColumnsChange | `onViewColumnsChange`}.
     */
    onColumnVisibilityChange?: (
        /** Name of the column that was changed */
        columnName: string,

        action: 'add' | 'remove'
    ) => void

    /**
     * User provided page for pagination
     */
    page?: number

    /**
     * Enable/disable pagination.
     *
     * @default true
     */
    pagination: boolean

    /**
     * Possible Values:
     * - true       = Button visible and clickable
     * - false      = Button not visible
     * - 'disabled' = Button is visible but not clickable
     *
     * @default true
     */
    print: BooleanOrDisabled

    /**
     * Render Expandable rows.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/expandable-rows
     */
    renderExpandableRow?: (
        rowData: ReactNode[],
        rowMeta: { dataIndex: number; rowIndex: number }
    ) => ReactNode

    /**
     * Set to `true` to allow users to resize columns by dragging the edges.
     *
     * @see https://mui-datatable-delight.vercel.app/docs/features/resizable-columns
     *
     * @default false
     */
    resizableColumns: boolean

    /**
     * Enable/disable responsive table view.
     * Options:
     * - 'vertical': In smaller view the table cells will collapse such that the heading is to the left of th cell value.
     * - 'standard': Table will stay in the standard mode but make small changes to better fit the allocated space.
     * - 'simple': On very small devices the table rows will collapse into simple display.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/simple
     *
     * @default 'vertical'
     */
    responsive:
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
    rowHover: boolean

    /** User provided expanded rows */
    rowsExpanded?: unknown[]

    /**
     * Number of rows allowed per page.
     *
     * @default 10
     */
    rowsPerPage: number

    /**
     * Options to provide in pagination for number of rows a user can select
     *
     * @default [10, 20, 50, 100]
     */
    rowsPerPageOptions: number[]

    /** User provided array of number (dataIndexes) which indicated the selected row. */
    rowsSelected?: number[]

    /**
     * Indicates if rows can be selected.
     *
     * @default 'multiple'
     */
    selectableRows: SelectableRowsType

    /**
     * Hides the checkboxes that appear when selectableRows is set to "multiple" or "single".
     * Can provide a more custom UX, especially when paired with selectableRowsOnClick.
     *
     * @default false
     */
    selectableRowsHideCheckboxes: boolean

    /**
     * Enable/disable select toggle when row is clicked.
     * When False, only checkbox will trigger this action.
     *
     * @default false
     */
    selectableRowsOnClick: boolean

    /**
     * Show/hide the select all/deselect all checkbox header for selectable rows.
     *
     * @default true
     */
    selectableRowsHeader: boolean

    /**
     * Controls the visibility of the Select Toolbar.
     *
     * Options:
     * - 'above': Appears above the default toolbar.
     * - `always`:
     * - 'none': Select Toolbar never appears
     * - 'replace': Select toolbar replaces default toolbar.
     *
     * @default 'replace'
     *
     * @see  {@link RowsSelectedToolbarPlacement}
     */
    selectToolbarPlacement: RowsSelectedToolbarPlacement

    /**
     * Enable remote data source
     *
     * @default false
     */
    serverSide: boolean

    /**
     * Is called for each filter chip and allows you to place custom props on a filter chip.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-filter
     */
    setFilterChipProps?: (
        colIndex: number,
        colName: string,
        data: readonly unknown[][]
    ) => Pick<ChipProps, 'color' | 'variant' | 'className'>

    /**
     * Is called for each row and allows you to return custom props for this row based on its data.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-styling
     */
    setRowProps?: (
        row: unknown[],
        dataIndex: number,
        rowIndex: number
    ) => TableRowProps

    /**
     * Is called for the table and allows you to return custom props for the table based on its data.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-styling
     */
    setTableProps?: () => TableProps

    /**
     * Enable/disable sort on all columns.
     *
     * @default true
     */
    sort: boolean

    /**
     * Enable/disable alphanumeric sorting of filter lists.
     *
     * @default true
     */
    sortFilterList: boolean

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
     *
     * @default 'auto'
     */
    tableBodyHeight: string

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
     *
     * @default true
     */
    viewColumns: BooleanOrDisabled

    /**
     * Local storage key used to store the table state.
     */
    storageKey?: string

    /**
     * @deprecated  Use `onRowExpansionChange` instead.
     *
     * @see  {@link onRowExpansionChange}
     */
    onRowsExpand?: DataTableOptions<Row>['onRowExpansionChange']

    /**
     * @deprecated Use `onRowSelectionChange` instead.
     *
     * @see  {@link onRowSelectionChange}
     */
    onRowsSelect?: DataTableOptions<Row>['onRowSelectionChange']

    /**
     * @deprecated  in favor of the {@link confirmFilters} option.
     */
    serverSideFilterList?: DataTableState<Row>['filterList']
}

interface DataTableCustomsOptions<Row> {
    /** Add a custom footer to the filter dialog. */
    customFilterDialogFooter?: (
        filterList: DataTableState<Row>['filterList'],
        applyNewFilters?: (...args: unknown[]) => unknown
    ) => ReactNode

    /**
     * Render a custom table footer.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-footer
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
     * @see https://mui-datatable-delight.vercel.app/examples/customize-rows
     */
    customRowRender?: (
        data: unknown[],
        dataIndex: number,
        rowIndex: number
    ) => ReactNode

    /**
     * Override default sorting with custom function.
     *
     * If you just need to override the sorting for a particular column, see the {@link ColumnDefinitionOptions.sortCompare | `sortCompare`} method in the Column options.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-sorting
     */
    customSort?: (
        data: DataItemState[],
        colIndex: number,
        order: string,
        state: DataTableState<Row>
    ) => DataItemState[]

    /**
     * Render a footer under the table body but above the table's standard footer.
     * This is useful for creating footers for individual columns.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-footer
     */
    customTableBodyFooterRender?: (
        state: DataTableState<Row>,
        options: DataTableOptions<Row>
    ) => ReactNode

    /**
     * Render a custom Toolbar.
     *
     * @see https://mui-datatable-delight.vercel.app/examples/customize-toolbar/CustomToolbar.tsx
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
            lookup: Record<number, boolean>
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
            lookup: Record<number, boolean>
        },
        displayData: DisplayDataState,
        setSelectedRows: (rows: number[]) => void
    ) => ReactNode
}
