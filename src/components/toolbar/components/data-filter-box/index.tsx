'use client'

// materials
import { tss } from 'tss-react/mui'
import { useState } from 'react'
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
import ToolbarDataFilterBoxFilters from './components/filter-inputs'
import type { FilterUpdateType } from '@src/types/filter-update'

export default function ToolbarDataFilterBox<T>(
    props: DataTableToolbarFilterProps<T>
) {
    const {
        onAction,
        options,
        props: DataTableRootProps,
        setState,
        state,
        textLabels
    } = useDataTableContext()
    const { filterUpdate, handleClose } = props

    const { columns, filterList: filterListFromProp, filterData } = state

    const { classes, cx } = useStyles()
    const [filterList, setFilterList] = useState(filterListFromProp)

    const fakeProps = {
        ...props,
        columns,
        filterList,
        filterData
    }

    function handleFilterReset() {
        const prevState = state

        if (!setState) {
            throw new Error('setState is not defined')
        }

        const filterList = prevState.columns.map(() => [])
        const displayData = options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  filterList,
                  prevState.searchText,
                  undefined,
                  DataTableRootProps,
                  prevState,
                  options,
                  setState
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
                                setFilterList(columns.map(() => []))
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
                columns={columns}
                parentProps={fakeProps}
                innerFilterList={filterList}
                setFilterList={setFilterList}
            />

            {options.customFilterDialogFooter?.(filterList, () => {
                filterList.forEach((filters, index) => {
                    const column = columns[index]

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

export interface DataTableToolbarFilterProps<T> {
    /** Callback to trigger filter update */
    filterUpdate: FilterUpdateType<T>

    handleClose: () => void
}
