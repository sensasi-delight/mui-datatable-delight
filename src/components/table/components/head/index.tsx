'use client'

// materials
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ComponentClassName from '@src/enums/class-name'
// global enums
import TableAction from '@src/enums/table-action'
// global functions
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
import sortTable from '@src/functions/sort-table'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import {
    type DataTableOptions,
    type DataTableSortOrderOption
} from '@src/types/options'
import type { DataTableState } from '@src/types/state'
// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import CheckboxCell from '../_shared/checkbox-cell'
import { TableHeadCell } from './components/cell'
import type { Props } from './types/props'

/**
 * Table Head
 *
 * @category  Component
 */
export default function TableHead({ selectRowUpdate }: Props): ReactNode {
    const { classes, cx } = useStyles()
    const { onAction, options, state, updateCellValueRef } =
        useDataTableContext()

    function handleToggleColumn(columnIndex: number) {
        let newOrder: DataTableSortOrderOption['direction'] = state.columns[
            columnIndex
        ]?.sortDescFirst
            ? 'desc'
            : 'asc'

        const sequenceOrder: DataTableSortOrderOption['direction'][] = [
            'asc',
            'desc'
        ]

        if (state.columns[columnIndex]?.sortDescFirst) {
            sequenceOrder.reverse()
        }

        if (state.columns[columnIndex]?.sortThirdClickReset) {
            sequenceOrder.push('none')
        }

        if (state.columns[columnIndex]?.name === state.sortOrder?.name) {
            let position = sequenceOrder.indexOf(
                state.sortOrder?.direction ?? 'none'
            )

            if (position !== -1) {
                position++

                if (position >= sequenceOrder.length) position = 0

                newOrder = sequenceOrder[position] ?? 'none'
            }
        }

        const columnName = state.columns[columnIndex]?.name

        if (!columnName) {
            throw new Error('Column name not found')
        }

        const newSortOrder: DataTableSortOrderOption = {
            direction: newOrder,
            name: columnName
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

        let newPartialState: Partial<DataTableState<unknown>> = {
            activeColumn: columnIndex,
            announceText: `Table now sorted by ${state.columns[columnIndex]?.name} : ${orderLabel}`,
            sortOrder: newSortOrder
        }

        if (!options.serverSide) {
            const sortedData = sortTable(
                state.data,
                columnIndex,
                newOrder,
                state.columns[columnIndex],
                options,
                {
                    ...state,
                    ...newPartialState
                }
            )

            newPartialState = {
                ...newPartialState,
                data: sortedData.data,
                previousSelectedRow: undefined,
                selectedRows: sortedData.selectedRows,
                sortOrder: newSortOrder
            }

            newPartialState.displayData = getDisplayData(
                state.columns,
                sortedData.data,
                state.filterList,
                state.searchText,
                {
                    ...state,
                    ...newPartialState
                },
                options,
                updateCellValueRef
            )
        }

        onAction?.(TableAction.SORT, newPartialState)
        options.onColumnSortChange?.(newSortOrder.name, newSortOrder.direction)
    }

    const handleRowSelect = () => {
        selectRowUpdate('head', [])
    }

    const numSelected = state.selectedRows.data.length ?? 0
    let isIndeterminate = numSelected > 0 && numSelected < state.count
    let isChecked = numSelected > 0 && numSelected >= state.count

    if (
        options.selectToolbarPlacement === 'none' ||
        options.selectToolbarPlacement === 'above'
    ) {
        if (isChecked) {
            for (const item of state.displayData) {
                if (!state.selectedRows.lookup[item.dataIndex]) {
                    isChecked = false
                    isIndeterminate = true
                    break
                }
            }
        } else {
            if (numSelected > state.count) {
                isIndeterminate = true
            }
        }
    }

    const orderedColumns = state.columnOrder.map((colIndex, idx) => {
        const column = state.columns[colIndex]

        if (!column) {
            throw new Error('Column is undefined')
        }

        return {
            colPos: idx,
            column,
            index: colIndex
        }
    })

    return (
        <MuiTableHead
            className={cx(classes.root, {
                [classes.responsiveStacked]:
                    options.responsive === 'vertical' ||
                    options.responsive === 'stacked' ||
                    options.responsive === 'stackedFullWidth',
                [classes.responsiveSimple]: options.responsive === 'simple'
            })}
        >
            <TableRow className={classes.row}>
                <CheckboxCell
                    checked={isChecked}
                    indeterminate={isIndeterminate}
                    isHeaderCell
                    isRowSelectable
                    onChange={handleRowSelect}
                />

                {orderedColumns.map(
                    ({ column, index, colPos }) =>
                        column.display === true &&
                        (column.customHeadRender?.(
                            { index, ...column },
                            handleToggleColumn,
                            state.sortOrder
                        ) ?? (
                            <TableHeadCell
                                cellHeaderProps={
                                    state.columns[index]?.setCellHeaderProps?.({
                                        index,
                                        ...column
                                    }) ?? {}
                                }
                                colPosition={colPos}
                                column={column}
                                index={index}
                                key={index}
                                sortDirection={
                                    column.name === state.sortOrder?.name &&
                                    state.sortOrder.direction !== 'none'
                                        ? state.sortOrder?.direction
                                        : undefined
                                }
                                toggleSort={handleToggleColumn}
                            >
                                {column.customHeadLabelRender?.({
                                    colPos,
                                    index,
                                    ...column
                                }) ?? column.label}
                            </TableHeadCell>
                        ))
                )}
            </TableRow>
        </MuiTableHead>
    )
}

const useStyles = tss
    .withName(ComponentClassName.TABLE__HEAD)
    .create(({ theme }) => ({
        responsiveSimple: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        responsiveStacked: {
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        root: {},
        row: {}
    }))
