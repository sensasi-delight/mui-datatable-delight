import type { FilterTypeType } from './shared/filter-type-type'
import type { ColumnState } from './state/column'
import type { FilterList } from './state/filter-list'

export type FilterUpdateType<T = unknown> = (
    index: number,
    value: string | string[],
    column: ColumnState<T>,
    type: FilterTypeType,

    /**
     * customUpdate is called `<FilterList />` (onDelete)
     */
    customUpdate?: (
        filterList: FilterList,
        filterPos: number,
        index: number
    ) => string[][],

    /**
     * next is called `<FilterList />` (onDelete)
     */
    next?: (filterList: FilterList) => void
) => void
