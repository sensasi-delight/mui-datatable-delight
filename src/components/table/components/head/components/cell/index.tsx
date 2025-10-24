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
    // const { classes, cx } = useStyles()
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
        direction: sortDirection,
        hideSortIcon: true,
        style: {
            height: '20px'
        },
        tabIndex: -1
    }

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

    const HandleTooltip = components.Tooltip ?? Tooltip

    return (
        <TableCell
            className={[
                ComponentClassName.TABLE__HEAD__CELL,
                className,
                !column.print === false ? 'datatables-noprint' : ''
            ].join(' ')}
            data-column-index={index + 1}
            onMouseDown={closeTooltip}
            scope="col"
            sortDirection={sortDirection}
            {...otherProps}
            sx={{
                backgroundColor: 'var(--mui-palette-background-paper)',

                ...(options.fixedHeader
                    ? {
                          position: 'sticky',
                          top: 0
                      }
                    : {}),

                ...otherProps.sx
            }}
        >
            {options.sort && column.sort ? (
                <span
                    style={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <HandleTooltip
                        onClose={() => setSortTooltipOpen(false)}
                        open={sortTooltipOpen}
                        placement="bottom"
                        slotProps={{
                            popper: {
                                sx: {
                                    '&[data-x-out-of-boundaries]': {
                                        display: 'none'
                                    }
                                }
                            },
                            tooltip: {
                                sx: {
                                    cursor: 'pointer'
                                }
                            }
                        }}
                        title={tooltipTitle}
                    >
                        <Button
                            color="inherit"
                            onClick={handleSortClick}
                            onKeyUp={handleKeyboardSortInput}
                            sx={{
                                marginLeft: '-8px',
                                marginRight: '8px',
                                minWidth: 0,
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                textTransform: 'none'
                            }}
                        >
                            <div
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex'
                                }}
                            >
                                <div
                                    style={{
                                        color: sortActive
                                            ? 'var(--mui-palette-text-primary)'
                                            : undefined,
                                        display: 'inline-block'
                                    }}
                                >
                                    {children}
                                </div>
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex'
                                    }}
                                >
                                    <TableSortLabel {...sortLabelProps} />
                                </div>
                            </div>
                        </Button>
                    </HandleTooltip>

                    {column.hint && (
                        <HandleTooltip title={column.hint}>
                            <HelpIcon
                                fontSize="small"
                                sx={
                                    !sortActive
                                        ? {
                                              marginLeft: '3px',
                                              marginTop: '-3px'
                                          }
                                        : {
                                              marginTop: '-3px'
                                          }
                                }
                            />
                        </HandleTooltip>
                    )}
                </span>
            ) : (
                <div
                    style={
                        column.hint
                            ? {
                                  cursor: 'pointer',
                                  display: 'flex'
                              }
                            : {}
                    }
                >
                    {children}
                    {column.hint && (
                        <HandleTooltip
                            enterDelay={300}
                            onClose={() => setHintTooltipOpen(false)}
                            onOpen={() => showHintTooltip()}
                            open={hintTooltipOpen}
                            placement="bottom-end"
                            slotProps={{
                                popper: {
                                    sx: {
                                        '&[data-x-out-of-boundaries]': {
                                            display: 'none'
                                        }
                                    }
                                },
                                tooltip: {
                                    sx: {
                                        cursor: 'pointer'
                                    }
                                }
                            }}
                            title={column.hint}
                        >
                            <HelpIcon
                                fontSize="small"
                                style={{
                                    marginLeft: '3px',
                                    marginTop: '-3px'
                                }}
                            />
                        </HandleTooltip>
                    )}
                </div>
            )}
        </TableCell>
    )
}
