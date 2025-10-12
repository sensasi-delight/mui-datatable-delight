'use client'

// materials
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// global enums
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// sub-components
import type { FilterUpdateType } from '@src/types/filter-update'
import { type ReactNode, useState } from 'react'
// vendors
import ColumnVisibilitiesBox from './components/column-visibilities-box'
import DataFilterBox from './components/data-filter-box'
import { ToolbarDownloadButton } from './components/download-button'
import { ToolbarPopover } from './components/popover'
import { ToolbarPrintButton } from './components/print-button'
import { DataTableToolbarSearch } from './components/search-text-field'

/**
 * Toolbar component.
 *
 * @category  Component
 *
 * @see  {@link http://mui-datatable-delight.vercel.app/examples/customize-toolbar | Customize Toolbar Example}.
 */
export default function Toolbar<T>(props: ToolbarProps<T>): ReactNode {
    const {
        components,
        icons,
        options,
        onAction,
        props: datatableRootProps,
        state,
        textLabels: { toolbar: toolbarTextLabels },
        updateCellValueRef
    } = useDataTableContext()

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

    function getIconSx(
        iconName: 'search' | 'filter' | 'viewColumns' | undefined
    ) {
        const isActive =
            iconName === 'search'
                ? Boolean(showSearch || state.searchText)
                : activeIcon === iconName

        return isActive
            ? {
                  color: 'var(--mui-palette-primary-main)'
              }
            : {
                  '&:hover': {
                      color: 'var(--mui-palette-primary-main)'
                  }
              }
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

        onAction?.(TableAction.SEARCH, {
            displayData: options.serverSide
                ? prevState.displayData
                : getDisplayData(
                      prevState.columns,
                      prevState.data,
                      prevState.filterList,
                      '',
                      prevState,
                      options,
                      updateCellValueRef
                  ),
            searchText: newSearchText
        })

        options.onSearchChange?.(newSearchText)
    }

    const [isDialogFilterOpen, setIsDialogFilterOpen] = useState(false)

    const _Tooltip = components.Tooltip ?? Tooltip
    const _ColumnVisibilityBox =
        components.ColumnVisibilitiesBox ?? ColumnVisibilitiesBox
    const _DataFilterBox = components.DataFilterBox ?? DataFilterBox

    if (
        !datatableRootProps?.title &&
        !showSearch &&
        !options.viewColumns &&
        !options.filter &&
        !options.download &&
        !options.print
    ) {
        return <></>
    }

    return (
        <Box
            className={ClassName.TOOLBAR}
            role="table toolbar"
            sx={{
                '@media print': {
                    display: 'none !important'
                },
                alignItems: 'center',
                display: 'flex',
                overflowX: 'auto',
                paddingBottom: '12px',
                paddingLeft: '24px',
                paddingRight: '16px',
                paddingTop: '12px'
            }}
        >
            <div
                style={{
                    flex: '1 1 auto',
                    minWidth: '16em'
                }}
            >
                {showSearch && <DataTableToolbarSearch onHide={hideSearch} />}

                {datatableRootProps?.title && (
                    <div
                        style={{
                            display: showSearch ? 'none' : undefined
                        }}
                    >
                        {typeof datatableRootProps.title === 'string' && (
                            <Typography component="div" variant="h6">
                                {datatableRootProps.title}
                            </Typography>
                        )}

                        {typeof datatableRootProps.title !== 'string' &&
                            datatableRootProps.title}
                    </div>
                )}
            </div>

            <div
                style={{
                    display: 'flex'
                }}
            >
                {!(
                    options.search === false ||
                    options.searchAlwaysOpen === true
                ) && (
                    <_Tooltip
                        disableFocusListener
                        title={toolbarTextLabels.search}
                    >
                        <span>
                            <IconButton
                                disabled={options.search === 'disabled'}
                                onClick={handleSearchIconClick}
                                sx={getIconSx('search')}
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
                            disabled: options.viewColumns === 'disabled',
                            onClick: () => setActiveIcon('viewColumns'),
                            sx: getIconSx('viewColumns')
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
                            disabled: options.filter === 'disabled',
                            onClick: () => setActiveIcon('filter'),
                            sx: getIconSx('filter')
                        }}
                        onPopoverExited={() => {
                            setIsDialogFilterOpen(false)
                            setActiveIcon(undefined)
                        }}
                        slotProps={{
                            paper: {
                                sx: theme => ({
                                    [theme.breakpoints.up('sm')]: {
                                        maxWidth: '50%'
                                    }
                                })
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

export interface ToolbarProps<T> {
    filterUpdate: FilterUpdateType<T>
}
