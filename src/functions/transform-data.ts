import type { DataTableOptions } from '../types/options'
import type { DataTableState } from '../types/state'

type AllowedTypes = string | number | null | undefined
type AllowedObj = {
    [key: string]:
        | AllowedTypes
        | {
              [key: string]: AllowedTypes
          }
}

export default function transformData(
    columns: DataTableState['columns'],
    data: AllowedTypes[][] | AllowedObj[],
    options: DataTableOptions
): AllowedTypes[][] {
    const { enableNestedDataAccess } = options

    /**
     * Retrieves the leaf value from a nested object using a specified path.
     */
    const getLeafValue = (object: AllowedObj, path: string): AllowedTypes => {
        const pathSegments = enableNestedDataAccess
            ? path.split(enableNestedDataAccess)
            : path.split('.')

        return pathSegments.reduce<AllowedTypes>(
            (value, segment) =>
                value && typeof value === 'object' && segment in value
                    ? value[segment]
                    : undefined,
            object as unknown as AllowedTypes
        )
    }

    return data.map(row => {
        const transformedRow = columns.map(column => {
            if (column.empty) {
                return undefined
            }

            if (Array.isArray(row)) {
                return row[columns.indexOf(column)] as AllowedTypes
            }

            return getLeafValue(row, column.name)
        })

        return transformedRow
    })
}
