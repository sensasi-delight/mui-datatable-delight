'use client'

import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import ComponentClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { ColumnState } from '@src/types/state/column'
// vendors
import { type ReactElement, type ReactNode } from 'react'
import { tss } from 'tss-react/mui'

/**
 * Table Body Cell.
 *
 * @category  Component
 */
export function TableBodyCell<T>({
    value,
    colIndex,
    columnHeader,
    dataIndex,
    rowIndex,
    className,
    print,
    ...otherProps
}: {
    value: ReactNode | ColumnState<T>['customBodyRenderLite']
    classes?: object | undefined
    className?: string | undefined
    colIndex: number
    columnHeader?: ReactNode
    dataIndex: number
    otherProps?: unknown
    rowIndex: number
    print: boolean
} & TableCellProps): ReactElement {
    const { options, textLabels } = useDataTableContext<T>()
    const { classes, cx } = useStyles()

    const cells = [
        <div
            className={cx(
                {
                    lastColumn: colIndex === 2,
                    [classes.root]: true,
                    [classes.cellHide]: true,
                    [classes.stackedHeader]: true,
                    [classes.stackedCommon]:
                        options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        options?.responsive === 'stackedFullWidth',
                    [classes.cellStackedSmall]:
                        options?.responsive === 'stacked' ||
                        (options?.responsive === 'stackedFullWidth' &&
                            (options.setTableProps?.().padding === 'none' ||
                                options.setTableProps?.().size === 'small')),
                    [classes.simpleHeader]: options?.responsive === 'simple',
                    'datatables-noprint': !print
                },
                className
            )}
            key={1}
        >
            {columnHeader}
        </div>,
        <div
            className={cx(
                {
                    [classes.root]: true,
                    [classes.stackedCommon]:
                        options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        options?.responsive === 'stackedFullWidth',
                    [classes.responsiveStackedSmall]:
                        options?.responsive === 'stacked' ||
                        (options?.responsive === 'stackedFullWidth' &&
                            (options.setTableProps?.().padding === 'none' ||
                                options.setTableProps?.().size === 'small')),
                    [classes.simpleCell]: options?.responsive === 'simple',
                    'datatables-noprint': !print
                },
                className
            )}
            key={2}
        >
            {typeof value === 'function' ? value(dataIndex, rowIndex) : value}
        </div>
    ]

    const innerCells =
        value === textLabels.body.noMatch ||
        (options?.responsive &&
            [
                'standard',
                'scrollMaxHeight',
                'scrollFullHeight',
                'scrollFullHeightFullWidth'
            ].includes(options.responsive))
            ? cells.slice(1, 2)
            : cells

    /** NOTE: NOT SURE WITH VAR NAME */
    const isAppendStackedParentClassName =
        options?.responsive === 'vertical' ||
        options?.responsive === 'stacked' ||
        options?.responsive === 'stackedFullWidth'

    return (
        <TableCell
            className={cx(
                classes.root,
                {
                    [classes.simpleCell]: options?.responsive === 'simple',
                    [classes.stackedParent]: isAppendStackedParentClassName,
                    [classes.responsiveStackedSmallParent]:
                        isAppendStackedParentClassName &&
                        (options.setTableProps?.().padding === 'none' ||
                            options.setTableProps?.().size === 'small'),
                    'datatables-noprint': !print
                },
                className
            )}
            data-column-index={colIndex}
            onClick={event => {
                options?.onCellClick?.(value, {
                    colIndex,
                    dataIndex,
                    event,
                    rowIndex
                })
            }}
            {...otherProps}
        >
            {innerCells}
        </TableCell>
    )
}

const useStyles = tss
    .withName(ComponentClassName.TABLE__BODY__CELL)
    .create(({ theme }) => ({
        cellHide: {
            display: 'none'
        },
        cellStackedSmall: {
            [theme.breakpoints.down('md')]: {
                boxSizing: 'border-box',
                width: '50%'
            }
        },
        responsiveStackedSmall: {
            [theme.breakpoints.down('md')]: {
                boxSizing: 'border-box',
                width: '50%'
            }
        },
        responsiveStackedSmallParent: {
            [theme.breakpoints.down('md')]: {
                boxSizing: 'border-box',
                width: '100%'
            }
        },
        root: {},
        simpleCell: {
            [theme.breakpoints.down('sm')]: {
                boxSizing: 'border-box',
                display: 'inline-block',
                width: '100%'
            }
        },
        simpleHeader: {
            [theme.breakpoints.down('sm')]: {
                boxSizing: 'border-box',
                display: 'inline-block',
                fontWeight: 'bold',
                width: '100%'
            }
        },
        stackedCommon: {
            [theme.breakpoints.down('md')]: {
                '&:last-child': {
                    borderBottom: 'none'
                },
                '&:nth-last-of-type(2)': {
                    borderBottom: 'none'
                },
                boxSizing: 'border-box',
                display: 'inline-block',
                fontSize: '16px',
                height: 'auto',
                width: 'calc(50%)'
            }
        },
        stackedHeader: {
            verticalAlign: 'top'
        },
        stackedParent: {
            [theme.breakpoints.down('md')]: {
                boxSizing: 'border-box',
                display: 'inline-block',
                fontSize: '16px',
                height: 'auto',
                width: 'calc(100%)'
            }
        }
    }))
