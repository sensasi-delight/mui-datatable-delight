import type { MUIDataTableStateRows } from 'mui-datatables'
import type { DataTableSortOrderOption } from './options'
import type { DataTableColumnObject } from './columns'
import type { DefaultDataItem } from '.'
import type DataTableSearchOptions from './options/search'

export interface DataTableState<DataItem = DefaultDataItem> {
    activeColumn: number | null
    announceText?: string
    columnOrder: number[]
    columns: (Omit<DataTableColumnObject, 'options'> &
        DataTableColumnObject['options'])[]
    curExpandedRows?: MUIDataTableStateRows
    count: number
    data: {
        index: number
        data: DataItem
    }[]
    displayData: {
        index: number
        data: DataItem
    }[]
    expandedRows: MUIDataTableStateRows
    filterData: string[][]
    filterList: string[][]
    page: number
    previousSelectedRow: null | { index: number; dataIndex: number }
    rowsPerPage: number
    rowsPerPageOptions: number[]
    rowsSelected: number[]

    /**
     * Search text
     */
    searchText: string

    searchProps: DataTableSearchOptions['searchProps']

    /**
     * Current row selected or not
     */
    selectedRows: StateRows
    showResponsive: boolean
    sortOrder?: DataTableSortOrderOption
}

interface StateRows {
    data: {
        index: number
        dataIndex: number
    }[]
    lookup: any
}
