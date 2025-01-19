// vendors
import { makeStyles } from 'tss-react/mui'
import { useDrag } from 'react-dnd'
import { RefObject, useState } from 'react'
import clsx from 'clsx'
// materials
import { Button, TableCell, TableSortLabel } from '@mui/material'
import { Help as HelpIcon } from '@mui/icons-material'
// locals
import useColumnDrop from './head.cell.use-column-drop'
import { useMainContext } from '../hooks/use-main-context'
import { TableAction } from '../data-table.props.type/options'

const useStyles = makeStyles({ name: 'datatable-delight--head--cell' })(
    theme => ({
        root: {},
        fixedHeader: {
            position: 'sticky',
            top: '0px',
            zIndex: 1
        },
        tooltip: {
            cursor: 'pointer'
        },
        myPopper: {
            '&[data-x-out-of-boundaries]': {
                display: 'none'
            }
        },
        data: {
            display: 'inline-block'
        },
        sortAction: {
            display: 'flex',
            cursor: 'pointer'
        },
        dragCursor: {
            cursor: 'grab'
        },
        sortLabelRoot: {
            height: '20px'
        },
        sortActive: {
            color: theme.palette.text.primary
        },
        toolButton: {
            textTransform: 'none',
            marginLeft: '-8px',
            minWidth: 0,
            marginRight: '8px',
            paddingLeft: '8px',
            paddingRight: '8px'
        },
        contentWrapper: {
            display: 'flex',
            alignItems: 'center'
        },
        hintIconAlone: {
            marginTop: '-3px',
            marginLeft: '3px'
        },
        hintIconWithSortIcon: {
            marginTop: '-3px'
        }
    })
)

export default function TableHeadCell({
    cellHeaderProps = {},
    children,
    colPosition,
    column,
    columns,
    columnOrder = [],
    draggableHeadCellRefs,
    draggingHook,
    hint,
    index,
    print,
    setCellRef,
    sort,
    sortDirection,
    tableRef,
    timers,
    toggleSort
}: DataTableHeadCellProps) {
    const { components, onAction, options, textLabels } = useMainContext()
    const [sortTooltipOpen, setSortTooltipOpen] = useState(false)
    const [hintTooltipOpen, setHintTooltipOpen] = useState(false)

    const { classes } = useStyles()

    const handleKeyboardSortInput = e => {
        if (e.key === 'Enter') {
            toggleSort(index)
        }

        return false
    }

    const handleSortClick = () => {
        toggleSort(index)
    }

    const [dragging, setDragging] = draggingHook ? draggingHook : []

    const { className, ...otherProps } = cellHeaderProps
    const sortActive = sortDirection !== 'none' && sortDirection !== undefined
    const ariaSortDirection = sortDirection === 'none' ? false : sortDirection

    const isDraggingEnabled = () => {
        if (!draggingHook) return false
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
            headCellRefs: draggableHeadCellRefs
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
        headCellRefs: draggableHeadCellRefs,
        updateColumnOrder: handleColumnOrderUpdate,
        columnOrder,
        columns,
        transitionTime: options.draggableColumns
            ? options.draggableColumns.transitionTime
            : 300,
        tableRef: tableRef?.current,
        tableId: options.tableId ?? 'none',
        timers
    })

    const cellClass = clsx({
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
                            data-testid={`headcol-${index}`}
                            ref={isDraggingEnabled() ? dragRef : null}
                        >
                            <div className={classes.sortAction}>
                                <div
                                    className={clsx({
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
                    className={hint ? classes.sortAction : null}
                    ref={isDraggingEnabled() ? dragRef : null}
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

interface DataTableHeadCellProps {
    /** Current sort direction */
    sortDirection?: 'asc' | 'desc' | 'none'

    /** Callback to trigger column sort */
    toggleSort: () => void

    /** Sort enabled / disabled for this column **/
    sort: boolean

    /** Hint tooltip text */
    hint?: string

    /** Column displayed in print */
    print: boolean

    /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
    column?: Object

    tableRef: RefObject<HTMLTableElement | null>
}
