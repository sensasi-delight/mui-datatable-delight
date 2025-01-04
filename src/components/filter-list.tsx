import { makeStyles } from 'tss-react/mui'
// local types
import type { DataTableState } from '../data-table.props.type/state'
import type { DataTableOptions } from '../data-table.props.type/options'
import { Chip } from '@mui/material'
import { ReactNode } from 'react'

const CLASS_ID = 'datatable-delight--filter-list'

export function TableFilterList({
    options,
    filterList,
    filterUpdate,
    filterListRenderers,
    columnNames,
    serverSideFilterList,
    customFilterListUpdate
}: TableFilterListProps) {
    const { classes, cx } = useStyles()
    const { serverSide } = options

    const removeFilter = (
        index,
        filterValue,
        columnName,
        filterType,
        customFilterListUpdate = null
    ) => {
        let removedFilter = filterValue
        if (Array.isArray(removedFilter) && removedFilter.length === 0) {
            removedFilter = filterList[index]
        }

        filterUpdate(
            index,
            filterValue,
            columnName,
            filterType,
            customFilterListUpdate,
            filterList => {
                if (options.onFilterChipClose) {
                    options.onFilterChipClose(index, removedFilter, filterList)
                }
            }
        )
    }

    const customFilterChip = (
        customFilterItem,
        index,
        customFilterItemIndex,
        item,
        isArray
    ) => {
        let type
        // If our custom filter list is an array, we need to check for custom update functions to determine
        // default type. Otherwise we use the supplied type in options.
        if (isArray) {
            type = customFilterListUpdate[index] ? 'custom' : 'chip'
        } else {
            type = columnNames[index].filterType
        }

        return (
            <Chip
                label={customFilterItem}
                key={customFilterItemIndex}
                onDelete={() =>
                    removeFilter(
                        index,
                        item[customFilterItemIndex] || [],
                        columnNames[index].name,
                        type,
                        customFilterListUpdate[index]
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

    const filterChip = (index: number, data, colIndex: number) => (
        <Chip
            label={filterListRenderers[index](data)}
            key={colIndex}
            onDelete={() =>
                removeFilter(index, data, columnNames[index].name, 'chip')
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

    const getFilterList = (filterList: DataTableState['filterList']) => {
        return filterList.map((item, index) => {
            if (
                columnNames[index].filterType === 'custom' &&
                filterList[index].length
            ) {
                const filterListRenderersValue =
                    filterListRenderers[index](item)

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
            {serverSide && serverSideFilterList
                ? getFilterList(serverSideFilterList)
                : getFilterList(filterList)}
        </div>
    )
}

interface TableFilterListProps {
    /** Data used to filter table against */
    filterList: DataTableState['filterList']

    /** Filter List value renderers */
    filterListRenderers: ((val: unknown) => ReactNode)[]

    /** Columns used to describe table */
    columnNames: DataTableState['columns']

    /** Callback to trigger filter update */
    onFilterUpdate: (...params: unknown[]) => void

    options: DataTableOptions
}

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        margin: '0px 16px 0px 16px'
    },
    chip: {
        margin: '8px 8px 0px 0px'
    }
}))
