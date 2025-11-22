import TableAction from '@src/enums/table-action'
import { updateFilterByType } from '@src/functions/update-filter-by-type'
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { FilterUpdateType } from '@src/types/filter-update'
import getDisplayData from '../functions/get-new-state-on-data-change/get-display-data'

export function useFilterUpdate<T>(): FilterUpdateType<T> {
    const { onAction, options, state, updateCellValueRef } =
        useDataTableContext<T>()

    const filterUpdate: FilterUpdateType<T> = (
        index,
        value,
        column,
        type,
        customUpdate,
        next
    ) => {
        const prevState = state

        updateFilterByType(
            prevState.filterList,
            index,
            value,
            type,
            customUpdate
        )

        const newState = {
            ...prevState,
            page: 0
        }

        const displayData = options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  prevState.filterList,
                  prevState.searchText,
                  newState,
                  options,
                  updateCellValueRef
              )

        onAction?.(TableAction.FILTER_CHANGE, {
            ...newState,
            displayData
        })

        options.onFilterChange?.(
            column,
            prevState.filterList,
            type,
            index,
            displayData
        )

        next?.(prevState.filterList)
    }

    return filterUpdate
}
