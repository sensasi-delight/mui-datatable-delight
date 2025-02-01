import type { MUIDataTableStateRows } from 'mui-datatables'
import type { DataTableSortOrderOption } from './options'
import type { DataTableColumnObject } from './columns'
import type { DisplayDataState } from './state/display-data'
import type DataTableSearchOptions from './options/search'
import type { FilterList } from './state/filter-list'

export interface DataTableState<DataRowItemType> {
    activeColumn: number | null

    announceText?: string

    columnOrder: number[]

    columns: Required<
        Omit<DataTableColumnObject<DataRowItemType>, 'options'> &
            DataTableColumnObject<DataRowItemType>['options']
    >[]

    curExpandedRows?: MUIDataTableStateRows

    count: number

    data: {
        data: DataRowItemType
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

    previousSelectedRow: null | { index: number; dataIndex: number }

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

    searchProps: DataTableSearchOptions['searchProps']

    /**
     * Current row selected or not
     */
    selectedRows: {
        data: {
            index: number
            dataIndex: number
        }[]

        lookup: boolean[]
    }

    showResponsive: boolean

    sortOrder: DataTableSortOrderOption | undefined
}
