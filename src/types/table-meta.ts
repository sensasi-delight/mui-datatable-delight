import type { DataTableState } from '..'

export default interface DataTableMeta<T> {
    columnData: DataTableState<T>['columns'][0]
    columnIndex: number
    currentTableData: DataTableState<T>['data']
    rowData: DataTableState<T>['data']
    rowIndex: number
    tableData: DataTableState<T>['data']
    tableState: DataTableState<T>
}
