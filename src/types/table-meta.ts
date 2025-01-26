import type { DataTableState } from '..'

export default interface DataTableMeta {
    columnData: DataTableState['columns'][0]
    columnIndex: number
    currentTableData: DataTableState['data']
    rowData: DataTableState['data']
    rowIndex: number
    tableData: DataTableState['data']
    tableState: DataTableState
}
