'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import Chip from '@mui/material/Chip'
// local types
import type { DataTableState } from '../types/state'
import type { FilterTypeType } from '../types/shared/filter-type-type'
import useDataTableContext from '../hooks/use-data-table-context'
import ComponentClassName from '@src/enums/class-name'
import type { FilterUpdateType } from '@src/types/filter-update'

const CLASS_ID = 'datatable-delight--filter-list'

/**
 * SHOW LIST OF VALUES OF FILTERS THAT APPLIED
 */
export default function FilteredValuesList<T>({
    filterUpdate
}: TableFilterListProps<T>) {
    const { classes, cx } = useStyles()
    const { options, state } = useDataTableContext<T>()
    const { serverSide } = options

    const columnNames = state.columns.map(column => ({
        name: column.name,
        filterType: column.filterType ?? options.filterType
    }))

    const customFilterListUpdate = state.columns.map(column => {
        return column.customFilterListOptions?.update
    })

    const filterListRenderers = state.columns.map(column => {
        if (column.customFilterListOptions?.render) {
            return column.customFilterListOptions.render
        }

        // DEPRECATED: This option is being replaced with customFilterListOptions.render
        return column.customFilterListRender ?? (<T,>(f: T) => f)
    })

    function removeFilter<T>(
        index: number,
        filterValue: string,
        columnName: string | undefined,
        filterType: FilterTypeType
    ) {
        const removedFilter =
            Array.isArray(filterValue) && filterValue.length === 0
                ? state.filterList[index]
                : filterValue

        const column = state.columns.find(column => column.name === columnName)

        if (!column) {
            throw new Error('Column not found')
        }

        filterUpdate(
            index,
            filterValue,
            column,
            filterType,
            column.customFilterListOptions?.update,
            (filterList: DataTableState<T>['filterList']) => {
                options.onFilterChipClose?.(
                    index,
                    removedFilter ?? [],
                    filterList
                )
            }
        )
    }

    const customFilterChip = (
        customFilterItem: ReactNode,
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
                label={customFilterItem}
                key={customFilterItemIndex}
                onDelete={() =>
                    removeFilter(
                        index,
                        item[customFilterItemIndex] ?? '',
                        columnNames[index]?.name ?? '',
                        type
                        // customFilterListUpdate[index]
                    )
                }
                className={classes.chip}
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
            label={filterListRenderers[index]?.(data)}
            key={colIndex}
            onDelete={() =>
                removeFilter(index, data, columnNames[index]?.name, 'chip')
            }
            className={classes.chip}
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

    return (
        <div className={cx(CLASS_ID, classes.root)}>
            {serverSide && options.serverSideFilterList
                ? getFilterList(options.serverSideFilterList)
                : getFilterList(state.filterList)}
        </div>
    )
}

interface TableFilterListProps<T = unknown> {
    filterUpdate: FilterUpdateType<T>
}

const useStyles = tss.withName(ComponentClassName.FILTERED_VALUES_LIST).create({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        margin: '0px 16px 0px 16px'
    },
    chip: {
        margin: '8px 8px 0px 0px'
    }
})
