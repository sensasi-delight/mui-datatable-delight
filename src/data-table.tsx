'use client'

// types
import type { DataTableProps } from './data-table.props.type'
// vendors
import { useEffect, useRef } from 'react'
import { Paper, PaperProps } from '@mui/material'
// locals
import {
    buildMap,
    getDisplayData
    // getNewStateOnDataChange
} from './functions'
import {
    STP,
    TableAction,
    type DataTableOptions
} from './data-table.props.type/options'
import { type DataTableState } from './data-table.props.type/state'
import {
    DataTableContextProvider,
    useDataTableContext,
    useStyles
} from './hooks'
import { FilterTypeEnum } from './data-table.props.type/columns'
// components
import {
    AnnounceText,
    BottomBar,
    ColumnsResizer,
    FilteredValuesList,
    SelectedRowsToolbar,
    Table,
    Toolbar
} from './components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SetResizableCallback } from './components/resize'

/**
 * A responsive DataTable component built with Material UI for React-based project.
 *
 * @see https://mui-datatable-delight.vercel.app
 */
export function DataTable<T>({ className, ref, ...props }: DataTableProps<T>) {
    return (
        <DataTableContextProvider datatableProps={props}>
            <_DataTable className={className} ref={ref} />
        </DataTableContextProvider>
    )
}

function _DataTable({
    className,
    ref
}: {
    className?: string
    ref: PaperProps['ref']
}) {
    const { classes, cx } = useStyles()

    const {
        components,
        onAction,
        options,
        props: datatableRootProps,
        setState,
        state
    } = useDataTableContext()

    const tableRef = useRef<HTMLTableElement>(null)
    const tableHeadCellElements = useRef<HTMLTableCellElement[]>([])
    const draggableHeadCellRefs = useRef<HTMLTableCellElement[]>([])

    const setHeadResizable = useRef<SetResizableCallback>(undefined)

    const updateDividers = useRef<() => void>(undefined)

    // component did mount
    // useEffect(() => {
    //     if (tableRef.current) {
    //         console.log('##############################')
    //         setHeadResizable?.(tableHeadCellElements, tableRef.current)
    //     }
    // }, [])

    // component did update
    useEffect(() => {
        // if (
        //     this.props.data !== prevProps.data ||
        //     this.props.columns !== prevProps.columns ||
        //     this.props.options !== prevProps.options
        // ) {
        //     const didDataUpdate =
        //         this.props.data && prevProps.data
        //             ? this.props.data.length === prevProps.data.length
        //             : this.props.data !== prevProps.data
        //     const pageNo =
        //         this.props.options?.searchText !==
        //             prevProps.options?.searchText &&
        //         !this.props.options?.serverSide
        //             ? 0 // When we have a search, we must reset page to view it unless on serverSide since paging is handled by the user.
        //             : this.context.state.page
        //     const newState = {
        //         ...getNewStateOnDataChange(
        //             this.props,
        //             TABLE_LOAD.INITIAL,
        //             didDataUpdate,
        //             this.context.options,
        //             this.context.state,
        //             this.context.setState
        //         ),
        //         page: pageNo
        //     }
        //     this.context.onAction?.(TableAction.PROP_UPDATE, newState)
        // }

        if (options.resizableColumns && tableRef) {
            setHeadResizable.current?.(tableHeadCellElements, tableRef)
            updateDividers.current?.()
        }
    }, [])

    function setHeadCellRef(
        index: number,
        pos: number,
        el: HTMLTableCellElement
    ) {
        if (!draggableHeadCellRefs.current) {
            draggableHeadCellRefs.current = []
        }

        draggableHeadCellRefs.current[index] = el

        if (!tableHeadCellElements.current) {
            tableHeadCellElements.current = []
        }

        tableHeadCellElements.current[pos] = el
    }

    const filterUpdate: FilterUpdateType = (
        index,
        value,
        column,
        type,
        customUpdate,
        next
    ) => {
        const prevState = state

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

        const displayData = options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  prevState.filterList,
                  prevState.searchText,
                  null,
                  datatableRootProps,
                  newState,
                  options,
                  setState
              )

        onAction?.(TableAction.FILTER_CHANGE, {
            ...newState,
            displayData
        })

        options.onFilterChange?.(
            column,
            prevState.filterList,
            type,
            index,
            displayData
        )

        next?.(prevState.filterList)
    }

    function selectRowUpdate(
        type: string,
        value: DataTableState['previousSelectedRow'],
        shiftAdjacentRows = []
    ) {
        // safety check
        const { selectableRows } = options
        if (selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const { isRowSelectable } = options
            const prevState = state

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
            if (options.selectToolbarPlacement === STP.NONE) {
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

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            const onChangeForwarder =
                options.onRowSelectionChange ?? options.onRowsSelect

            onChangeForwarder?.(
                newState.curSelectedRows,
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'cell') {
            const prevState = state
            const { dataIndex } = value ?? {}
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

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            const onChange =
                options.onRowSelectionChange ?? options.onRowsSelect

            onChange?.(
                [value],
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'custom') {
            const { displayData } = state

            const data = value?.map(index => ({
                index,
                dataIndex: displayData[index].dataIndex
            }))

            const lookup = buildMap(data)

            const selectedRows = { data, lookup }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, {
                selectedRows,
                previousSelectedRow: null
            })

            const onRowSelectionChange =
                options.onRowSelectionChange ?? options.onRowsSelect

            onRowSelectionChange?.(
                selectedRows.data,
                selectedRows.data,
                selectedRows.data.map(item => item.dataIndex)
            )
        }
    }

    const isShowToolbarSelect =
        options.selectToolbarPlacement === STP.ALWAYS ||
        (state.selectedRows.data.length > 0 &&
            options.selectToolbarPlacement !== STP.NONE)

    const isShowToolbar =
        !isShowToolbarSelect &&
        hasToolbarItem(options) &&
        options.selectToolbarPlacement &&
        ![STP.ABOVE, STP.NONE].includes(options.selectToolbarPlacement)

    const paperClasses = cx(
        ['scrollFullHeightFullWidth', 'stackedFullWidth'].some(
            responsive => options?.responsive === responsive
        )
            ? classes.paperResponsiveScrollFullHeightFullWidth
            : '',
        classes.root,
        className
    )

    const { tableHeightVal, responsiveClass } =
        getTableHeightAndResponsiveClasses(options, classes)

    // ####### COMPONENT HANDLER ###########
    const _SelectedRowsToolbar =
        components.SelectedRowsToolbar ?? SelectedRowsToolbar
    const _Toolbar = components.Toolbar ?? Toolbar
    const _FilteredValuesList =
        components.FilteredValuesList ?? FilteredValuesList
    const _ColumnsResizer = components.ColumnsResizer ?? ColumnsResizer
    const _BottomBar = components.BottomBar ?? BottomBar

    return (
        <Paper
            elevation={options?.elevation}
            ref={ref}
            className={paperClasses}
        >
            {isShowToolbarSelect && (
                <_SelectedRowsToolbar selectRowUpdate={selectRowUpdate} />
            )}

            {isShowToolbar && (
                <_Toolbar filterUpdate={filterUpdate} tableRef={tableRef} />
            )}

            <_FilteredValuesList filterUpdate={filterUpdate} />

            <div
                style={{ position: 'relative', ...tableHeightVal }}
                className={responsiveClass}
            >
                {options.resizableColumns && (
                    <_ColumnsResizer
                        updateDividers={fn => (updateDividers.current = fn)}
                        setResizable={fn => (setHeadResizable.current = fn)}
                    />
                )}

                <DndProvider backend={HTML5Backend}>
                    <Table
                        tableRef={tableRef}
                        selectRowUpdate={selectRowUpdate}
                        setHeadCellRef={setHeadCellRef}
                        draggableHeadCellRefs={draggableHeadCellRefs}
                    />
                </DndProvider>
            </div>

            <_BottomBar />

            <AnnounceText />
        </Paper>
    )
}

// enum TABLE_LOAD {
//     INITIAL = 1,
//     UPDATE = 2
// }

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
     * customUpdate is called `<FilterList />` (onDelete)
     */
    customUpdate?: (
        filterList: DataTableState['filterList'],
        filterPos: number,
        index: number
    ) => string[][],

    /**
     * next is called `<FilterList />` (onDelete)
     */
    next?: (filterList: DataTableState['filterList']) => void
) => void

function getTableHeightAndResponsiveClasses(
    options: DataTableOptions,
    classes: ReturnType<typeof useStyles>['classes']
) {
    const responsiveOption = options.responsive

    let maxHeight = options.tableBodyMaxHeight
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
        height: options.tableBodyHeight
    }

    return {
        tableHeightVal,
        responsiveClass
    }
}
