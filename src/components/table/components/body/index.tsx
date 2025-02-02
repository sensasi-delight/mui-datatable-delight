'use client'

// vendors
import { tss } from 'tss-react/mui'
import React from 'react'
// materials
import type { TableRowProps } from '@mui/material/TableRow'
import MuiTableBody from '@mui/material/TableBody'
// locals
import { TableBodyCell } from './components/cell'
import { DataTableBodyRow } from './components/row'
import CheckboxCell from '../_shared/checkbox-cell'
// globals
import type { SelectRowUpdateType } from '@src/types/select-row-update'
import type { SelectedRowDataState } from '@src/types/state/selected-row-data'
import type { DataTableOptions } from '@src/types/options'
import { buildMap } from '@src/functions'
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import TableAction from '@src/enums/table-action'
import ComponentClassName from '@src/enums/class-name'
import type { DataTableState } from '@src/index'

export default function TableBody({ selectRowUpdate }: DataTableBodyProps) {
    const { classes } = useStyles()
    const { options, state, textLabels } = useDataTableContext()

    const {
        displayData: data,
        count,
        columns,
        page,
        rowsPerPage,
        selectedRows,
        previousSelectedRow,
        expandedRows,
        columnOrder: columnOrderFromState,
        filterList
    } = state

    const fakeParentProps = {
        data,
        count,
        columns,
        page,
        rowsPerPage,
        selectedRows,
        previousSelectedRow,
        expandedRows,
        columnOrderFromState,
        filterList,
        selectRowUpdate
    }

    const columnOrder = columnOrderFromState ?? columns.map((_, id) => id)
    const tableRows = buildRows(fakeParentProps, options)

    const visibleColCnt = columns.filter(({ display }) => display).length

    return (
        <MuiTableBody className={classes.root}>
            {tableRows &&
                tableRows.length > 0 &&
                tableRows.map((data, rowIndex) => (
                    <RenderRow
                        data={data}
                        key={rowIndex}
                        rowIndex={rowIndex}
                        parentProps={fakeParentProps}
                        columnOrder={columnOrder}
                    />
                ))}

            {(!tableRows || tableRows.length === 0) && (
                <DataTableBodyRow isRowSelectable={false}>
                    <TableBodyCell
                        className={classes.emptyTitle}
                        colSpan={
                            options.selectableRows !== 'none' ||
                            options.expandableRows
                                ? visibleColCnt + 1
                                : visibleColCnt
                        }
                        dataIndex={-1}
                        colIndex={0}
                        rowIndex={0}
                        print
                    >
                        {textLabels.body.noMatch}
                    </TableBodyCell>
                </DataTableBodyRow>
            )}
        </MuiTableBody>
    )
}

interface DataTableBodyProps {
    /** Callback to trigger table row select */
    selectRowUpdate: SelectRowUpdateType
}

const useStyles = tss
    .withName(ComponentClassName.TABLE__BODY)
    .create(({ theme }) => ({
        root: {},
        emptyTitle: {
            textAlign: 'center'
        },
        lastStackedCell: {
            [theme.breakpoints.down('md')]: {
                '& td:last-child': {
                    borderBottom: 'none'
                }
            }
        },
        lastSimpleCell: {
            [theme.breakpoints.down('sm')]: {
                '& td:last-child': {
                    borderBottom: 'none'
                }
            }
        }
    }))

function buildRows<T>(
    { data, page, rowsPerPage, count }: DataTableState<T>,
    options: DataTableOptions<T>
) {
    if (options.serverSide) return data.length ? data : null

    const rows = []
    const highestPageInRange = getPageValue(count, rowsPerPage, page)
    const fromIndex =
        highestPageInRange === 0 ? 0 : highestPageInRange * rowsPerPage
    const toIndex = Math.min(count, (highestPageInRange + 1) * rowsPerPage)

    if (page > highestPageInRange) {
        console.warn(
            'Current page is out of range, using the highest page that is in range instead.'
        )
    }

    for (
        let rowIndex = fromIndex;
        rowIndex < count && rowIndex < toIndex;
        rowIndex++
    ) {
        if (data[rowIndex] !== undefined) rows.push(data[rowIndex])
    }

    return rows.length ? rows : null
}

function isRowExpanded<T>(
    dataIndex: number,
    { expandedRows }: DataTableBodyProps<T>
): boolean {
    return expandedRows.lookup[dataIndex] ?? false
}

function getIsRowSelectable<T>(
    dataIndex: number,
    selectedRows: DataTableBodyProps<T>['selectedRows'],
    { selectedRows: selectedRowsFromOptions }: DataTableBodyProps<T>,
    options: DataTableOptions<T>
) {
    selectedRows = selectedRows ?? selectedRowsFromOptions

    return options.isRowSelectable?.(dataIndex, selectedRows) ?? true
}

function getRowIndex<T>(
    index: number,
    { page, rowsPerPage }: DataTableBodyProps<T>,
    options: DataTableOptions<T>
) {
    if (options.serverSide) {
        return index
    }

    const startIndex = page === 0 ? 0 : page * rowsPerPage

    return startIndex + index
}

function handleRowSelect<T>(
    data: SelectedRowDataState,
    event: React.SyntheticEvent,
    parentProps: DataTableBodyProps<T>,
    options: DataTableOptions<T>
) {
    const { previousSelectedRow } = parentProps

    const isWithShiftKey =
        (event.nativeEvent as PointerEvent | KeyboardEvent).shiftKey ?? false

    const shiftAdjacentRows = []

    // If the user is pressing shift and has previously clicked another row.
    if (
        isWithShiftKey &&
        previousSelectedRow &&
        previousSelectedRow.index < parentProps.data.length
    ) {
        // Create a copy of the selectedRows object. This will be used and modified
        // below when we see if we can add adjacent rows.
        const selectedRows = {
            ...parentProps.selectedRows
        }

        // Add the clicked on row to our copy of selectedRows (if it isn't already present).
        const clickedDataIndex = parentProps.data[data.index]?.dataIndex

        if (
            selectedRows.data.filter(d => d.dataIndex === clickedDataIndex)
                .length === 0
        ) {
            selectedRows.data.push({
                index: data.index,
                dataIndex: clickedDataIndex
            })
            selectedRows.lookup[clickedDataIndex] = true
        }

        let curIndex = previousSelectedRow.index

        while (curIndex !== data.index) {
            const dataIndex = parentProps.data[curIndex]?.dataIndex

            if (
                getIsRowSelectable(
                    dataIndex,
                    selectedRows,
                    parentProps,
                    options
                )
            ) {
                const lookup = {
                    index: curIndex,
                    dataIndex: dataIndex
                }

                // Add adjacent row to temp selectedRow object if it isn't present.
                if (
                    selectedRows.data.filter(d => d.dataIndex === dataIndex)
                        .length === 0
                ) {
                    selectedRows.data.push(lookup)
                    selectedRows.lookup[dataIndex] = true
                }

                shiftAdjacentRows.push(lookup)
            }

            curIndex = data.index > curIndex ? curIndex + 1 : curIndex - 1
        }
    }

    parentProps.selectRowUpdate('cell', data, shiftAdjacentRows)
}

function RenderRow<T>({
    rowIndex,
    data: { data: row, dataIndex },
    parentProps,
    columnOrder
}: {
    rowIndex: number
    data: {
        data: string[]
        dataIndex: number
    }
    parentProps: DataTableBodyProps<T>
    columnOrder: number[]
}) {
    const { classes, cx } = useStyles()
    const { onAction, options, state } = useDataTableContext()

    const { selectedRows, columns } = parentProps

    if (options.customRowRender) {
        return options.customRowRender(row, dataIndex, rowIndex)
    }

    const isRowSelected: boolean =
        options.selectableRows !== 'none'
            ? Boolean(selectedRows.lookup[dataIndex])
            : false

    const isRowSelectable = getIsRowSelectable(
        dataIndex,
        selectedRows,
        parentProps,
        options
    )

    const overriddenBodyProps: TableRowProps = options.setRowProps
        ? (options.setRowProps(row, dataIndex, rowIndex) ?? {})
        : {}

    const processedRow = columnOrder.map(columnOrderItem => ({
        value: row[columnOrderItem],
        index: columnOrderItem
    }))

    function toggleExpandRow(row: { index: number; dataIndex: number }) {
        const { dataIndex } = row
        const { isRowExpandable } = options

        const { expandedRows } = state
        const expandedRowsData = [...expandedRows.data]
        let shouldCollapseExpandedRow = false

        let hasRemovedRow = false
        let removedRow: string[] = []

        for (const item of expandedRowsData) {
            if (item?.dataIndex === dataIndex) {
                shouldCollapseExpandedRow = true
                break
            }
        }

        const cIndex = expandedRowsData.findIndex(
            item => item?.dataIndex === dataIndex
        )

        if (shouldCollapseExpandedRow) {
            if (
                isRowExpandable?.(dataIndex, expandedRows) ||
                !isRowExpandable
            ) {
                removedRow = expandedRowsData.splice(cIndex, 1)
                hasRemovedRow = true
            }
        } else {
            if (isRowExpandable?.(dataIndex, expandedRows)) {
                expandedRowsData.push(row)
            } else if (!isRowExpandable) {
                expandedRowsData.push(row)
            }
        }

        const newState = {
            curExpandedRows: hasRemovedRow ? removedRow : [row],
            expandedRows: {
                lookup: buildMap(expandedRowsData),
                data: expandedRowsData
            }
        }

        onAction?.(TableAction.ROW_EXPANSION_CHANGE, newState)

        const expandCallback =
            options.onRowExpansionChange ?? options.onRowsExpand

        expandCallback?.(newState.curExpandedRows, newState.expandedRows.data)
    }

    return (
        <>
            <DataTableBodyRow
                rowSelected={isRowSelected}
                isRowSelectable={isRowSelectable}
                onClick={event =>
                    handleRowClick(
                        row,
                        {
                            rowIndex,
                            dataIndex: dataIndex
                        },
                        event,
                        options,
                        parentProps,
                        toggleExpandRow
                    )
                }
                className={cx(
                    {
                        [classes.lastStackedCell]:
                            options.responsive === 'vertical' ||
                            options.responsive === 'stacked' ||
                            options.responsive === 'stackedFullWidth',
                        [classes.lastSimpleCell]:
                            options.responsive === 'simple'
                    },
                    overriddenBodyProps?.className
                )}
                {...overriddenBodyProps}
            >
                <CheckboxCell
                    isHeaderCell={false}
                    onChange={event =>
                        handleRowSelect(
                            {
                                index: getRowIndex(
                                    rowIndex,
                                    parentProps,
                                    options
                                ),
                                dataIndex
                            },
                            event,
                            parentProps,
                            options
                        )
                    }
                    onExpand={() =>
                        toggleExpandRow({
                            index: getRowIndex(rowIndex, parentProps, options),
                            dataIndex
                        })
                    }
                    checked={isRowSelected}
                    // When rows are expandable, but this particular row isn't expandable, set this to true.
                    // This will add a new class to the toggle button, `ComponentClassName.TABLE__CHECKBOX_CELL`-expandDisabled.
                    hideExpandButton={
                        !(
                            options.isRowExpandable?.(
                                dataIndex,
                                parentProps.expandedRows
                            ) ?? true
                        ) && options.expandableRows
                    }
                    isRowExpanded={isRowExpanded(dataIndex, parentProps)}
                    isRowSelectable={isRowSelectable}
                    dataIndex={dataIndex}
                />

                {processedRow.map(
                    column =>
                        columns[column.index]?.display && (
                            <TableBodyCell
                                {...(columns[column.index]?.setCellProps?.(
                                    column.value ?? '',
                                    dataIndex,
                                    column.index
                                ) ?? {})}
                                dataIndex={dataIndex}
                                rowIndex={rowIndex}
                                colIndex={column.index}
                                columnHeader={columns[column.index]?.label}
                                print={columns[column.index]?.print}
                                key={column.index}
                            >
                                {column.value}
                            </TableBodyCell>
                        )
                )}
            </DataTableBodyRow>

            {isRowExpanded(dataIndex, parentProps) &&
                options.renderExpandableRow?.(row, {
                    rowIndex,
                    dataIndex
                })}
        </>
    )
}

function handleRowClick<T>(
    row: string[],
    data: {
        rowIndex: number
        dataIndex: number
    },
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    options: DataTableOptions<T>,
    parentProps: DataTableBodyProps<T>,
    toggleExpandRow: (params: { index: number; dataIndex: number }) => void
) {
    const clickedElement = event.target as HTMLElement

    const isExpandButtonClick = Boolean(
        clickedElement.closest('#expandable-button')
    )

    const isClickFromCheckbox = clickedElement.tagName === 'INPUT'

    // Don't trigger onRowClick if the event was actually the row expand button or checkbox
    if (isExpandButtonClick || isClickFromCheckbox) {
        return
    }

    // Check if we should toggle row select when row is clicked anywhere
    if (
        options.selectableRowsOnClick &&
        options.selectableRows !== 'none' &&
        getIsRowSelectable(
            data.dataIndex,
            parentProps.selectedRows,
            parentProps,
            options
        )
    ) {
        const selectRow = {
            index: data.rowIndex,
            dataIndex: data.dataIndex
        }

        handleRowSelect(selectRow, event, parentProps, options)
    }

    // Check if we should trigger row expand when row is clicked anywhere
    if (
        options.expandableRowsOnClick &&
        options.expandableRows &&
        (options.isRowExpandable?.(data.dataIndex, parentProps.expandedRows) ??
            true)
    ) {
        toggleExpandRow({
            index: data.rowIndex,
            dataIndex: data.dataIndex
        })
    }

    // Don't trigger onRowClick if the event was actually a row selection via click
    if (options.selectableRowsOnClick) return

    options.onRowClick?.(row, data, event)
}
