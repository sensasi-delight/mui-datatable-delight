import type { SelectedRowDataState } from '@src/types/state/selected-row-data'

export function buildMap(
    rows: SelectedRowDataState[]
): Record<number, boolean> {
    const map: Record<number, boolean> = {}

    rows.forEach(({ dataIndex }) => (map[dataIndex] = true))

    return map
}
