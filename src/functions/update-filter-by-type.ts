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
    let newFilterList = JSON.parse(JSON.stringify(filterList))

    const filterIndexPosition: number =
        newFilterList[index]?.indexOf(
            typeof value === 'string' ? value : (value[0] ?? '')
        ) ?? -1

    switch (type) {
        case 'checkbox':
            if (filterIndexPosition >= 0) {
                newFilterList[index]?.splice(filterIndexPosition, 1)
            } else if (typeof value === 'string') {
                newFilterList[index]?.push(value)
            }

            break

        case 'chip':
            newFilterList[index] = value

            break

        case 'multiselect':
            newFilterList[index] = typeof value === 'string' ? [] : value
            break

        case 'dropdown':
            newFilterList[index] = typeof value === 'string' ? [] : value
            break

        case 'custom':
            if (customUpdate) {
                newFilterList = customUpdate(
                    newFilterList,
                    filterIndexPosition,
                    index
                )
            } else {
                newFilterList[index] = typeof value === 'string' ? [] : value
            }
            break

        default:
            newFilterList[index] = typeof value === 'string' ? [value] : value
    }

    return newFilterList
}
