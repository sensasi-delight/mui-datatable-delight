import type { DataTableState } from '@src/index'
import type DataTableMeta from '@src/types/table-meta'

/**
 * ⚠️ This JSDoc is generated by AI ⚠️
 * -
 *
 * Creates a table meta object based on the row index, column index, row data,
 * column data, table data, and current state of the table.
 *
 * @param rowIndex - The current row index.
 * @param colIndex - The current column index.
 * @param rowData - The current row data.
 * @param columnData - The current column data.
 * @param tableData - The full table data.
 * @param curState - The current state of the table.
 * @param currentTableData - The current table data.
 * @return  A table meta object.
 */
export default function getTableMeta<T>(
    rowIndex: number,
    columnIndex: number,
    rowData: DataTableState<T>['data'][0],
    columnData: DataTableState<T>['columns'][0],
    tableData: DataTableState<T>['data'],
    curState: DataTableState<T>,
    currentTableData: DataTableState<T>['data']
): DataTableMeta<T> {
    return {
        columnIndex,
        columnData,
        currentTableData,
        rowData,
        rowIndex,
        tableData,
        tableState: curState
    }
}
