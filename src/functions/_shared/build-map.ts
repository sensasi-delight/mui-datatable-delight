import type { SelectedRowDataState } from '@src/types/state/selected-row-data'

export function buildMap(rows: SelectedRowDataState[]): boolean[] {
    const map: boolean[] = []

    rows.forEach(({ dataIndex }) => (map[dataIndex] = true))

    return map
}
