import type { ReactNode, RefObject } from 'react'
import hasSearchText from './has-search-text'
import type { FilterList } from '@src/types/state/filter-list'
import type { DataTableState } from '@src/types/state'
import type { DataTableOptions } from '@src/types/options'
import type { DisplayDataState } from '@src/types/state/display-data'
import type { HandleUpdateCellValue } from '@src/hooks/use-data-table-context/components/provider/types/handle-update-cell-value'

/*
 * Build the table data used to display to the user (i.e., after filter/search applied)
 */
export default function computeDisplayRow<T>(
    columns: DataTableState<T>['columns'],
    row: ReactNode[],
    rowIndex: number,
    filterList: FilterList,
    searchText: string,
    options: DataTableOptions<T>,
    state: DataTableState<T>,
    updateCellValue: RefObject<HandleUpdateCellValue | undefined>
): DisplayDataState<T>[number]['data'] | undefined {
    let isFiltered = false
    let isSearchFound = false

    const displayRow: DisplayDataState<T>[number]['data'] = []

    for (let index = 0; index < row.length; index++) {
        let columnDisplay = row[index]
        let columnValue = row[index]

        const column = columns[index]

        if (column?.customBodyRenderLite) {
            displayRow.push(column.customBodyRenderLite)
        } else if (column?.customBodyRender) {
            const funcResult = column.customBodyRender(
                columnValue,
                rowIndex,
                index,
                state,
                value => {
                    updateCellValue.current?.(value, rowIndex, index)
                }
            )

            columnDisplay = funcResult

            /* drill down to get the value of a cell */
            if (typeof funcResult === 'string' || !funcResult) {
                columnValue = funcResult
            } else if (
                typeof funcResult === 'object' &&
                'props' in funcResult
            ) {
                columnValue = funcResult.props.value ?? columnValue
            }

            displayRow.push(columnDisplay)
        } else {
            displayRow.push(columnDisplay)
        }

        const columnVal: string =
            columnValue === null || columnValue === undefined
                ? ''
                : columnValue.toString()

        const filterVal = filterList[index]
        const caseSensitive = options.caseSensitive
        const filterType = column?.filterType ?? options.filterType

        if (filterVal?.length || filterType === 'custom') {
            if (
                column?.filterOptions?.logic?.(
                    // @ts-expect-error  WILL FIX THIS LATER
                    columnValue,
                    filterVal ?? [],
                    row
                )
            ) {
                isFiltered = true
            } else if (
                filterType === 'textField' &&
                // @ts-expect-error  WILL FIX THIS LATER
                !hasSearchText(columnVal, filterVal, caseSensitive)
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                !Array.isArray(columnValue) &&
                // @ts-expect-error  WILL FIX THIS LATER
                (filterVal?.indexOf(columnValue) ?? 0) < 0
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                Array.isArray(columnValue)
            ) {
                if (options.filterArrayFullMatch) {
                    const isFullMatch = filterVal?.every(el =>
                        (columnValue as T[keyof T][])?.includes(
                            el as T[keyof T]
                        )
                    )
                    if (!isFullMatch) {
                        isFiltered = true
                    }
                } else {
                    const isAnyMatch = filterVal?.some(el =>
                        (columnValue as T[keyof T][])?.includes(
                            el as T[keyof T]
                        )
                    )

                    if (!isAnyMatch) {
                        isFiltered = true
                    }
                }
            }
        }

        if (
            searchText &&
            column?.display !== 'excluded' &&
            hasSearchText(columnVal, searchText, caseSensitive) &&
            column?.display !== false &&
            column?.searchable
        ) {
            isSearchFound = true
        }
    }

    if (searchText && options?.customSearch) {
        const customSearchResult = options.customSearch(
            searchText,
            row,
            columns
        )
        if (typeof customSearchResult !== 'boolean') {
            console.error('customSearch must return a boolean')
        } else {
            isSearchFound = customSearchResult
        }
    }

    if (options.serverSide) {
        if (options.customSearch) {
            console.warn(
                'Server-side filtering is enabled, hence custom search will be ignored.'
            )
        }

        return displayRow
    }

    return isFiltered || (searchText && !isSearchFound) ? undefined : displayRow
}
