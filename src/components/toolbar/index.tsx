'use client'

// vendors
import { tss } from 'tss-react/mui'
import { type ReactNode, useState } from 'react'
// materials
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
// global enums
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'
// sub-components
import type { FilterUpdateType } from '@src/types/filter-update'
import { DataTableToolbarSearch } from './components/search-text-field'
import { ToolbarPopover } from './components/popover'
import { ToolbarPrintButton } from './components/print-button'
import { ToolbarDownloadButton } from './components/download-button'
import ColumnVisibilitiesBox from './components/column-visibilities-box'
import DataFilterBox from './components/data-filter-box'

/**
 * Toolbar component.
 *
 * @category  Component
 *
 * @see  {@link http://mui-datatable-delight.vercel.app/examples/customize-toolbar | Customize Toolbar Example}.
 */
export default function Toolbar(props: ToolbarProps): ReactNode {
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
        Boolean(state.searchText ?? options.searchText) ||
            Boolean(options.searchOpen) ||
            Boolean(options.searchAlwaysOpen)
    )

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

    function hideSearch() {
        onAction?.(TableAction.ON_SEARCH_CLOSE, {})
        options?.onSearchClose?.()
        searchClose()

        setActiveIcon(undefined)
        setShowSearch(false)
    }

    function getIconClasses(
        iconName: 'search' | 'filter' | 'viewColumns' | undefined
    ) {
        const isActive =
            iconName === 'search'
                ? Boolean(showSearch || state.searchText)
                : activeIcon === iconName

        return isActive ? classes.iconActive : classes.icon
    }

    function handleSearchIconClick() {
        if (showSearch && !state.searchText) {
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
            if (state.searchText) {
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

        const newSearchText = ''

        if (!setState) {
            throw new Error('setState is not defined')
        }

        onAction?.(TableAction.SEARCH, {
            searchText: newSearchText,
            displayData: options.serverSide
                ? prevState.displayData
                : getDisplayData(
                      prevState.columns,
                      prevState.data,
                      prevState.filterList,
                      '',
                      undefined,
                      datatableRootProps,
                      prevState,
                      options,
                      setState
                  )
        })

        options.onSearchChange?.(newSearchText)
    }

    const [isDialogFilterOpen, setIsDialogFilterOpen] = useState(false)

    const _Tooltip = components.Tooltip ?? Tooltip
    const _ColumnVisibilityBox =
        components.ColumnVisibilitiesBox ?? ColumnVisibilitiesBox
    const _DataFilterBox = components.DataFilterBox ?? DataFilterBox

    return (
        <Box className={classes.root} role="table toolbar">
            <div className={classes.left}>
                {showSearch && <DataTableToolbarSearch onHide={hideSearch} />}

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

                {options.print && <ToolbarPrintButton />}

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
                            filterUpdate={props.filterUpdate}
                            handleClose={() => {
                                setIsDialogFilterOpen(false)
                            }}
                        />
                    </ToolbarPopover>
                )}

                {options.customToolbar?.({
                    displayData: state.displayData
                })}
            </div>
        </Box>
    )
}

interface ToolbarProps {
    filterUpdate: FilterUpdateType
}

const useStyles = tss.withName(ClassName.TOOLBAR).create(({ theme }) => ({
    actions: {
        display: 'flex'
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '24px',
        paddingRight: '16px',

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
