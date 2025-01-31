import type { DataTableState } from '@src/types/state'

export interface Props {
    selectRowUpdate: (
        type: string,
        value: DataTableState['previousSelectedRow'],
        shiftAdjacentRows: unknown[]
    ) => void
}
