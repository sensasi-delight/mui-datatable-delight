'use client'

// materials
import { tss } from 'tss-react/mui'
import { useState, type ReactNode } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
// global enums
import FilterType from '@src/enums/filter-type'
import TableAction from '@src/enums/table-action'
import ComponentClassName from '@src/enums/class-name'
// locals
import type { FilterUpdateType } from '@src/types/filter-update'
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
            filterList,
            displayData
        })

        options.onFilterChange?.(null, filterList, 'reset', null, displayData)
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.reset}>
                    <Typography
                        variant="body2"
                        className={cx({
                            [classes.title]: true
                        })}
                    >
                        {textLabels.filter.title}
                    </Typography>

                    <Button
                        color="primary"
                        className={classes.resetLink}
                        tabIndex={0}
                        aria-label={textLabels.filter.reset}
                        onClick={() => {
                            if (options.confirmFilters !== true) {
                                setFilterList(state.columns.map(() => []))
                                handleFilterReset()
                            }
                        }}
                    >
                        {textLabels.filter.reset}
                    </Button>
                </div>

                <div className={classes.filtersSelected} />
            </div>

            <ToolbarDataFilterBoxFilters
                innerFilterList={filterList}
                filterUpdate={filterUpdate}
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
    .create(({ theme }) => ({
        root: {
            backgroundColor: theme.palette.background.default,
            padding: '24px 24px 36px 24px',
            fontFamily: 'Roboto'
        },

        header: {
            flex: '0 0 auto',
            marginBottom: '16px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        },

        title: {
            display: 'inline-block',
            marginLeft: '7px',
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontWeight: 500
        },

        /**
         * @deprecated FOUND BUT UNUSED
         */
        // noMargin: {
        //     marginLeft: '0px'
        // },

        reset: {
            alignSelf: 'left'
        },

        resetLink: {
            marginLeft: '16px',
            fontSize: '12px',
            cursor: 'pointer'
        },

        filtersSelected: {
            alignSelf: 'right'
        }

        /**
         * @deprecated FOUND BUT UNUSED
         */
        // checkboxFormGroup: {
        //     marginTop: '8px'
        // },
    }))

type FilterListType = string[][]

export type CustomUpdateType = (
    filterList: FilterListType,
    filterPos: FilterListType,
    index: number
) => FilterListType
