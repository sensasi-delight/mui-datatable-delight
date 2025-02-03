import type { DataItemState } from '@src/types/state/data-item'
import type { DataTableSortOrderOption } from '../types/options'

export function sortCompare(order: DataTableSortOrderOption['direction']) {
    return (a: DataItemState, b: DataItemState) => {
        const aData =
            a.data === null || typeof a.data === 'undefined' ? '' : a.data

        const bData =
            b.data === null || typeof b.data === 'undefined' ? '' : b.data

        const result =
            typeof aData === 'object' &&
            'localeCompare' in aData &&
            typeof aData.localeCompare === 'function'
                ? aData.localeCompare(bData)
                : aData - bData

        return result * (order === 'asc' ? 1 : -1)
    }
}
