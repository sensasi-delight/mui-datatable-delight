import type { ReactNode, RefObject } from 'react'

export interface Props {
    /** Current sort direction */
    sortDirection?: 'asc' | 'desc' | 'none'

    /** Callback to trigger column sort */
    toggleSort: () => void

    /** Sort enabled / disabled for this column **/
    sort: boolean

    /** Hint tooltip text */
    hint?: string

    /** Column displayed in print */
    print: boolean

    /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
    column?: Object

    tableRef: RefObject<HTMLTableElement | null>

    timers: RefObject<unknown>

    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>

    index: number

    children: ReactNode
}
