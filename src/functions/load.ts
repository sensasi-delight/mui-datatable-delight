import type { MUIDataTableState } from 'mui-datatables'

/**
 * Load DataTableState from localStorage
 */
export function load(storageKey: string) {
    if (typeof localStorage === 'undefined') {
        console.warn('storageKey only support on browser')
        return undefined
    }

    return JSON.parse(
        localStorage.getItem(storageKey) ?? '{}'
    ) as MUIDataTableState
}
