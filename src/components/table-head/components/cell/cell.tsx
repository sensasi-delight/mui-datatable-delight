'use client'

// vendors
import { useDrag } from 'react-dnd'
import { useState } from 'react'
// materials
import Button, { type ButtonProps } from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableSortLabel, {
    type TableSortLabelProps
} from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
// locals
import type Props from './types/props'
import useDataTableContext from '../../../../hooks/use-data-table-context'
import { useColumnDrop } from './hooks'
import { tss } from 'tss-react/mui'

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
    setHeadCellsRef,
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

    const _Tooltip = components.Tooltip ?? Tooltip

    return (
        <TableCell
            ref={(ref: HTMLTableCellElement) => {
                dropRef(ref)
                setHeadCellsRef(index + 1, colPosition + 1, ref)
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
                    <_Tooltip
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
                    </_Tooltip>

                    {hint && (
                        <_Tooltip title={hint}>
                            <HelpIcon
                                className={
                                    !sortActive
                                        ? classes.hintIconAlone
                                        : classes.hintIconWithSortIcon
                                }
                                fontSize="small"
                            />
                        </_Tooltip>
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
                        <_Tooltip
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
                        </_Tooltip>
                    )}
                </div>
            )}
        </TableCell>
    )
}

const useStyles = tss
    .withName('datatable-delight--head--cell')
    .create(({ theme }) => ({
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
    }))
