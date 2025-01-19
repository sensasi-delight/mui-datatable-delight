import { tss } from 'tss-react/mui'
import MuiTableHead from '@mui/material/TableHead'
import { RefObject, useState } from 'react'
import TableHeadCell from './head.cell'
import TableHeadRow from './head.row'
import { DataTableTableSelectCell } from './components.shared/select-cell'
import { useMainContext } from '../hooks/use-main-context'
import { DataTableState } from '../data-table.props.type/state'
import {
    DataTableOptions,
    DataTableSortOrderOption,
    TableAction
} from '../data-table.props.type/options'
import { getDisplayData, sortTable } from '../functions'

export default function TableHead({
    columnOrder = null,
    columns,
    count,
    data,
    draggableHeadCellRefs,
    expandedRows,
    selectedRows,
    selectRowUpdate,
    setCellRef,
    sortOrder = {},
    tableRef,
    tableId,
    timers
}: DataTableHeadProps) {
    const { classes, cx } = useStyles()
    const {
        onAction,
        options,
        props: datatableRootProps,
        setState,
        state
    } = useMainContext()

    if (columnOrder === null) {
        columnOrder = columns ? columns.map((_, idx) => idx) : []
    }

    const [dragging, setDragging] = useState(false)

    function handleToggleColumn(columnIndex: number) {
        const prevState = state
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
            className={cx({
                [classes.responsiveStacked]:
                    options.responsive === 'vertical' ||
                    options.responsive === 'stacked' ||
                    options.responsive === 'stackedFullWidth',
                [classes.responsiveStackedAlways]:
                    options.responsive === 'verticalAlways',
                [classes.responsiveSimple]: options.responsive === 'simple',
                [classes.main]: true
            })}
        >
            <TableHeadRow>
                <DataTableTableSelectCell
                    setHeadCellRef={setCellRef}
                    onChange={handleRowSelect.bind(null)}
                    indeterminate={isIndeterminate}
                    checked={isChecked}
                    isHeaderCell={true}
                    expandedRows={expandedRows}
                    expandableRowsHeader={options.expandableRowsHeader}
                    expandableOn={options.expandableRows}
                    selectableOn={options.selectableRows}
                    fixedHeader={options.fixedHeader}
                    fixedSelectColumn={options.fixedSelectColumn}
                    selectableRowsHeader={options.selectableRowsHeader}
                    selectableRowsHideCheckboxes={
                        options.selectableRowsHideCheckboxes
                    }
                    isRowSelectable={true}
                />

                {orderedColumns.map(
                    ({ column, index, colPos }) =>
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
                                    columns[index].setCellHeaderProps
                                        ? columns[index].setCellHeaderProps({
                                              index,
                                              ...column
                                          }) || {}
                                        : {}
                                }
                                key={index}
                                index={index}
                                colPosition={colPos}
                                type="cell"
                                setCellRef={setCellRef}
                                sort={column.sort}
                                sortDirection={
                                    column.name === sortOrder.name
                                        ? sortOrder.direction
                                        : 'none'
                                }
                                toggleSort={handleToggleColumn}
                                hint={column.hint}
                                print={column.print}
                                column={column}
                                columns={columns}
                                columnOrder={columnOrder}
                                timers={timers}
                                draggingHook={[dragging, setDragging]}
                                draggableHeadCellRefs={draggableHeadCellRefs}
                                tableRef={tableRef}
                                tableId={tableId}
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
            </TableHeadRow>
        </MuiTableHead>
    )
}

const useStyles = tss.withName('MUIDataTableHead').create(({ theme }) => ({
    main: {},
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

interface DataTableHeadProps {
    columns: DataTableState['columns']

    tableRef: RefObject<HTMLTableElement | null>

    timers: RefObject<unknown>
}
