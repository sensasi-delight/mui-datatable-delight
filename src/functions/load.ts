import type { MUIDataTableState } from 'mui-datatables'

/**
 * Load DataTableState from localStorage
 */
export function load(storageKey: string) {
    return JSON.parse(
        typeof localStorage !== 'undefined'
            ? (localStorage.getItem(storageKey) ?? '{}')
            : '{}'
    ) as MUIDataTableState
}
