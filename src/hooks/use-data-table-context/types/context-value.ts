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

export default interface ContextValue {
    components: DataTableComponents
    icons: typeof DEFAULT_ICONS
    onAction?: (action: TableAction, state: Partial<DataTableState>) => void
    options: DataTableOptions
    props?: DataTableProps
    setState?: Dispatch<SetStateAction<DataTableState<DefaultRowDataType>>>
    state: typeof DEFAULT_STATE
    textLabels: ReturnType<typeof processTextLabels>
}
