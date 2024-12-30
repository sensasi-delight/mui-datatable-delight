import type {
    DisplayData,
    MUIDataTableColumnState,
    MUIDataTableStateRows
} from 'mui-datatables'

export interface DataTableState {
    activeColumn: string | null
    announceText: string | null
    columnOrder: number[]
    columns: MUIDataTableColumnState[]
    count: number
    data: any[]
    displayData: DisplayData
    expandedRows: MUIDataTableStateRows
    filterData: string[][]
    filterList: string[][]
    page: number
    previousSelectedRow: null | { index: number; dataIndex: number }
    rowsPerPage: number
    rowsPerPageOptions: number[]
    searchText: string | null
    searchProps: React.HTMLAttributes<HTMLInputElement> | null
    selectedRows: MUIDataTableStateRows
    showResponsive: boolean
    sortOrder?: {
        name: string
        direction: 'asc' | 'desc'
    }
}
