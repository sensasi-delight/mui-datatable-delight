import type {
    DataTableOptions,
    DataTableSortOrderOption
} from '@src/types/options'
import { buildMap } from './_shared/build-map'
import { sortCompare } from './sort-compare'
import type { ColumnState } from '@src/types/state/column'
import type { DataItemState } from '@src/types/state/data-item'
import type { DataTableState } from '@src/types/state'
import type { SelectedRowDataState } from '@src/types/state/selected-row-data'

/**
 * ⚠️ This JSDoc is generated by AI ⚠️
 * -
 *
 * Sorts the table data based on the given column index and direction.
 *
 * @param  data  The full table data.
 * @param  col  The column index to sort by.
 * @param  order  The direction of the sort. If not provided, the default sort direction is used.
 * @param  column  The column meta data. If not provided, the default sort compare function is used.
 * @param  options  The table options.
 * @param  state  The current state of the table.
 * @return  An object with the sorted table data and the updated selected rows.
 */
export default function sortTable<T>(
    data: DataItemState[],
    col: number,
    order: DataTableSortOrderOption['direction'],
    column: ColumnState<T> | undefined,
    options: DataTableOptions<T>,
    state: DataTableState<T>
): {
    data: DataItemState[]
    selectedRows: DataTableState<T>['selectedRows']
} {
    console.log(column)
    const isSortByCustomSortOption = options.customSort && !column?.sortCompare

    const dataSrc = isSortByCustomSortOption
        ? options.customSort?.(
              data,
              col,
              order ?? (column?.sortDescFirst ? 'desc' : 'asc'),
              state
          )
        : data

    // reset the order by index
    let noSortData

    if (order === 'none') {
        noSortData = data.reduce<DataItemState[]>((r, dataItem) => {
            r[dataItem.index] = dataItem

            return r
        }, [])
    }

    const sortedData =
        dataSrc?.map((row, sIndex) => ({
            data: row.data[col],
            rowData: row.data,
            position: sIndex,
            rowSelected: state.selectedRows.lookup[row.index] ? true : false
        })) ?? []

    if (!isSortByCustomSortOption) {
        sortedData.sort(column?.sortCompare?.(order) ?? sortCompare(order))
    }

    const tableData: DataItemState[] = []
    const selectedRows: SelectedRowDataState[] = []

    sortedData.forEach((row, i) => {
        const dataItem = dataSrc?.[row?.position]

        if (!dataItem) return

        tableData.push(dataItem)

        if (row?.rowSelected) {
            selectedRows.push({
                index: i,
                dataIndex: dataItem.index
            })
        }
    })

    return {
        data: order === 'none' ? (noSortData ?? []) : tableData,
        selectedRows: {
            lookup: buildMap(selectedRows),
            data: selectedRows
        }
    }
}
