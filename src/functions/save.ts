import type { DataTableState } from '@src/types/state'

/**
 * Save DataTableState to localStorage
 */
export function save<T>(storageKey: string, state: DataTableState<T>): void {
    localStorage.setItem(storageKey, JSON.stringify(state))
}
