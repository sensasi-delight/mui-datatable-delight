import type { RefObject } from 'react'
import type { DataTableState } from '../../../data-table.props.type/state'

export interface Props {
    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>
    selectRowUpdate: (
        type: string,
        value: DataTableState['previousSelectedRow'],
        shiftAdjacentRows: unknown[]
    ) => void
    setHeadCellsRef: (
        index: number,
        pos: number,
        el: HTMLTableCellElement
    ) => void
    tableRef: RefObject<HTMLTableElement | null>
}
