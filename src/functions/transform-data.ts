import type { ColumnState } from '@src/types/state/column'
import type { DataTableOptions } from '../types/options'
import type { Primitive } from '@src/types/values/primitive'
import type { DataTableProps } from '@src/data-table.props'

export default function transformData<T>(
    columns: ColumnState<T>[],
    data: DataTableProps<T>['data'],
    options: DataTableOptions<T>
): Primitive[][] {
    const { enableNestedDataAccess } = options

    /**
     * Retrieves the leaf value from a nested object using a specified path.
     */
    const getLeafValue = (object: T, path: string): Primitive => {
        const pathSegments = enableNestedDataAccess
            ? path.split(enableNestedDataAccess)
            : path.split('.')

        return pathSegments.reduce<Primitive>(
            (value, segment) =>
                value && typeof value === 'object' && segment in value
                    ? value[segment]
                    : undefined,
            object as unknown as Primitive
        )
    }

    return data.map(row => {
        if (Array.isArray(row)) {
            let i = -1

            return columns.map(column => {
                if (!column.empty) i++

                return column.empty ? undefined : row[i]
            })
        }

        return columns.map(column => getLeafValue(row, column.name))
    })
}
