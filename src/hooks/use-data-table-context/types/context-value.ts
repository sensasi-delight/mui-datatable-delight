// vendors
import type { Dispatch, SetStateAction } from 'react'
// local types
import type { DataTableComponents } from '../../../types/components'
import type { DataTableOptions } from '../../../types/options'
import type { DataTableState } from '../../../types/state'
import type { DataTableProps, DefaultRowDataType } from '../../../types'
// enums
import type TableAction from '../../../enums/table-action'
// statics
import type { DEFAULT_ICONS } from '../statics/default-icons'
import type { processTextLabels } from '../function/process-text-labels'
import type DEFAULT_STATE from '../statics/default-state'
import type { SetResizableCallback } from '@src/components/columns-resizer'

export default interface ContextValue {
    components: DataTableComponents
    draggableHeadCellRefs: React.RefObject<HTMLTableCellElement[]>
    icons: typeof DEFAULT_ICONS
    onAction?: (action: TableAction, state: Partial<DataTableState>) => void
    options: DataTableOptions
    props?: DataTableProps
    setState?: Dispatch<SetStateAction<DataTableState<DefaultRowDataType>>>
    setHeadResizable: React.RefObject<SetResizableCallback | undefined>
    state: typeof DEFAULT_STATE
    tableHeadCellElements: React.RefObject<HTMLTableCellElement[]>
    tableRef: React.RefObject<HTMLTableElement | null>
    textLabels: ReturnType<typeof processTextLabels>
    updateDividers: React.RefObject<(() => void) | undefined>
}
