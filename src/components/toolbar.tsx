// vendors
import { makeStyles } from 'tss-react/mui'
import { useState, type RefObject } from 'react'
// materials
import {
    IconButton,
    Toolbar as VendorToolbar,
    Theme,
    Typography
} from '@mui/material'
// locals datatables
import { TableAction } from '../data-table.props.type/options'
import { useMainContext } from '../hooks/use-main-context'
import { ClassName } from '../enums/class-name'
// toolbar internals
import type { DataTableToolbarFilterProps } from './toolbar.filter'
import type { ToolbarViewColProps } from './toolbar.view-col'
import { DataTableToolbarSearch } from './toolbar.search'
import { ToolbarPopover } from './toolbar.popover'
import { ToolbarPrintButton } from './toolbar.print-button'
import { ToolbarDownloadButton } from './toolbar.download-button'
import { DataTableProps } from '../data-table.props.type'
import { FilterUpdateType } from '../data-table'

/**
 * DataTable Delight Toolbar
 *
 * @todo rename this to `<Toolbar />
 * @todo use named export instead default
 *
 * @see {@link http://mui-datatable-delight.vercel.app/examples/customize-toolbar|Customize Toolbar Example}.
 */
export default function TableToolbar(props: ToolbarProps) {
    const {
        components,
        icons,
        options,
        state,
        textLabels: { toolbar: toolbarTextLabels }
    } = useMainContext()
    const { classes } = useStyles()

    const [showSearch, setShowSearch] = useState(
        Boolean(
            state.searchText ||
                options.searchText ||
                options.searchOpen ||
                options.searchAlwaysOpen
        )
    )

    const [searchText, setSearchText] = useState(state.searchText)
    const [activeIcon, _setActiveIcon] = useState<
        'search' | 'filter' | 'viewColumns'
    >()

    function setActiveIcon(iconName: typeof activeIcon) {
        if (iconName === 'filter') {
            props.setTableAction(TableAction.ON_FILTER_DIALOG_OPEN)
            options.onFilterDialogOpen?.()
        }

        if (!iconName && activeIcon === 'filter') {
            props.setTableAction(TableAction.ON_FILTER_DIALOG_CLOSE)
            options.onFilterDialogClose?.()
        }

        _setActiveIcon(iconName)
        setShowSearch(isSearchShown(iconName))
    }

    function handleSearch(value: string) {
        setSearchText(value)
        props.searchTextUpdate(value)
    }

    function hideSearch() {
        props.setTableAction(TableAction.ON_SEARCH_CLOSE)
        options?.onSearchClose?.()
        props.searchClose()

        setActiveIcon(undefined)
        setShowSearch(false)
        setSearchText(undefined)
    }

    function getIconClasses(
        iconName: 'search' | 'filter' | 'viewColumns' | undefined
    ) {
        const isActive =
            iconName === 'search'
                ? Boolean(showSearch || searchText)
                : activeIcon === iconName

        return isActive ? classes.iconActive : classes.icon
    }

    function handleSearchIconClick() {
        if (showSearch && !searchText) {
            hideSearch()
        } else {
            setActiveIcon('search')
        }
    }

    function isSearchShown(iconName: typeof activeIcon) {
        if (options.searchAlwaysOpen) {
            return true
        }

        let nextVal = false

        if (showSearch) {
            if (searchText) {
                nextVal = true
            } else {
                props.setTableAction(TableAction.ON_SEARCH_CLOSE)
                options.onSearchClose?.()
                nextVal = false
            }
        } else if (iconName === 'search') {
            props.setTableAction(TableAction.ON_SEARCH_OPEN)
            options.onSearchOpen?.()

            nextVal = true
        }

        return nextVal
    }

    const [isDialogFilterOpen, setIsDialogFilterOpen] = useState(false)

    return (
        <VendorToolbar className={classes.root} role="table toolbar">
            <div className={classes.left}>
                {showSearch && (
                    <DataTableToolbarSearch
                        onSearch={handleSearch}
                        onHide={hideSearch}
                    />
                )}

                <div
                    style={{
                        display: showSearch ? 'none' : undefined
                    }}
                >
                    {typeof props.title === 'string' && (
                        <Typography variant="h6" component="div">
                            {props.title}
                        </Typography>
                    )}

                    {typeof props.title !== 'string' && props.title}
                </div>
            </div>

            <div className={classes.actions}>
                {!(
                    options.search === false ||
                    options.searchAlwaysOpen === true
                ) && (
                    <components.Tooltip
                        title={toolbarTextLabels.search}
                        disableFocusListener
                    >
                        <span>
                            <IconButton
                                aria-label={toolbarTextLabels.search}
                                classes={{
                                    root: getIconClasses('search')
                                }}
                                disabled={options.search === 'disabled'}
                                onClick={handleSearchIconClick}
                            >
                                <icons.SearchIcon />
                            </IconButton>
                        </span>
                    </components.Tooltip>
                )}

                {options.download && <ToolbarDownloadButton />}

                {options.print && (
                    <ToolbarPrintButton printContent={props.tableRef} />
                )}

                {options.viewColumns && (
                    <ToolbarPopover
                        hide={options.viewColumns === 'disabled'}
                        iconButtonProps={{
                            children: <icons.ViewColumnIcon />,
                            classes: {
                                root: getIconClasses('viewColumns')
                            },
                            disabled: options.viewColumns === 'disabled',
                            onClick: () => setActiveIcon('viewColumns')
                        }}
                        onPopoverExited={() => setActiveIcon(undefined)}
                        title={toolbarTextLabels.viewColumns}
                    >
                        <components.TableViewCol
                            // data={data}
                            columns={state.columns}
                            onColumnUpdate={props.toggleViewColumn}
                            // updateColumns={updateColumns}
                        />
                    </ToolbarPopover>
                )}

                {options.filter && (
                    <ToolbarPopover
                        hide={
                            isDialogFilterOpen || options.filter === 'disabled'
                        }
                        iconButtonProps={{
                            children: <icons.FilterIcon />,
                            classes: {
                                root: getIconClasses('filter')
                            },
                            disabled: options.filter === 'disabled',
                            onClick: () => setActiveIcon('filter')
                        }}
                        onPopoverExited={() => {
                            setIsDialogFilterOpen(false)
                            setActiveIcon(undefined)
                        }}
                        slotProps={{
                            paper: {
                                className: classes.filterPaper
                            }
                        }}
                        title={toolbarTextLabels.filterTable}
                    >
                        <components.TableFilter
                            customFooter={options.customFilterDialogFooter}
                            columns={state.columns}
                            filterList={state.filterList}
                            filterData={state.filterData}
                            filterUpdate={props.filterUpdate}
                            onFilterReset={props.resetFilters}
                            handleClose={() => {
                                setIsDialogFilterOpen(false)
                            }}
                        />
                    </ToolbarPopover>
                )}

                {options.customToolbar &&
                    options.customToolbar({
                        displayData: state.displayData
                    })}
            </div>
        </VendorToolbar>
    )
}

interface ToolbarProps {
    filterUpdate: FilterUpdateType
    resetFilters: DataTableToolbarFilterProps['onFilterReset']
    searchClose: () => void
    searchText?: string
    searchTextUpdate: (searchText: string) => void
    setTableAction: (action: TableAction) => void
    tableRef: RefObject<HTMLTableElement | null>
    title: DataTableProps['title']
    toggleViewColumn: ToolbarViewColProps['onColumnUpdate']
}

const useStyles = makeStyles({
    name: ClassName.TOOLBAR + '-'
})((theme: Theme) => ({
    actions: {
        display: 'flex'
    },
    root: {
        overflowX: 'auto',

        '@media print': {
            display: 'none !important'
        }
    },

    left: {
        flex: '1 1 auto',
        minWidth: '16em'
    },

    icon: {
        '&:hover': {
            color: theme.palette.primary.main
        }
    },

    iconActive: {
        color: theme.palette.primary.main
    },

    filterPaper: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: '50%'
        }
    }
}))
