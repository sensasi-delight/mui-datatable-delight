// vendors
import { makeStyles } from 'tss-react/mui'
import React, { type RefObject } from 'react'
// materials
import {
    IconButton,
    Toolbar as VendorToolbar,
    Theme,
    Typography
} from '@mui/material'
// locals
import {
    DataTableToolbarFilter,
    DataTableToolbarFilterProps
} from './toolbar.filter'
import { DataTableToolbarSearch } from './toolbar.search'
import { DataTableOptions, TableAction } from '../data-table.props.type/options'
import { useMainContext } from '../hooks/use-main-context'
// internals
import { ToolbarPopover } from './toolbar.popover'
import { ToolbarPrintButton } from './toolbar.print-button'
import { ToolbarDownloadButton } from './toolbar.download-button'
import { ToolbarViewColProps } from './toolbar.view-col'
import { ClassName } from '../enums/class-name'

/**
 * DataTable Delight Toolbar
 *
 * @todo rename this to `<Toolbar />
 * @todo use named export instead default
 *
 * @see {@link http://mui-datatable-delight.vercel.app/examples/customize-toolbar|Customize Toolbar Example}.
 */
export default function TableToolbar(props: ToolbarProps) {
    const context = useMainContext()
    const { classes } = useStyles()

    return (
        <VendorToolbar
            className={classes.root}
            role="toolbar"
            aria-label="Table Toolbar"
        >
            <TableToolbarClass {...props} classes={classes} context={context} />
        </VendorToolbar>
    )
}

interface ToolbarProps {
    filterUpdate: DataTableToolbarFilterProps['onFilterUpdate']
    options: DataTableOptions
    resetFilters: DataTableToolbarFilterProps['onFilterReset']
    searchClose: () => void
    searchText: string
    searchTextUpdate: (searchText: string) => void
    setTableAction: (action: TableAction) => void
    tableRef: RefObject<HTMLTableElement>
    title: string
    toggleViewColumn: ToolbarViewColProps['onColumnUpdate']
    updateFilterByType: DataTableToolbarFilterProps['updateFilterByType']
}

type TEMPORARY_CLASS_PROP_TYPE = ToolbarProps & {
    classes: ReturnType<typeof useStyles>['classes']

    context: ReturnType<typeof useMainContext>
}

class TableToolbarClass extends React.Component<
    TEMPORARY_CLASS_PROP_TYPE,
    {
        iconActive: null | 'search' | 'filter' | 'viewColumns'
        showSearch: boolean
        searchText: null | string
        prevIconActive: null | string
        hideFilterPopover: boolean
    }
> {
    state = {
        iconActive: null,
        showSearch: Boolean(
            this.props.searchText ||
                this.props.options.searchText ||
                this.props.options.searchOpen ||
                this.props.options.searchAlwaysOpen
        ),
        searchText: this.props.searchText || null,
        prevIconActive: null,
        hideFilterPopover: false
    }

    componentDidUpdate(prevProps: TEMPORARY_CLASS_PROP_TYPE) {
        if (this.props.searchText !== prevProps.searchText) {
            this.setState({ searchText: this.props.searchText })
        }
    }

    setActiveIcon = (iconName: 'search' | 'filter' | 'viewColumns' | null) => {
        this.setState(
            prevState => ({
                showSearch: this.isSearchShown(iconName),
                iconActive: iconName,
                prevIconActive: prevState.iconActive
            }),
            () => {
                const { iconActive, prevIconActive } = this.state

                if (iconActive === 'filter') {
                    this.props.setTableAction(TableAction.ON_FILTER_DIALOG_OPEN)
                    this.props.options.onFilterDialogOpen?.()
                }

                if (iconActive === null && prevIconActive === 'filter') {
                    this.props.setTableAction(
                        TableAction.ON_FILTER_DIALOG_CLOSE
                    )
                    this.props.options.onFilterDialogClose?.()
                }
            }
        )
    }

    isSearchShown = (iconName: 'search' | 'filter' | 'viewColumns' | null) => {
        if (this.props.options.searchAlwaysOpen) {
            return true
        }

        let nextVal = false

        if (this.state.showSearch) {
            if (this.state.searchText) {
                nextVal = true
            } else {
                const { onSearchClose } = this.props.options
                this.props.setTableAction(TableAction.ON_SEARCH_CLOSE)
                if (onSearchClose) onSearchClose()
                nextVal = false
            }
        } else if (iconName === 'search') {
            nextVal = this.showSearch()
        }

        return nextVal
    }

    getIconClasses = (
        iconName: 'search' | 'filter' | 'viewColumns' | undefined
    ) => {
        let isActive = this.state.iconActive === iconName

        if (iconName === 'search') {
            const { showSearch, searchText } = this.state

            isActive = Boolean(isActive || showSearch || searchText)
        }

        return isActive
            ? this.props.classes.iconActive
            : this.props.classes.icon
    }

    showSearch = () => {
        this.props.setTableAction(TableAction.ON_SEARCH_OPEN)
        !!this.props.options.onSearchOpen && this.props.options.onSearchOpen()
        return true
    }

    hideSearch = () => {
        this.props.setTableAction(TableAction.ON_SEARCH_CLOSE)

        this.props.options?.onSearchClose?.()

        this.props.searchClose()

        this.setState(() => ({
            iconActive: null,
            showSearch: false,
            searchText: null
        }))
    }

    handleSearch = (value: string) => {
        this.setState({ searchText: value })
        this.props.searchTextUpdate(value)
    }

    handleSearchIconClick = () => {
        const { showSearch, searchText } = this.state
        if (showSearch && !searchText) {
            this.hideSearch()
        } else {
            this.setActiveIcon('search')
        }
    }

    render() {
        const {
            options,
            classes,
            filterUpdate,
            resetFilters,
            toggleViewColumn,
            title,
            updateFilterByType
        } = this.props

        const {
            components,
            icons,
            state: { columns, filterData, filterList }
        } = this.props.context

        /**
         * @todo REMOVE THIS COMPONENT VARIABLES
         */
        const Tooltip = components.Tooltip
        const TableFilterComponent =
            components.TableFilter ?? DataTableToolbarFilter
        const SearchIconComponent = icons.SearchIcon
        const ViewColumnIconComponent = icons.ViewColumnIcon
        const FilterIconComponent = icons.FilterIcon

        const { search, viewColumns, filterTable } =
            this.props.context.textLabels.toolbar
        const { showSearch } = this.state

        const filterPopoverExit = () => {
            this.setState({ hideFilterPopover: false })
            this.setActiveIcon(null)
        }

        const closeFilterPopover = () => {
            this.setState({ hideFilterPopover: true })
        }

        return (
            <>
                <div className={classes.left}>
                    {showSearch && (
                        <DataTableToolbarSearch
                            onSearch={this.handleSearch}
                            onHide={this.hideSearch}
                            options={options}
                        />
                    )}

                    <div
                        style={{
                            display: showSearch ? 'none' : undefined
                        }}
                    >
                        {title === 'string' ? (
                            <Typography variant="h6" component="div">
                                {title}
                            </Typography>
                        ) : (
                            title
                        )}
                    </div>
                </div>

                <div className={classes.actions}>
                    {!(
                        options.search === false ||
                        options.searchAlwaysOpen === true
                    ) && (
                        <Tooltip title={search} disableFocusListener>
                            <span>
                                <IconButton
                                    aria-label={search}
                                    data-testid={search + '-iconButton'}
                                    classes={{
                                        root: this.getIconClasses('search')
                                    }}
                                    disabled={options.search === 'disabled'}
                                    onClick={this.handleSearchIconClick}
                                >
                                    <SearchIconComponent />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}

                    {options.download && (
                        <ToolbarDownloadButton options={options} />
                    )}

                    {options.print && (
                        <ToolbarPrintButton
                            options={options}
                            printContent={this.props.tableRef}
                        />
                    )}

                    {options.viewColumns && (
                        <ToolbarPopover
                            refExit={() => this.setActiveIcon(null)}
                            hide={options.viewColumns === 'disabled'}
                            title={viewColumns}
                            iconButtonProps={{
                                children: <ViewColumnIconComponent />,
                                classes: {
                                    root: this.getIconClasses('viewColumns')
                                },
                                disabled: options.viewColumns === 'disabled',
                                onClick: () => this.setActiveIcon('viewColumns')
                            }}
                        >
                            <components.TableViewCol
                                // data={data}
                                columns={columns}
                                // options={options}
                                onColumnUpdate={toggleViewColumn}
                                // updateColumns={updateColumns}
                            />
                        </ToolbarPopover>
                    )}

                    {options.filter && (
                        <ToolbarPopover
                            refExit={filterPopoverExit}
                            hide={
                                this.state.hideFilterPopover ||
                                options.filter === 'disabled'
                            }
                            slotProps={{
                                paper: {
                                    className: classes.filterPaper
                                }
                            }}
                            title={filterTable}
                            iconButtonProps={{
                                children: <FilterIconComponent />,
                                classes: {
                                    root: this.getIconClasses('filter')
                                },
                                disabled: options.filter === 'disabled',
                                onClick: () => this.setActiveIcon('filter')
                            }}
                        >
                            <TableFilterComponent
                                customFooter={options.customFilterDialogFooter}
                                columns={columns}
                                options={options}
                                filterList={filterList}
                                filterData={filterData}
                                onFilterUpdate={filterUpdate}
                                onFilterReset={resetFilters}
                                handleClose={closeFilterPopover}
                                updateFilterByType={updateFilterByType}
                            />
                        </ToolbarPopover>
                    )}

                    {options.customToolbar &&
                        options.customToolbar({
                            displayData: this.props.context.state.displayData
                        })}
                </div>
            </>
        )
    }
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
