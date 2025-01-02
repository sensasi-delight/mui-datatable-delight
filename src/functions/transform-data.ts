import { DataTableOptions } from '../data-table.props.type/options'
import { DataTableState } from '../data-table.props.type/state'

export function transformData(
    columns: DataTableState['columns'],
    data: DataTableState['data'],
    options: DataTableOptions
): unknown[][] {
    const { enableNestedDataAccess } = options

    const leaf = (obj, path) =>
        (enableNestedDataAccess
            ? path.split(enableNestedDataAccess)
            : path.split()
        ).reduce((value, el) => (value ? value[el] : undefined), obj)

    const transformedData = Array.isArray(data[0])
        ? data.map(row => {
              let i = -1

              return columns.map(col => {
                  if (!col.empty) i++
                  return col.empty ? undefined : row[i]
              })
          })
        : data.map(row => columns.map(col => leaf(row, col.name)))

    return transformedData
}
