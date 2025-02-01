import type { DataTableState } from '@src/types/state'

export interface Props {
    selectRowUpdate: <T>(
        type: string,
        value: DataTableState<T>['previousSelectedRow'],
        shiftAdjacentRows: DataTableState<T>['selectedRows']['data']
    ) => void
}
