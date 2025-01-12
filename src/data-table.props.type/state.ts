import type { DisplayData, MUIDataTableStateRows } from 'mui-datatables'
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
    data: DataItem[]
    displayData: DisplayData
    expandedRows: MUIDataTableStateRows
    filterData: string[][]
    filterList: string[][]
    page: number
    previousSelectedRow: null | { index: number; dataIndex: number }
    rowsPerPage: number
    rowsPerPageOptions: number[]
    rowsSelected: number[]
    searchText: string | null
    searchProps: React.HTMLAttributes<HTMLInputElement> | null
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
