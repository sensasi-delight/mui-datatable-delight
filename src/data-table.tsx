'use client'

// types
import type { DataTableProps } from './data-table.props.type'
// vendors
import { DndProvider } from 'react-dnd'
import { Paper, Table as MuiTable, TableProps } from '@mui/material'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeStyles } from 'tss-react/mui'
import clsx from 'clsx'
import React, { createRef, type ReactNode, type RefObject } from 'react'
// locals
import { getPageValue } from './functions.shared/get-page-value'
import {
    buildMap,
    cloneDeep,
    getCollatorComparator,
    load,
    save,
    sortCompare,
    transformData,
    warnDeprecated,
    warnInfo
} from './functions'
import type {
    DisplayData,
    MUIDataTableColumnState,
    MUIDataTableState,
    MUIDataTableStateRows
} from 'mui-datatables'
import { STP, type DataTableOptions } from './data-table.props.type/options'
import type { DataTableState } from './data-table.props.type/state'
import {
    MainContext,
    MainContextProvider,
    useMainContext
} from './hooks/use-main-context'

/**
 * A responsive DataTable component built with Material UI for React-based project.
 *
 * @see https://mui-datatable-delight.vercel.app
 */
export function DataTable({ components, className, ...props }: DataTableProps) {
    const { classes, cx } = useStyles()
    const rootRef = createRef<HTMLDivElement>()

    const paperClasses = cx(
        ['scrollFullHeightFullWidth', 'stackedFullWidth'].some(
            responsive => props.options?.responsive === responsive
        )
            ? classes.paperResponsiveScrollFullHeightFullWidth
            : '',
        className
    )

    return (
        <MainContextProvider
            datatableProps={{
                components,
                className,
                ...props
            }}
        >
            <Paper
                elevation={props.options?.elevation}
                ref={rootRef}
                className={paperClasses}
            >
                <MUIDataTableClass
                    classes={classes}
                    getRootRef={() => rootRef}
                    {...props}
                />
            </Paper>
        </MainContextProvider>
    )
}

const useStyles = makeStyles({
    name: 'datatable-delight'
})(theme => ({
    root: {
        '& .datatables-noprint': {
            '@media print': {
                display: 'none'
            }
        }
    },
    paper: {
        isolation: 'isolate'
    },
    paperResponsiveScrollFullHeightFullWidth: {
        position: 'absolute'
    },
    tableRoot: {
        outline: 'none'
    },
    responsiveBase: {
        overflow: 'auto',
        '@media print': {
            height: 'auto !important'
        }
    },

    // deprecated, but continuing support through v3.x
    responsiveScroll: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollMaxHeight: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollFullHeight: {
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveStacked: {
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            overflow: 'hidden'
        }
    },
    // deprecated, but continuing support through v3.x
    responsiveStackedFullWidth: {},

    liveAnnounce: {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px'
    }
}))

class MUIDataTableClass extends React.Component<
    Omit<DataTableProps, 'components'> & {
        classes: ReturnType<typeof useStyles>['classes']
        getRootRef: () => RefObject<HTMLDivElement | null>
    },
    MUIDataTableState
> {
    declare context: ReturnType<typeof useMainContext>
    static contextType = MainContext

    options: DataTableOptions
    tableRef: RefObject<HTMLTableElement | null>
    draggableHeadCellRefs: HTMLTableCellElement[]
    setHeadResizable: (
        tableHeadCellElements: HTMLTableCellElement[],
        tableRef: HTMLTableElement
    ) => void
    tableHeadCellElements: HTMLTableCellElement[]
    timers: unknown
    updateDividers: () => void

    constructor(
        props: DataTableProps & {
            classes: ReturnType<typeof useStyles>['classes']
            getRootRef: () => RefObject<HTMLDivElement | null>
        }
    ) {
        super(props)

        this.tableRef = createRef()
        this.draggableHeadCellRefs = []
        this.tableHeadCellElements = []
        this.timers = {}
        this.setHeadResizable = () => {}
        this.updateDividers = () => {}

        this.options = getConstructedOption(props?.options)

        const restoredState = props.options?.storageKey
            ? load(props.options.storageKey)
            : undefined

        this.state = {
            ...DEFAULT_STATE,
            ...(restoredState ?? getInitTableOptions(props?.options))
        }

        this.setTableData = this.setTableData.bind(this)

        this.setTableData(props, TABLE_LOAD.INITIAL, true, () => {}, true)
    }

    componentDidMount() {
        if (this.tableRef.current) {
            this.setHeadResizable(
                this.tableHeadCellElements,
                this.tableRef.current
            )
        }

        // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
        if (this.props.options?.searchText && !this.props.options?.serverSide)
            this.setState({ page: 0 })

        this.setTableInit('tableInitialized')
    }

    componentDidUpdate(prevProps: DataTableProps) {
        if (
            this.props.data !== prevProps.data ||
            this.props.columns !== prevProps.columns ||
            this.props.options !== prevProps.options
        ) {
            this.updateOptions(this.options, this.props)

            var didDataUpdate = this.props.data !== prevProps.data
            if (this.props.data && prevProps.data) {
                didDataUpdate =
                    didDataUpdate &&
                    this.props.data.length === prevProps.data.length
            }

            this.setTableData(
                this.props,
                TABLE_LOAD.INITIAL,
                didDataUpdate,
                () => {
                    this.setTableAction('propsUpdate')
                }
            )
        }

        if (
            this.props.options?.searchText !== prevProps.options?.searchText &&
            !this.props.options?.serverSide
        ) {
            // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
            this.setState({ page: 0 })
        }

        if (this.options.resizableColumns && this.tableRef.current) {
            this.setHeadResizable(
                this.tableHeadCellElements,
                this.tableRef.current
            )
            this.updateDividers()
        }
    }

    updateOptions(options: DataTableOptions, props: DataTableProps) {
        // set backwards compatibility options
        if (
            props.options?.disableToolbarSelect === true &&
            props.options?.selectToolbarPlacement === undefined
        ) {
            // if deprecated option disableToolbarSelect is set and selectToolbarPlacement is default then use it
            props.options.selectToolbarPlacement = STP.NONE
        }

        // provide default tableId when no tableId has been passed as prop
        // DISABLED FOR NOW (https://github.com/sensasi-delight/mui-datatable-delight/issues/46)
        // if (!props.options.tableId) {
        // props.options.tableId = (Math.random() + '').replace(/\./, '')
        // }

        this.options = {
            ...options,
            ...(props.options ?? {}),
            downloadOptions: {
                ...options.downloadOptions,
                ...props.options?.downloadOptions
            }
        }

        handleOptionDeprecation(props, this.options)
    }

    setTableAction = (action: string) => {
        if (this.options?.onTableChange) {
            this.options.onTableChange(action, this.state)
        }

        if (this.options?.storageKey) {
            save(this.options.storageKey, this.state)
        }
    }

    setTableInit = (action: string) => {
        if (this.options?.onTableInit) {
            this.options.onTableInit(action, this.state)
        }
    }

    setHeadCellRef = (index: number, pos: number, el: HTMLTableCellElement) => {
        this.draggableHeadCellRefs[index] = el
        this.tableHeadCellElements[pos] = el
    }

    // must be arrow function on local field to refer to the correct instance when passed around
    // assigning it as arrow function in the JSX would cause hard to track re-render errors
    getCurrentRootRef = () => this.props.getRootRef().current

    /*
     *  Build the source table data
     *
     *  newColumns - columns from the options object.
     *  prevColumns - columns object saved onto ths state.
     *  newColumnOrder - columnOrder from the options object.
     *  prevColumnOrder - columnOrder object saved onto the state.
     */
    buildColumns = (
        newColumns: DataTableProps['columns'],
        prevColumns: DataTableState['columns'] = [],
        newColumnOrder: DataTableState['columnOrder'],
        prevColumnOrder: DataTableState['columnOrder'] = []
    ) => {
        const columnData: DataTableState['columns'] = []
        let filterData = []
        let filterList = []
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

                    if (
                        options.sortDirection === null ||
                        options.sortDirection
                    ) {
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

    setTableData(
        props: DataTableProps,
        status: TABLE_LOAD,
        dataUpdated: boolean,
        callback: () => void = () => {},
        fromConstructor: boolean = false
    ) {
        let tableData = []

        let { columns, filterData, filterList, columnOrder } =
            this.buildColumns(
                props.columns,
                this.state.columns,
                this.options.columnOrder,
                this.state.columnOrder
            )

        let sortIndex = null
        let sortDirection = 'none'
        let tableMeta

        let sortOrder
        if (
            this.options.sortOrder &&
            this.options.sortOrder.direction &&
            this.options.sortOrder.name
        ) {
            sortOrder = Object.assign({}, this.options.sortOrder)
        } else {
            sortOrder = Object.assign({}, this.state.sortOrder)

            // if no sortOrder, check and see if there's a sortDirection on one of the columns (deprecation notice for this is given above)
            if (!sortOrder.direction) {
                props.columns.forEach(column => {
                    if (
                        column.options &&
                        (column.options.sortDirection === 'asc' ||
                            column.options.sortDirection === 'desc')
                    ) {
                        sortOrder.name = column.name
                        sortOrder.sortDirection = column.sortDirection
                    }
                })
            }
        }

        const data =
            status === TABLE_LOAD.INITIAL
                ? transformData(columns, props.data, this.options)
                : props.data
        let searchText =
            status === TABLE_LOAD.INITIAL ? this.options?.searchText : null

        if (
            typeof this.options.searchText === 'undefined' &&
            typeof this.state.searchText !== 'undefined'
        ) {
            searchText = this.state.searchText
        }

        let rowsPerPage = this.state.rowsPerPage
        if (typeof this.options.rowsPerPage === 'number') {
            rowsPerPage = this.options.rowsPerPage
        }

        let page = this.state.page
        if (typeof this.options.page === 'number') {
            page = this.options.page
        }

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
                        tableMeta = this.getTableMeta(
                            rowIndex,
                            colIndex,
                            rowData,
                            column,
                            data,
                            this.state,
                            tableData
                        )
                        const funcResult = column.customBodyRender(
                            value,
                            tableMeta
                        )

                        if (
                            React.isValidElement(funcResult) &&
                            funcResult.props.value
                        ) {
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
                                (typeof element === 'object' &&
                                    element !== null) ||
                                typeof element === 'function'
                            ) {
                                elmVal = element.toString
                                    ? element.toString()
                                    : ''
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
                    filterData[colIndex] = cloneDeep(column.filterOptions)
                    warnDeprecated(
                        'filterOptions must now be an object. see https://github.com/gregnb/mui-datatables/tree/master/examples/customize-filter example'
                    )
                } else if (Array.isArray(column.filterOptions.names)) {
                    filterData[colIndex] = cloneDeep(column.filterOptions.names)
                }
            }

            if (column.filterList) {
                filterList[colIndex] = cloneDeep(column.filterList)
            } else if (
                this.state.filterList &&
                this.state.filterList[colIndex] &&
                this.state.filterList[colIndex].length > 0
            ) {
                filterList[colIndex] = cloneDeep(
                    this.state.filterList[colIndex]
                )
            }

            if (this.options.sortFilterList) {
                const comparator = getCollatorComparator()
                filterData[colIndex].sort(comparator)
            }

            if (column.name === sortOrder.name) {
                sortDirection = sortOrder.direction
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

        if (TABLE_LOAD.INITIAL) {
            // Multiple row selection customization
            if (
                this.options.rowsSelected &&
                this.options.rowsSelected.length &&
                this.options.selectableRows === 'multiple'
            ) {
                this.options.rowsSelected
                    .filter(
                        selectedRowIndex =>
                            selectedRowIndex === 0 ||
                            (Number(selectedRowIndex) && selectedRowIndex > 0)
                    )
                    .forEach(row => {
                        let rowPos = row

                        for (
                            let cIndex = 0;
                            cIndex < this.state.displayData.length;
                            cIndex++
                        ) {
                            if (
                                this.state.displayData[cIndex].dataIndex === row
                            ) {
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
                this.options.rowsSelected &&
                this.options.rowsSelected.length === 1 &&
                this.options.selectableRows === 'single'
            ) {
                let rowPos = this.options.rowsSelected[0]

                for (
                    let cIndex = 0;
                    cIndex < this.state.displayData.length;
                    cIndex++
                ) {
                    if (
                        this.state.displayData[cIndex].dataIndex ===
                        this.options.rowsSelected[0]
                    ) {
                        rowPos = cIndex
                        break
                    }
                }

                selectedRowsData.data.push({
                    index: rowPos,
                    dataIndex: this.options.rowsSelected[0]
                })
                selectedRowsData.lookup[this.options.rowsSelected[0]] = true
            } else if (
                this.options.rowsSelected &&
                this.options.rowsSelected.length > 1 &&
                this.options.selectableRows === 'single'
            ) {
                console.error(
                    'Multiple values provided for selectableRows, but selectableRows set to "single". Either supply only a single value or use "multiple".'
                )
            } else if (
                typeof this.options.rowsSelected === 'undefined' &&
                dataUpdated === false
            ) {
                if (this.state.selectedRows) {
                    selectedRowsData = Object.assign(
                        {},
                        this.state.selectedRows
                    )
                }
            }

            if (
                this.options.rowsExpanded &&
                this.options.rowsExpanded.length &&
                this.options.expandableRows
            ) {
                this.options.rowsExpanded.forEach(row => {
                    let rowPos = row

                    for (
                        let cIndex = 0;
                        cIndex < this.state.displayData.length;
                        cIndex++
                    ) {
                        if (this.state.displayData[cIndex].dataIndex === row) {
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
                typeof this.options.rowsExpanded === 'undefined' &&
                dataUpdated === false &&
                this.state.expandedRows
            ) {
                expandedRowsData = Object.assign({}, this.state.expandedRows)
            }
        }

        if (!this.options.serverSide && sortIndex !== null) {
            const sortedData = this.sortTable(
                tableData,
                sortIndex,
                sortDirection,
                columns[sortIndex].sortCompare
            )
            tableData = sortedData.data
        }

        /* set source data and display Data set source set */
        let stateUpdates = {
            columns: columns,
            filterData: filterData,
            filterList: filterList,
            searchText: searchText,
            selectedRows: selectedRowsData,
            expandedRows: expandedRowsData,
            count: this.options.count,
            data: tableData,
            sortOrder: sortOrder,
            rowsPerPage,
            page,
            displayData: this.getDisplayData(
                columns,
                tableData,
                filterList,
                searchText,
                tableMeta,
                props
            ),
            columnOrder
        }

        if (fromConstructor) {
            this.state = Object.assign({}, this.state, stateUpdates)
        } else {
            this.setState(stateUpdates, callback)
        }
    }

    /*
     *  Build the table data used to display to the user (ie: after filter/search applied)
     */
    computeDisplayRow(
        columns: DataTableState['columns'],
        row: unknown[],
        rowIndex: number,
        filterList: DataTableState['filterList'],
        searchText: DataTableState['searchText'],
        dataForTableMeta,
        options: DataTableOptions,
        props: DataTableProps,
        currentTableData
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
                const tableMeta = this.getTableMeta(
                    rowIndex,
                    index,
                    row,
                    column,
                    dataForTableMeta,
                    {
                        ...this.state,
                        filterList: filterList,
                        searchText: searchText
                    },
                    currentTableData
                )

                const funcResult = column.customBodyRender(
                    columnValue,
                    tableMeta,
                    this.updateDataCol.bind(null, rowIndex, index)
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

    updateDataCol = (row, index: number, value) => {
        this.setState(prevState => {
            let changedData = cloneDeep(prevState.data)
            let filterData = cloneDeep(prevState.filterData)

            const tableMeta = this.getTableMeta(
                row,
                index,
                row,
                prevState.columns[index],
                prevState.data,
                prevState,
                prevState.data
            )
            const funcResult = prevState.columns[index].customBodyRender(
                value,
                tableMeta
            )

            const filterValue =
                React.isValidElement(funcResult) && funcResult.props.value
                    ? funcResult.props.value
                    : prevState['data'][row][index]

            const prevFilterIndex = filterData[index].indexOf(filterValue)
            filterData[index].splice(prevFilterIndex, 1, filterValue)

            changedData[row].data[index] = value

            if (this.options.sortFilterList) {
                const comparator = getCollatorComparator()
                filterData[index].sort(comparator)
            }

            return {
                data: changedData,
                filterData: filterData,
                displayData: this.getDisplayData(
                    prevState.columns,
                    changedData,
                    prevState.filterList,
                    prevState.searchText,
                    null,
                    this.props
                )
            }
        })
    }

    getTableMeta = (
        rowIndex: number,
        colIndex: number,
        rowData,
        columnData,
        tableData,
        curState,
        currentTableData
    ) => {
        const { columns, data, displayData, filterData, ...tableState } =
            curState

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

    getDisplayData(
        columns: DataTableState['columns'],
        data: DataTableState['data'],
        filterList: DataTableState['filterList'],
        searchText: DataTableState['searchText'],
        tableMeta,
        props: DataTableProps
    ) {
        let newRows = []
        const dataForTableMeta = tableMeta ? tableMeta.tableData : props.data

        for (let index = 0; index < data.length; index++) {
            const value = data[index].data
            const displayRow = this.computeDisplayRow(
                columns,
                value,
                index,
                filterList,
                searchText,
                dataForTableMeta,
                this.options,
                props,
                data
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

    toggleViewColumn = (index: number) => {
        this.setState(
            ({ columns }) => {
                const cols = cloneDeep(columns) as typeof columns

                cols[index].display =
                    cols[index].display === 'true' ? 'false' : 'true'

                return {
                    columns: cols
                }
            },
            () => {
                this.setTableAction('viewColumnsChange')
                var cb =
                    this.options.onViewColumnsChange ||
                    this.options.onColumnViewChange

                if (cb) {
                    cb(
                        this.state.columns[index].name,
                        this.state.columns[index].display === 'true'
                            ? 'add'
                            : 'remove'
                    )
                }
            }
        )
    }

    updateColumns = (newColumns: DataTableState['columns']) => {
        this.setState(
            () => {
                return {
                    columns: newColumns
                }
            },
            () => {
                this.setTableAction('viewColumnsChange')

                const cb =
                    this.options.onViewColumnsChange ||
                    this.options.onColumnViewChange

                cb?.(null, 'update', newColumns)
            }
        )
    }

    toggleSortColumn = (index: number) => {
        this.setState(
            prevState => {
                let columns = cloneDeep(prevState.columns)
                let data = prevState.data
                let newOrder = columns[index].sortDescFirst ? 'desc' : 'asc' // default

                let sequenceOrder = ['asc', 'desc']
                if (columns[index].sortDescFirst) {
                    sequenceOrder = ['desc', 'asc']
                }
                if (columns[index].sortThirdClickReset) {
                    sequenceOrder.push('none')
                }

                if (columns[index].name === this.state.sortOrder.name) {
                    let pos = sequenceOrder.indexOf(
                        this.state.sortOrder.direction
                    )
                    if (pos !== -1) {
                        pos++
                        if (pos >= sequenceOrder.length) pos = 0
                        newOrder = sequenceOrder[pos]
                    }
                }

                const newSortOrder = {
                    name: columns[index].name,
                    direction: newOrder
                }

                function getSortDirectionLabel(
                    sortOrder: DataTableProps['options']
                ) {
                    switch (sortOrder.direction) {
                        case 'asc':
                            return 'ascending'
                        case 'desc':
                            return 'descending'
                        case 'none':
                            return 'none'
                        default:
                            return ''
                    }
                }

                const orderLabel = getSortDirectionLabel(newSortOrder)
                const announceText = `Table now sorted by ${columns[index].name} : ${orderLabel}`

                let newState = {
                    columns: columns,
                    announceText: announceText,
                    activeColumn: index
                }

                if (this.options.serverSide) {
                    newState = {
                        ...newState,
                        data: prevState.data,
                        displayData: prevState.displayData,
                        selectedRows: prevState.selectedRows,
                        sortOrder: newSortOrder
                    }
                } else {
                    const sortedData = this.sortTable(
                        data,
                        index,
                        newOrder,
                        columns[index].sortCompare
                    )

                    newState = {
                        ...newState,
                        data: sortedData.data,
                        displayData: this.getDisplayData(
                            columns,
                            sortedData.data,
                            prevState.filterList,
                            prevState.searchText,
                            null,
                            this.props
                        ),
                        selectedRows: sortedData.selectedRows,
                        sortOrder: newSortOrder,
                        previousSelectedRow: null
                    }
                }

                return newState
            },
            () => {
                this.setTableAction('sort')

                if (this.options.onColumnSortChange) {
                    this.options.onColumnSortChange(
                        this.state.sortOrder.name,
                        this.state.sortOrder.direction
                    )
                }
            }
        )
    }

    changeRowsPerPage = (rowsPerPage: number) => {
        const rowCount = this.options.count ?? this.state.displayData.length

        this.setState(
            () => ({
                rowsPerPage: rowsPerPage,
                page: getPageValue(rowCount, rowsPerPage, this.state.page)
            }),
            () => {
                this.setTableAction('changeRowsPerPage')

                if (this.options.onChangeRowsPerPage) {
                    this.options.onChangeRowsPerPage(this.state.rowsPerPage)
                }
            }
        )
    }

    changePage = (page: number) => {
        this.setState(
            () => ({
                page: page
            }),
            () => {
                this.setTableAction('changePage')

                if (this.options.onChangePage) {
                    this.options.onChangePage(this.state.page)
                }
            }
        )
    }

    searchClose = () => {
        this.setState(
            prevState => ({
                searchText: null,
                displayData: this.options.serverSide
                    ? prevState.displayData
                    : this.getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          null,
                          null,
                          this.props
                      )
            }),
            () => {
                this.setTableAction('search')
                if (this.options.onSearchChange) {
                    this.options.onSearchChange(this.state.searchText)
                }
            }
        )
    }

    searchTextUpdate = (text: string) => {
        this.setState(
            prevState => ({
                searchText: text && text.length ? text : null,
                page: 0,
                displayData: this.options.serverSide
                    ? prevState.displayData
                    : this.getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          text,
                          null,
                          this.props
                      )
            }),
            () => {
                this.setTableAction('search')
                if (this.options.onSearchChange) {
                    this.options.onSearchChange(this.state.searchText)
                }
            }
        )
    }

    resetFilters = () => {
        this.setState(
            prevState => {
                const filterList = prevState.columns.map(() => [])

                return {
                    filterList: filterList,
                    displayData: this.options.serverSide
                        ? prevState.displayData
                        : this.getDisplayData(
                              prevState.columns,
                              prevState.data,
                              filterList,
                              prevState.searchText,
                              null,
                              this.props
                          )
                }
            },
            () => {
                this.setTableAction('resetFilters')
                if (this.options.onFilterChange) {
                    this.options.onFilterChange(
                        null,
                        this.state.filterList,
                        'reset',
                        null
                    )
                }
            }
        )
    }

    updateFilterByType = (
        filterList,
        index: number,
        value,
        type: DataTableOptions['filterType'],
        customUpdate: (filterList, filterPos: number, index: number) => void
    ) => {
        const filterPos: number = filterList[index].findIndex(
            filter => filter === value
        )

        switch (type) {
            case 'checkbox':
                filterPos >= 0
                    ? filterList[index].splice(filterPos, 1)
                    : filterList[index].push(value)
                break
            case 'chip':
                filterPos >= 0
                    ? filterList[index].splice(filterPos, 1)
                    : filterList[index].push(value)
                break
            case 'multiselect':
                filterList[index] = value === '' ? [] : value
                break
            case 'dropdown':
                filterList[index] = value
                break
            case 'custom':
                if (customUpdate) {
                    filterList = customUpdate(filterList, filterPos, index)
                } else {
                    filterList[index] = value
                }
                break
            default:
                filterList[index] =
                    filterPos >= 0 || value === '' ? [] : [value]
        }
    }

    filterUpdate = (
        index: number,
        value,
        column,
        type: DataTableOptions['filterType'],
        customUpdate: () => void,
        next: (filterList) => void
    ) => {
        this.setState(
            prevState => {
                const filterList = cloneDeep(prevState.filterList)
                this.updateFilterByType(
                    filterList,
                    index,
                    value,
                    type,
                    customUpdate
                )

                return {
                    page: 0,
                    filterList: filterList,
                    displayData: this.options.serverSide
                        ? prevState.displayData
                        : this.getDisplayData(
                              prevState.columns,
                              prevState.data,
                              filterList,
                              prevState.searchText,
                              null,
                              this.props
                          ),
                    previousSelectedRow: null
                }
            },
            () => {
                this.setTableAction('filterChange')
                if (this.options.onFilterChange) {
                    this.options.onFilterChange(
                        column,
                        this.state.filterList,
                        type,
                        index,
                        this.state.displayData
                    )
                }
                next && next(this.state.filterList)
            }
        )
    }

    // Collapses or expands all expanded rows
    toggleAllExpandableRows = () => {
        let expandedRowsData = [...this.state.expandedRows.data]
        const { isRowExpandable } = this.options
        let affecttedRows = []

        if (expandedRowsData.length > 0) {
            // collapse all
            for (let ii = expandedRowsData.length - 1; ii >= 0; ii--) {
                let item = expandedRowsData[ii]
                if (
                    !isRowExpandable ||
                    (isRowExpandable &&
                        isRowExpandable(
                            item.dataIndex,
                            this.state.expandedRows
                        ))
                ) {
                    affecttedRows.push(expandedRowsData.splice(ii, 1))
                }
            }
        } else {
            // expand all
            for (let ii = 0; ii < this.state.data.length; ii++) {
                let item = this.state.data[ii]
                if (
                    !isRowExpandable ||
                    (isRowExpandable &&
                        isRowExpandable(
                            item.dataIndex,
                            this.state.expandedRows
                        ))
                ) {
                    if (this.state.expandedRows.lookup[item.index] !== true) {
                        let newItem = {
                            index: ii,
                            dataIndex: item.index
                        }
                        expandedRowsData.push(newItem)
                        affecttedRows.push(newItem)
                    }
                }
            }
        }

        this.setState(
            {
                expandedRows: {
                    lookup: buildMap(expandedRowsData),
                    data: expandedRowsData
                }
            },
            () => {
                this.setTableAction('expandRow')
                if (this.options.onRowExpansionChange) {
                    this.options.onRowExpansionChange(
                        affecttedRows,
                        this.state.expandedRows.data,
                        this.state.expandedRows.data.map(item => item.dataIndex)
                    )
                }
            }
        )
    }

    areAllRowsExpanded = () => {
        return this.state.expandedRows.data.length === this.state.data.length
    }

    updateColumnOrder = (
        columnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) => {
        this.setState(
            () => {
                return {
                    columnOrder
                }
            },
            () => {
                this.setTableAction('columnOrderChange')
                if (this.options.onColumnOrderChange) {
                    this.options.onColumnOrderChange(
                        this.state.columnOrder,
                        columnIndex,
                        newPosition
                    )
                }
            }
        )
    }

    selectRowDelete = () => {
        const { selectedRows, data, filterList } = this.state

        const selectedMap = buildMap(selectedRows.data)
        const cleanRows = data.filter(({ index }) => !selectedMap[index])

        if (this.options.onRowsDelete) {
            if (
                this.options.onRowsDelete(
                    selectedRows,
                    cleanRows.map(ii => ii.data)
                ) === false
            )
                return
        }

        this.setTableData(
            {
                columns: this.props.columns,
                data: cleanRows,
                options: {
                    filterList: filterList
                }
            },
            TABLE_LOAD.UPDATE,
            true,
            () => {
                this.setTableAction('rowDelete')
            }
        )
    }

    toggleExpandRow = (row: { index: number; dataIndex: number }) => {
        const { dataIndex } = row
        const { isRowExpandable } = this.options
        let { expandedRows } = this.state
        const expandedRowsData = [...expandedRows.data]
        let shouldCollapseExpandedRow = false

        let hasRemovedRow = false
        let removedRow = []

        for (var cIndex = 0; cIndex < expandedRowsData.length; cIndex++) {
            if (expandedRowsData[cIndex].dataIndex === dataIndex) {
                shouldCollapseExpandedRow = true
                break
            }
        }

        if (shouldCollapseExpandedRow) {
            if (
                (isRowExpandable && isRowExpandable(dataIndex, expandedRows)) ||
                !isRowExpandable
            ) {
                removedRow = expandedRowsData.splice(cIndex, 1)
                hasRemovedRow = true
            }
        } else {
            if (isRowExpandable && isRowExpandable(dataIndex, expandedRows))
                expandedRowsData.push(row)
            else if (!isRowExpandable) expandedRowsData.push(row)
        }

        this.setState(
            {
                curExpandedRows: hasRemovedRow ? removedRow : [row],
                expandedRows: {
                    lookup: buildMap(expandedRowsData),
                    data: expandedRowsData
                }
            },
            () => {
                this.setTableAction('rowExpansionChange')
                if (
                    this.options.onRowExpansionChange ||
                    this.options.onRowsExpand
                ) {
                    let expandCallback =
                        this.options.onRowExpansionChange ||
                        this.options.onRowsExpand
                    expandCallback(
                        this.state.curExpandedRows,
                        this.state.expandedRows.data
                    )
                }
            }
        )
    }

    selectRowUpdate = (type: string, value, shiftAdjacentRows = []) => {
        // safety check
        const { selectableRows } = this.options
        if (selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const { isRowSelectable } = this.options
            this.setState(
                prevState => {
                    const { displayData, selectedRows: prevSelectedRows } =
                        prevState
                    const selectedRowsLen = prevState.selectedRows.data.length
                    let isDeselect =
                        selectedRowsLen === displayData.length ||
                        (selectedRowsLen < displayData.length &&
                            selectedRowsLen > 0)

                    const selectedRows = displayData.reduce((arr, _, i) => {
                        const selected = isRowSelectable
                            ? isRowSelectable(
                                  displayData[i].dataIndex,
                                  prevSelectedRows
                              )
                            : true
                        selected &&
                            arr.push({
                                index: i,
                                dataIndex: displayData[i].dataIndex
                            })
                        return arr
                    }, [])

                    let newRows = [...selectedRows]
                    let selectedMap = buildMap(newRows)

                    // if the select toolbar is disabled, the rules are a little different
                    if (this.options.selectToolbarPlacement === STP.NONE) {
                        if (selectedRowsLen > displayData.length) {
                            isDeselect = true
                        } else {
                            for (let ii = 0; ii < displayData.length; ii++) {
                                if (!selectedMap[displayData[ii].dataIndex]) {
                                    isDeselect = true
                                }
                            }
                        }
                    }

                    if (isDeselect) {
                        newRows = prevState.selectedRows.data.filter(
                            ({ dataIndex }) => !selectedMap[dataIndex]
                        )
                        selectedMap = buildMap(newRows)
                    }

                    return {
                        curSelectedRows: newRows,
                        selectedRows: {
                            data: newRows,
                            lookup: selectedMap
                        },
                        previousSelectedRow: null
                    }
                },
                () => {
                    this.setTableAction('rowSelectionChange')
                    if (this.options.onRowSelectionChange) {
                        this.options.onRowSelectionChange(
                            this.state.curSelectedRows,
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    } else if (this.options.onRowsSelect) {
                        this.options.onRowsSelect(
                            this.state.curSelectedRows,
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    }
                }
            )
        } else if (type === 'cell') {
            this.setState(
                prevState => {
                    const { dataIndex } = value
                    let selectedRows = [...prevState.selectedRows.data]
                    let rowPos = -1

                    for (
                        let cIndex = 0;
                        cIndex < selectedRows.length;
                        cIndex++
                    ) {
                        if (selectedRows[cIndex].dataIndex === dataIndex) {
                            rowPos = cIndex
                            break
                        }
                    }

                    if (rowPos >= 0) {
                        selectedRows.splice(rowPos, 1)

                        // handle rows affected by shift+click
                        if (shiftAdjacentRows.length > 0) {
                            let shiftAdjacentMap = buildMap(shiftAdjacentRows)
                            for (
                                let cIndex = selectedRows.length - 1;
                                cIndex >= 0;
                                cIndex--
                            ) {
                                if (
                                    shiftAdjacentMap[
                                        selectedRows[cIndex].dataIndex
                                    ]
                                ) {
                                    selectedRows.splice(cIndex, 1)
                                }
                            }
                        }
                    } else if (selectableRows === 'single') {
                        selectedRows = [value]
                    } else {
                        // multiple
                        selectedRows.push(value)

                        // handle rows affected by shift+click
                        if (shiftAdjacentRows.length > 0) {
                            let selectedMap = buildMap(selectedRows)
                            shiftAdjacentRows.forEach(aRow => {
                                if (!selectedMap[aRow.dataIndex]) {
                                    selectedRows.push(aRow)
                                }
                            })
                        }
                    }

                    return {
                        selectedRows: {
                            lookup: buildMap(selectedRows),
                            data: selectedRows
                        },
                        previousSelectedRow: value
                    }
                },
                () => {
                    this.setTableAction('rowSelectionChange')
                    if (this.options.onRowSelectionChange) {
                        this.options.onRowSelectionChange(
                            [value],
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    } else if (this.options.onRowsSelect) {
                        this.options.onRowsSelect(
                            [value],
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    }
                }
            )
        } else if (type === 'custom') {
            const { displayData } = this.state

            const data = value.map(row => ({
                index: row,
                dataIndex: displayData[row].dataIndex
            }))
            const lookup = buildMap(data)

            this.setState(
                {
                    selectedRows: { data, lookup },
                    previousSelectedRow: null
                },
                () => {
                    this.setTableAction('rowSelectionChange')
                    if (this.options.onRowSelectionChange) {
                        this.options.onRowSelectionChange(
                            this.state.selectedRows.data,
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    } else if (this.options.onRowsSelect) {
                        this.options.onRowsSelect(
                            this.state.selectedRows.data,
                            this.state.selectedRows.data,
                            this.state.selectedRows.data.map(
                                item => item.dataIndex
                            )
                        )
                    }
                }
            )
        }
    }

    sortTable(data, col, order, columnSortCompare = null) {
        let hasCustomTableSort = this.options.customSort && !columnSortCompare
        let meta = { selectedRows: this.state.selectedRows } // meta for customSort
        let dataSrc = hasCustomTableSort
            ? this.options.customSort(
                  data,
                  col,
                  order ?? (this.options.sortDescFirst ? 'desc' : 'asc'),
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

        let sortedData = dataSrc.map((row, sIndex) => ({
            data: row.data[col],
            rowData: row.data,
            position: sIndex,
            rowSelected: this.state.selectedRows.lookup[row.index]
                ? true
                : false
        }))

        if (!hasCustomTableSort) {
            const sortFn = columnSortCompare ?? sortCompare
            sortedData.sort(sortFn(order))
        }

        let tableData = []
        let selectedRows = []

        for (let i = 0; i < sortedData.length; i++) {
            const row = sortedData[i]
            tableData.push(dataSrc[row.position])
            if (row.rowSelected) {
                selectedRows.push({
                    index: i,
                    dataIndex: dataSrc[row.position].index
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

    render() {
        const { classes, title } = this.props

        const {
            announceText,
            activeColumn,
            data,
            displayData,
            columns,
            page,
            filterData,
            filterList,
            selectedRows,
            previousSelectedRow,
            expandedRows,
            searchText,
            sortOrder,
            columnOrder
        } = this.state

        const rowCount = this.state.count ?? displayData.length
        const rowsPerPage = this.options.pagination
            ? this.state.rowsPerPage
            : displayData.length
        const showToolbar = hasToolbarItem(this.options)
        const columnNames = columns.map(column => ({
            name: column.name,
            filterType: column.filterType ?? this.options.filterType
        }))
        const responsiveOption = this.options.responsive

        let maxHeight = this.options.tableBodyMaxHeight
        let responsiveClass

        switch (responsiveOption) {
            // deprecated
            case 'scroll':
                responsiveClass = classes.responsiveScroll
                maxHeight = '499px'
                break
            // deprecated
            case 'scrollMaxHeight':
                responsiveClass = classes.responsiveScrollMaxHeight
                maxHeight = '499px'
                break
            // deprecated
            case 'scrollFullHeight':
                responsiveClass = classes.responsiveScrollFullHeight
                maxHeight = 'none'
                break
            // deprecated
            case 'scrollFullHeightFullWidth':
                responsiveClass = classes.responsiveScrollFullHeight
                break
            // deprecated
            case 'stacked':
                responsiveClass = classes.responsiveStacked
                maxHeight = 'none'
                break
            // deprecated
            case 'stackedFullWidth':
                responsiveClass = classes.responsiveStackedFullWidth
                maxHeight = 'none'
                break

            default:
                responsiveClass = classes.responsiveBase
                break
        }

        const tableHeightVal = {
            maxHeight: maxHeight,
            height: this.options.tableBodyHeight
        }

        const tableProps = this.options.setTableProps
            ? (this.options.setTableProps() ?? {})
            : {}

        const tableClassNames = clsx(classes.tableRoot, tableProps.className)
        delete tableProps.className // remove className from props to avoid the className being applied twice

        return (
            <>
                {(this.options.selectToolbarPlacement === STP.ALWAYS ||
                    (selectedRows.data.length > 0 &&
                        this.options.selectToolbarPlacement !== STP.NONE)) && (
                    <this.context.components.TableToolbarSelect
                        options={this.options}
                        selectedRows={selectedRows}
                        onRowsDelete={this.selectRowDelete}
                        displayData={displayData}
                        selectRowUpdate={this.selectRowUpdate}
                    />
                )}
                {(selectedRows.data.length === 0 ||
                    [STP.ABOVE, STP.NONE].indexOf(
                        this.options.selectToolbarPlacement
                    ) !== -1) &&
                    showToolbar && (
                        <this.context.components.TableToolbar
                            columns={columns}
                            columnOrder={columnOrder}
                            displayData={displayData}
                            data={data}
                            filterData={filterData}
                            filterList={filterList}
                            filterUpdate={this.filterUpdate}
                            updateFilterByType={this.updateFilterByType}
                            options={this.options}
                            resetFilters={this.resetFilters}
                            searchText={searchText}
                            searchTextUpdate={this.searchTextUpdate}
                            searchClose={this.searchClose}
                            tableRef={this.getCurrentRootRef}
                            title={title}
                            toggleViewColumn={this.toggleViewColumn}
                            updateColumns={this.updateColumns}
                            setTableAction={this.setTableAction}
                        />
                    )}
                <this.context.components.TableFilterList
                    options={this.options}
                    serverSideFilterList={
                        this.props.options?.serverSideFilterList
                    }
                    filterListRenderers={columns.map(c => {
                        if (
                            c.customFilterListOptions &&
                            c.customFilterListOptions.render
                        )
                            return c.customFilterListOptions.render
                        // DEPRECATED: This option is being replaced with customFilterListOptions.render
                        if (c.customFilterListRender)
                            return c.customFilterListRender

                        return f => f
                    })}
                    customFilterListUpdate={columns.map(c => {
                        return c.customFilterListOptions &&
                            c.customFilterListOptions.update
                            ? c.customFilterListOptions.update
                            : null
                    })}
                    filterList={filterList}
                    filterUpdate={this.filterUpdate}
                    columnNames={columnNames}
                />

                <RenderInnerTable
                    // new this
                    forwardUpdateDividers={fn => (this.updateDividers = fn)}
                    forwardSetHeadResizable={fn => (this.setHeadResizable = fn)}
                    // var section
                    rowCount={rowCount}
                    columnOrder={columnOrder}
                    tableClassNames={tableClassNames}
                    tableProps={tableProps}
                    title={title}
                    tableHeightVal={tableHeightVal}
                    responsiveClass={responsiveClass}
                    filterList={filterList}
                    columns={columns}
                    activeColumn={activeColumn}
                    displayData={displayData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selectedRows={selectedRows}
                    expandedRows={expandedRows}
                    sortOrder={sortOrder}
                    previousSelectedRow={previousSelectedRow}
                    // this section
                    tableRef={this.tableRef}
                    options={this.options}
                    selectRowUpdate={this.selectRowUpdate}
                    props={this.props}
                    toggleSortColumn={this.toggleSortColumn}
                    setHeadCellRef={this.setHeadCellRef}
                    areAllRowsExpanded={this.areAllRowsExpanded}
                    toggleAllExpandableRows={this.toggleAllExpandableRows}
                    updateColumnOrder={this.updateColumnOrder}
                    draggableHeadCellRefs={this.draggableHeadCellRefs}
                    getCurrentRootRef={this.getCurrentRootRef}
                    timers={this.timers}
                    toggleExpandRow={this.toggleExpandRow}
                />

                <this.context.components.TableFooter
                    options={this.options}
                    page={page}
                    rowCount={rowCount}
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={this.changeRowsPerPage}
                    changePage={this.changePage}
                />

                <div className={classes.liveAnnounce} aria-live="polite">
                    {announceText}
                </div>
            </>
        )
    }
}

enum TABLE_LOAD {
    INITIAL = 1,
    UPDATE = 2
}

const DEFAULT_OPTIONS: Required<DataTableOptions> = {
    caseSensitive: false,
    disableToolbarSelect: false,
    download: true,
    downloadOptions: {
        filename: 'tableDownload.csv', // WILL REMOVE THIS LATER, DEFAULT VALUE HAS BEEN HANDLED BY `createCSVDownload` FUNCTION
        separator: ',' // WILL REMOVE THIS LATER, DEFAULT VALUE HAS BEEN HANDLED BY `createCSVDownload` FUNCTION
    },
    draggableColumns: {
        enabled: false,
        transitionTime: 300
    },
    elevation: 4,
    enableNestedDataAccess: '',
    expandableRows: false,
    expandableRowsHeader: true,
    expandableRowsOnClick: false,
    filter: true,
    filterArrayFullMatch: true,
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    pagination: true,
    print: true,
    resizableColumns: false,
    responsive: 'vertical',
    rowHover: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    search: true,
    selectableRows: 'multiple',
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    selectableRowsHeader: true,
    serverSide: false,
    serverSideFilterList: null,
    setTableProps: () => ({}),
    sort: true,
    sortFilterList: true,
    tableBodyHeight: 'auto',
    tableBodyMaxHeight: null, // if set, it will override tableBodyHeight
    sortOrder: {},
    viewColumns: true,
    selectToolbarPlacement: STP.REPLACE
}

const DEFAULT_STATE: MUIDataTableState = {
    activeColumn: null,
    announceText: null,
    count: 0,
    columns: [],
    expandedRows: {
        data: [],
        lookup: {}
    },
    data: [],
    displayData: [],
    filterData: [],
    filterList: [],
    page: 0,
    previousSelectedRow: null,
    rowsPerPage: 10,
    searchProps: {},
    searchText: null,
    selectedRows: {
        data: [],
        lookup: {}
    },
    showResponsive: false,

    columnOrder: [0],
    rowsPerPageOptions: DEFAULT_OPTIONS.rowsPerPageOptions,
    sortOrder: undefined
}

function getConstructedOption(
    optionsFromProp: DataTableProps['options']
): DataTableOptions {
    return {
        ...DEFAULT_OPTIONS,
        ...(optionsFromProp ?? {}),
        downloadOptions: {
            ...DEFAULT_OPTIONS.downloadOptions,
            ...optionsFromProp?.downloadOptions
        }
    }
}

function hasToolbarItem(options: DataTableOptions) {
    // Populate this list with anything that might render in the toolbar to determine if we hide the toolbar
    const TOOLBAR_ITEMS = [
        'title',
        'filter',
        'search',
        'print',
        'download',
        'viewColumns',
        'customToolbar'
    ]

    return TOOLBAR_ITEMS.some(itemName => options[itemName])
}

function handleOptionDeprecation(
    props: DataTableProps,
    options: DataTableOptions
) {
    if (typeof options?.selectableRows === 'boolean') {
        warnDeprecated(
            'Using a boolean for selectableRows has been deprecated. Please use string option: multiple | single | none'
        )

        options.selectableRows = options.selectableRows ? 'multiple' : 'none'
    }

    if (
        options?.responsive !== undefined &&
        ['standard', 'vertical', 'verticalAlways', 'simple'].indexOf(
            options.responsive
        ) === -1
    ) {
        if (
            [
                'scrollMaxHeight',
                'scrollFullHeight',
                'stacked',
                'stackedFullWidth',
                'scrollFullHeightFullWidth',
                'scroll'
            ].indexOf(options.responsive) !== -1
        ) {
            warnDeprecated(
                options.responsive +
                    ' has been deprecated, but will still work in version 3.x. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
            )
        } else {
            warnInfo(
                options.responsive +
                    ' is not recognized as a valid input for responsive option. Please use string option: standard | vertical | simple. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
            )
        }
    }

    if (options?.onRowsSelect) {
        warnDeprecated(
            'onRowsSelect has been renamed onRowSelectionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.onRowsExpand) {
        warnDeprecated(
            'onRowsExpand has been renamed onRowExpansionChange. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.fixedHeaderOptions) {
        if (
            typeof options.fixedHeaderOptions.yAxis !== 'undefined' &&
            typeof options.fixedHeader === 'undefined'
        ) {
            options.fixedHeader = options.fixedHeaderOptions.yAxis
        }
        if (
            typeof options.fixedHeaderOptions.xAxis !== 'undefined' &&
            typeof options.fixedSelectColumn === 'undefined'
        ) {
            options.fixedSelectColumn = options.fixedHeaderOptions.xAxis
        }
        warnDeprecated(
            'fixedHeaderOptions will still work but has been deprecated in favor of fixedHeader and fixedSelectColumn. More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    if (options?.serverSideFilterList) {
        warnDeprecated(
            'serverSideFilterList will still work but has been deprecated in favor of the confirmFilters option. See this example for details: https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-filters/index.js More info here: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    props.columns.map(c => {
        if (c.options && c.options.customFilterListRender) {
            warnDeprecated(
                'The customFilterListRender option has been deprecated. It is being replaced by customFilterListOptions.render (Specify customFilterListOptions: { render: Function } in column options.)'
            )
        }
    })

    if (options?.disableToolbarSelect === true) {
        warnDeprecated(
            'disableToolbarSelect has been deprecated but will still work in version 3.x. It is being replaced by "selectToolbarPlacement"="none". More info: https://github.com/gregnb/mui-datatables/tree/master/docs/v2_to_v3_guide.md'
        )
    }

    // only give this warning message in newer browsers
    if (Object.values) {
        if (
            options?.selectToolbarPlacement &&
            Object.values(STP).indexOf(options.selectToolbarPlacement) === -1
        ) {
            warnDeprecated(
                'Invalid option value for selectToolbarPlacement. Please check the documentation: https://github.com/gregnb/mui-datatables#options'
            )
        }
    }
}

function RenderInnerTable({
    // new this
    forwardUpdateDividers,
    forwardSetHeadResizable,
    // var section
    rowCount,
    columnOrder,
    tableClassNames,
    tableProps,
    title,
    tableHeightVal,
    responsiveClass,
    filterList,
    columns,
    activeColumn,
    displayData,
    page,
    rowsPerPage,
    selectedRows,
    expandedRows,
    sortOrder,
    previousSelectedRow,
    // this sections
    tableRef,
    options,
    selectRowUpdate,
    props,
    toggleSortColumn,
    setHeadCellRef,
    areAllRowsExpanded,
    toggleAllExpandableRows,
    updateColumnOrder,
    draggableHeadCellRefs,
    getCurrentRootRef,
    timers,
    toggleExpandRow
}: {
    // new this
    forwardUpdateDividers: (fn: () => void) => void
    forwardSetHeadResizable: (fn: () => void) => void
    // variables
    rowCount: number
    columnOrder: number[]
    tableClassNames: string
    tableProps: TableProps
    tableHeightVal: {
        maxHeight?: string
        height?: string
    }
    title: DataTableProps['title']
    responsiveClass: HTMLDivElement['className']
    filterList: string[][]
    columns: MUIDataTableColumnState[]
    activeColumn: string | null
    displayData: DisplayData
    page: number
    rowsPerPage: number
    selectedRows: MUIDataTableStateRows
    expandedRows: MUIDataTableStateRows
    sortOrder: DataTableOptions['sortOrder']
    previousSelectedRow: DataTableState['previousSelectedRow']
    // this
    tableRef: React.Ref<HTMLTableElement>
    options: DataTableOptions
    selectRowUpdate: unknown
    props: DataTableProps
    toggleSortColumn: unknown
    setHeadCellRef: unknown
    areAllRowsExpanded: unknown
    toggleAllExpandableRows: unknown
    updateColumnOrder: unknown
    draggableHeadCellRefs: HTMLTableCellElement[]
    getCurrentRootRef: unknown
    timers: unknown
    toggleExpandRow: unknown
}) {
    const { components } = useMainContext()

    return (
        <div
            style={{ position: 'relative', ...tableHeightVal }}
            className={responsiveClass}
        >
            {options.resizableColumns && (
                <components.TableResize
                    updateDividers={forwardUpdateDividers}
                    setResizable={forwardSetHeadResizable}
                    options={options}
                    tableId={options.tableId}
                />
            )}

            <DndProvider
                backend={HTML5Backend}
                context={typeof window === 'undefined' ? undefined : window}
            >
                <MuiTable
                    ref={tableRef}
                    tabIndex={0}
                    role="grid"
                    className={tableClassNames}
                    {...tableProps}
                >
                    <caption
                        style={{
                            position: 'absolute',
                            left: '-3000px'
                        }}
                    >
                        {title}
                    </caption>

                    <components.TableHead
                        columns={columns}
                        activeColumn={activeColumn}
                        data={displayData}
                        count={rowCount}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        selectedRows={selectedRows}
                        selectRowUpdate={selectRowUpdate}
                        toggleSort={toggleSortColumn}
                        setCellRef={setHeadCellRef}
                        expandedRows={expandedRows}
                        areAllRowsExpanded={areAllRowsExpanded}
                        toggleAllExpandableRows={toggleAllExpandableRows}
                        options={options}
                        sortOrder={sortOrder}
                        columnOrder={columnOrder}
                        updateColumnOrder={updateColumnOrder}
                        draggableHeadCellRefs={draggableHeadCellRefs}
                        tableRef={getCurrentRootRef}
                        tableId={options.tableId}
                        timers={timers}
                    />

                    <components.TableBody
                        data={displayData}
                        count={rowCount}
                        columns={columns}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        selectedRows={selectedRows}
                        selectRowUpdate={selectRowUpdate}
                        previousSelectedRow={previousSelectedRow}
                        expandedRows={expandedRows}
                        toggleExpandRow={toggleExpandRow}
                        options={options}
                        columnOrder={columnOrder}
                        filterList={filterList}
                        tableId={options.tableId}
                    />

                    {options.customTableBodyFooterRender?.({
                        data: displayData,
                        count: rowCount,
                        columns,
                        selectedRows,
                        selectableRows: options.selectableRows
                    })}
                </MuiTable>
            </DndProvider>
        </div>
    )
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

function validateOptions(options: DataTableOptions) {
    if (options.serverSide && options.onTableChange === undefined) {
        throw Error(
            'onTableChange callback must be provided when using serverSide option'
        )
    }
    if (options.expandableRows && options.renderExpandableRow === undefined) {
        throw Error(
            'renderExpandableRow must be provided when using expandableRows option'
        )
    }
    if (
        options.rowsSelected &&
        Array.isArray(options.rowsSelected) &&
        options.rowsSelected.some(isNaN)
    ) {
        warnInfo(
            'When using the rowsSelected option, must be provided an array of numbers only.'
        )
    }
}

function getInitTableOptions({
    rowsPerPage,
    page,
    rowsSelected,
    rowsPerPageOptions
}: DataTableProps['options'] = {}): DataTableProps['options'] {
    const optState: DataTableProps['options'] = {}

    if (rowsPerPage) {
        optState.rowsPerPage = rowsPerPage
    }

    if (page) {
        optState.page = page
    }

    if (rowsSelected) {
        optState.rowsSelected = rowsSelected
    }

    if (rowsPerPageOptions) {
        optState.rowsPerPageOptions = rowsPerPageOptions
    }

    validateOptions(optState)

    return optState
}
