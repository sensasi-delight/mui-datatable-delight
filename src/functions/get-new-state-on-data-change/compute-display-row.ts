import type { ReactNode } from 'react'
import type {
    DataTableOptions,
    DataTableProps,
    DataTableState
} from '@src/index'
import getTableMeta from './get-table-meta'
import hasSearchText from './has-search-text'
import updateDataCol from './update-data-col'
import type DataTableMeta from '@src/types/table-meta'
import type { Primitive } from '@src/types/values/primitive'
import type { FilterList } from '@src/types/state/filter-list'

/*
 * Build the table data used to display to the user (i.e., after filter/search applied)
 */
export default function computeDisplayRow<T>(
    columns: DataTableState<T>['columns'],
    row: Primitive[],
    rowIndex: number,
    filterList: FilterList,
    searchText: string,
    dataForTableMeta: DataTableMeta<T>['tableData'] | DataTableProps<T>['data'],
    options: DataTableOptions<T>,
    props: DataTableProps<T>,
    currentTableData: DataTableState<T>['data'],
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
            displayRow.push(column.customBodyRenderLite)
        } else if (column?.customBodyRender) {
            const tableMeta = getTableMeta(
                rowIndex,
                index,
                row,
                column,
                dataForTableMeta,
                {
                    ...state,
                    filterList
                },
                currentTableData
            )

            const funcResult = column.customBodyRender(
                columnValue,
                tableMeta,
                (value: unknown) => {
                    setState(
                        updateDataCol(
                            rowIndex,
                            index,
                            value,
                            state,
                            options,
                            props
                            // setState
                        )
                    )
                }
            )

            columnDisplay = funcResult

            columnValue =
                typeof funcResult === 'string' || !funcResult
                    ? funcResult
                    : (funcResult.props?.value ?? columnValue)

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
                    columnValue,
                    filterVal ?? [],
                    row
                )
            ) {
                isFiltered = true
            } else if (
                filterType === 'textField' &&
                !hasSearchText(columnVal, filterVal, caseSensitive)
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                !Array.isArray(columnValue) &&
                (filterVal?.indexOf(columnValue) ?? 0) < 0
            ) {
                isFiltered = true
            } else if (
                filterType !== 'textField' &&
                Array.isArray(columnValue)
            ) {
                if (options.filterArrayFullMatch) {
                    const isFullMatch = filterVal?.every(el =>
                        columnValue?.includes(el)
                    )
                    if (!isFullMatch) {
                        isFiltered = true
                    }
                } else {
                    const isAnyMatch = filterVal?.some(el =>
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
