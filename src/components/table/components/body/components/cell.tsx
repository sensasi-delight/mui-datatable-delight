'use client'

// vendors
import { useCallback } from 'react'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import { tss } from 'tss-react/mui'
import type { MUIDataTableBodyCell } from 'mui-datatables'
// globals
import type { DataTableState } from '@src/types/state'
import useDataTableContext from '@src/hooks/use-data-table-context'
import ComponentClassName from '@src/enums/class-name'

export function TableBodyCell({
    children,
    colIndex,
    columnHeader,
    dataIndex,
    rowIndex,
    className,
    print,
    ...otherProps
}: Omit<MUIDataTableBodyCell & TableCellProps, 'options'> & {
    print: DataTableState['columns'][0]['print']
}) {
    const { options, textLabels } = useDataTableContext()
    const { classes, cx } = useStyles()

    const handleClick = useCallback<Required<TableCellProps>['onClick']>(
        event => {
            if (
                colIndex !== undefined &&
                rowIndex !== undefined &&
                dataIndex !== undefined
            ) {
                options?.onCellClick?.(children, {
                    colIndex,
                    rowIndex,
                    dataIndex,
                    event
                })
            } else {
                console.error(`
                    Required param is undefined:
                    - colIndex: ${colIndex}
                    - rowIndex: ${rowIndex}
                    - dataIndex: ${dataIndex}
                    `)
            }
        },
        [options?.onCellClick, children, colIndex, rowIndex, dataIndex]
    )

    const cells = [
        <div
            key={1}
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
                    [classes.stackedCommonAlways]:
                        options?.responsive === 'verticalAlways',
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
        >
            {columnHeader}
        </div>,
        <div
            key={2}
            className={cx(
                {
                    [classes.root]: true,
                    [classes.stackedCommon]:
                        options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        options?.responsive === 'stackedFullWidth',
                    [classes.stackedCommonAlways]:
                        options?.responsive === 'verticalAlways',
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
        >
            {typeof children === 'function'
                ? children(dataIndex, rowIndex)
                : children}
        </div>
    ]

    const innerCells =
        children === textLabels.body.noMatch ||
        (options?.responsive &&
            [
                'standard',
                'scrollMaxHeight',
                'scrollFullHeight',
                'scrollFullHeightFullWidth'
            ].indexOf(options.responsive) !== -1)
            ? cells.slice(1, 2)
            : cells

    return (
        <TableCell
            onClick={handleClick}
            data-colindex={colIndex}
            data-tableid={options.tableId}
            className={cx(
                {
                    [classes.root]: true,
                    [classes.stackedParent]:
                        options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        options?.responsive === 'stackedFullWidth',
                    [classes.stackedParentAlways]:
                        options?.responsive === 'verticalAlways',
                    [classes.responsiveStackedSmallParent]:
                        options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        (options?.responsive === 'stackedFullWidth' &&
                            (options.setTableProps?.().padding === 'none' ||
                                options.setTableProps?.().size === 'small')),
                    [classes.simpleCell]: options?.responsive === 'simple',
                    'datatables-noprint': !print
                },
                className
            )}
            {...otherProps}
        >
            {innerCells}
        </TableCell>
    )
}

const useStyles = tss
    .withName(ComponentClassName.TABLE__BODY__CELL)
    .create(({ theme }) => ({
        root: {},
        cellHide: {
            display: 'none'
        },
        simpleHeader: {
            [theme.breakpoints.down('sm')]: {
                display: 'inline-block',
                fontWeight: 'bold',
                width: '100%',
                boxSizing: 'border-box'
            }
        },
        simpleCell: {
            [theme.breakpoints.down('sm')]: {
                display: 'inline-block',
                width: '100%',
                boxSizing: 'border-box'
            }
        },
        stackedHeader: {
            verticalAlign: 'top'
        },
        stackedCommon: {
            [theme.breakpoints.down('md')]: {
                display: 'inline-block',
                fontSize: '16px',
                height: 'auto',
                width: 'calc(50%)',
                boxSizing: 'border-box',
                '&:last-child': {
                    borderBottom: 'none'
                },
                '&:nth-last-of-type(2)': {
                    borderBottom: 'none'
                }
            }
        },
        stackedCommonAlways: {
            display: 'inline-block',
            fontSize: '16px',
            height: 'auto',
            width: 'calc(50%)',
            boxSizing: 'border-box',
            '&:last-child': {
                borderBottom: 'none'
            },
            '&:nth-last-of-type(2)': {
                borderBottom: 'none'
            }
        },
        stackedParent: {
            [theme.breakpoints.down('md')]: {
                display: 'inline-block',
                fontSize: '16px',
                height: 'auto',
                width: 'calc(100%)',
                boxSizing: 'border-box'
            }
        },
        stackedParentAlways: {
            display: 'inline-block',
            fontSize: '16px',
            height: 'auto',
            width: 'calc(100%)',
            boxSizing: 'border-box'
        },
        cellStackedSmall: {
            [theme.breakpoints.down('md')]: {
                width: '50%',
                boxSizing: 'border-box'
            }
        },
        responsiveStackedSmall: {
            [theme.breakpoints.down('md')]: {
                width: '50%',
                boxSizing: 'border-box'
            }
        },
        responsiveStackedSmallParent: {
            [theme.breakpoints.down('md')]: {
                width: '100%',
                boxSizing: 'border-box'
            }
        }
    }))
