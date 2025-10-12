'use client'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ComponentClassName from '@src/enums/class-name'
// global enums
import FilterType from '@src/enums/filter-type'
import TableAction from '@src/enums/table-action'
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// locals
import type { FilterUpdateType } from '@src/types/filter-update'
import { type ReactNode, useState } from 'react'
// materials
import { tss } from 'tss-react/mui'
import ToolbarDataFilterBoxFilters from './components/filter-inputs'

/**
 * ToolbarDataFilterBox is a component that renders a filter dialog box for a data table,
 * allowing users to apply filters to the table's data. It utilizes the context from the
 * data table to access current state, options, and actions.
 *
 * The component maintains an internal filter list state that reflects the current filters applied.
 * It also provides a reset functionality to clear all filters and optionally interfaces with
 * server-side data management if specified in the options.
 *
 * @category  Component
 */
export default function ToolbarDataFilterBox<T>({
    filterUpdate,
    handleClose
}: {
    /** Callback to trigger filter update */
    filterUpdate: FilterUpdateType<T>

    handleClose: () => void
}): ReactNode {
    const { classes, cx } = useStyles()

    const { onAction, options, state, textLabels, updateCellValueRef } =
        useDataTableContext()

    const [filterList, setFilterList] = useState(state.filterList)

    function handleFilterReset() {
        const prevState = state

        const filterList = prevState.columns.map(() => [])
        const displayData = options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  filterList,
                  prevState.searchText,
                  prevState,
                  options,
                  updateCellValueRef
              )

        onAction?.(TableAction.RESET_FILTERS, {
            displayData,
            filterList
        })

        options.onFilterChange?.(null, filterList, 'reset', null, displayData)
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.reset}>
                    <Typography
                        className={cx({
                            [classes.title]: true
                        })}
                        variant="body2"
                    >
                        {textLabels.filter.title}
                    </Typography>

                    <Button
                        aria-label={textLabels.filter.reset}
                        className={classes.resetLink}
                        color="primary"
                        onClick={() => {
                            if (options.confirmFilters !== true) {
                                setFilterList(state.columns.map(() => []))
                                handleFilterReset()
                            }
                        }}
                        tabIndex={0}
                    >
                        {textLabels.filter.reset}
                    </Button>
                </div>

                <div className={classes.filtersSelected} />
            </div>

            <ToolbarDataFilterBoxFilters
                filterUpdate={filterUpdate}
                innerFilterList={filterList}
            />

            {options.customFilterDialogFooter?.(filterList, () => {
                filterList.forEach((filters, index) => {
                    const column = state.columns[index]

                    if (!column) {
                        throw new Error('Column not found')
                    }

                    filters.forEach(filter => {
                        // @ts-expect-error  WILL FIX THIS LATER
                        filterUpdate?.(index, filter, column, FilterType.CUSTOM)
                    })
                })

                handleClose()

                options.onFilterConfirm?.(filterList)

                return filterList
            })}
        </div>
    )
}

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__DATA_FILTER_BOX)
    .create(() => ({
        filtersSelected: {
            alignSelf: 'right'
        },

        header: {
            display: 'flex',
            flex: '0 0 auto',
            justifyContent: 'space-between',
            marginBottom: '16px',
            width: '100%'
        },

        reset: {
            alignSelf: 'left'
        },

        resetLink: {
            cursor: 'pointer',
            fontSize: '12px',
            marginLeft: '16px'
        },
        root: {
            fontFamily: 'Roboto',
            padding: '24px 24px 36px 24px'
        },

        title: {
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 500,
            marginLeft: '7px'
        }
    }))

type FilterListType = string[][]

export type CustomUpdateType = (
    filterList: FilterListType,
    filterPos: FilterListType,
    index: number
) => FilterListType
