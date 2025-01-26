import type { DataTableSortOrderOption } from '../types/options'
import type { DataTableState } from '../types/state'

export function sortCompare(order: DataTableSortOrderOption['direction']) {
    return (a: DataTableState['data'][0], b: DataTableState['data'][0]) => {
        const aData =
            a.data === null || typeof a.data === 'undefined' ? '' : a.data

        const bData =
            b.data === null || typeof b.data === 'undefined' ? '' : b.data

        return (
            (typeof aData === 'object' &&
            'localeCompare' in aData &&
            typeof aData.localeCompare === 'function'
                ? aData.localeCompare(bData)
                : aData - bData) * (order === 'asc' ? 1 : -1)
        )
    }
}
