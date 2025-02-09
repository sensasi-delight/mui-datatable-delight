'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import { TableHeadCell } from './components/cell'
import CheckboxCell from '../_shared/checkbox-cell'
// materials
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { DataTableState } from '@src/types/state'
import {
    type DataTableOptions,
    type DataTableSortOrderOption
} from '@src/types/options'
import type { Props } from './types/props'
// global enums
import TableAction from '@src/enums/table-action'
import ComponentClassName from '@src/enums/class-name'
// global functions
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
import sortTable from '@src/functions/sort-table'

/**
 * Table Head
 *
 * @category  Component
 */
export default function TableHead({ selectRowUpdate }: Props): ReactNode {
    const { classes, cx } = useStyles()
    const {
        draggableHeadCellRefs,
        onAction,
        options,
        props: datatableRootProps,
        tableHeadCellElements,
        setState,
        state
    } = useDataTableContext()

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

        const newSortOrder: DataTableSortOrderOption = {
            name: state.columns[columnIndex].name,
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

        let newPartialState: Partial<DataTableState<unknown>> = {
            announceText: `Table now sorted by ${state.columns[columnIndex]?.name} : ${orderLabel}`,
            activeColumn: columnIndex,
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
                selectedRows: sortedData.selectedRows,
                sortOrder: newSortOrder,
                previousSelectedRow: undefined
            }

            newPartialState.displayData = getDisplayData(
                state.columns,
                sortedData.data,
                state.filterList,
                state.searchText,
                undefined,
                datatableRootProps,
                {
                    ...state,
                    ...newPartialState
                },
                options,
                setState
            )
        }

        onAction?.(TableAction.SORT, newPartialState)
        options.onColumnSortChange?.(newSortOrder.name, newSortOrder.direction)
    }

    const handleRowSelect = () => {
        selectRowUpdate('head', null)
    }

    function setHeadCellsRef(
        index: number,
        pos: number,
        el: HTMLTableCellElement
    ) {
        draggableHeadCellRefs.current[index] = el
        tableHeadCellElements.current[pos] = el
    }

    const numSelected = state.selectedRows.data.length ?? 0
    let isIndeterminate = numSelected > 0 && numSelected < state.count
    let isChecked = numSelected > 0 && numSelected >= state.count

    // When the disableToolbarSelect option is true, there can be
    // selected items that aren't visible, so we need to be more
    // precise when determining if the head checkbox should be checked.
    if (
        options.disableToolbarSelect === true ||
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
            column,
            index: colIndex,
            colPos: idx
        }
    })

    return (
        <MuiTableHead
            className={cx(classes.root, {
                [classes.responsiveStacked]:
                    options.responsive === 'vertical' ||
                    options.responsive === 'stacked' ||
                    options.responsive === 'stackedFullWidth',
                [classes.responsiveStackedAlways]:
                    options.responsive === 'verticalAlways',
                [classes.responsiveSimple]: options.responsive === 'simple'
            })}
        >
            <TableRow className={classes.row}>
                <CheckboxCell
                    setHeadCellRef={setHeadCellsRef}
                    onChange={handleRowSelect}
                    indeterminate={isIndeterminate}
                    checked={isChecked}
                    isHeaderCell
                    isRowSelectable
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
                                key={index}
                                index={index}
                                colPosition={colPos}
                                setHeadCellsRef={setHeadCellsRef}
                                sortDirection={
                                    column.name === state.sortOrder?.name &&
                                    state.sortOrder.direction !== 'none'
                                        ? state.sortOrder?.direction
                                        : undefined
                                }
                                toggleSort={handleToggleColumn}
                                column={column}
                            >
                                {column.customHeadLabelRender?.({
                                    index,
                                    colPos,
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
        root: {},
        row: {},
        responsiveStacked: {
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        responsiveStackedAlways: {
            display: 'none'
        },
        responsiveSimple: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        }
    }))
