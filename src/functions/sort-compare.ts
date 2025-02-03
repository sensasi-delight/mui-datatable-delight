import type { DataTableSortOrderOption } from '../types/options'

export function sortCompare(order: DataTableSortOrderOption['direction']) {
    return (a: { data: unknown }, b: { data: unknown }) => {
        const aData =
            a.data === null || typeof a.data === 'undefined' ? '' : a.data
        const bData =
            b.data === null || typeof b.data === 'undefined' ? '' : b.data

        return (
            // @ts-expect-error  WILL FIX THIS LATER
            (typeof aData.localeCompare === 'function'
                ? // @ts-expect-error  WILL FIX THIS LATER
                  aData.localeCompare(bData)
                : // @ts-expect-error  WILL FIX THIS LATER
                  aData - bData) * (order === 'asc' ? 1 : -1)
        )
    }
}
