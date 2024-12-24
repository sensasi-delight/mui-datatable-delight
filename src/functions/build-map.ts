export function buildMap(
    rows: {
        index: number
        dataIndex: number
    }[]
) {
    const map: Record<number, boolean> = {}

    rows.forEach(({ dataIndex }) => (map[dataIndex] = true))

    return map
}
