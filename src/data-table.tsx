'use client'

// types
import type { DataTableProps } from './data-table.props.type'
// vendors
import { DndProvider } from 'react-dnd'
import { Paper, Table as MuiTable, TableProps } from '@mui/material'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeStyles } from 'tss-react/mui'
import clsx from 'clsx'
import React, { createRef, type RefObject } from 'react'
// locals
import { getPageValue } from './functions.shared/get-page-value'
import {
    buildMap,
    cloneDeep,
    getDisplayData,
    getNewStateOnDataChange,
    warnDeprecated,
    warnInfo
} from './functions'
import type {
    DisplayData,
    MUIDataTableColumnState,
    MUIDataTableStateRows
} from 'mui-datatables'
import {
    STP,
    TableAction,
    type DataTableOptions
} from './data-table.props.type/options'
import {
    type DataTableState,
    FilterTypeEnum
} from './data-table.props.type/state'
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

/**
 * @todo MIGRATE STATE TO CONTEXT
 */
class MUIDataTableClass extends React.Component<
    Omit<DataTableProps, 'components'> & {
        classes: ReturnType<typeof useStyles>['classes']
        getRootRef: () => RefObject<HTMLDivElement | null>
    },
    DataTableState
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
    }

    componentDidMount() {
        if (this.tableRef.current) {
            this.setHeadResizable(
                this.tableHeadCellElements,
                this.tableRef.current
            )
        }

        this.setState(this.context.state)
    }

    componentDidUpdate(prevProps: DataTableProps) {
        if (
            this.props.data !== prevProps.data ||
            this.props.columns !== prevProps.columns ||
            this.props.options !== prevProps.options
        ) {
            this.updateOptions(this.options, this.props)

            let didDataUpdate = this.props.data !== prevProps.data
            if (this.props.data && prevProps.data) {
                didDataUpdate =
                    didDataUpdate &&
                    this.props.data.length === prevProps.data.length
            }

            this.setState(
                getNewStateOnDataChange(
                    this.props,
                    TABLE_LOAD.UPDATE,
                    didDataUpdate,
                    this.options,
                    this.state,
                    this.setState
                )
            )

            this.context.onStateChange?.(TableAction.PROP_UPDATE, this.state)
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

    setHeadCellRef = (index: number, pos: number, el: HTMLTableCellElement) => {
        this.draggableHeadCellRefs[index] = el
        this.tableHeadCellElements[pos] = el
    }

    // must be arrow function on local field to refer to the correct instance when passed around
    // assigning it as arrow function in the JSX would cause hard to track re-render errors
    getCurrentRootRef = () => this.props.getRootRef().current

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
                this.context.onStateChange?.(
                    TableAction.VIEW_COLUMNS_CHANGE,
                    this.state
                )

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
                this.context.onStateChange?.(
                    TableAction.VIEW_COLUMNS_CHANGE,
                    this.state
                )

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

                let newState: DataTableState = {
                    ...prevState,
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
                    const sortedData = sortTable(
                        data,
                        index,
                        newOrder,
                        columns[index].sortCompare,
                        this.options,
                        newState
                    )

                    newState = {
                        ...newState,
                        data: sortedData.data,
                        selectedRows: sortedData.selectedRows,
                        sortOrder: newSortOrder,
                        previousSelectedRow: null
                    }

                    newState.displayData = getDisplayData(
                        columns,
                        sortedData.data,
                        prevState.filterList,
                        prevState.searchText,
                        null,
                        this.props,
                        newState,
                        this.options,
                        this.setState
                    )
                }

                return newState
            },
            () => {
                this.context.onStateChange?.(TableAction.SORT, this.state)

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
                this.context.onStateChange?.(
                    TableAction.CHANGE_ROWS_PER_PAGE,
                    this.state
                )

                this.options.onChangeRowsPerPage?.(this.state.rowsPerPage)
            }
        )
    }

    changePage = (page: number) => {
        this.setState(
            () => ({
                page: page
            }),
            () => {
                this.context.onStateChange?.(
                    TableAction.CHANGE_PAGE,
                    this.state
                )

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
                    : getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          null,
                          null,
                          this.props,
                          prevState,
                          this.options,
                          this.setState
                      )
            }),
            () => {
                this.context.onStateChange?.(TableAction.SEARCH, this.state)
                this.options.onSearchChange?.(this.state.searchText)
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
                    : getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          text,
                          null,
                          this.props,
                          prevState,
                          this.options,
                          this.setState
                      )
            }),
            () => {
                this.context.onStateChange?.(TableAction.SEARCH, this.state)
                this.options.onSearchChange?.(this.state.searchText)
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
                        : getDisplayData(
                              prevState.columns,
                              prevState.data,
                              filterList,
                              prevState.searchText,
                              null,
                              this.props,
                              prevState,
                              this.options,
                              this.setState
                          )
                }
            },
            () => {
                this.context.onStateChange?.(
                    TableAction.RESET_FILTERS,
                    this.state
                )

                this.options.onFilterChange?.(
                    null,
                    this.state.filterList,
                    'reset',
                    null
                )
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
        type: FilterTypeEnum,
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
                        : getDisplayData(
                              prevState.columns,
                              prevState.data,
                              filterList,
                              prevState.searchText,
                              null,
                              this.props,
                              prevState,
                              this.options,
                              this.setState
                          ),
                    previousSelectedRow: null
                }
            },
            () => {
                this.context.onStateChange?.(
                    TableAction.FILTER_CHANGE,
                    this.state
                )

                this.options.onFilterChange?.(
                    column,
                    this.state.filterList,
                    type,
                    index,
                    this.state.displayData
                )

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
                this.context.onStateChange?.(TableAction.EXPAND_ROW, this.state)

                this.options.onRowExpansionChange?.(
                    affecttedRows,
                    this.state.expandedRows.data,
                    this.state.expandedRows.data.map(item => item.dataIndex)
                )
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
                this.context.onStateChange?.(
                    TableAction.COLUMN_ORDER_CHANGE,
                    this.state
                )

                this.options.onColumnOrderChange?.(
                    this.state.columnOrder,
                    columnIndex,
                    newPosition
                )
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

        this.setState(
            getNewStateOnDataChange(
                {
                    columns: this.props.columns,
                    data: cleanRows,
                    options: {
                        filterList: filterList
                    }
                },
                TABLE_LOAD.UPDATE,
                true,
                this.options,
                this.state,
                this.setState
            )
        )

        this.context.onStateChange?.(TableAction.ROW_DELETE, this.state)
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
                this.context.onStateChange?.(
                    TableAction.ROW_EXPANSION_CHANGE,
                    this.state
                )

                const expandCallback =
                    this.options.onRowExpansionChange ??
                    this.options.onRowsExpand

                expandCallback?.(
                    this.state.curExpandedRows,
                    this.state.expandedRows.data
                )
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
                    this.context.onStateChange?.(
                        TableAction.ROW_SELECTION_CHANGE,
                        this.state
                    )

                    this.options.onRowSelectionChange?.(
                        this.state.curSelectedRows,
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )

                    if (!this.options.onRowSelectionChange) {
                        this.options.onRowsSelect?.(
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
                    this.context.onStateChange?.(
                        TableAction.ROW_SELECTION_CHANGE,
                        this.state
                    )

                    this.options.onRowSelectionChange?.(
                        [value],
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )

                    if (!this.options.onRowSelectionChange) {
                        this.options.onRowsSelect?.(
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
                    this.context.onStateChange?.(
                        TableAction.ROW_SELECTION_CHANGE,
                        this.state
                    )

                    this.options.onRowSelectionChange?.(
                        this.state.selectedRows.data,
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )

                    if (!this.options.onRowSelectionChange) {
                        this.options.onRowsSelect?.(
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

    render() {
        const state = {
            ...this.context.state,
            ...this.state
        }

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
            columnOrder,
            count
        } = state

        const rowCount = count
        const rowsPerPage = this.options.pagination
            ? state.rowsPerPage
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
                            tableRef={this.tableRef}
                            title={title}
                            toggleViewColumn={this.toggleViewColumn}
                            updateColumns={this.updateColumns}
                            setTableAction={(action: TableAction) => {
                                // throw new Error(action)
                                this.context.onStateChange?.(action, state)
                            }}
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
