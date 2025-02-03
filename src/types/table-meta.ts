import type { DataTableState } from './state'
import type { ColumnState } from './state/column'
import type { DataItemState } from './state/data-item'

export default interface DataTableMeta<T> {
    columnData: ColumnState<T>
    columnIndex: number
    currentTableData: DataItemState[]
    rowData: DataItemState[]
    rowIndex: number
    tableData: DataItemState[]
    tableState: DataTableState<T>
}
