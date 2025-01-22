import type { DataTableState } from '../types/state'

/**
 * Save DataTableState to localStorage
 */
export function save(storageKey: string, state: DataTableState): void {
    const { selectedRows, data, displayData, ...savedState } = state

    localStorage.setItem(storageKey, JSON.stringify(savedState))
}
