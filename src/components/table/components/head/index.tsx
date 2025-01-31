'use client'

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

export default function TableHead({
    draggableHeadCellRefs,
    selectRowUpdate,
    setHeadCellsRef,
    tableRef
}: Props) {
    const { classes, cx } = useStyles()
    const {
        onAction,
        options,
        props: datatableRootProps,
        setState,
        state
    } = useDataTableContext()

    const { columns, count, data, selectedRows, sortOrder = {} } = state

    const columnOrder = state.columnOrder ?? columns.map((_, idx) => idx) ?? []

    function handleToggleColumn(columnIndex: number) {
        const prevState = state
        const { columns, data } = prevState

        let newOrder: DataTableSortOrderOption['direction'] = columns[
            columnIndex
        ]?.sortDescFirst
            ? 'desc'
            : 'asc'

        const sequenceOrder: DataTableSortOrderOption['direction'][] = [
            'asc',
            'desc'
        ]

        if (columns[columnIndex]?.sortDescFirst) {
            sequenceOrder.reverse()
        }

        if (columns[columnIndex]?.sortThirdClickReset) {
            sequenceOrder.push('none')
        }

        if (columns[columnIndex]?.name === prevState.sortOrder?.name) {
            let position = sequenceOrder.indexOf(prevState.sortOrder?.direction)

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

        let newState: DataTableState = {
            ...prevState,
            announceText,
            columns: columns,
            activeColumn: columnIndex
        }

        if (options.serverSide) {
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
                options,
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
                datatableRootProps,
                newState,
                options,
                setState
            )
        }

        onAction?.(TableAction.SORT, newState)
        options.onColumnSortChange?.(newSortOrder.name, newSortOrder.direction)
    }

    const handleRowSelect = () => {
        selectRowUpdate('head', null)
    }

    const numSelected = (selectedRows && selectedRows.data.length) || 0
    let isIndeterminate = numSelected > 0 && numSelected < count
    let isChecked = numSelected > 0 && numSelected >= count

    // When the disableToolbarSelect option is true, there can be
    // selected items that aren't visible, so we need to be more
    // precise when determining if the head checkbox should be checked.
    if (
        options.disableToolbarSelect === true ||
        options.selectToolbarPlacement === 'none' ||
        options.selectToolbarPlacement === 'above'
    ) {
        if (isChecked) {
            for (let ii = 0; ii < data.length; ii++) {
                if (!selectedRows.lookup[data[ii].dataIndex]) {
                    isChecked = false
                    isIndeterminate = true
                    break
                }
            }
        } else {
            if (numSelected > count) {
                isIndeterminate = true
            }
        }
    }

    const orderedColumns = columnOrder.map((colIndex, idx) => {
        return {
            column: columns[colIndex],
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
                    onChange={handleRowSelect.bind(null)}
                    indeterminate={isIndeterminate}
                    checked={isChecked}
                    isHeaderCell={true}
                    isRowSelectable={true}
                />

                {orderedColumns.map(
                    ({ column = {}, index, colPos }) =>
                        column.display === 'true' &&
                        (column.customHeadRender ? (
                            column.customHeadRender(
                                { index, ...column },
                                handleToggleColumn,
                                sortOrder
                            )
                        ) : (
                            <TableHeadCell
                                cellHeaderProps={
                                    columns[index]?.setCellHeaderProps?.({
                                        index,
                                        ...column
                                    }) || {}
                                }
                                key={index}
                                index={index}
                                colPosition={colPos}
                                setHeadCellsRef={setHeadCellsRef}
                                sort={column.sort}
                                sortDirection={
                                    column.name === sortOrder.name
                                        ? sortOrder.direction
                                        : undefined
                                }
                                toggleSort={handleToggleColumn}
                                hint={column.hint}
                                print={column.print}
                                column={column}
                                columns={columns}
                                columnOrder={columnOrder}
                                draggableHeadCellRefs={draggableHeadCellRefs}
                                tableRef={tableRef}
                            >
                                {column.customHeadLabelRender
                                    ? column.customHeadLabelRender({
                                          index,
                                          colPos,
                                          ...column
                                      })
                                    : column.label}
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
