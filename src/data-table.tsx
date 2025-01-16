'use client'

// types
import type { DataTableProps, DefaultDataItem } from './data-table.props.type'
// vendors
import { DndProvider } from 'react-dnd'
import { Paper, Table as MuiTable, TableProps } from '@mui/material'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeStyles } from 'tss-react/mui'
import clsx from 'clsx'
import React, { createRef, useState, type RefObject } from 'react'
// locals
import { getPageValue } from './functions.shared/get-page-value'
import {
    buildMap,
    cloneDeep,
    getDisplayData,
    getNewStateOnDataChange,
    sortTable
} from './functions'
import type { DisplayData, MUIDataTableStateRows } from 'mui-datatables'
import {
    DataTableSortOrderOption,
    STP,
    TableAction,
    type DataTableOptions
} from './data-table.props.type/options'
import { type DataTableState } from './data-table.props.type/state'
import {
    MainContext,
    MainContextProvider,
    useMainContext
} from './hooks/use-main-context'
import { FilterTypeEnum } from './data-table.props.type/columns'

/**
 * A responsive DataTable component built with Material UI for React-based project.
 *
 * @see https://mui-datatable-delight.vercel.app
 */
export function DataTable({ components, className, ...props }: DataTableProps) {
    const { classes, cx } = useStyles()
    const [announceText, setAnnounceText] = useState<string>()
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
                    setAnnounceText={setAnnounceText}
                />
            </Paper>

            {announceText && (
                <div className={classes.liveAnnounce} aria-live="polite">
                    {announceText}
                </div>
            )}
        </MainContextProvider>
    )
}

const useStyles = makeStyles({
    name: 'datatable-delight'
})(theme => ({
    root: {
        '& .datatables-no-print': {
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

interface TEMPORARY_PROPS_TYPE
    extends Omit<DataTableProps<DefaultDataItem>, 'components'> {
    classes: ReturnType<typeof useStyles>['classes']
    getRootRef: () => RefObject<HTMLDivElement | null>
    setAnnounceText: (text: string) => void
}

/**
 * @todo MIGRATE STATE TO CONTEXT
 */
class MUIDataTableClass extends React.Component<
    TEMPORARY_PROPS_TYPE,
    DataTableState
> {
    declare context: ReturnType<typeof useMainContext>
    static contextType = MainContext

    tableRef: RefObject<HTMLTableElement | null>
    draggableHeadCellRefs: HTMLTableCellElement[]
    setHeadResizable: (
        tableHeadCellElements: HTMLTableCellElement[],
        tableRef: HTMLTableElement
    ) => void
    tableHeadCellElements: HTMLTableCellElement[]
    timers: unknown
    updateDividers: () => void

    constructor(props: TEMPORARY_PROPS_TYPE) {
        super(props)

        this.tableRef = createRef()
        this.draggableHeadCellRefs = []
        this.tableHeadCellElements = []
        this.timers = {}
        this.setHeadResizable = () => {}
        this.updateDividers = () => {}
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
            let didDataUpdate = this.props.data !== prevProps.data
            if (this.props.data && prevProps.data) {
                didDataUpdate =
                    didDataUpdate &&
                    this.props.data.length === prevProps.data.length
            }

            this.setState(
                getNewStateOnDataChange(
                    this.props,
                    TABLE_LOAD.INITIAL,
                    didDataUpdate,
                    this.context.options,
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

        if (this.context.options.resizableColumns && this.tableRef.current) {
            this.setHeadResizable(
                this.tableHeadCellElements,
                this.tableRef.current
            )
            this.updateDividers()
        }
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
                    this.context.options.onViewColumnsChange ||
                    this.context.options.onColumnViewChange

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

    toggleSortColumn = (columnIndex: number) => {
        this.setState(prevState => {
            const { columns, data } = prevState

            let newOrder: DataTableSortOrderOption['direction'] = columns[
                columnIndex
            ].sortDescFirst
                ? 'desc'
                : 'asc'

            const sequenceOrder: DataTableSortOrderOption['direction'][] = [
                'asc',
                'desc'
            ]

            if (columns[columnIndex].sortDescFirst) {
                sequenceOrder.reverse()
            }

            if (columns[columnIndex].sortThirdClickReset) {
                sequenceOrder.push('none')
            }

            if (columns[columnIndex].name === this.state.sortOrder?.name) {
                let position = sequenceOrder.indexOf(
                    this.state.sortOrder.direction
                )

                if (position !== -1) {
                    position++

                    if (position >= sequenceOrder.length) position = 0

                    newOrder = sequenceOrder[position]
                }
            }

            const newSortOrder: DataTableSortOrderOption = {
                name: columns[columnIndex].name,
                direction: newOrder
            }

            function getSortDirectionLabel(
                sortOrder: DataTableOptions['sortOrder']
            ) {
                switch (sortOrder?.direction) {
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
            const announceText = `Table now sorted by ${columns[columnIndex].name} : ${orderLabel}`

            this.props.setAnnounceText(announceText)

            let newState: DataTableState = {
                ...prevState,
                columns: columns,
                activeColumn: columnIndex
            }

            if (this.context.options.serverSide) {
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
                    columnIndex,
                    newOrder,
                    columns[columnIndex],
                    this.context.options,
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
                    this.context.options,
                    this.setState
                )
            }

            this.context.onStateChange?.(TableAction.SORT, newState)

            this.context.options.onColumnSortChange?.(
                newSortOrder.name,
                newSortOrder.direction
            )

            return newState
        })
    }

    changeRowsPerPage = (rowsPerPage: number) => {
        const rowCount =
            this.context.options.count ?? this.state.displayData.length

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

                this.context.options.onChangeRowsPerPage?.(
                    this.state.rowsPerPage
                )
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

                if (this.context.options.onChangePage) {
                    this.context.options.onChangePage(this.state.page)
                }
            }
        )
    }

    searchClose = () => {
        this.setState(
            prevState => ({
                searchText: null,
                displayData: this.context.options.serverSide
                    ? prevState.displayData
                    : getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          null,
                          null,
                          this.props,
                          prevState,
                          this.context.options,
                          this.setState
                      )
            }),
            () => {
                this.context.onStateChange?.(TableAction.SEARCH, this.state)
                this.context.options.onSearchChange?.(this.state.searchText)
            }
        )
    }

    searchTextUpdate = (text: string) => {
        this.setState(
            prevState => ({
                searchText: text && text.length ? text : null,
                page: 0,
                displayData: this.context.options.serverSide
                    ? prevState.displayData
                    : getDisplayData(
                          prevState.columns,
                          prevState.data,
                          prevState.filterList,
                          text,
                          null,
                          this.props,
                          prevState,
                          this.context.options,
                          this.setState
                      )
            }),
            () => {
                this.context.onStateChange?.(TableAction.SEARCH, this.state)
                this.context.options.onSearchChange?.(this.state.searchText)
            }
        )
    }

    resetFilters = () => {
        this.setState(
            prevState => {
                const filterList = prevState.columns.map(() => [])

                return {
                    filterList: filterList,
                    displayData: this.context.options.serverSide
                        ? prevState.displayData
                        : getDisplayData(
                              prevState.columns,
                              prevState.data,
                              filterList,
                              prevState.searchText,
                              null,
                              this.props,
                              prevState,
                              this.context.options,
                              this.setState
                          )
                }
            },
            () => {
                this.context.onStateChange?.(
                    TableAction.RESET_FILTERS,
                    this.state
                )

                this.context.options.onFilterChange?.(
                    null,
                    this.state.filterList,
                    'reset',
                    null,
                    this.state.displayData
                )
            }
        )
    }

    updateFilterByType = (
        filterList: DataTableState['filterList'],
        index: number,
        value,
        type: DataTableOptions['filterType'],
        customUpdate: (
            filterList: DataTableState['filterList'],
            filterPos: number,
            index: number
        ) => string[][]
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
        value: string | string[],
        column: DataTableState['columns'][0],
        type: FilterTypeEnum,
        customUpdate: (
            filterList: DataTableState['filterList'],
            filterPos: number,
            index: number
        ) => string[][],
        next?: (filterList: DataTableState['filterList']) => void
    ) => {
        this.setState(
            prevState => {
                this.updateFilterByType(
                    prevState.filterList,
                    index,
                    value,
                    type,
                    customUpdate
                )

                return {
                    page: 0,
                    displayData: this.context.options.serverSide
                        ? prevState.displayData
                        : getDisplayData(
                              prevState.columns,
                              prevState.data,
                              prevState.filterList,
                              prevState.searchText,
                              null,
                              this.props,
                              prevState,
                              this.context.options,
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

                this.context.options.onFilterChange?.(
                    column,
                    this.state.filterList,
                    type,
                    index,
                    this.state.displayData
                )

                next?.(this.state.filterList)
            }
        )
    }

    // Collapses or expands all expanded rows
    toggleAllExpandableRows = () => {
        const expandedRowsData = [...this.state.expandedRows.data]

        const { isRowExpandable } = this.context.options
        const affectedRows: string[] = []

        if (expandedRowsData.length > 0) {
            // collapse all
            for (let ii = expandedRowsData.length - 1; ii >= 0; ii--) {
                let item = expandedRowsData[ii]
                if (
                    !isRowExpandable ||
                    isRowExpandable(
                        item.dataIndex,
                        this.context.state.expandedRows
                    )
                ) {
                    affectedRows.push(expandedRowsData.splice(ii, 1))
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
                        affectedRows.push(newItem)
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

                this.context.options.onRowExpansionChange?.(
                    affectedRows,
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

                this.context.options.onColumnOrderChange?.(
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

        if (this.context.options.onRowsDelete) {
            if (
                this.context.options.onRowsDelete(
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
                this.context.options,
                this.state,
                this.setState
            )
        )

        this.context.onStateChange?.(TableAction.ROW_DELETE, this.state)
    }

    toggleExpandRow = (row: { index: number; dataIndex: number }) => {
        const { dataIndex } = row
        const { isRowExpandable } = this.context.options
        let { expandedRows } = this.state
        const expandedRowsData = [...expandedRows.data]
        let shouldCollapseExpandedRow = false

        let hasRemovedRow = false
        let removedRow: string[] = []

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
                    this.context.options.onRowExpansionChange ??
                    this.context.options.onRowsExpand

                expandCallback?.(
                    this.state.curExpandedRows,
                    this.state.expandedRows.data
                )
            }
        )
    }

    selectRowUpdate = (
        type: string,
        value: number[],
        shiftAdjacentRows = []
    ) => {
        // safety check
        const { selectableRows } = this.context.options
        if (selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const { isRowSelectable } = this.context.options
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

                        if (selected)
                            arr.push({
                                index: i,
                                dataIndex: displayData[i].dataIndex
                            })

                        return arr
                    }, [])

                    let newRows = [...selectedRows]
                    let selectedMap = buildMap(newRows)

                    // if the select toolbar is disabled, the rules are a little different
                    if (
                        this.context.options.selectToolbarPlacement === STP.NONE
                    ) {
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

                    const onChangeForwarder =
                        this.context.options.onRowSelectionChange ??
                        this.context.options.onRowsSelect

                    onChangeForwarder?.(
                        this.state.curSelectedRows,
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )
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

                    const onChange =
                        this.context.options.onRowSelectionChange ??
                        this.context.options.onRowsSelect

                    onChange?.(
                        [value],
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )
                }
            )
        } else if (type === 'custom') {
            const { displayData } = this.state

            const data = value.map(index => ({
                index,
                dataIndex: displayData[index].dataIndex
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

                    const onRowSelectionChange =
                        this.context.options.onRowSelectionChange ??
                        this.context.options.onRowsSelect

                    onRowSelectionChange?.(
                        this.state.selectedRows.data,
                        this.state.selectedRows.data,
                        this.state.selectedRows.data.map(item => item.dataIndex)
                    )
                }
            )
        }
    }

    render() {
        const state = this.state ?? this.context.state

        const { classes, title } = this.props

        const {
            activeColumn,
            displayData,
            columns,
            page,
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
        const rowsPerPage = this.context.options.pagination
            ? state.rowsPerPage
            : displayData.length
        const showToolbar = hasToolbarItem(this.context.options)
        const columnNames = columns.map(column => ({
            name: column.name,
            filterType: column.filterType ?? this.context.options.filterType
        }))
        const responsiveOption = this.context.options.responsive

        let maxHeight = this.context.options.tableBodyMaxHeight
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
            height: this.context.options.tableBodyHeight
        }

        const tableProps = this.context.options.setTableProps?.() ?? {}

        const tableClassNames = clsx(classes.tableRoot, tableProps.className)
        delete tableProps.className // remove className from props to avoid the className being applied twice

        return (
            <>
                {(this.context.options.selectToolbarPlacement === STP.ALWAYS ||
                    (selectedRows.data.length > 0 &&
                        this.context.options.selectToolbarPlacement !==
                            STP.NONE)) && (
                    <this.context.components.TableToolbarSelect
                        selectedRows={selectedRows}
                        onRowsDelete={this.selectRowDelete}
                        displayData={displayData}
                        selectRowUpdate={this.selectRowUpdate}
                    />
                )}
                {(selectedRows.data.length === 0 ||
                    ![STP.ABOVE, STP.NONE].some(
                        stp =>
                            this.context.options.selectToolbarPlacement === stp
                    )) &&
                    showToolbar && (
                        <this.context.components.TableToolbar
                            // columns={columns}
                            // columnOrder={columnOrder}
                            // displayData={displayData}
                            // filterList={filterList}
                            filterUpdate={this.filterUpdate}
                            // updateFilterByType={this.updateFilterByType}
                            resetFilters={this.resetFilters}
                            searchText={searchText ?? undefined}
                            searchTextUpdate={this.searchTextUpdate}
                            searchClose={this.searchClose}
                            // tableRef={this.tableRef}
                            title={title}
                            toggleViewColumn={this.toggleViewColumn}
                            setTableAction={(action: TableAction) => {
                                // throw new Error(action)
                                this.context.onStateChange?.(action, state)
                            }}
                        />
                    )}
                <this.context.components.TableFilterList
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
                    page={page}
                    rowCount={rowCount}
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={this.changeRowsPerPage}
                    changePage={this.changePage}
                />
            </>
        )
    }
}

enum TABLE_LOAD {
    INITIAL = 1,
    UPDATE = 2
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

    return TOOLBAR_ITEMS.some(itemName =>
        Object.keys(options).includes(itemName)
    )
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
    columns: DataTableState['columns']
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
    const { components, options } = useMainContext()

    return (
        <div
            style={{ position: 'relative', ...tableHeightVal }}
            className={responsiveClass}
        >
            {options.resizableColumns && (
                <components.TableResize
                    updateDividers={forwardUpdateDividers}
                    setResizable={forwardSetHeadResizable}
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
                        sortOrder={sortOrder}
                        columnOrder={columnOrder}
                        updateColumnOrder={updateColumnOrder}
                        draggableHeadCellRefs={draggableHeadCellRefs}
                        tableRef={getCurrentRootRef}
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
                        columnOrder={columnOrder}
                        filterList={filterList}
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
