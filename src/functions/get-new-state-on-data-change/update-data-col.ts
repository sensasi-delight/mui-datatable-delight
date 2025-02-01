import { isValidElement } from 'react'
import type {
    DataTableOptions,
    DataTableProps,
    DataTableState
} from '@src/index'
import getTableMeta from './get-table-meta'
import getDisplayData from './get-display-data'
import { getCollatorComparator } from '../get-collator-comparator'

/**
 * ⚠️ This JSDoc is generated by AI ⚠️
 * -
 *
 * Updates a specific cell's data in the table and refreshes the state.
 *
 * This function modifies the data of a specified cell in the table, updates the filter data,
 * and re-calculates the display data for the table. It handles custom rendering logic for the cell
 * and ensures that the filter data is correctly updated and sorted if necessary.
 *
 * @param row - The index of the row to update.
 * @param index - The index of the column to update.
 * @param value - The new value to set in the specified cell.
 * @param prevState - The previous state of the data table.
 * @param options - Configuration options for the data table.
 * @param datatableProps - The properties of the data table.
 * @param setState - A function to update the state of the data table.
 * @returns The new state of the data table after the update.
 */
export default function updateDataCol<T>(
    row: number,
    index: number,
    value: unknown,
    prevState: DataTableState<T>,
    options: DataTableOptions<T>,
    datatableProps: DataTableProps<T>,
    setState: (newState: DataTableState<T>) => void
): DataTableState<T> {
    let changedData = prevState.data
    let filterData = prevState.filterData

    const tableMeta = getTableMeta(
        row,
        index,
        row,
        prevState.columns[index],
        prevState.data,
        prevState,
        prevState.data
    )

    const funcResult = prevState.columns[index]?.customBodyRender?.(
        value,
        tableMeta
    )

    const filterValue =
        isValidElement(funcResult) && funcResult.props?.value
            ? funcResult.props.value
            : prevState['data'][row][index]

    const prevFilterIndex = filterData[index]?.indexOf(filterValue)
    filterData[index]?.splice(prevFilterIndex ?? 0, 1, filterValue)

    changedData[row].data[index] = value

    if (options.sortFilterList) {
        const comparator = getCollatorComparator()

        filterData[index]?.sort(comparator)
    }

    const newState: DataTableState<T> = {
        ...prevState,
        data: changedData,
        filterData: filterData
    }

    return {
        ...newState,
        displayData: getDisplayData(
            prevState.columns,
            changedData,
            prevState.filterList,
            prevState.searchText,
            undefined,
            datatableProps,
            newState,
            options,
            setState
        )
    }
}
