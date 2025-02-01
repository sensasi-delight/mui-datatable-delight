import type { DataTableProps, DataTableState } from '@src/index'
import { warnDeprecated } from '.'
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
            name: isColumnString ? column : column.name,
            label: isColumnString ? column : (column.label ?? column.name),
            download: true,
            empty: false,
            filter: true,
            print: true,
            searchable: true,
            sort: true,
            sortCompare: undefined,
            sortThirdClickReset: false,
            sortDescFirst: false,
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

            if (options.sortDirection === null || options.sortDirection) {
                warnDeprecated(
                    'The sortDirection column field has been deprecated. Please use the sortOrder option on the options object. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
                )
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

    return { columns: columnData, filterData, filterList, columnOrder }
}
