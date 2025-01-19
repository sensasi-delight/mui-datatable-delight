import type { RefObject } from 'react'

export interface TableProps {
    ref: RefObject<HTMLTableElement | null>
    selectRowUpdate: unknown
    setHeadCellRef: unknown
    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>
    timers: RefObject<unknown>
}
