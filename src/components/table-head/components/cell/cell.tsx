// vendors
import { useDrag } from 'react-dnd'
import { useState } from 'react'
// materials
import { Button, TableCell, TableSortLabel } from '@mui/material'
import { Help as HelpIcon } from '@mui/icons-material'
// locals
import type { Props } from './types/props'
import { useDataTableContext } from '../../../../hooks'
import { TableAction } from '../../../../data-table.props.type/options'
import { useColumnDrop, useStyles } from './hooks'

export function TableHeadCell({
    cellHeaderProps = {},
    children,
    colPosition,
    column,
    columns,
    columnOrder = [],
    draggableHeadCellRefs,
    hint,
    index,
    print,
    setCellRef,
    sort,
    sortDirection,
    tableRef,
    timers,
    toggleSort
}: Props) {
    const { classes, cx } = useStyles()
    const { components, onAction, options, textLabels } = useDataTableContext()
    const [sortTooltipOpen, setSortTooltipOpen] = useState(false)
    const [hintTooltipOpen, setHintTooltipOpen] = useState(false)
    const [dragging, setDragging] = useState(false)

    const handleKeyboardSortInput = e => {
        if (e.key === 'Enter') {
            toggleSort(index)
        }

        return false
    }

    const handleSortClick = () => {
        toggleSort(index)
    }

    const { className, ...otherProps } = cellHeaderProps
    const sortActive = sortDirection !== 'none' && sortDirection !== undefined
    const ariaSortDirection = sortDirection === 'none' ? false : sortDirection

    function isDraggingEnabled() {
        return (
            options.draggableColumns &&
            options.draggableColumns.enabled &&
            column.draggable !== false
        )
    }

    const sortLabelProps = {
        classes: { root: classes.sortLabelRoot },
        tabIndex: -1,
        active: sortActive,
        hideSortIcon: true,
        ...(ariaSortDirection ? { direction: sortDirection } : {})
    }

    const [{}, dragRef] = useDrag({
        item: {
            type: 'HEADER',
            colIndex: index,
            headCellRefs: draggableHeadCellRefs.current
        },
        begin: () => {
            setTimeout(() => {
                setHintTooltipOpen(false)
                setSortTooltipOpen(false)
                setDragging(true)
            }, 0)
        },
        end: () => {
            setDragging(false)
        },
        collect: monitor => {
            return {
                opacity: monitor.isDragging() ? 1 : 0
            }
        }
    })

    function handleColumnOrderUpdate(
        columnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) {
        onAction?.(TableAction.COLUMN_ORDER_CHANGE, {
            columnOrder
        })

        options.onColumnOrderChange?.(columnOrder, columnIndex, newPosition)
    }

    const [drop] = useColumnDrop({
        drop: () => {
            setSortTooltipOpen(false)
            setHintTooltipOpen(false)
            setDragging(false)
        },
        index,
        headCellRefs: draggableHeadCellRefs.current,
        updateColumnOrder: handleColumnOrderUpdate,
        columnOrder,
        columns,
        transitionTime: options.draggableColumns
            ? options.draggableColumns.transitionTime
            : 300,
        tableRef: tableRef?.current,
        tableId: options.tableId ?? 'none',
        timers: timers.current
    })

    const cellClass = cx({
        [classes.root]: true,
        [classes.fixedHeader]: options.fixedHeader,
        'datatables-noprint': !print,
        [className]: className
    })

    const showHintTooltip = () => {
        setSortTooltipOpen(false)
        setHintTooltipOpen(true)
    }

    const closeTooltip = () => {
        setSortTooltipOpen(false)
    }

    /**
     * @todo ACCOMMODATE `textLabels.body.columnHeaderTooltip`
     */
    const tooltipTitle = dragging
        ? ''
        : // : (textLabels.body.columnHeaderTooltip?.(column) ??
          textLabels.body.toolTip

    return (
        <TableCell
            ref={ref => {
                drop && drop(ref)
                setCellRef && setCellRef(index + 1, colPosition + 1, ref)
            }}
            className={cellClass}
            scope="col"
            sortDirection={ariaSortDirection}
            data-colindex={index}
            onMouseDown={closeTooltip}
            sx={{
                bgcolor: 'background.paper'
            }}
            {...otherProps}
        >
            {options.sort && sort ? (
                <span className={classes.contentWrapper}>
                    <components.Tooltip
                        title={tooltipTitle}
                        placement="bottom"
                        open={sortTooltipOpen}
                        onOpen={() =>
                            dragging
                                ? setSortTooltipOpen(false)
                                : setSortTooltipOpen(true)
                        }
                        onClose={() => setSortTooltipOpen(false)}
                        classes={{
                            tooltip: classes.tooltip,
                            popper: classes.myPopper
                        }}
                    >
                        <Button
                            color="inherit"
                            onKeyUp={handleKeyboardSortInput}
                            onClick={handleSortClick}
                            className={classes.toolButton}
                            ref={isDraggingEnabled() ? dragRef : undefined}
                        >
                            <div className={classes.sortAction}>
                                <div
                                    className={cx({
                                        [classes.data]: true,
                                        [classes.sortActive]: sortActive,
                                        [classes.dragCursor]:
                                            isDraggingEnabled()
                                    })}
                                >
                                    {children}
                                </div>
                                <div className={classes.sortAction}>
                                    <TableSortLabel {...sortLabelProps} />
                                </div>
                            </div>
                        </Button>
                    </components.Tooltip>

                    {hint && (
                        <components.Tooltip title={hint}>
                            <HelpIcon
                                className={
                                    !sortActive
                                        ? classes.hintIconAlone
                                        : classes.hintIconWithSortIcon
                                }
                                fontSize="small"
                            />
                        </components.Tooltip>
                    )}
                </span>
            ) : (
                <div
                    className={hint ? classes.sortAction : undefined}
                    ref={isDraggingEnabled() ? dragRef : undefined}
                >
                    {children}
                    {hint && (
                        <components.Tooltip
                            title={hint}
                            placement="bottom-end"
                            open={hintTooltipOpen}
                            onOpen={() => showHintTooltip()}
                            onClose={() => setHintTooltipOpen(false)}
                            classes={{
                                tooltip: classes.tooltip,
                                popper: classes.myPopper
                            }}
                            enterDelay={300}
                        >
                            <HelpIcon
                                className={classes.hintIconAlone}
                                fontSize="small"
                            />
                        </components.Tooltip>
                    )}
                </div>
            )}
        </TableCell>
    )
}
