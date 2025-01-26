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
    const filterData: DataTableState['filterData'] = []
    const filterList: DataTableState['filterList'] = []

    let columnOrder: number[] = []

    const columnData: DataTableState['columns'] = newColumns.map(
        (column, colIndex) => {
            columnOrder.push(colIndex)
            filterData[colIndex] = []
            filterList[colIndex] = []

            const columnOptions: Partial<DataTableState['columns'][0]> = {
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

            function getOtherOptions(): Partial<DataTableState['columns'][0]> {
                if (typeof column === 'string') {
                    return {
                        // remember stored version of display if not overwritten
                        display: prevColumns[colIndex]?.display
                    }
                }

                const options =
                    { ...column.options, display: column.options?.display } ??
                    {}

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
                    ? 'true'
                    : otherOptions.display

            return typeof column === 'object'
                ? {
                      name: column.name,
                      label: column.label ? column.label : column.name,
                      ...columnOptions,
                      ...otherOptions,
                      display
                  }
                : {
                      ...columnOptions,
                      ...otherOptions,
                      name: column,
                      label: column,
                      display
                  }
        }
    )

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
