import { DataTableOptions } from '../data-table.props.type/options'

export function transformData(columns, data, options: DataTableOptions) {
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
