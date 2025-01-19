import type { TableProps as MuiTableProps } from '@mui/material'

export interface TableProps {
    ref: MuiTableProps['ref']
    selectRowUpdate: unknown
    setHeadCellRef: unknown
    draggableHeadCellRefs: HTMLTableCellElement[]
    getCurrentRootRef: unknown
    timers: unknown
}
