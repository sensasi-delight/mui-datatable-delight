import type { DataTableProps } from '@src/data-table.props'
import type { DataTableState } from '@src/types/state'
import type { ColumnState } from '@src/types/state/column'

/*
 * Build the source table data
 *
 * newColumns - columns from the options object.
 * prevColumns - columns object saved onto ths state.
 * newColumnOrder - columnOrder from the options object.
 * prevColumnOrder - columnOrder object saved onto the state.
 */
export default function buildColumns<T>(
    newColumns: DataTableProps<T>['columns'],
    prevColumns: DataTableState<T>['columns'] = [],
    newColumnOrder: DataTableState<T>['columnOrder'] | undefined,
    prevColumnOrder: DataTableState<T>['columnOrder'] = []
) {
    const filterData: DataTableState<T>['filterData'] = []
    const filterList: DataTableState<T>['filterList'] = []

    let columnOrder: number[] = []

    const columnData: ColumnState<T>[] = newColumns.map((column, colIndex) => {
        columnOrder.push(colIndex)

        filterData[colIndex] = []
        filterList[colIndex] = []

        const isColumnString = typeof column === 'string'

        const columnOptions = {
            download: true,
            empty: false,
            filter: true,
            label: isColumnString ? column : (column.label ?? column.name),
            name: isColumnString ? column : column.name,
            print: true,
            searchable: true,
            sort: true,
            sortCompare: undefined,
            sortDescFirst: false,
            sortThirdClickReset: false,
            viewColumns: true
        }

        function getOtherOptions() {
            if (isColumnString) {
                return {
                    // remember stored version of display if not overwritten
                    display: prevColumns[colIndex]?.display
                }
            }

            const options = {
                ...column.options,
                display: column.options?.display
            }

            if (
                typeof options.display === 'undefined' &&
                prevColumns[colIndex] &&
                prevColumns[colIndex]?.name === column.name &&
                prevColumns[colIndex]?.display
            ) {
                // remember stored version of display if not overwritten
                options.display = prevColumns[colIndex]?.display
            }

            return options
        }

        const otherOptions = getOtherOptions()

        const display =
            typeof otherOptions.display === 'undefined'
                ? true
                : otherOptions.display

        return {
            ...columnOptions,
            ...otherOptions,
            display
        }
    })

    if (Array.isArray(newColumnOrder)) {
        columnOrder = newColumnOrder
    } else if (
        Array.isArray(prevColumnOrder) &&
        Array.isArray(newColumns) &&
        Array.isArray(prevColumns) &&
        newColumns.length === prevColumns.length
    ) {
        columnOrder = prevColumnOrder
    }

    return { columnOrder, columns: columnData, filterData, filterList }
}
