import type { TableCellProps } from '@mui/material/TableCell'
import type { TableSortLabelProps } from '@mui/material/TableSortLabel'
import type { ReactNode, RefObject } from 'react'
import type { DataTableState } from '@src/types/state'

export default interface Props {
    /** Current sort direction */
    sortDirection?: TableSortLabelProps['direction']

    /** Callback to trigger column sort */
    toggleSort: (columnIndex: number) => void

    /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
    column: DataTableState['columns'][0]

    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>

    index: number

    children: ReactNode

    cellHeaderProps: TableCellProps

    colPosition: number

    setHeadCellsRef: (
        rowIndex: number,
        colIndex: number,
        ref: HTMLTableCellElement
    ) => void
}
