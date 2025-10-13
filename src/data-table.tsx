'use client'

import Paper, { type PaperProps } from '@mui/material/Paper'
// vendors
import type { ReactNode } from 'react'
// components
import AnnounceText from './components/announce-text'
import BottomBar from './components/bottom-bar'
import FilteredValuesList from './components/filtered-values-list'
import SelectedRowsToolbar from './components/selected-rows-toolbar'
import Table from './components/table'
import Toolbar from './components/toolbar'
// locals
import type { DataTableProps } from './data-table.props'
// enums
import ClassName from './enums/class-name'
import TableAction from './enums/table-action'
import { buildMap } from './functions'
import getDisplayData from './functions/get-new-state-on-data-change/get-display-data'
// hooks
import useDataTableContext from './hooks/use-data-table-context'
import DataTableContextProvider from './hooks/use-data-table-context/components/provider'
import SELECT_TOOLBAR_PLACEMENT from './statics/select-toolbar-placement'
import type { DefaultRow } from './types/default-row'
import type { FilterUpdateType } from './types/filter-update'
import type { DataTableOptions } from './types/options'
import type { SelectRowUpdateType } from './types/select-row-update'
import type { FilterTypeType } from './types/shared/filter-type-type'
import type { FilterList } from './types/state/filter-list'
import type { SelectedRowDataState } from './types/state/selected-row-data'

/**
 * A responsive DataTable component built with `@mui/material` for React-based project.
 *
 * @category  Component
 *
 * @see  https://mui-datatable-delight.vercel.app
 */
export function DataTable<Row = DefaultRow>({
    className,
    ref,
    paperProps,
    ...props
}: DataTableProps<Row>): ReactNode {
    return (
        <DataTableContextProvider datatableProps={props}>
            <DataTable_
                className={`${ClassName.ROOT} ${className}`}
                paperProps={paperProps}
                ref={ref}
            />
        </DataTableContextProvider>
    )
}

function DataTable_<T>({
    className,
    ref,
    paperProps
}: {
    className?: string
    ref: PaperProps['ref']
    paperProps?: PaperProps
}): ReactNode {
    const { components, onAction, options, state, updateCellValueRef } =
        useDataTableContext<T>()

    const filterUpdate: FilterUpdateType<T> = (
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
                  newState,
                  options,
                  updateCellValueRef
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

    const selectRowUpdate: SelectRowUpdateType = (
        type,
        value,
        shiftAdjacentRows = []
    ) => {
        if (options.selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const prevState = state

            const { displayData, selectedRows: prevSelectedRows } = prevState
            const selectedRowsLen = state.selectedRows.data.length
            let isDeselect =
                selectedRowsLen === displayData.length ||
                (selectedRowsLen < displayData.length && selectedRowsLen > 0)

            const selectedRows = displayData.reduce<SelectedRowDataState[]>(
                (arr, item, i) => {
                    const selected =
                        options.isRowSelectable?.(
                            item.dataIndex,
                            prevSelectedRows
                        ) ?? true

                    if (selected) {
                        arr.push({
                            dataIndex: item.dataIndex,
                            index: i
                        })
                    }

                    return arr
                },
                []
            )

            let newRows = [...selectedRows]
            let selectedMap = buildMap(newRows)

            // if the select toolbar is disabled, the rules are a little different
            if (
                options.selectToolbarPlacement === SELECT_TOOLBAR_PLACEMENT.NONE
            ) {
                if (selectedRowsLen > displayData.length) {
                    isDeselect = true
                } else {
                    for (const item of selectedRows) {
                        isDeselect = !selectedMap[item.dataIndex]
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
                previousSelectedRow: undefined,
                selectedRows: {
                    data: newRows,
                    lookup: selectedMap
                }
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            options.onRowSelectionChange?.(
                newState.curSelectedRows,
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'cell') {
            if (Array.isArray(value)) {
                throw new Error('value must be a single row')
            }

            const prevState = state
            const { dataIndex } = value ?? {}
            let selectedRows = [...prevState.selectedRows.data]
            let rowPos = -1

            for (let cIndex = 0; cIndex < selectedRows.length; cIndex++) {
                if (selectedRows[cIndex]?.dataIndex === dataIndex) {
                    rowPos = cIndex
                    break
                }
            }

            if (rowPos >= 0) {
                selectedRows.splice(rowPos, 1)

                // handle rows affected by shift+click
                if (shiftAdjacentRows.length > 0) {
                    const shiftAdjacentMap = buildMap(shiftAdjacentRows)

                    const temp = selectedRows.slice().reverse()

                    temp.forEach((row, i) => {
                        if (shiftAdjacentMap[row.dataIndex]) {
                            selectedRows.splice(i, 1)
                        }
                    })
                }
            } else if (options.selectableRows === 'single') {
                selectedRows = [value]
            } else {
                // multiple
                selectedRows.push(value)

                // handle rows affected by shift+click
                if (shiftAdjacentRows.length > 0) {
                    const selectedMap = buildMap(selectedRows)
                    shiftAdjacentRows.forEach(aRow => {
                        if (!selectedMap[aRow.dataIndex]) {
                            selectedRows.push(aRow)
                        }
                    })
                }
            }

            const newState = {
                ...prevState,
                previousSelectedRow: value,
                selectedRows: {
                    data: selectedRows,
                    lookup: buildMap(selectedRows)
                }
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            options.onRowSelectionChange?.(
                [value],
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'custom') {
            const lookup = buildMap(Array.isArray(value) ? value : [value])

            const selectedRows = {
                data: Array.isArray(value) ? value : [value],
                lookup
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, {
                previousSelectedRow: undefined,
                selectedRows
            })

            options.onRowSelectionChange?.(
                selectedRows.data,
                selectedRows.data,
                selectedRows.data.map(item => item.dataIndex)
            )
        }
    }

    const isShowToolbarSelect =
        options.selectToolbarPlacement === SELECT_TOOLBAR_PLACEMENT.ALWAYS ||
        (state.selectedRows.data.length > 0 &&
            options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.NONE)

    const isShowToolbar =
        !isShowToolbarSelect &&
        hasToolbarItem(options) &&
        options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.ABOVE &&
        options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.NONE

    // ####### COMPONENT HANDLER ###########
    const _SelectedRowsToolbar =
        components.SelectedRowsToolbar ?? SelectedRowsToolbar
    const _Toolbar = components.Toolbar ?? Toolbar
    const _FilteredValuesList =
        components.FilteredValuesList ?? FilteredValuesList
    const _BottomBar = components.BottomBar ?? BottomBar

    return (
        <Paper
            className={className}
            elevation={options?.elevation}
            ref={ref}
            sx={{
                '& .datatables-noprint': {
                    '@media print': {
                        display: 'none'
                    }
                },
                isolation: 'isolate'
            }}
            {...paperProps}
        >
            {isShowToolbarSelect && (
                <_SelectedRowsToolbar selectRowUpdate={selectRowUpdate} />
            )}

            {isShowToolbar && <_Toolbar filterUpdate={filterUpdate} />}

            <_FilteredValuesList filterUpdate={filterUpdate} />

            <div
                style={{
                    height: options.tableBodyHeight,
                    maxHeight: options.tableBodyMaxHeight,
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                <Table selectRowUpdate={selectRowUpdate} />
            </div>

            <_BottomBar />

            <AnnounceText />
        </Paper>
    )
}

function hasToolbarItem<T>(options: DataTableOptions<T>) {
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
    filterList: FilterList,
    index: number,
    value: string | string[],
    type: FilterTypeType,
    customUpdate?: (
        filterList: FilterList,
        filterPos: number,
        index: number
    ) => string[][]
) {
    const filterIndexPosition: number =
        filterList[index]?.findIndex(filter => filter === value) ?? -1

    switch (type) {
        case 'checkbox':
            if (filterIndexPosition >= 0) {
                filterList[index]?.splice(filterIndexPosition, 1)
            } else if (typeof value === 'string') {
                filterList[index]?.push(value)
            }

            break

        case 'chip':
            if (filterIndexPosition >= 0) {
                filterList[index]?.splice(filterIndexPosition, 1)
            } else if (typeof value === 'string') {
                filterList[index]?.push(value)
            }
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
