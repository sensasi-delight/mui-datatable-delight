import type { MUIDataTableStateRows } from 'mui-datatables'
import type { DataTableSortOrderOption } from './options'
import { DataTableColumnObject } from './columns'
import { DefaultDataItem } from '.'

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
    searchText?: string
    searchProps: React.HTMLAttributes<HTMLInputElement> | null

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
