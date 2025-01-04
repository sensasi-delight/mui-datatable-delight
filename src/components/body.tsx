// vendors
import { makeStyles } from 'tss-react/mui'
import clsx from 'clsx'
import React from 'react'
// materials
import type { TableRowProps, Theme } from '@mui/material'
import { Typography, TableBody as MuiTableBody } from '@mui/material'
// locals
import TableBodyCell from './body.cell'
import { DataTableBodyRow } from './body.row'
import { DataTableTableSelectCell } from './components.shared/select-cell'
import { getPageValue } from '../functions.shared/get-page-value'
import { DataTableState } from '../data-table.props.type/state'
import {
    DataTableOptions,
    RowTypeIDK,
    SomeRowsIDK
} from '../data-table.props.type/options'
import { DataTableComponents } from '../data-table.props.type/components'
import { useMainContext } from '../hooks/use-main-context'

export function DataTableBody(props: DataTableBodyProps) {
    const { textLabels } = useMainContext()

    const { classes } = useStyles()

    const { columns, options } = props

    const columnOrder = props.columnOrder ?? columns.map((_, id) => id)
    const tableRows = buildRows(props)
    const visibleColCnt = columns.filter(c => c.display === 'true').length

    return (
        <MuiTableBody className={classes.root}>
            {tableRows &&
                tableRows.length > 0 &&
                tableRows.map((data, rowIndex) => (
                    <RenderRow
                        data={data}
                        key={rowIndex}
                        rowIndex={rowIndex}
                        parentProps={props}
                        columnOrder={columnOrder}
                    />
                ))}

            {(!tableRows || tableRows.length === 0) && (
                <DataTableBodyRow options={options} isRowSelectable={false}>
                    <TableBodyCell
                        colSpan={
                            options.selectableRows !== 'none' ||
                            options.expandableRows
                                ? visibleColCnt + 1
                                : visibleColCnt
                        }
                        options={options}
                        colIndex={0}
                        rowIndex={0}
                        print
                    >
                        <Typography
                            variant="body1"
                            className={classes.emptyTitle}
                            component="div"
                        >
                            {textLabels.body.noMatch}
                        </Typography>
                    </TableBodyCell>
                </DataTableBodyRow>
            )}
        </MuiTableBody>
    )
}

interface DataTableBodyProps {
    /** Data used to describe table */
    data: DataTableState['data']

    /** Total number of data rows */
    count: number

    /** Columns used to describe table */
    columns: DataTableState['columns']

    /** Options used to describe table */
    options: DataTableOptions

    /** Data used to filter table against */
    filterList: DataTableState['filterList']

    /** Callback to execute when row is clicked */
    onRowClick: DataTableOptions['onRowClick']

    /** Table rows expanded */
    expandedRows: SomeRowsIDK

    /** Table rows selected */
    selectedRows: SomeRowsIDK

    /** Callback to trigger table row select */
    selectRowUpdate: (
        type: string,
        value: RowTypeIDK,
        shiftAdjacentRows: RowTypeIDK[]
    ) => void

    /** The most recent row to have been selected/unselected */
    previousSelectedRow: DataTableState['previousSelectedRow']

    /** Data used to search table against */
    searchText: string

    /** Toggle row expandable */
    toggleExpandRow: (row: RowTypeIDK) => void

    columnOrder: number[] | undefined

    page: DataTableState['page']

    rowsPerPage: DataTableState['rowsPerPage']

    tableId: string

    components: {
        Checkbox: DataTableComponents['Checkbox']
    }
}

const useStyles = makeStyles({
    name: 'datatable-delight--Body'
})((theme: Theme) => ({
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

function buildRows({
    data,
    page,
    rowsPerPage,
    count,
    options
}: DataTableBodyProps) {
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

function isRowExpandable(
    dataIndex: number,
    { options, expandedRows }: DataTableBodyProps
) {
    return options.isRowExpandable?.(dataIndex, expandedRows) ?? true
}

function isRowExpanded(
    dataIndex: number,
    { expandedRows }: DataTableBodyProps
): boolean {
    return expandedRows.lookup && expandedRows.lookup[dataIndex]
}

function getIsRowSelectable(
    dataIndex: number,
    selectedRows: DataTableBodyProps['selectedRows'],
    { options, selectedRows: selectedRowsFromOptions }: DataTableBodyProps
) {
    selectedRows = selectedRows ?? selectedRowsFromOptions

    return options.isRowSelectable?.(dataIndex, selectedRows) ?? true
}

function getRowIndex(
    index: number,
    { page, rowsPerPage, options }: DataTableBodyProps
) {
    if (options.serverSide) {
        return index
    }

    const startIndex = page === 0 ? 0 : page * rowsPerPage

    return startIndex + index
}

function handleRowSelect(
    data: RowTypeIDK,
    event: React.SyntheticEvent,
    parentProps: DataTableBodyProps
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
        const clickedDataIndex = parentProps.data[data.index].dataIndex

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
            const dataIndex = parentProps.data[curIndex].dataIndex

            if (getIsRowSelectable(dataIndex, selectedRows, parentProps)) {
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

function RenderRow({
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
    parentProps: DataTableBodyProps
    columnOrder: number[]
}) {
    const { classes } = useStyles()

    const { options, selectedRows, toggleExpandRow, components, columns } =
        parentProps

    if (options.customRowRender) {
        return options.customRowRender(row, dataIndex, rowIndex)
    }

    const isRowSelected: boolean =
        options.selectableRows !== 'none'
            ? Boolean(selectedRows.lookup && selectedRows.lookup[dataIndex])
            : false

    const isRowSelectable = getIsRowSelectable(
        dataIndex,
        selectedRows,
        parentProps
    )

    const overriddenBodyProps: TableRowProps = options.setRowProps
        ? (options.setRowProps(row, dataIndex, rowIndex) ?? {})
        : {}

    const processedRow = columnOrder.map(columnOrderItem => ({
        value: row[columnOrderItem],
        index: columnOrderItem
    }))

    return (
        <>
            <DataTableBodyRow
                options={options}
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
                        parentProps
                    )
                }
                className={clsx(
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
                data-testid={'MUIDataTableBodyRow-' + dataIndex}
                id={`MUIDataTableBodyRow-${options.tableId}-${dataIndex}`}
                {...overriddenBodyProps}
            >
                <DataTableTableSelectCell
                    onChange={event =>
                        handleRowSelect(
                            {
                                index: getRowIndex(rowIndex, parentProps),
                                dataIndex
                            },
                            event,
                            parentProps
                        )
                    }
                    onExpand={() =>
                        toggleExpandRow({
                            index: getRowIndex(rowIndex, parentProps),
                            dataIndex
                        })
                    }
                    fixedHeader={options.fixedHeader}
                    fixedSelectColumn={options.fixedSelectColumn ?? true}
                    checked={isRowSelected}
                    expandableOn={options.expandableRows}
                    // When rows are expandable, but this particular row isn't expandable, set this to true.
                    // This will add a new class to the toggle button, datatable-delight--body--select-cell-expandDisabled.
                    hideExpandButton={
                        !isRowExpandable(dataIndex, parentProps) &&
                        options.expandableRows
                    }
                    selectableOn={options.selectableRows}
                    selectableRowsHideCheckboxes={
                        options.selectableRowsHideCheckboxes
                    }
                    isRowExpanded={isRowExpanded(dataIndex, parentProps)}
                    isRowSelectable={isRowSelectable}
                    dataIndex={dataIndex}
                    id={`datatable-delight--body--select-cell--${options.tableId}-${dataIndex}`}
                    components={components}
                />

                {processedRow.map(
                    column =>
                        columns[column.index].display === 'true' && (
                            <TableBodyCell
                                {...(columns[column.index].setCellProps?.(
                                    column.value,
                                    dataIndex,
                                    column.index
                                ) ?? {})}
                                data-testid={`datatable-delight--body--cell-${column.index}-${rowIndex}`}
                                dataIndex={dataIndex}
                                rowIndex={rowIndex}
                                colIndex={column.index}
                                columnHeader={columns[column.index].label}
                                print={columns[column.index].print}
                                options={options}
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

function handleRowClick(
    row: string[],
    data: {
        rowIndex: number
        dataIndex: number
    },
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    parentProps: DataTableBodyProps
) {
    const clickedElement = event.target as HTMLElement

    const isExpandButtonClick = Boolean(
        clickedElement.closest('#expandable-button')
    )

    const isTheInternalSelectCell = clickedElement.id.startsWith(
        'datatable-delight--body--select-cell'
    )

    // Don't trigger onRowClick if the event was actually the expandable icon.
    if (isExpandButtonClick || isTheInternalSelectCell) {
        return
    }

    // Check if we should toggle row select when row is clicked anywhere
    if (
        parentProps.options.selectableRowsOnClick &&
        parentProps.options.selectableRows !== 'none' &&
        getIsRowSelectable(
            data.dataIndex,
            parentProps.selectedRows,
            parentProps
        )
    ) {
        const selectRow = {
            index: data.rowIndex,
            dataIndex: data.dataIndex
        }

        handleRowSelect(selectRow, event, parentProps)
    }

    // Check if we should trigger row expand when row is clicked anywhere
    if (
        parentProps.options.expandableRowsOnClick &&
        parentProps.options.expandableRows &&
        isRowExpandable(data.dataIndex, parentProps)
    ) {
        parentProps.toggleExpandRow({
            index: data.rowIndex,
            dataIndex: data.dataIndex
        })
    }

    // Don't trigger onRowClick if the event was actually a row selection via click
    if (parentProps.options.selectableRowsOnClick) return

    parentProps.options.onRowClick &&
        parentProps.options.onRowClick(row, data, event)
}
