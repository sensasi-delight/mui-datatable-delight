import type { FilterTypeType } from '@src/types/shared/filter-type-type'
import type { FilterList } from '@src/types/state/filter-list'

export function updateFilterByType(
    filterList: FilterList,
    index: number,
    value: string | string[],
    type: FilterTypeType,
    customUpdate?: (
        filterList: FilterList,
        filterPos: number,
        index: number
    ) => string[][]
) {
    const filterIndexPosition: number =
        filterList[index]?.indexOf(
            typeof value === 'string' ? value : (value[0] ?? '')
        ) ?? -1

    switch (type) {
        case 'checkbox':
            if (filterIndexPosition >= 0) {
                filterList[index]?.splice(filterIndexPosition, 1)
            } else if (typeof value === 'string') {
                filterList[index]?.push(value)
            }

            break

        case 'chip':
            if (filterIndexPosition >= 0) {
                filterList[index]?.splice(filterIndexPosition, 1)
            } else if (typeof value === 'string') {
                filterList[index]?.push(value)
            }
            break

        case 'multiselect':
            filterList[index] = typeof value === 'string' ? [] : value
            break

        case 'dropdown':
            filterList[index] = typeof value === 'string' ? [] : value
            break

        case 'custom':
            if (customUpdate) {
                filterList = customUpdate(
                    filterList,
                    filterIndexPosition,
                    index
                )
            } else {
                filterList[index] = typeof value === 'string' ? [] : value
            }
            break

        default:
            filterList[index] = typeof value === 'string' ? [value] : value
    }
}
