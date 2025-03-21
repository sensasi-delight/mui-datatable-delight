'use client'

import TableRow, { type TableRowProps } from '@mui/material/TableRow'
import { tss } from 'tss-react/mui'
import useDataTableContext from '@src/hooks/use-data-table-context'
import ComponentClassName from '@src/enums/class-name'
import type { ReactElement } from 'react'

/**
 * Table row component.
 *
 * @category  Component
 */
export function DataTableBodyRow({
    rowSelected,
    onClick,
    isRowSelectable,
    children,
    className,
    ...restProps
}: DataTableBodyRowProps): ReactElement {
    const { classes, cx } = useStyles()
    const { options } = useDataTableContext()

    return (
        <TableRow
            hover={options.rowHover}
            onClick={onClick}
            className={cx(
                classes.root,
                {
                    /**
                     * @todo CHECK THIS `.hover` class ON OLDER CODE
                     */
                    // [classes.hover]: options.rowHover,
                    [classes.hoverCursor]:
                        (options.selectableRowsOnClick && isRowSelectable) ??
                        options.expandableRowsOnClick,
                    [classes.responsiveSimple]: options.responsive === 'simple',
                    [classes.responsiveStacked]:
                        options.responsive === 'vertical' ||
                        options.responsive === 'stacked' ||
                        options.responsive === 'stackedFullWidth',
                    'mui-row-selected': rowSelected
                },
                className
            )}
            selected={rowSelected}
            {...restProps}
        >
            {children}
        </TableRow>
    )
}
export interface DataTableBodyRowProps extends TableRowProps {
    isRowSelectable: boolean

    /** Current row selected or not */
    rowSelected?: boolean
}

const useStyles = tss
    .withName(ComponentClassName.TABLE__BODY__ROW)
    .create(({ theme }) => ({
        root: {
            // material v4
            '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected
            },

            // material v3 workaround
            '&.mui-row-selected': {
                backgroundColor: theme.palette.action.selected
            }
        },
        hoverCursor: { cursor: 'pointer' },
        responsiveStacked: {
            [theme.breakpoints.down('md')]: {
                borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
                borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
                padding: 0,
                margin: 0
            }
        },
        responsiveSimple: {
            [theme.breakpoints.down('sm')]: {
                borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
                borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
                padding: 0,
                margin: 0
            }
        }
    }))
