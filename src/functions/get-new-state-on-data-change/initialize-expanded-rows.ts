import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'

export function initializeExpandedRows<T>(
    options: DataTableOptions<T>,
    state: DataTableState<T>,
    dataUpdated: boolean
): DataTableState<T>['expandedRows'] {
    let expandedRowsData: DataTableState<T>['expandedRows'] = {
        data: [],
        lookup: {}
    }

    if (options.rowsExpanded?.length && options.expandableRows) {
        options.rowsExpanded.forEach(row => {
            let rowPos = row

            for (let cIndex = 0; cIndex < state.displayData.length; cIndex++) {
                if (state.displayData[cIndex]?.dataIndex === row) {
                    rowPos = cIndex
                    break
                }
            }

            expandedRowsData.data.push({
                dataIndex: row,
                index: rowPos
            })
            expandedRowsData.lookup[row] = true
        })
    } else if (
        typeof options.rowsExpanded === 'undefined' &&
        dataUpdated === false &&
        state.expandedRows
    ) {
        expandedRowsData = { ...state.expandedRows }
    }

    return expandedRowsData
}
