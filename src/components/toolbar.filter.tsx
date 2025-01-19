// materials
import { Button, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { ReactNode, useState } from 'react'
import clsx from 'clsx'
// locals
import { type DataTableState } from '../data-table.props.type/state'
import { DataTableToolbarFilterRenderFilters } from './toolbar.filter.render-filters'
import { useMainContext } from '../hooks/use-main-context'
import { FilterTypeEnum } from '../data-table.props.type/columns'
import { FilterUpdateType } from '../data-table'
import { getDisplayData } from '../functions'
import { TableAction } from '../data-table.props.type/options'

export function DataTableToolbarFilter(props: DataTableToolbarFilterProps) {
    const {
        onAction,
        options,
        props: DataTableRootProps,
        setState,
        state,
        textLabels
    } = useMainContext()
    const {
        columns,
        customFooter,
        filterList: filterListFromProp,
        filterUpdate,
        handleClose
    } = props

    const { classes } = useStyles()
    const [filterList, setFilterList] = useState(filterListFromProp)

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
                  null,
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
                        className={clsx({
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
                        data-testid="filterReset-button"
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

            <DataTableToolbarFilterRenderFilters
                columns={columns}
                parentProps={{ ...props, filterList: filterList }}
                innerFilterList={filterList}
                setFilterList={setFilterList}
            />

            {customFooter?.(filterList, () => {
                filterList.forEach((filters, index) => {
                    filters.forEach(filter => {
                        filterUpdate?.(
                            index,
                            filter,
                            columns[index],
                            FilterTypeEnum.CUSTOM
                        )
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
    .withName('datatable-delight--toolbar--filter')
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

export interface DataTableToolbarFilterProps {
    /** Data used to populate filter dropdown/checkbox */
    filterData: DataTableState['filterData']

    /** Data selected to be filtered against dropdown/checkbox */
    filterList: DataTableState['filterList']

    /** Callback to trigger filter update */
    filterUpdate: FilterUpdateType

    columns: DataTableState['columns']

    handleClose: () => void

    customFooter?: (
        filterList: FilterListType,
        applyFilters: () => FilterListType
    ) => ReactNode
}
