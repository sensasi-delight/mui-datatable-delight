export function buildMap(
    rows: {
        index: number
        dataIndex: number
    }[]
): boolean[] {
    const map: boolean[] = []

    rows.forEach(({ dataIndex }) => (map[dataIndex] = true))

    return map
}
