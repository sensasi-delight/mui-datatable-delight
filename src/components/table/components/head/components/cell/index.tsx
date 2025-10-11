'use client'

import HelpIcon from '@mui/icons-material/Help'
// materials
import Button, { type ButtonProps } from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableSortLabel, {
    type TableSortLabelProps
} from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import ComponentClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import { type ReactElement, useState } from 'react'
// vendors
import { tss } from 'tss-react/mui'
// locals
import type Props from './types/props'

/**
 * The TableHeadCell component.
 *
 * @category  Component
 */
export function TableHeadCell<T>({
    cellHeaderProps = {},
    children,
    column,
    index,
    sortDirection,
    toggleSort
}: Props<T>): ReactElement {
    const { classes, cx } = useStyles()
    const { components, options, textLabels } = useDataTableContext()
    const [sortTooltipOpen, setSortTooltipOpen] = useState(false)
    const [hintTooltipOpen, setHintTooltipOpen] = useState(false)

    const { className, ...otherProps } = cellHeaderProps
    const sortActive = Boolean(sortDirection)

    const handleKeyboardSortInput: ButtonProps['onKeyUp'] = e => {
        if (e.key === 'Enter') {
            toggleSort(index)
        }
    }

    function handleSortClick() {
        toggleSort(index)
    }

    const sortLabelProps: TableSortLabelProps = {
        active: sortActive,
        classes: { root: classes.sortLabelRoot },
        direction: sortDirection,
        hideSortIcon: true,
        tabIndex: -1
    }

    const cellClass = cx(className, classes.root, {
        [classes.fixedHeader]: options.fixedHeader,
        'datatables-noprint': !column.print
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
    const tooltipTitle = textLabels.body.toolTip

    const _Tooltip = components.Tooltip ?? Tooltip

    return (
        <TableCell
            className={cellClass}
            data-column-index={index + 1}
            onMouseDown={closeTooltip}
            scope="col"
            sortDirection={sortDirection}
            {...otherProps}
        >
            {options.sort && column.sort ? (
                <span className={classes.contentWrapper}>
                    <_Tooltip
                        classes={{
                            popper: classes.myPopper,
                            tooltip: classes.tooltip
                        }}
                        onClose={() => setSortTooltipOpen(false)}
                        open={sortTooltipOpen}
                        placement="bottom"
                        title={tooltipTitle}
                    >
                        <Button
                            className={classes.toolButton}
                            color="inherit"
                            onClick={handleSortClick}
                            onKeyUp={handleKeyboardSortInput}
                        >
                            <div className={classes.sortAction}>
                                <div
                                    className={cx({
                                        [classes.data]: true,
                                        [classes.sortActive]: sortActive
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

                    {column.hint && (
                        <_Tooltip title={column.hint}>
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
                <div className={column.hint ? classes.sortAction : undefined}>
                    {children}
                    {column.hint && (
                        <_Tooltip
                            classes={{
                                popper: classes.myPopper,
                                tooltip: classes.tooltip
                            }}
                            enterDelay={300}
                            onClose={() => setHintTooltipOpen(false)}
                            onOpen={() => showHintTooltip()}
                            open={hintTooltipOpen}
                            placement="bottom-end"
                            title={column.hint}
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

const useStyles = tss.withName(ComponentClassName.TABLE__HEAD__CELL).create({
    contentWrapper: {
        alignItems: 'center',
        display: 'flex'
    },
    data: {
        display: 'inline-block'
    },
    fixedHeader: {
        position: 'sticky',
        top: '0px'
    },
    hintIconAlone: {
        marginLeft: '3px',
        marginTop: '-3px'
    },
    hintIconWithSortIcon: {
        marginTop: '-3px'
    },
    myPopper: {
        '&[data-x-out-of-boundaries]': {
            display: 'none'
        }
    },
    root: {
        backgroundColor: 'var(--mui-palette-background-paper)'
    },
    sortAction: {
        cursor: 'pointer',
        display: 'flex'
    },
    sortActive: {
        color: 'var(--mui-palette-text-primary)'
    },
    sortLabelRoot: {
        height: '20px'
    },
    toolButton: {
        marginLeft: '-8px',
        marginRight: '8px',
        minWidth: 0,
        paddingLeft: '8px',
        paddingRight: '8px',
        textTransform: 'none'
    },
    tooltip: {
        cursor: 'pointer'
    }
})
