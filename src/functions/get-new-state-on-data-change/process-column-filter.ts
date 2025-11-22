import type { DataTableState } from '@src/types/state'
import type { ColumnState } from '@src/types/state/column'
import type { Primitive } from '@src/types/values/primitive'
import { isValidElement } from 'react'

export function processColumnFilter<T>(
    column: ColumnState<T>,
    value: unknown,
    rowIndex: number,
    colIndex: number,
    state: DataTableState<T>,
    filterData: DataTableState<T>['filterData']
) {
    if (column.filter !== false) {
        if (typeof column.customBodyRender === 'function') {
            const funcResult = column.customBodyRender(
                value,
                rowIndex,
                colIndex,
                state,
                () => undefined
            )

            if (
                isValidElement(funcResult) &&
                typeof funcResult.props === 'object' &&
                funcResult.props &&
                'value' in funcResult.props
            ) {
                value = funcResult.props?.value
            } else if (typeof funcResult === 'string') {
                value = funcResult
            }
        }

        if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null
        ) {
            value = value.toString ? value.toString() : ''
        }

        if (
            !filterData[colIndex]?.includes(value as Primitive) &&
            !Array.isArray(value)
        ) {
            filterData[colIndex]?.push(value as Primitive)
        } else if (Array.isArray(value)) {
            value.forEach(element => {
                let elmVal: string

                if (
                    (typeof element === 'object' && element !== null) ||
                    typeof element === 'function'
                ) {
                    elmVal = element.toString ? element.toString() : ''
                } else {
                    elmVal = element
                }

                if (!filterData[colIndex]?.includes(elmVal)) {
                    filterData[colIndex]?.push(elmVal)
                }
            })
        }
    }
}
