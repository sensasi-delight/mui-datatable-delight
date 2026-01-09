'use client'

import Box from '@mui/material/Box'
import Chip, { type ChipProps } from '@mui/material/Chip'
import ComponentClassName from '@src/enums/class-name'
import type { FilterUpdateType } from '@src/types/filter-update'
import { Activity } from 'react'
// vendors
import useDataTableContext from '../hooks/use-data-table-context'
import type { FilterTypeType } from '../types/shared/filter-type-type'
// local types
import type { DataTableState } from '../types/state'

/**
 * Display a list of currently applied filters.
 *
 * @category  Component
 */
export default function FilteredValuesList<T>({
    filterUpdate
}: TableFilterListProps<T>): React.ReactNode {
    const { options, state } = useDataTableContext<T>()

    const columnNames = state.columns.map(column => ({
        filterType: column.filterType ?? options.filterType,
        name: column.name
    }))

    const customFilterListUpdate = state.columns.map(column => {
        return column.customFilterListOptions?.update
    })

    const filterListRenderers = state.columns.map(
        column => column.customFilterListOptions?.render ?? (<T,>(f: T) => f)
    )

    function removeFilter<T>(
        index: number,
        filterValueThatWillBeRemoved: string,
        columnName: string | undefined,
        filterType: FilterTypeType
    ) {
        const newFilterValues =
            state.filterList[index]?.filter(
                filter => filter !== filterValueThatWillBeRemoved
            ) ?? []

        const column = state.columns.find(column => column.name === columnName)

        if (!column) {
            throw new Error('Column not found')
        }

        filterUpdate(
            index,
            newFilterValues,
            column,
            filterType,
            column.customFilterListOptions?.update,
            (filterList: DataTableState<T>['filterList']) => {
                options.onFilterChipClose?.(
                    index,
                    filterValueThatWillBeRemoved,
                    filterList
                )
            }
        )
    }

    const customFilterChip = (
        customFilterItem: React.ReactNode,
        index: number,
        customFilterItemIndex: number,
        item: string[],
        isArray: boolean
    ) => {
        /**
         * If our custom filter list is an array, we need to check for custom update functions to determine default type. Otherwise we use the supplied type in options.
         */
        const type: FilterTypeType =
            (isArray && customFilterListUpdate[index]
                ? 'custom'
                : columnNames[index]?.filterType) ?? 'chip'

        return (
            <Chip
                key={customFilterItemIndex}
                label={customFilterItem}
                onDelete={() =>
                    removeFilter(
                        index,
                        item[customFilterItemIndex] ?? '',
                        columnNames[index]?.name ?? '',
                        type
                        // customFilterListUpdate[index]
                    )
                }
                sx={CHIP_SX}
                // itemKey={customFilterItemIndex}
                // index={index}
                // data={item}
                // columnNames={columnNames}
                // filterProps={
                //     options.setFilterChipProps
                //         ? options.setFilterChipProps(
                //               index,
                //               columnNames[index].name,
                //               item[customFilterItemIndex] || []
                //           )
                //         : {}
                // }
            />
        )
    }

    const filterChip = (index: number, data: string, colIndex: number) => (
        <Chip
            key={colIndex}
            label={filterListRenderers[index]?.(data)}
            onDelete={() => {
                removeFilter(index, data, columnNames[index]?.name, 'chip')
            }}
            sx={CHIP_SX}
            // itemKey={colIndex}
            // index={index}
            // data={data}
            // columnNames={columnNames}
            // filterProps={
            //     options.setFilterChipProps
            //         ? options.setFilterChipProps(
            //               index,
            //               columnNames[index].name,
            //               data
            //           )
            //         : {}
            // }
        />
    )

    const getFilterList = (filterList: DataTableState<T>['filterList']) => {
        return filterList.map((item, index) => {
            if (
                columnNames[index]?.filterType === 'custom' &&
                filterList[index]?.length
            ) {
                const filterListRenderersValue =
                    filterListRenderers[index]?.(item)

                if (Array.isArray(filterListRenderersValue)) {
                    return filterListRenderersValue.map(
                        (customFilterItem, customFilterItemIndex) =>
                            customFilterChip(
                                customFilterItem,
                                index,
                                customFilterItemIndex,
                                item,
                                true
                            )
                    )
                } else {
                    return customFilterChip(
                        filterListRenderersValue,
                        index,
                        index,
                        item,
                        false
                    )
                }
            }

            return item.map((data, colIndex) =>
                filterChip(index, data, colIndex)
            )
        })
    }

    const isHasFilter = state.filterList.some(filter =>
        Array.isArray(filter) ? filter.length > 0 : !!filter
    )

    return (
        <Activity mode={isHasFilter ? 'visible' : 'hidden'}>
            <Box
                className={ComponentClassName.FILTERED_VALUES_LIST}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'left',
                    margin: '0px 16px 16px 16px'
                }}
            >
                {getFilterList(state.filterList)}
            </Box>
        </Activity>
    )
}

export interface TableFilterListProps<T = unknown> {
    filterUpdate: FilterUpdateType<T>
}

const CHIP_SX: ChipProps['sx'] = {
    margin: '8px 8px 0px 0px'
}
