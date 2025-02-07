import type { DataTableSortOrderOption } from './options'
import type { DisplayDataState } from './state/display-data'
import type DataTableSearchOptions from './options/search'
import type { FilterList } from './state/filter-list'
import type { ColumnState } from './state/column'
import type { SelectedRowDataState } from './state/selected-row-data'
import type { DataItemState } from './state/data-item'

interface ExpandedRows {
    data: { index: number; dataIndex: number }[]
    lookup: Record<number, boolean>
}

export interface DataTableState<T> {
    activeColumn: number | null

    announceText?: string

    columnOrder: number[]

    columns: ColumnState<T>[]

    curExpandedRows?: ExpandedRows['data']

    count: number

    data: DataItemState[]

    displayData: DisplayDataState

    expandedRows: ExpandedRows

    /** All data per column */
    filterData: string[][]

    /** Filtered values per column */
    filterList: FilterList

    /** Current page number starting from 0 */
    page: number

    previousSelectedRow?: SelectedRowDataState

    /** Current rows per page */
    rowsPerPage: number

    /** Available rows per page */
    rowsPerPageOptions: number[]

    /** ⚠️ PENDING ⚠️ */
    rowsSelected: number[]

    /**
     * Search text
     */
    searchText: string

    searchProps: DataTableSearchOptions<T>['searchProps']

    /**
     * Current row selected or not
     */
    selectedRows: {
        data: SelectedRowDataState[]
        lookup: Record<number, boolean>
    }

    showResponsive: boolean

    sortOrder: DataTableSortOrderOption | undefined
}
