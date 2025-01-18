'use client'

// types
import type { DataTableProps, DefaultDataItem } from './data-table.props.type'
// vendors
import { Paper } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import React, { createRef, useState, type RefObject } from 'react'
// locals
import {
    buildMap,
    cloneDeep,
    getDisplayData,
    getNewStateOnDataChange,
    sortTable
} from './functions'
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
import { InnerTable } from './data-table.inner-table'

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
})({
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
})

interface TEMPORARY_PROPS_TYPE
    extends Omit<DataTableProps<DefaultDataItem>, 'components'> {
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
    }

    componentDidUpdate(prevProps: DataTableProps) {
        if (
            this.props.data !== prevProps.data ||
            this.props.columns !== prevProps.columns ||
            this.props.options !== prevProps.options
        ) {
            const didDataUpdate =
                this.props.data && prevProps.data
                    ? this.props.data.length === prevProps.data.length
                    : this.props.data !== prevProps.data

            const pageNo =
                this.props.options?.searchText !==
                    prevProps.options?.searchText &&
                !this.props.options?.serverSide
                    ? 0 // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
                    : this.context.state.page

            const newState = {
                ...getNewStateOnDataChange(
                    this.props,
                    TABLE_LOAD.INITIAL,
                    didDataUpdate,
                    this.context.options,
                    this.context.state,
                    this.context.setState
                ),
                page: pageNo
            }

            this.context.onAction?.(TableAction.PROP_UPDATE, newState)
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
        const { columns } = this.context.state

        const newColumns = cloneDeep(columns) as typeof columns

        newColumns[index].display =
            newColumns[index].display === 'true' ? 'false' : 'true'

        this.context.onAction?.(TableAction.VIEW_COLUMNS_CHANGE, {
            columns: newColumns
        })

        const cb =
            this.context.options.onViewColumnsChange ||
            this.context.options.onColumnViewChange

        cb?.(
            newColumns[index].name,
            newColumns[index].display === 'true' ? 'add' : 'remove'
        )
    }

    toggleSortColumn = (columnIndex: number) => {
        const prevState = this.context.state
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

        if (columns[columnIndex].name === prevState.sortOrder?.name) {
            let position = sequenceOrder.indexOf(prevState.sortOrder.direction)

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
                this.context.setState
            )
        }

        this.context.onAction?.(TableAction.SORT, newState)

        this.context.options.onColumnSortChange?.(
            newSortOrder.name,
            newSortOrder.direction
        )

        this.context.setState?.(newState)
    }

    searchTextUpdate = (newSearchText: string) => {
        const prevState = this.context.state

        const displayData = this.context.options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  prevState.filterList,
                  newSearchText,
                  null,
                  this.props,
                  prevState,
                  this.context.options,
                  this.context.setState
              )

        this.context.onAction?.(TableAction.SEARCH, {
            searchText: newSearchText,
            page: 0,
            displayData
        })
        this.context.options.onSearchChange?.(newSearchText)
    }

    resetFilters = () => {
        const prevState = this.context.state

        const filterList = prevState.columns.map(() => [])
        const displayData = this.context.options.serverSide
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
                  this.context.setState
              )

        this.context.onAction?.(TableAction.RESET_FILTERS, {
            filterList,
            displayData
        })

        this.context.options.onFilterChange?.(
            null,
            filterList,
            'reset',
            null,
            displayData
        )
    }

    filterUpdate: FilterUpdateType = (
        index,
        value,
        column,
        type,
        customUpdate,
        next
    ) => {
        const prevState = this.context.state

        updateFilterByType(
            prevState.filterList,
            index,
            value,
            type,
            customUpdate
        )

        const newState = {
            ...prevState,
            page: 0
        }

        const displayData = this.context.options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  prevState.filterList,
                  prevState.searchText,
                  null,
                  this.props,
                  newState,
                  this.context.options,
                  this.context.setState
              )

        this.context.onAction?.(TableAction.FILTER_CHANGE, {
            ...newState,
            displayData
        })

        this.context.options.onFilterChange?.(
            column,
            prevState.filterList,
            type,
            index,
            displayData
        )

        next?.(prevState.filterList)
    }

    // Collapses or expands all expanded rows
    toggleAllExpandableRows = () => {
        const expandedRowsData = [...this.context.state.expandedRows.data]

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
            for (let ii = 0; ii < this.context.state.data.length; ii++) {
                let item = this.context.state.data[ii]
                if (
                    !isRowExpandable ||
                    (isRowExpandable &&
                        isRowExpandable(
                            item.dataIndex,
                            this.context.state.expandedRows
                        ))
                ) {
                    if (
                        this.context.state.expandedRows.lookup[item.index] !==
                        true
                    ) {
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

        const newState = {
            expandedRows: {
                lookup: buildMap(expandedRowsData),
                data: expandedRowsData
            }
        }

        this.context.onAction?.(TableAction.EXPAND_ROW, newState)

        this.context.options.onRowExpansionChange?.(
            affectedRows,
            newState.expandedRows.data,
            newState.expandedRows.data.map(item => item.dataIndex)
        )
    }

    areAllRowsExpanded = () => {
        return (
            this.context.state.expandedRows.data.length ===
            this.context.state.data.length
        )
    }

    updateColumnOrder = (
        columnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) => {
        this.context.onAction?.(TableAction.COLUMN_ORDER_CHANGE, {
            columnOrder
        })

        this.context.options.onColumnOrderChange?.(
            columnOrder,
            columnIndex,
            newPosition
        )
    }

    toggleExpandRow = (row: { index: number; dataIndex: number }) => {
        const { dataIndex } = row
        const { isRowExpandable } = this.context.options
        let { expandedRows } = this.context.state
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

        const newState = {
            curExpandedRows: hasRemovedRow ? removedRow : [row],
            expandedRows: {
                lookup: buildMap(expandedRowsData),
                data: expandedRowsData
            }
        }

        this.context.onAction?.(TableAction.ROW_EXPANSION_CHANGE, newState)

        const expandCallback =
            this.context.options.onRowExpansionChange ??
            this.context.options.onRowsExpand

        expandCallback?.(newState.curExpandedRows, newState.expandedRows.data)
    }

    selectRowUpdate = (
        type: string,
        value: DataTableState['previousSelectedRow'],
        shiftAdjacentRows = []
    ) => {
        // safety check
        const { selectableRows } = this.context.options
        if (selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const { isRowSelectable } = this.context.options
            const prevState = this.context.state

            const { displayData, selectedRows: prevSelectedRows } = prevState
            const selectedRowsLen = prevState.selectedRows.data.length
            let isDeselect =
                selectedRowsLen === displayData.length ||
                (selectedRowsLen < displayData.length && selectedRowsLen > 0)

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
            if (this.context.options.selectToolbarPlacement === STP.NONE) {
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

            const newState = {
                curSelectedRows: newRows,
                selectedRows: {
                    data: newRows,
                    lookup: selectedMap
                },
                previousSelectedRow: null
            }

            this.context.onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            const onChangeForwarder =
                this.context.options.onRowSelectionChange ??
                this.context.options.onRowsSelect

            onChangeForwarder?.(
                newState.curSelectedRows,
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'cell') {
            const prevState = this.context.state
            const { dataIndex } = value
            let selectedRows = [...prevState.selectedRows.data]
            let rowPos = -1

            for (let cIndex = 0; cIndex < selectedRows.length; cIndex++) {
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
                        if (shiftAdjacentMap[selectedRows[cIndex].dataIndex]) {
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

            const newState = {
                ...prevState,
                selectedRows: {
                    lookup: buildMap(selectedRows),
                    data: selectedRows
                },
                previousSelectedRow: value
            }

            this.context.onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            const onChange =
                this.context.options.onRowSelectionChange ??
                this.context.options.onRowsSelect

            onChange?.(
                [value],
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'custom') {
            const { displayData } = this.context.state

            const data = value.map(index => ({
                index,
                dataIndex: displayData[index].dataIndex
            }))

            const lookup = buildMap(data)

            const selectedRows = { data, lookup }

            this.context.onAction?.(TableAction.ROW_SELECTION_CHANGE, {
                selectedRows,
                previousSelectedRow: null
            })

            const onRowSelectionChange =
                this.context.options.onRowSelectionChange ??
                this.context.options.onRowsSelect

            onRowSelectionChange?.(
                selectedRows.data,
                selectedRows.data,
                selectedRows.data.map(item => item.dataIndex)
            )
        }
    }

    render() {
        const state = this.context.state

        const { title } = this.props

        const isShowToolbarSelect =
            this.context.options.selectToolbarPlacement === STP.ALWAYS ||
            (state.selectedRows.data.length > 0 &&
                this.context.options.selectToolbarPlacement !== STP.NONE)

        const isShowToolbar =
            !isShowToolbarSelect &&
            hasToolbarItem(this.context.options) &&
            this.context.options.selectToolbarPlacement &&
            ![STP.ABOVE, STP.NONE].includes(
                this.context.options.selectToolbarPlacement
            )

        return (
            <>
                {isShowToolbarSelect && (
                    <this.context.components.TableToolbarSelect
                        selectRowUpdate={this.selectRowUpdate}
                    />
                )}

                {isShowToolbar && (
                    <this.context.components.TableToolbar
                        filterUpdate={this.filterUpdate}
                        resetFilters={this.resetFilters}
                        searchTextUpdate={this.searchTextUpdate}
                        tableRef={this.tableRef}
                        title={title}
                        toggleViewColumn={this.toggleViewColumn}
                        setTableAction={(action: TableAction) => {
                            this.context.onAction?.(action, this.context.state)
                        }}
                    />
                )}

                <this.context.components.TableFilterList
                    filterUpdate={this.filterUpdate}
                />

                <InnerTable
                    // new this
                    forwardUpdateDividers={fn => (this.updateDividers = fn)}
                    forwardSetHeadResizable={fn => (this.setHeadResizable = fn)}
                    // var section
                    title={title}
                    // this section
                    tableRef={this.tableRef}
                    selectRowUpdate={this.selectRowUpdate}
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

                <this.context.components.TableFooter />
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

function updateFilterByType(
    filterList: DataTableState['filterList'],
    index: number,
    value: string | string[],
    type: DataTableOptions['filterType'],
    customUpdate?: (
        filterList: DataTableState['filterList'],
        filterPos: number,
        index: number
    ) => string[][]
) {
    const filterIndexPosition: number = filterList[index].findIndex(
        filter => filter === value
    )

    switch (type) {
        case 'checkbox':
            filterIndexPosition >= 0
                ? filterList[index].splice(filterIndexPosition, 1)
                : typeof value === 'string' && filterList[index].push(value)
            break

        case 'chip':
            filterIndexPosition >= 0
                ? filterList[index].splice(filterIndexPosition, 1)
                : typeof value === 'string' && filterList[index].push(value)
            break

        case 'multiselect':
            filterList[index] = typeof value === 'string' ? [] : value
            break

        case 'dropdown':
            filterList[index] = typeof value === 'string' ? [] : value
            break

        case 'custom':
            if (customUpdate) {
                filterList = customUpdate(
                    filterList,
                    filterIndexPosition,
                    index
                )
            } else {
                filterList[index] = typeof value === 'string' ? [] : value
            }
            break

        default:
            filterList[index] = typeof value === 'string' ? [value] : value
    }
}

export type FilterUpdateType = (
    index: number,
    value: string | string[],
    column: DataTableState['columns'][0],
    type: FilterTypeEnum,

    /**
     * customUpdate is called FilterList (onDelete)
     */
    customUpdate?: (
        filterList: DataTableState['filterList'],
        filterPos: number,
        index: number
    ) => string[][],

    /**
     * next is called FilterList (onDelete)
     */
    next?: (filterList: DataTableState['filterList']) => void
) => void
