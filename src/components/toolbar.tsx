'use client'

// vendors
import { tss } from 'tss-react/mui'
import { useState, type RefObject } from 'react'
// materials
import IconButton from '@mui/material/IconButton'
import VendorToolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
// globals
import { TableAction } from '../data-table.props.type/options'
import useDataTableContext from '../hooks/use-data-table-context'
import { ClassName } from '../enums/class-name'
// sub-components
import { DataTableToolbarSearch } from './toolbar.search'
import { ToolbarPopover } from './toolbar.popover'
import { ToolbarPrintButton } from './toolbar.print-button'
import { ToolbarDownloadButton } from './toolbar.download-button'
import { FilterUpdateType } from '../data-table'
import { getDisplayData } from '../functions'
import { ToolbarViewCol } from './toolbar.view-col'
import { DataTableToolbarFilter } from './toolbar.filter'

/**
 * DataTable Delight Toolbar
 *
 * @todo rename this to `<Toolbar />
 * @todo use named export instead default
 *
 * @see {@link http://mui-datatable-delight.vercel.app/examples/customize-toolbar|Customize Toolbar Example}.
 */
export function TableToolbar(props: ToolbarProps) {
    const {
        components,
        icons,
        options,
        onAction,
        props: datatableRootProps,
        setState,
        state,
        textLabels: { toolbar: toolbarTextLabels }
    } = useDataTableContext()
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
            onAction?.(TableAction.ON_FILTER_DIALOG_OPEN, {})
            options.onFilterDialogOpen?.()
        }

        if (!iconName && activeIcon === 'filter') {
            onAction?.(TableAction.ON_FILTER_DIALOG_CLOSE, {})
            options.onFilterDialogClose?.()
        }

        _setActiveIcon(iconName)
        setShowSearch(isSearchShown(iconName))
    }

    function handleSearch(newSearchText: string) {
        const prevState = state

        const displayData = options.serverSide
            ? prevState.displayData
            : getDisplayData(
                  prevState.columns,
                  prevState.data,
                  prevState.filterList,
                  newSearchText,
                  null,
                  datatableRootProps,
                  prevState,
                  options,
                  setState
              )

        onAction?.(TableAction.SEARCH, {
            searchText: newSearchText,
            page: 0,
            displayData
        })

        setSearchText(newSearchText)
        options.onSearchChange?.(newSearchText)
    }

    function hideSearch() {
        onAction?.(TableAction.ON_SEARCH_CLOSE, {})
        options?.onSearchClose?.()
        searchClose()

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
                onAction?.(TableAction.ON_SEARCH_CLOSE, {})
                options.onSearchClose?.()
                nextVal = false
            }
        } else if (iconName === 'search') {
            onAction?.(TableAction.ON_SEARCH_OPEN, {})
            options.onSearchOpen?.()

            nextVal = true
        }

        return nextVal
    }

    function searchClose() {
        const prevState = state

        // reset searchText
        const searchText = undefined

        onAction?.(TableAction.SEARCH, {
            searchText,
            displayData: options.serverSide
                ? prevState.displayData
                : getDisplayData(
                      prevState.columns,
                      prevState.data,
                      prevState.filterList,
                      undefined,
                      null,
                      datatableRootProps,
                      prevState,
                      options,
                      setState
                  )
        })

        options.onSearchChange?.(searchText)
    }

    const [isDialogFilterOpen, setIsDialogFilterOpen] = useState(false)

    const _Tooltip = components.Tooltip ?? Tooltip
    const _ColumnVisibilityBox =
        components.ColumnVisibilityBox ?? ToolbarViewCol
    const _DataFilterBox = components.DataFilterBox ?? DataTableToolbarFilter

    return (
        <VendorToolbar className={classes.root} role="table toolbar">
            <div className={classes.left}>
                {showSearch && (
                    <DataTableToolbarSearch
                        onSearch={handleSearch}
                        onHide={hideSearch}
                    />
                )}

                {datatableRootProps?.title && (
                    <div
                        style={{
                            display: showSearch ? 'none' : undefined
                        }}
                    >
                        {typeof datatableRootProps.title === 'string' && (
                            <Typography variant="h6" component="div">
                                {datatableRootProps.title}
                            </Typography>
                        )}

                        {typeof datatableRootProps.title !== 'string' &&
                            datatableRootProps.title}
                    </div>
                )}
            </div>

            <div className={classes.actions}>
                {!(
                    options.search === false ||
                    options.searchAlwaysOpen === true
                ) && (
                    <_Tooltip
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
                    </_Tooltip>
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
                        <_ColumnVisibilityBox />
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
                        <_DataFilterBox
                            customFooter={options.customFilterDialogFooter}
                            columns={state.columns}
                            filterList={state.filterList}
                            filterData={state.filterData}
                            filterUpdate={props.filterUpdate}
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
    searchText?: string
    tableRef: RefObject<HTMLTableElement | null>
}

const useStyles = tss.withName(ClassName.TOOLBAR).create(({ theme }) => ({
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
