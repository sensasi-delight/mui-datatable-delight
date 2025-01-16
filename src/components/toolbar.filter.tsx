// materials
import { Button, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { ReactNode, useState } from 'react'
import clsx from 'clsx'
// locals
import type { DataTableProps } from '../'
import { type DataTableState } from '../data-table.props.type/state'
import { DataTableToolbarFilterRenderFilters } from './toolbar.filter.render-filters'
import { useMainContext } from '../hooks/use-main-context'
import { FilterTypeEnum } from '../data-table.props.type/columns'

export function DataTableToolbarFilter(props: DataTableToolbarFilterProps) {
    const { options, textLabels } = useMainContext()
    const {
        columns,
        customFooter,
        filterList: filterListFromProp,
        onFilterReset,
        onFilterUpdate,
        handleClose
    } = props

    const { classes } = useStyles()
    const [filterList, setFilterList] = useState(filterListFromProp)

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
                            setFilterList(columns.map(() => []))

                            if (options.confirmFilters !== true) {
                                onFilterReset?.()
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
                filterList.forEach((filter, index) => {
                    onFilterUpdate?.(
                        index,
                        filter,
                        columns[index],
                        FilterTypeEnum.CUSTOM
                    )
                })

                handleClose()

                options.onFilterConfirm?.(filterList)

                return filterList
            })}
        </div>
    )
}

const useStyles = makeStyles({
    name: 'datatable-delight--toolbar--filter'
})(theme => ({
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
    onFilterUpdate?: (
        index: number,
        value: string | string[],
        column: DataTableState['columns'][0],
        type: FilterTypeEnum
    ) => void

    /** Callback to trigger filter reset */
    onFilterReset?: () => void

    updateFilterByType: (
        newFilterList: string[][],
        index: number,
        value: DataTableProps['data'][0],
        type: string,
        customUpdate: CustomUpdateType | undefined
    ) => void

    columns: DataTableState['columns']

    handleClose: () => void

    customFooter?: (
        filterList: FilterListType,
        applyFilters: () => FilterListType
    ) => ReactNode
}
