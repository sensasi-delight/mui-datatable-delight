import type { SelectedRowDataState } from './state/selected-row-data'

export type SelectRowUpdateType = (
    type: 'head' | 'cell' | 'custom',
    value: SelectedRowDataState | SelectedRowDataState[],
    shiftAdjacentRows?: SelectedRowDataState[]
) => void
