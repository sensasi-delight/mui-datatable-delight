// vendors
import type { Dispatch, SetStateAction } from 'react'
// local types
import type { DataTableComponents } from '@src/types/components'
import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'
import type { DataTableProps } from '@src/types'
// enums
import type TableAction from '@src/enums/table-action'
// statics
import type { DEFAULT_ICONS } from '../statics/default-icons'
import type { processTextLabels } from '../function/process-text-labels'

export default interface ContextValue<DataRowItemType> {
    components: DataTableComponents
    draggableHeadCellRefs: React.RefObject<HTMLTableCellElement[]>
    icons: typeof DEFAULT_ICONS
    onAction?: (
        action: TableAction,
        state: Partial<DataTableState<DataRowItemType>>
    ) => void
    options: DataTableOptions<DataRowItemType>
    props: DataTableProps<DataRowItemType>
    setState: Dispatch<SetStateAction<DataTableState<DataRowItemType>>>
    state: DataTableState<DataRowItemType>
    tableHeadCellElements: React.RefObject<HTMLTableCellElement[]>
    tableRef: React.RefObject<HTMLTableElement | null>
    textLabels: ReturnType<typeof processTextLabels>
}
