// vendors
import type { Dispatch, RefObject, SetStateAction } from 'react'
// local types
import type { DataTableComponents } from '@src/types/components'
import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'
import type { DataTableProps } from '@src/data-table.props'
// enums
import type TableAction from '@src/enums/table-action'
// statics
import type { DEFAULT_ICONS } from '../statics/default-icons'
import type { processTextLabels } from '../function/process-text-labels'

export default interface ContextValue<DataRowItemType> {
    components: DataTableComponents
    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>
    functions: {
        /**
         * Sets the ref for a head cell.
         */
        setHeadCellsRef?: (
            index: number,
            columnIndex: number,
            element: HTMLTableCellElement
        ) => void
    }
    icons: typeof DEFAULT_ICONS
    onAction?: (
        action: TableAction,
        state: Partial<DataTableState<DataRowItemType>>
    ) => void
    options: DataTableOptions<DataRowItemType>
    props: DataTableProps<DataRowItemType>
    setState?: Dispatch<SetStateAction<DataTableState<DataRowItemType>>>
    state: DataTableState<DataRowItemType>
    tableHeadCellElements: RefObject<HTMLTableCellElement[]>
    tableRef: RefObject<HTMLTableElement | null>
    textLabels: ReturnType<typeof processTextLabels>
}
