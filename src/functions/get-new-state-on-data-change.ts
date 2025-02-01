import { isValidElement } from 'react'
import type { DataTableProps } from '../types'
import type {
    DataTableOptions,
    DataTableSortOrderOption
} from '../types/options'
import type { DataTableState } from '../types/state'
import { getCollatorComparator } from './get-collator-comparator'
import transformData from './transform-data'
import { warnDeprecated } from './warn-deprecated'
import buildColumns from './build-columns'
import sortTable from './sort-table'
import getDisplayData from './get-new-state-on-data-change/get-display-data'
import getTableMeta from './get-new-state-on-data-change/get-table-meta'
import type DataTableMeta from '@src/types/table-meta'

enum TABLE_LOAD {
    INITIAL = 1,
    UPDATE = 2
}

/**
 * ⚠️ This JSDoc is generated by AI ⚠️
 * -
 *
 * Builds a new state object based on the latest props. This includes generating
 * the filterData, filterList, and displayData based on the columns, data, and
 * options.
 *
 * @param props - The properties of the data table.
 * @param status - The status of the data table.
 * @param dataUpdated - A boolean indicating whether the data has been updated.
 * @param options - Configuration options for the data table.
 * @param state - The current state of the data table.
 * @returns The updated state of the data table.
 */
export default function getNewStateOnDataChange<T>(
    props: DataTableProps<T>,
    status: TABLE_LOAD,
    dataUpdated: boolean,
    options: DataTableOptions<T>,
    state: DataTableState<T>,
    setState: (newState: DataTableState<T>) => void
): DataTableState<T> {
    const { columns, filterData, filterList, columnOrder } = buildColumns(
        props.columns,
        state.columns,
        options.columnOrder,
        state.columnOrder
    )

    let sortIndex: number | null = null
    let sortDirection: DataTableSortOrderOption['direction'] = 'none'
    let tableMeta: DataTableMeta<T> | undefined

    const data =
        status === TABLE_LOAD.INITIAL
            ? transformData(columns, props.data, options)
            : props.data

    const rowsPerPage = options.rowsPerPage ?? state.rowsPerPage
    const page = options.page ?? state.page
    const sortOrder = options.sortOrder ?? state.sortOrder

    let tableData: DataTableState<T>['data'] = []

    columns.forEach((column, colIndex) => {
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
            let value: unknown =
                status === TABLE_LOAD.INITIAL
                    ? data?.[rowIndex]?.[colIndex]
                    : data[rowIndex]?.data[colIndex]

            if (typeof tableData[rowIndex] === 'undefined') {
                tableData.push({
                    index:
                        status === TABLE_LOAD.INITIAL
                            ? rowIndex
                            : data[rowIndex]?.index,
                    data:
                        status === TABLE_LOAD.INITIAL
                            ? data[rowIndex]
                            : data[rowIndex]?.data
                })
            }

            if (column.filter !== false) {
                if (typeof column.customBodyRender === 'function') {
                    const rowData = tableData[rowIndex]?.data

                    tableMeta = getTableMeta(
                        rowIndex,
                        colIndex,
                        rowData,
                        column,
                        data,
                        state,
                        tableData
                    )

                    const funcResult = column.customBodyRender(value, tableMeta)

                    if (isValidElement(funcResult) && funcResult.props.value) {
                        value = funcResult.props.value
                    } else if (typeof funcResult === 'string') {
                        value = funcResult
                    }
                }

                if (
                    typeof value === 'object' &&
                    !Array.isArray(value) &&
                    value !== null
                ) {
                    value = value.toString ? value.toString() : ''
                }

                if (
                    !filterData[colIndex]?.includes(value as string) &&
                    !Array.isArray(value)
                ) {
                    filterData[colIndex]?.push(value as string)
                } else if (Array.isArray(value)) {
                    value.forEach(element => {
                        let elmVal: string
                        if (
                            (typeof element === 'object' && element !== null) ||
                            typeof element === 'function'
                        ) {
                            elmVal = element.toString ? element.toString() : ''
                        } else {
                            elmVal = element
                        }

                        if (!filterData[colIndex]?.includes(elmVal)) {
                            filterData[colIndex]?.push(elmVal)
                        }
                    })
                }
            }
        }

        if (column.filterOptions) {
            if (Array.isArray(column.filterOptions)) {
                filterData[colIndex] = column.filterOptions
                warnDeprecated(
                    'filterOptions must now be an object. see https://github.com/gregnb/mui-datatables/tree/master/examples/customize-filter example'
                )
            } else if (Array.isArray(column.filterOptions.names)) {
                filterData[colIndex] = column.filterOptions.names
            }
        }

        if (column.filterList) {
            filterList[colIndex] = column.filterList
        } else if ((state.filterList[colIndex]?.length ?? 0) > 0) {
            filterList[colIndex] = state.filterList[colIndex]
        }

        if (options.sortFilterList) {
            const comparator = getCollatorComparator()
            filterData[colIndex].sort(comparator)
        }

        if (column.name === sortOrder?.name) {
            sortDirection = sortOrder?.direction
            sortIndex = colIndex
        }
    })

    let selectedRowsData: DataTableState<T>['selectedRows'] = {
        data: [],
        lookup: {}
    }

    let expandedRowsData: DataTableState<T>['expandedRows'] = {
        data: [],
        lookup: {}
    }

    if (status === TABLE_LOAD.INITIAL) {
        if (
            options.rowsSelected?.length &&
            options.selectableRows === 'multiple'
        ) {
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
                        if (state.displayData[cIndex].dataIndex === row) {
                            rowPos = cIndex
                            break
                        }
                    }

                    selectedRowsData.data.push({
                        index: rowPos,
                        dataIndex: row
                    })
                    selectedRowsData.lookup[row] = true
                })
        } else if (
            options.rowsSelected &&
            options.rowsSelected.length === 1 &&
            options.selectableRows === 'single'
        ) {
            let rowPos = options.rowsSelected[0]

            for (let cIndex = 0; cIndex < state.displayData.length; cIndex++) {
                if (
                    state.displayData[cIndex].dataIndex ===
                    options.rowsSelected[0]
                ) {
                    rowPos = cIndex
                    break
                }
            }

            selectedRowsData.data.push({
                index: rowPos,
                dataIndex: options.rowsSelected[0]
            })
            selectedRowsData.lookup[options.rowsSelected[0]] = true
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

        if (options.rowsExpanded?.length && options.expandableRows) {
            options.rowsExpanded.forEach(row => {
                let rowPos = row

                for (
                    let cIndex = 0;
                    cIndex < state.displayData.length;
                    cIndex++
                ) {
                    if (state.displayData[cIndex].dataIndex === row) {
                        rowPos = cIndex
                        break
                    }
                }

                expandedRowsData.data.push({
                    index: rowPos,
                    dataIndex: row
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
    }

    if (!options.serverSide && sortIndex !== null) {
        const sortedData = sortTable(
            tableData,
            sortIndex,
            sortDirection,
            columns[sortIndex]?.sortCompare,
            options,
            state
        )

        tableData = sortedData.data
    }

    const searchText =
        status === TABLE_LOAD.INITIAL
            ? (options?.searchText ?? state.searchText)
            : state.searchText

    const newState: DataTableState<T> = {
        ...state,
        count: options.count ?? tableData.length,
        columnOrder,
        columns,
        expandedRows: expandedRowsData,
        data: tableData,
        filterData,
        filterList,
        page,
        rowsPerPage,
        searchText,
        selectedRows: selectedRowsData,
        sortOrder
    }

    return {
        ...newState,
        displayData: getDisplayData(
            columns,
            tableData,
            filterList,
            searchText,
            tableMeta,
            props,
            newState,
            options,
            setState
        )
    }
}
