'use client'

import TableRow, { type TableRowProps } from '@mui/material/TableRow'
import ComponentClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
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
    const { options } = useDataTableContext()

    const isHoverCursor =
        (options.selectableRowsOnClick && isRowSelectable) ??
        options.expandableRowsOnClick

    const breakpointSx =
        options.responsive === 'simple' || options.responsive === 'vertical'
            ? {
                  borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
                  borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
                  margin: 0,
                  padding: 0
              }
            : {}

    return (
        <TableRow
            className={ComponentClassName.TABLE__BODY__ROW}
            hover={options.rowHover}
            onClick={onClick}
            selected={rowSelected}
            sx={theme => ({
                backgroundColor: rowSelected
                    ? 'var(--mui-palette-action-selected)'
                    : undefined,
                cursor: isHoverCursor ? 'pointer' : undefined,
                [theme.breakpoints.down('sm')]: breakpointSx
            })}
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
