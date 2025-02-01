import type { MUIDataTableStateRows } from 'mui-datatables'
import type { DataTableSortOrderOption } from './options'
import type { DisplayDataState } from './state/display-data'
import type DataTableSearchOptions from './options/search'
import type { FilterList } from './state/filter-list'
import type { ColumnState } from './state/column'
import type { Primitive } from './values/primitive'
import type { SelectedRowDataState } from './state/selected-row-data'

export interface DataTableState<T> {
    activeColumn: number | null

    announceText?: string

    columnOrder: number[]

    columns: ColumnState<T>[]

    curExpandedRows?: MUIDataTableStateRows

    count: number

    data: {
        data: Primitive[]
        index: number
    }[]

    displayData: DisplayDataState

    expandedRows: {
        data: string[]
        lookup: object
    }

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

        lookup: boolean[]
    }

    showResponsive: boolean

    sortOrder: DataTableSortOrderOption | undefined
}
