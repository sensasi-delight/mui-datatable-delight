'use client'

import Box from '@mui/material/Box'
import type { SxProps } from '@mui/material/styles'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import ComponentClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { ColumnState } from '@src/types/state/column'
// vendors

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
    value: React.ReactNode | ColumnState<T>['customBodyRenderLite']
    classes?: object | undefined
    className?: string | undefined
    colIndex: number
    columnHeader?: React.ReactNode
    dataIndex: number
    otherProps?: unknown
    rowIndex: number
    print: boolean
} & TableCellProps): React.ReactElement {
    const { options, textLabels } = useDataTableContext<T>()

    const constructedClassName = [
        className,
        colIndex === 2 ? 'lastColumn' : '',
        !print ? 'datatables-noprint' : ''
    ].join(' ')

    const cells = [
        <Box
            className={constructedClassName}
            key={1}
            style={{
                display: 'none',
                verticalAlign: 'top'
            }}
            sx={theme => ({
                [theme.breakpoints.down('sm')]: {
                    ...(options?.responsive === 'vertical'
                        ? SXS_BREAKPOINT_MD.stackedCommon
                        : {}),

                    ...(options?.responsive === 'simple'
                        ? SXS_BREAKPOINT_MD.simpleHeader
                        : {})
                }
            })}
        >
            {columnHeader}
        </Box>,
        <Box
            className={className}
            key={2}
            sx={theme => ({
                [theme.breakpoints.down('sm')]: {
                    ...(options?.responsive === 'vertical'
                        ? SXS_BREAKPOINT_MD.stackedCommon
                        : {}),

                    ...(options?.responsive === 'simple'
                        ? SXS_BREAKPOINT_MD.simpleCell
                        : {})
                }

                // TODO: add print support
                // '@media print': {
                //     display: !print ? 'none' : undefined
                // }
            })}
        >
            {typeof value === 'function' ? value(dataIndex, rowIndex) : value}
        </Box>
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

    const isStackedParent = options?.responsive === 'vertical'
    const isResponsiveStackedSmallParent =
        isStackedParent &&
        (options.setTableProps?.().padding === 'none' ||
            options.setTableProps?.().size === 'small')

    return (
        <TableCell
            className={[
                ComponentClassName.TABLE__BODY__CELL,
                className,
                print === false && 'datatables-noprint'
            ].join(' ')}
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
            sx={theme => ({
                ...otherProps.sx,

                [theme.breakpoints.down('sm')]: {
                    ...(options?.responsive === 'simple'
                        ? SXS_BREAKPOINT_MD.simpleCell
                        : {}),

                    ...(isStackedParent ? SXS_BREAKPOINT_MD.stackedParent : {}),

                    ...(isResponsiveStackedSmallParent
                        ? SXS_BREAKPOINT_MD.responsiveStackedSmallParent
                        : {})
                }
            })}
        >
            {innerCells}
        </TableCell>
    )
}

const SXS_BREAKPOINT_MD: {
    [key: string]: SxProps
} = {
    responsiveStackedSmallParent: {
        boxSizing: 'border-box',
        width: '100%'
    },
    simpleCell: {
        boxSizing: 'border-box',
        display: 'inline-block',
        width: '100%'
    },
    simpleHeader: {
        boxSizing: 'border-box',
        display: 'inline-block',
        fontWeight: 'bold',
        width: '100%'
    },
    stackedCommon: {
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
    },
    stackedParent: {
        boxSizing: 'border-box',
        display: 'inline-block',
        fontSize: '16px',
        height: 'auto',
        width: 'calc(100%)'
    }
}
