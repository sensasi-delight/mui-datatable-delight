import { isValidElement } from 'react'
import type { DataTableProps } from '../types'
import type {
    DataTableOptions,
    DataTableSortOrderOption
} from '../types/options'
import type { DataTableState } from '../types/state'
import { getCollatorComparator } from './get-collator-comparator'
import transformData from './transform-data'
import { sortCompare as defaultSortCompare } from './sort-compare'
import { buildMap } from './_shared/build-map'
import { warnDeprecated } from './warn-deprecated'
import type { MUIDataTableMeta } from 'mui-datatables'

enum TABLE_LOAD {
    INITIAL = 1,
    UPDATE = 2
}

function hasSearchText(
    toSearch: string,
    toFind: string,
    caseSensitive: boolean
) {
    let stack = toSearch.toString()
    let needle = toFind.toString()

    if (!caseSensitive) {
        needle = needle.toLowerCase()
        stack = stack.toLowerCase()
    }

    return stack.indexOf(needle) >= 0
}

/*
 *  Build the source table data
 *
 *  newColumns - columns from the options object.
 *  prevColumns - columns object saved onto ths state.
 *  newColumnOrder - columnOrder from the options object.
 *  prevColumnOrder - columnOrder object saved onto the state.
 */
function buildColumns(
    newColumns: DataTableProps['columns'],
    prevColumns: DataTableState['columns'] = [],
    newColumnOrder: DataTableState['columnOrder'],
    prevColumnOrder: DataTableState['columnOrder'] = []
) {
    const columnData: DataTableState['columns'] = []
    let filterData: DataTableState['filterData'] = []
    let filterList: DataTableState['filterList'] = []
    let columnOrder: number[] = []

    newColumns.forEach((column, colIndex) => {
        let columnOptions: Partial<DataTableState['columns'][0]> = {
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
                    options.display = options.display.toString()
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
                prevColumns[colIndex].name === column.name &&
                prevColumns[colIndex].display
            ) {
                options.display = prevColumns[colIndex].display
            }

            columnOptions = {
                name: column.name,
                label: column.label ? column.label : column.name,
                ...columnOptions,
                ...options
            }
        } else {
            // remember stored version of display if not overwritten
            if (prevColumns[colIndex] && prevColumns[colIndex].display) {
                options.display = prevColumns[colIndex].display
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

function getTableMeta(
    rowIndex: number,
    colIndex: number,
    rowData,
    columnData,
    tableData,
    curState: DataTableState,
    currentTableData
) {
    const { columns, data, displayData, filterData, ...tableState } = curState

    return {
        rowIndex: rowIndex,
        columnIndex: colIndex,
        columnData: columnData,
        rowData: rowData,
        tableData: tableData,
        tableState: tableState,
        currentTableData: currentTableData
    }
}

export function sortTable(
    data: DataTableState['data'],
    col: number,
    order: DataTableSortOrderOption['direction'],
    column: DataTableState['columns'][0] | undefined,
    options: DataTableOptions,
    state: DataTableState
) {
    const isSortByCustomSortOption = options.customSort && !column?.sortCompare

    const meta = { selectedRows: state.selectedRows } // meta for customSort

    const dataSrc = isSortByCustomSortOption
        ? options.customSort?.(
              data,
              col,
              order ?? (column?.sortDescFirst ? 'desc' : 'asc'),
              meta
          )
        : data

    // reset the order by index
    let noSortData

    if (order === 'none') {
        noSortData = data.reduce((r, i) => {
            r[i.index] = i

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
        const sortCompareFn = column?.sortCompare ?? defaultSortCompare
        sortedData.sort(sortCompareFn(order))
    }

    const tableData = []
    const selectedRows = []

    for (let i = 0; i < sortedData.length; i++) {
        const row = sortedData[i]
        tableData.push(dataSrc?.[row.position])
        if (row.rowSelected) {
            selectedRows.push({
                index: i,
                dataIndex: dataSrc?.[row.position].index
            })
        }
    }

    return {
        data: order === 'none' ? noSortData : tableData,
        selectedRows: {
            lookup: buildMap(selectedRows),
            data: selectedRows
        }
    }
}

function updateDataCol(
    row: number,
    index: number,
    value: unknown,
    prevState: DataTableState,
    options: DataTableOptions,
    datatableProps: DataTableProps,
    setState: (newState: DataTableState) => void
) {
    let changedData = prevState.data
    let filterData = prevState.filterData

    const tableMeta = getTableMeta(
        row,
        index,
        row,
        prevState.columns[index],
        prevState.data,
        prevState,
        prevState.data
    )
    const funcResult = prevState.columns[index].customBodyRender?.(
        value,
        tableMeta
    )

    const filterValue =
        isValidElement(funcResult) && funcResult.props.value
            ? funcResult.props.value
            : prevState['data'][row][index]

    const prevFilterIndex = filterData[index].indexOf(filterValue)
    filterData[index].splice(prevFilterIndex, 1, filterValue)

    changedData[row].data[index] = value

    if (options.sortFilterList) {
        const comparator = getCollatorComparator()
        filterData[index].sort(comparator)
    }

    const newState: DataTableState = {
        ...prevState,
        data: changedData,
        filterData: filterData
    }

    newState.displayData = getDisplayData(
        prevState.columns,
        changedData,
        prevState.filterList,
        prevState.searchText,
        null,
        datatableProps,
        newState,
        options,
        setState
    )

    return newState
}

/*
 *  Build the table data used to display to the user (ie: after filter/search applied)
 */
function computeDisplayRow(
    columns: DataTableState['columns'],
    row: unknown[],
    rowIndex: number,
    filterList: DataTableState['filterList'],
    searchText: DataTableState['searchText'],
    dataForTableMeta,
    options: DataTableOptions,
    props: DataTableProps,
    currentTableData,
    state: DataTableState,
    setState: (newState: DataTableState) => void
) {
    let isFiltered = false
    let isSearchFound = false
    let displayRow = []

    for (let index = 0; index < row.length; index++) {
        let columnDisplay = row[index]
        let columnValue = row[index]
        let column = columns[index]

        if (column.customBodyRenderLite) {
            displayRow.push(column.customBodyRenderLite)
        } else if (column.customBodyRender) {
            const tableMeta = getTableMeta(
                rowIndex,
                index,
                row,
                column,
                dataForTableMeta,
                {
                    ...state,
                    filterList: filterList,
                    searchText: searchText
                },
                currentTableData
            )

            const funcResult = column.customBodyRender(
                columnValue,
                tableMeta,
                value => {
                    setState(
                        updateDataCol(
                            rowIndex,
                            index,
                            value,
                            state,
                            options,
                            props
                        )
                    )
                }
            )
            columnDisplay = funcResult

            /* drill down to get the value of a cell */
            columnValue =
                typeof funcResult === 'string' || !funcResult
                    ? funcResult
                    : funcResult.props && funcResult.props.value
                      ? funcResult.props.value
                      : columnValue

            displayRow.push(columnDisplay)
        } else {
            displayRow.push(columnDisplay)
        }

        const columnVal =
            columnValue === null || columnValue === undefined
                ? ''
                : columnValue.toString()

        const filterVal = filterList[index]
        const caseSensitive = options.caseSensitive
        const filterType = column.filterType ?? options.filterType

        if (filterVal.length || filterType === 'custom') {
            if (column.filterOptions && column.filterOptions.logic) {
                if (column.filterOptions.logic(columnValue, filterVal, row))
                    isFiltered = true
            } else if (
                filterType === 'textField' &&
                !hasSearchText(columnVal, filterVal, caseSensitive)
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                Array.isArray(columnValue) === false &&
                filterVal.indexOf(columnValue) < 0
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                Array.isArray(columnValue)
            ) {
                if (options.filterArrayFullMatch) {
                    //true if every filterVal exists in columnVal, false otherwise
                    const isFullMatch = filterVal.every(el => {
                        return columnValue.indexOf(el) >= 0
                    })
                    //if it is not a fullMatch, filter row out
                    if (!isFullMatch) {
                        isFiltered = true
                    }
                } else {
                    const isAnyMatch = filterVal.some(el => {
                        return columnValue.indexOf(el) >= 0
                    })
                    //if no value matches, filter row out
                    if (!isAnyMatch) {
                        isFiltered = true
                    }
                }
            }
        }

        if (
            searchText &&
            column.display !== 'excluded' &&
            hasSearchText(columnVal, searchText, caseSensitive) &&
            column.display !== 'false' &&
            column.searchable
        ) {
            isSearchFound = true
        }
    }

    const { customSearch } = props.options ?? {}

    if (searchText && customSearch) {
        const customSearchResult = customSearch(searchText, row, columns)
        if (typeof customSearchResult !== 'boolean') {
            console.error('customSearch must return a boolean')
        } else {
            isSearchFound = customSearchResult
        }
    }

    if (options.serverSide) {
        if (customSearch) {
            console.warn(
                'Server-side filtering is enabled, hence custom search will be ignored.'
            )
        }

        return displayRow
    }

    if (isFiltered || (searchText && !isSearchFound)) return null
    else return displayRow
}

export function getDisplayData(
    columns: DataTableState['columns'],
    data: DataTableState['data'],
    filterList: DataTableState['filterList'],
    searchText: DataTableState['searchText'],
    tableMeta: MUIDataTableMeta,
    props: DataTableProps,
    state: DataTableState,
    options: DataTableOptions,
    setState: (newState: DataTableState) => void
): DataTableState['displayData'] {
    const newRows = []
    const dataForTableMeta = tableMeta ? tableMeta.tableData : props.data

    for (let index = 0; index < data.length; index++) {
        const value = data[index].data
        const displayRow = computeDisplayRow(
            columns,
            value,
            index,
            filterList,
            searchText,
            dataForTableMeta,
            options,
            props,
            data,
            state,
            setState
        )

        if (displayRow) {
            newRows.push({
                data: displayRow,
                dataIndex: data[index].index
            })
        }
    }

    return newRows
}

export function getNewStateOnDataChange(
    props: DataTableProps,
    status: 1 | 2,
    dataUpdated: boolean,
    options: DataTableOptions,
    state: DataTableState,
    setState?: (newState: DataTableState) => void
) {
    const { columns, filterData, filterList, columnOrder } = buildColumns(
        props.columns,
        state.columns,
        options.columnOrder,
        state.columnOrder
    )

    let sortIndex = null
    let sortDirection = 'none'

    let tableMeta

    const data =
        status === TABLE_LOAD.INITIAL
            ? transformData(columns, props.data, options)
            : props.data

    const rowsPerPage = options.rowsPerPage ?? state.rowsPerPage
    const page = options.page ?? state.page
    const sortOrder = options.sortOrder ?? state.sortOrder

    let tableData = []

    columns.forEach((column, colIndex) => {
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
            let value =
                status === TABLE_LOAD.INITIAL
                    ? data[rowIndex][colIndex]
                    : data[rowIndex].data[colIndex]

            if (typeof tableData[rowIndex] === 'undefined') {
                tableData.push({
                    index:
                        status === TABLE_LOAD.INITIAL
                            ? rowIndex
                            : data[rowIndex].index,
                    data:
                        status === TABLE_LOAD.INITIAL
                            ? data[rowIndex]
                            : data[rowIndex].data
                })
            }

            if (column.filter !== false) {
                if (typeof column.customBodyRender === 'function') {
                    const rowData = tableData[rowIndex].data
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
                    // it's extremely rare but possible to create an object without a toString method, ex: var x = Object.create(null);
                    // so this check has to be made
                    value = value.toString ? value.toString() : ''
                }

                if (
                    filterData[colIndex].indexOf(value) < 0 &&
                    !Array.isArray(value)
                ) {
                    filterData[colIndex].push(value)
                } else if (Array.isArray(value)) {
                    value.forEach(element => {
                        let elmVal
                        if (
                            (typeof element === 'object' && element !== null) ||
                            typeof element === 'function'
                        ) {
                            elmVal = element.toString ? element.toString() : ''
                        } else {
                            elmVal = element
                        }

                        if (filterData[colIndex].indexOf(elmVal) < 0) {
                            filterData[colIndex].push(elmVal)
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
        } else if (
            state.filterList &&
            state.filterList[colIndex] &&
            state.filterList[colIndex].length > 0
        ) {
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

    let selectedRowsData = {
        data: [],
        lookup: {}
    }

    let expandedRowsData = {
        data: [],
        lookup: {}
    }

    if (status === TABLE_LOAD.INITIAL) {
        // Multiple row selection customization
        if (
            options.rowsSelected &&
            options.rowsSelected.length &&
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

            // Single row selection customization
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
                selectedRowsData = Object.assign({}, state.selectedRows)
            }
        }

        if (
            options.rowsExpanded &&
            options.rowsExpanded.length &&
            options.expandableRows
        ) {
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
            expandedRowsData = Object.assign({}, state.expandedRows)
        }
    }

    if (!options.serverSide && sortIndex !== null) {
        const sortedData = sortTable(
            tableData,
            sortIndex,
            sortDirection,
            columns[sortIndex].sortCompare,
            options,
            state
        )
        tableData = sortedData.data
    }

    const searchText =
        status === TABLE_LOAD.INITIAL ? options?.searchText : state.searchText

    /* set source data and display Data set source set */
    const newState = {
        ...state,
        columns: columns,
        filterData: filterData,
        filterList: filterList,
        searchText: searchText,
        selectedRows: selectedRowsData,
        expandedRows: expandedRowsData,
        count: options.count ?? tableData.length,
        data: tableData,
        sortOrder: sortOrder,
        rowsPerPage,
        page,
        columnOrder
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
