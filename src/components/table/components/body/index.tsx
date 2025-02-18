'use client'

// vendors
import { tss } from 'tss-react/mui'
import React, { type ReactNode } from 'react'
// materials
import type { TableRowProps } from '@mui/material/TableRow'
import MuiTableBody from '@mui/material/TableBody'
// locals
import { TableBodyCell } from './components/cell'
import { DataTableBodyRow } from './components/row'
import CheckboxCell from '../_shared/checkbox-cell'
// globals
import type { DataTableState } from '@src/types/state'
import type { DataTableOptions } from '@src/types/options'
import type { SelectRowUpdateType } from '@src/types/select-row-update'
import type { SelectedRowDataState } from '@src/types/state/selected-row-data'
import { buildMap } from '@src/functions'
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import TableAction from '@src/enums/table-action'
import ComponentClassName from '@src/enums/class-name'
import type { ColumnState } from '@src/types/state/column'
import type { DisplayDataState } from '@src/types/state/display-data'

/**
 * Table body
 *
 * @category  Component
 */
export default function TableBody({
    selectRowUpdate
}: DataTableBodyProps): ReactNode {
    const { classes } = useStyles()
    const { options, state, textLabels } = useDataTableContext()

    const columnOrder = state.columnOrder ?? state.columns.map((_, i) => i)
    const tableRows = buildRows(
        state.count,
        state.displayData,
        options,
        state.page,
        state.rowsPerPage
    )

    const visibleColCnt = state.columns.filter(({ display }) => display).length

    return (
        <MuiTableBody className={classes.root}>
            {tableRows &&
                tableRows.length > 0 &&
                tableRows.map((data, rowIndex) => (
                    <RenderRow
                        data={data}
                        key={rowIndex}
                        rowIndex={rowIndex}
                        selectedRows={state.selectedRows}
                        columns={state.columns}
                        columnOrder={columnOrder}
                        selectRowUpdate={selectRowUpdate}
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
                        value={textLabels.body.noMatch}
                    />
                </DataTableBodyRow>
            )}
        </MuiTableBody>
    )
}

export interface DataTableBodyProps {
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

function buildRows<Row>(
    count: DataTableState<Row>['count'],
    data: DisplayDataState<Row>,
    options: DataTableOptions<Row>,
    page: DataTableState<Row>['page'],
    rowsPerPage: DataTableState<Row>['rowsPerPage']
): DisplayDataState<Row> {
    if (options.serverSide) return data.length ? data : []

    const highestPageInRange = getPageValue(count, rowsPerPage, page)
    const fromIndex =
        highestPageInRange === 0 ? 0 : highestPageInRange * rowsPerPage
    const toIndex = Math.min(count, (highestPageInRange + 1) * rowsPerPage)

    if (page > highestPageInRange) {
        console.warn(
            'Current page is out of range, using the highest page that is in range instead.'
        )
    }

    const rows = []

    for (
        let rowIndex = fromIndex;
        rowIndex < count && rowIndex < toIndex;
        rowIndex++
    ) {
        const row = data[rowIndex]

        if (row) {
            rows.push(row)
        }
    }

    return rows.length ? rows : []
}

function isRowExpanded<Row>(
    dataIndex: number,
    expandedRows: DataTableState<Row>['expandedRows']
): boolean {
    return expandedRows.lookup[dataIndex] ?? false
}

function getIsRowSelectable<Row>(
    dataIndex: number,
    selectedRows: DataTableState<Row>['selectedRows'],
    options: DataTableOptions<Row>
) {
    return options.isRowSelectable?.(dataIndex, selectedRows) ?? true
}

function getRowIndex<Row>(
    index: number,
    page: DataTableState<Row>['page'],
    rowsPerPage: DataTableState<Row>['rowsPerPage'],
    options: DataTableOptions<Row>
) {
    if (options.serverSide) {
        return index
    }

    const startIndex = page === 0 ? 0 : page * rowsPerPage

    return startIndex + index
}

function handleRowSelect<Row>(
    data: SelectedRowDataState,
    event: React.SyntheticEvent,
    options: DataTableOptions<Row>,
    previousSelectedRow: DataTableState<Row>['previousSelectedRow'],
    selectRowsFromState: DataTableState<Row>['selectedRows'],
    displayData: DisplayDataState<Row>,
    selectRowUpdate: SelectRowUpdateType
) {
    const isWithShiftKey =
        (event.nativeEvent as PointerEvent | KeyboardEvent).shiftKey ?? false

    const shiftAdjacentRows = []

    // If the user is pressing shift and has previously clicked another row.
    if (
        isWithShiftKey &&
        previousSelectedRow &&
        previousSelectedRow.index < displayData.length
    ) {
        // Create a copy of the selectedRows object. This will be used and modified
        // below when we see if we can add adjacent rows.
        const selectedRows = {
            ...selectRowsFromState
        }

        // Add the clicked on row to our copy of selectedRows (if it isn't already present).
        const clickedDataIndex = displayData[data.index]?.dataIndex

        if (clickedDataIndex === undefined) {
            throw new Error('clickedDataIndex is undefined')
        }

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
            const dataIndex = displayData[curIndex]?.dataIndex

            if (dataIndex === undefined) {
                throw new Error('dataIndex is undefined')
            }

            if (
                getIsRowSelectable(
                    dataIndex,
                    selectedRows ?? selectRowsFromState,
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

    selectRowUpdate('cell', data, shiftAdjacentRows)
}

function RenderRow<Row>({
    rowIndex,
    data: { data: row, dataIndex },
    selectedRows,
    columns,
    columnOrder,
    selectRowUpdate
}: {
    rowIndex: number
    data: DisplayDataState<Row>[number]
    selectedRows: DataTableState<Row>['selectedRows']
    columns: ColumnState<Row>[]
    columnOrder: number[]
    selectRowUpdate: SelectRowUpdateType
}) {
    const { classes, cx } = useStyles()
    const {
        onAction,
        options,
        state,
        props: rootProps
    } = useDataTableContext<Row>()

    if (options.customRowRender) {
        const data = rootProps.data[dataIndex]

        if (!data) {
            throw new Error('data is undefined')
        }

        return options.customRowRender(data, dataIndex, rowIndex)
    }

    const isRowSelected: boolean =
        options.selectableRows !== 'none'
            ? Boolean(selectedRows.lookup[dataIndex])
            : false

    const isRowSelectable = getIsRowSelectable(dataIndex, selectedRows, options)

    const overriddenBodyProps: TableRowProps = options.setRowProps
        ? (options.setRowProps(row, dataIndex, rowIndex) ?? {})
        : {}

    const processedRow: {
        index: number
        value: DisplayDataState<Row>[number]['data'][number]
    }[] = columnOrder.map(columnOrderItem => ({
        value: row[columnOrderItem],
        index: columnOrderItem
    }))

    function toggleExpandRow(row: { index: number; dataIndex: number }) {
        const { dataIndex } = row
        const { isRowExpandable } = options

        const expandedRowsData = [...state.expandedRows.data]
        let shouldCollapseExpandedRow = false

        let hasRemovedRow = false
        let removedRow: DataTableState<Row>['expandedRows']['data'] = []

        for (const item of expandedRowsData) {
            if (item?.dataIndex === dataIndex) {
                shouldCollapseExpandedRow = true
                break
            }
        }

        const cIndex = expandedRowsData.findIndex(
            item => item.dataIndex === dataIndex
        )

        if (shouldCollapseExpandedRow) {
            if (
                isRowExpandable?.(dataIndex, state.expandedRows) ||
                !isRowExpandable
            ) {
                removedRow = expandedRowsData.splice(cIndex, 1)
                hasRemovedRow = true
            }
        } else {
            if (isRowExpandable?.(dataIndex, state.expandedRows)) {
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
                        toggleExpandRow,
                        state.selectedRows,
                        state.expandedRows,
                        state.previousSelectedRow,
                        state.displayData,
                        selectRowUpdate
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
                                    state.page,
                                    state.rowsPerPage,
                                    options
                                ),
                                dataIndex
                            },
                            event,
                            options,
                            state.previousSelectedRow,
                            state.selectedRows,
                            state.displayData,
                            selectRowUpdate
                        )
                    }
                    onExpand={() =>
                        toggleExpandRow({
                            index: getRowIndex(
                                rowIndex,
                                state.page,
                                state.rowsPerPage,
                                options
                            ),
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
                                state.expandedRows
                            ) ?? true
                        ) && options.expandableRows
                    }
                    isRowExpanded={isRowExpanded(dataIndex, state.expandedRows)}
                    isRowSelectable={isRowSelectable}
                    dataIndex={dataIndex}
                />

                {processedRow.map(
                    column =>
                        columns[column.index]?.display === true && (
                            <TableBodyCell
                                rowIndex={rowIndex}
                                colIndex={column.index}
                                columnHeader={columns[column.index]?.label}
                                value={column.value}
                                dataIndex={dataIndex}
                                print={columns[column.index]?.print ?? true}
                                key={column.index}
                                {...(columns[column.index]?.setCellProps?.(
                                    column.value,
                                    dataIndex,
                                    column.index
                                ) ?? {})}
                            />
                        )
                )}
            </DataTableBodyRow>

            {isRowExpanded(dataIndex, state.expandedRows) &&
                options.renderExpandableRow?.(row, {
                    rowIndex,
                    dataIndex
                })}
        </>
    )
}

function handleRowClick<Row>(
    row: DisplayDataState<Row>[number]['data'],
    data: {
        rowIndex: number
        dataIndex: number
    },
    event: React.MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    options: DataTableOptions<Row>,
    toggleExpandRow: (params: { index: number; dataIndex: number }) => void,
    selectedRows: DataTableState<Row>['selectedRows'],
    expandedRows: DataTableState<Row>['expandedRows'],
    previousSelectedRow: DataTableState<Row>['previousSelectedRow'],
    displayData: DataTableState<Row>['displayData'],
    selectRowUpdate: SelectRowUpdateType
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
        getIsRowSelectable(data.dataIndex, selectedRows, options)
    ) {
        const selectRow = {
            index: data.rowIndex,
            dataIndex: data.dataIndex
        }

        handleRowSelect(
            selectRow,
            event,
            options,
            previousSelectedRow,
            selectedRows,
            displayData,
            selectRowUpdate
        )
    }

    // Check if we should trigger row expand when row is clicked anywhere
    if (
        options.expandableRowsOnClick &&
        options.expandableRows &&
        (options.isRowExpandable?.(data.dataIndex, expandedRows) ?? true)
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
