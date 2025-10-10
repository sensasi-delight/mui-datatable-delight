// vendors

import type { DataTableProps } from '@src/data-table.props'
// enums
import type TableAction from '@src/enums/table-action'
// local types
import type { DataTableComponents } from '@src/types/components'
import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'
import type { RefObject } from 'react'
import type { HandleUpdateCellValue } from '../components/provider/types/handle-update-cell-value'
import type { processTextLabels } from '../function/process-text-labels'
// statics
import type { DEFAULT_ICONS } from '../statics/default-icons'

export default interface ContextValue<DataRowItemType> {
    components: Partial<DataTableComponents>
    icons: typeof DEFAULT_ICONS
    onAction?: (
        action: TableAction,
        state: Partial<DataTableState<DataRowItemType>>
    ) => void
    options: DataTableOptions<DataRowItemType>
    props: DataTableProps<DataRowItemType>
    state: DataTableState<DataRowItemType>
    tableRef: RefObject<HTMLTableElement | null>
    textLabels: ReturnType<typeof processTextLabels>
    updateCellValueRef: RefObject<HandleUpdateCellValue | undefined>
}
