import type { RefObject } from 'react'

export interface TableProps {
    tableRef: RefObject<HTMLTableElement | null>
    selectRowUpdate: unknown
    setHeadCellRef: unknown
    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>
}
