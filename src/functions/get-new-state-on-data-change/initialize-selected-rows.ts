import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'

export function initializeSelectedRows<T>(
    options: DataTableOptions<T>,
    state: DataTableState<T>,
    dataUpdated: boolean
): DataTableState<T>['selectedRows'] {
    let selectedRowsData: DataTableState<T>['selectedRows'] = {
        data: [],
        lookup: {}
    }

    if (options.rowsSelected?.length && options.selectableRows === 'multiple') {
        options.rowsSelected
            .filter(
                selectedRowIndex =>
                    selectedRowIndex === 0 ||
                    (Number(selectedRowIndex) && selectedRowIndex > 0)
            )
            .forEach(row => {
                let rowPos = row

                for (
                    let cIndex = 0;
                    cIndex < state.displayData.length;
                    cIndex++
                ) {
                    if (state.displayData[cIndex]?.dataIndex === row) {
                        rowPos = cIndex
                        break
                    }
                }

                selectedRowsData.data.push({
                    dataIndex: row,
                    index: rowPos
                })
                selectedRowsData.lookup[row] = true
            })
    } else if (
        options.rowsSelected &&
        options.rowsSelected.length === 1 &&
        options.selectableRows === 'single'
    ) {
        const dataIndex = options.rowsSelected[0] ?? -1

        let rowPos = dataIndex

        for (let cIndex = 0; cIndex < state.displayData.length; cIndex++) {
            if (state.displayData[cIndex]?.dataIndex === dataIndex) {
                rowPos = cIndex

                break
            }
        }

        selectedRowsData.data.push({
            dataIndex,
            index: rowPos
        })

        selectedRowsData.lookup[dataIndex] = true
    } else if (
        options.rowsSelected &&
        options.rowsSelected.length > 1 &&
        options.selectableRows === 'single'
    ) {
        console.error(
            'Multiple values provided for selectableRows, but selectableRows set to "single". Either supply only a single value or use "multiple".'
        )
    } else if (
        typeof options.rowsSelected === 'undefined' &&
        dataUpdated === false
    ) {
        if (state.selectedRows) {
            selectedRowsData = { ...state.selectedRows }
        }
    }

    return selectedRowsData
}
