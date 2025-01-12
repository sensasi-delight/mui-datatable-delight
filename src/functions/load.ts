import type { DataTableState } from '../data-table.props.type/state'

/**
 * Load DataTableState from localStorage
 */
export function load(storageKey: string) {
    return JSON.parse(
        typeof localStorage !== 'undefined'
            ? (localStorage.getItem(storageKey) ?? '{}')
            : '{}'
    ) as DataTableState
}
