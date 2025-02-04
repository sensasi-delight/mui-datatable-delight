import type { ReactNode } from 'react'
import hasSearchText from './has-search-text'
import updateDataCol from './update-data-col'
import type { FilterList } from '@src/types/state/filter-list'
import type { DataTableState } from '@src/types/state'
import type { DataTableOptions } from '@src/types/options'
import type { DataTableProps } from '@src/data-table.props'

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
    props: DataTableProps<T>,
    state: DataTableState<T>,
    setState: (newState: DataTableState<T>) => void
): ReactNode[] | undefined {
    let isFiltered = false
    let isSearchFound = false

    const displayRow: ReactNode[] = []

    for (let index = 0; index < row.length; index++) {
        let columnDisplay = row[index]
        let columnValue = row[index]

        const column = columns[index]

        if (column?.customBodyRenderLite) {
            displayRow.push(column.customBodyRenderLite(index, rowIndex))
        } else if (column?.customBodyRender) {
            const funcResult = column.customBodyRender(
                columnValue,
                rowIndex,
                index,
                state,
                (value: ReactNode) => {
                    setState(
                        updateDataCol(
                            rowIndex,
                            index,
                            value,
                            state,
                            options,
                            props,
                            setState
                        )
                    )
                }
            )

            columnDisplay = funcResult

            columnValue =
                typeof funcResult === 'string' || !funcResult
                    ? funcResult
                    : // @ts-expect-error  WILL FIX THIS LATER
                      (funcResult.props?.value ?? columnValue)

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
                        // @ts-expect-error  WILL FIX THIS LATER
                        columnValue?.includes(el)
                    )
                    if (!isFullMatch) {
                        isFiltered = true
                    }
                } else {
                    const isAnyMatch = filterVal?.some(el =>
                        // @ts-expect-error  WILL FIX THIS LATER
                        columnValue?.includes(el)
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

    if (searchText && props.options?.customSearch) {
        const customSearchResult = props.options.customSearch(
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
        if (props.options?.customSearch) {
            console.warn(
                'Server-side filtering is enabled, hence custom search will be ignored.'
            )
        }

        return displayRow
    }

    return isFiltered || (searchText && !isSearchFound) ? undefined : displayRow
}
