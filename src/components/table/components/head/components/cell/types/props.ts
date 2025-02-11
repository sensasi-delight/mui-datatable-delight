import type { TableCellProps } from '@mui/material/TableCell'
import type { TableSortLabelProps } from '@mui/material/TableSortLabel'
import type { ReactNode } from 'react'
import type { ColumnState } from '@src/types/state/column'

export default interface Props<T> {
    /** Current sort direction */
    sortDirection?: TableSortLabelProps['direction']

    /** Callback to trigger column sort */
    toggleSort: (columnIndex: number) => void

    /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
    column: ColumnState<T>

    index: number

    children: ReactNode

    cellHeaderProps: TableCellProps

    colPosition: number
}
