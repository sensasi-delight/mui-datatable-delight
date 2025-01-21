import type { DataTableProps } from '../data-table.props.type'
import type { DataTableOptions } from '../data-table.props.type/options'
import type { DataTableState } from '../data-table.props.type/state'

export function transformData(
    columns: DataTableState['columns'],
    data: DataTableProps['data'],
    options: DataTableOptions
): unknown[][] {
    const { enableNestedDataAccess } = options

    function leaf(rowDataAsObject: object, path: string) {
        return (
            enableNestedDataAccess
                ? path.split(enableNestedDataAccess)
                : path.split('')
        ).reduce(
            (value, el) => (value ? (value as any)[el] : undefined),
            rowDataAsObject
        )
    }

    const transformedData = data.map(row => {
        if (!Array.isArray(data)) return columns.map(col => leaf(row, col.name))

        let i = -1

        return columns.map(col => {
            if (!col.empty) i++

            return col.empty ? undefined : (row as unknown[])[i]
        })
    })

    return transformedData
}
