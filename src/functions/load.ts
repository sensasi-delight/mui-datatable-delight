import type { DataTableState } from '../types/state'

/**
 * Load DataTableState from localStorage
 */
export function load<T>(storageKey: string): DataTableState<T> {
    return JSON.parse(
        typeof localStorage !== 'undefined'
            ? (localStorage.getItem(storageKey) ?? '{}')
            : '{}'
    )
}
