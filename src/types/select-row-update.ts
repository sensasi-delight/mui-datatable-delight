import type { SelectedRowDataState } from './state/selected-row-data'

export type SelectRowUpdateType = (
    type: string,
    value: SelectedRowDataState,
    shiftAdjacentRows: SelectedRowDataState[]
) => void
