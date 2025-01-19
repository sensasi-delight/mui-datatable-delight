// vendors
import { useDrag } from 'react-dnd'
import { useState } from 'react'
// materials
import {
    Button,
    ButtonProps,
    TableCell,
    TableSortLabel,
    TableSortLabelProps
} from '@mui/material'
import { Help as HelpIcon } from '@mui/icons-material'
// locals
import type { Props } from './types/props'
import { useDataTableContext } from '../../../../hooks'
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
    toggleSort
}: Props) {
    const { classes, cx } = useStyles()
    const { components, options, textLabels } = useDataTableContext()
    const [sortTooltipOpen, setSortTooltipOpen] = useState(false)
    const [hintTooltipOpen, setHintTooltipOpen] = useState(false)
    const [dragging, setDragging] = useState(false)

    const { className, ...otherProps } = cellHeaderProps
    const sortActive = Boolean(sortDirection)

    const [, dragRef] = useDrag({
        type: 'HEADER',
        item: () => {
            setHintTooltipOpen(false)
            setSortTooltipOpen(false)
            setDragging(true)

            return {
                colIndex: index,
                headCellRefs: draggableHeadCellRefs
            }
        },
        end: () => {
            setDragging(false)
        }
        // collect: monitor => {
        //     return {
        //         opacity: monitor.isDragging() ? 1 : 0
        //     }
        // }
    })

    const [, dropRef] = useColumnDrop({
        index,
        headCellRefs: draggableHeadCellRefs,
        columnOrder,
        columns,
        transitionTime: options.draggableColumns
            ? (options.draggableColumns.transitionTime ?? 0)
            : 300,
        tableRef: tableRef,
        tableId: options.tableId ?? 'none'
    })

    const handleKeyboardSortInput: ButtonProps['onKeyUp'] = e => {
        if (e.key === 'Enter') {
            toggleSort(index)
        }
    }

    function handleSortClick() {
        toggleSort(index)
    }

    function isDraggingEnabled() {
        return (
            options.draggableColumns &&
            options.draggableColumns.enabled &&
            column.draggable !== false
        )
    }

    const sortLabelProps: TableSortLabelProps = {
        classes: { root: classes.sortLabelRoot },
        tabIndex: -1,
        active: sortActive,
        hideSortIcon: true,
        direction: sortDirection
    }

    const cellClass = cx(className, classes.root, {
        [classes.fixedHeader]: options.fixedHeader,
        'datatables-noprint': !print
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
            ref={(ref: HTMLTableCellElement) => {
                dropRef(ref)
                setCellRef(index + 1, colPosition + 1, ref)
            }}
            className={cellClass}
            scope="col"
            sortDirection={sortDirection}
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
                            ref={
                                isDraggingEnabled()
                                    ? ref => {
                                          dragRef(ref)
                                      }
                                    : undefined
                            }
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
                    ref={
                        isDraggingEnabled()
                            ? ref => {
                                  dragRef(ref)
                              }
                            : undefined
                    }
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
