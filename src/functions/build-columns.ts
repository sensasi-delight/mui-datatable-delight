import type { DataTableProps, DataTableState } from '@src/index'
import { warnDeprecated } from '.'

/*
 *  Build the source table data
 *
 *  newColumns - columns from the options object.
 *  prevColumns - columns object saved onto ths state.
 *  newColumnOrder - columnOrder from the options object.
 *  prevColumnOrder - columnOrder object saved onto the state.
 */
export default function buildColumns(
    newColumns: DataTableProps['columns'],
    prevColumns: DataTableState['columns'] = [],
    newColumnOrder: DataTableState['columnOrder'] | undefined,
    prevColumnOrder: DataTableState['columnOrder'] = []
) {
    const columnData: DataTableState['columns'] = []
    const filterData: DataTableState['filterData'] = []
    const filterList: DataTableState['filterList'] = []

    let columnOrder: number[] = []

    newColumns.forEach((column, colIndex) => {
        let columnOptions: DataTableState['columns'][0] = {
            display: 'true',
            empty: false,
            filter: true,
            sort: true,
            print: true,
            searchable: true,
            download: true,
            viewColumns: true,
            sortCompare: undefined,
            sortThirdClickReset: false,
            sortDescFirst: false
        }

        columnOrder.push(colIndex)

        const options = {
            ...(typeof column === 'string' ? {} : column.options)
        }

        if (typeof column === 'object') {
            if (options) {
                if (options.display !== undefined) {
                    options.display = options.display
                }

                if (options.sortDirection === null || options.sortDirection) {
                    warnDeprecated(
                        'The sortDirection column field has been deprecated. Please use the sortOrder option on the options object. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
                    )
                }
            }

            // remember stored version of display if not overwritten
            if (
                typeof options.display === 'undefined' &&
                prevColumns[colIndex] &&
                prevColumns[colIndex]?.name === column.name &&
                prevColumns[colIndex]?.display
            ) {
                options.display = prevColumns[colIndex]?.display
            }

            columnOptions = {
                name: column.name,
                label: column.label ? column.label : column.name,
                ...columnOptions,
                ...options
            }
        } else {
            // remember stored version of display if not overwritten
            if (prevColumns[colIndex] && prevColumns[colIndex]?.display) {
                options.display = prevColumns[colIndex]?.display
            }

            columnOptions = {
                ...columnOptions,
                ...options,
                name: column,
                label: column
            }
        }

        columnData.push(columnOptions)

        filterData[colIndex] = []
        filterList[colIndex] = []
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
