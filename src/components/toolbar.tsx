// vendors
import { makeStyles } from 'tss-react/mui'
import React from 'react'
// materials
import {
    IconButton,
    Toolbar as VendorToolbar,
    Theme,
    Typography
} from '@mui/material'
// locals
import { createCsvDownload } from './toolbar.functions.create-csv-download'
import {
    DataTableToolbarFilter,
    DataTableToolbarFilterProps
} from './toolbar.filter'
import { DataTableToolbarSearch } from './toolbar.search'
import { DataTableOptions } from '../data-table.props.type/options'
import { DataTableState } from '../data-table.props.type/state'
import { useMainContext } from '../hooks/use-main-context'
// internals
import { ToolbarPopover } from './toolbar.popover'
import { ToolbarPrintButton } from './toolbar.print-button'
import { ToolbarDownloadButton } from './toolbar.download-button'
import { ToolbarViewColProps } from './toolbar.view-col'

const CLASS_ID = 'datatable-delight--toolbar'

const RESPONSIVE_FULL_WIDTH_NAME = 'scrollFullHeightFullWidth'

/**
 * DataTable Delight Toolbar
 *
 * @todo rename this to `<Toolbar />
 * @todo use named export instead default
 *
 * @see [Customize Example](http://mui-datatable-delight.vercel.app/examples/customize-toolbar)
 * @see [Customize Icons Example](http://mui-datatable-delight.vercel.app/examples/customize-toolbar)
 */
export default function TableToolbar(props: ToolbarProps) {
    const context = useMainContext()
    const { classes, cx } = useStyles()

    return (
        <VendorToolbar
            className={cx(
                CLASS_ID,
                props.options.responsive !== RESPONSIVE_FULL_WIDTH_NAME
                    ? classes.root
                    : classes.fullWidthRoot
            )}
            role="toolbar"
            aria-label="Table Toolbar"
        >
            <TableToolbarClass {...props} classes={classes} context={context} />
        </VendorToolbar>
    )
}

interface ToolbarProps {
    data: DataTableState['data']
    columns: DataTableState['columns']
    columnOrder: DataTableState['columnOrder']
    displayData: DataTableState['displayData']
    options: DataTableOptions
    searchText: string
    tableRef: () => HTMLElement
    setTableAction: (action: string) => void
    searchTextUpdate: (searchText: string) => void
    searchClose: () => void

    filterData: DataTableState['filterData']
    filterList: DataTableState['filterList']
    filterUpdate: DataTableToolbarFilterProps['onFilterUpdate']
    resetFilters: DataTableToolbarFilterProps['onFilterReset']
    toggleViewColumn: ToolbarViewColProps['onColumnUpdate']
    title: string
    updateFilterByType: DataTableToolbarFilterProps['updateFilterByType']
}

type TEMPORARY_CLASS_PROP_TYPE = ToolbarProps & {
    classes: ReturnType<typeof useStyles>['classes']

    context: ReturnType<typeof useMainContext>
}

class TableToolbarClass extends React.Component<
    TEMPORARY_CLASS_PROP_TYPE,
    {
        iconActive: null | 'search' | 'filter' | 'viewcolumns'
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
        hideFilterPopover: true
    }

    componentDidUpdate(prevProps: TEMPORARY_CLASS_PROP_TYPE) {
        if (this.props.searchText !== prevProps.searchText) {
            this.setState({ searchText: this.props.searchText })
        }
    }

    /**
     * @todo MOVE THIS TO <ToolbarDownloadButton />
     */
    handleCSVDownload = () => {
        const { data, displayData, columns, options, columnOrder } = this.props

        const columnOrderCopy = Array.isArray(columnOrder)
            ? columnOrder.slice(0).map((_, idx) => idx)
            : []

        let columnsToDownload = columnOrderCopy.map(idx => columns[idx])
        let dataToDownload = data.map(row => ({
            index: row.index,
            data: columnOrderCopy.map(idx => row.data[idx])
        }))

        // check rows first:
        if (options.downloadOptions?.filterOptions?.useDisplayedRowsOnly) {
            const filteredDataToDownload = displayData.map((row, index) => {
                let i = -1

                return {
                    index, // Help to preserve sort order in custom render columns
                    data: row.data.map(column => {
                        i += 1

                        /**
                         * if we have a custom render, which will appear as a react element, we must grab the actual value from data that matches the dataIndex and column
                         * @todo Create a utility function for checking whether or not something is a react object
                         */
                        let val =
                            typeof column === 'object' &&
                            column !== null &&
                            !Array.isArray(column)
                                ? data.find(d => d.index === row.dataIndex)
                                      ?.data[i]
                                : column

                        val =
                            typeof val === 'function'
                                ? data.find(d => d.index === row.dataIndex)
                                      ?.data[i]
                                : val

                        return val
                    })
                }
            })

            dataToDownload = filteredDataToDownload.map(row => ({
                index: row.index,
                data: columnOrderCopy.map(idx => row.data[idx])
            }))
        }

        // now, check columns:
        if (options.downloadOptions?.filterOptions?.useDisplayedColumnsOnly) {
            columnsToDownload = columnsToDownload.filter(
                column => column.display === 'true'
            )

            dataToDownload = dataToDownload.map(row => {
                row.data = row.data.filter(
                    (_, index) =>
                        columns[columnOrderCopy[index]].display === 'true'
                )
                return row
            })
        }

        createCsvDownload(columnsToDownload, dataToDownload, options)
    }

    setActiveIcon = (iconName: 'search' | 'filter' | 'viewcolumns' | null) => {
        this.setState(
            prevState => ({
                showSearch: this.isSearchShown(iconName),
                iconActive: iconName,
                prevIconActive: prevState.iconActive
            }),
            () => {
                const { iconActive, prevIconActive } = this.state

                if (iconActive === 'filter') {
                    this.props.setTableAction('onFilterDialogOpen')
                    this.props.options.onFilterDialogOpen?.()
                }

                if (iconActive === null && prevIconActive === 'filter') {
                    this.props.setTableAction('onFilterDialogClose')
                    this.props.options.onFilterDialogClose?.()
                }
            }
        )
    }

    isSearchShown = (iconName: 'search' | 'filter' | 'viewcolumns' | null) => {
        if (this.props.options.searchAlwaysOpen) {
            return true
        }

        let nextVal = false

        if (this.state.showSearch) {
            if (this.state.searchText) {
                nextVal = true
            } else {
                const { onSearchClose } = this.props.options
                this.props.setTableAction('onSearchClose')
                if (onSearchClose) onSearchClose()
                nextVal = false
            }
        } else if (iconName === 'search') {
            nextVal = this.showSearch()
        }

        return nextVal
    }

    getIconClasses = (
        iconName: 'search' | 'filter' | 'viewcolumns' | undefined
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
        this.props.setTableAction('onSearchOpen')
        !!this.props.options.onSearchOpen && this.props.options.onSearchOpen()
        return true
    }

    hideSearch = () => {
        this.props.setTableAction('onSearchClose')

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
            columns,
            filterData,
            filterList,
            filterUpdate,
            resetFilters,
            toggleViewColumn,
            title,
            updateFilterByType
        } = this.props

        const { components, icons } = this.props.context

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
                <div
                    className={
                        options.responsive !== RESPONSIVE_FULL_WIDTH_NAME
                            ? classes.left
                            : classes.fullWidthLeft
                    }
                >
                    {showSearch ? (
                        <DataTableToolbarSearch
                            onSearch={this.handleSearch}
                            onHide={this.hideSearch}
                            options={options}
                        />
                    ) : typeof title !== 'string' ? (
                        title
                    ) : (
                        <div className={classes.titleRoot} aria-hidden="true">
                            <Typography
                                variant="h6"
                                className={
                                    options.responsive !==
                                    RESPONSIVE_FULL_WIDTH_NAME
                                        ? classes.titleText
                                        : classes.fullWidthTitleText
                                }
                            >
                                {title}
                            </Typography>
                        </div>
                    )}
                </div>

                <div
                    className={
                        options.responsive !== RESPONSIVE_FULL_WIDTH_NAME
                            ? classes.actions
                            : classes.fullWidthActions
                    }
                >
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
                        <ToolbarDownloadButton
                            options={options}
                            onDownload={this.handleCSVDownload}
                        />
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
                            trigger={
                                <Tooltip
                                    title={viewColumns}
                                    disableFocusListener
                                >
                                    <IconButton
                                        data-testid={
                                            viewColumns + '-iconButton'
                                        }
                                        aria-label={viewColumns}
                                        classes={{
                                            root: this.getIconClasses(
                                                'viewcolumns'
                                            )
                                        }}
                                        disabled={
                                            options.viewColumns === 'disabled'
                                        }
                                        onClick={() =>
                                            this.setActiveIcon('viewcolumns')
                                        }
                                    >
                                        <ViewColumnIconComponent />
                                    </IconButton>
                                </Tooltip>
                            }
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
                            trigger={
                                <Tooltip
                                    title={filterTable}
                                    disableFocusListener
                                >
                                    <span>
                                        <IconButton
                                            data-testid={
                                                filterTable + '-iconButton'
                                            }
                                            aria-label={filterTable}
                                            classes={{
                                                root: this.getIconClasses(
                                                    'filter'
                                                )
                                            }}
                                            disabled={
                                                options.filter === 'disabled'
                                            }
                                            onClick={() =>
                                                this.setActiveIcon('filter')
                                            }
                                        >
                                            <FilterIconComponent />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            }
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
                            displayData: this.props.displayData
                        })}
                </div>
            </>
        )
    }
}

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        '@media print': {
            display: 'none'
        }
    },
    fullWidthRoot: {},
    left: {
        flex: '1 1 auto'
    },
    fullWidthLeft: {
        flex: '1 1 auto'
    },
    actions: {
        flex: '1 1 auto',
        textAlign: 'right'
    },
    fullWidthActions: {
        flex: '1 1 auto',
        textAlign: 'right'
    },
    titleRoot: {},
    titleText: {},
    fullWidthTitleText: {
        textAlign: 'left'
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
        maxWidth: '50%'
    },
    searchIcon: {
        display: 'inline-flex',
        marginTop: '10px',
        marginRight: '8px'
    },
    // [theme.breakpoints.down('md')]: {
    //     titleRoot: {},
    //     titleText: {
    //         fontSize: '16px'
    //     },
    //     spacer: {
    //         display: 'none'
    //     },
    //     left: {
    //         // flex: "1 1 40%",
    //         padding: '8px 0px'
    //     },
    //     actions: {
    //         // flex: "1 1 60%",
    //         textAlign: 'right'
    //     }
    // },
    // [theme.breakpoints.down('sm')]: {
    //     root: {
    //         display: 'block',
    //         '@media print': {
    //             display: 'none !important'
    //         }
    //     },
    //     left: {
    //         padding: '8px 0px 0px 0px'
    //     },
    //     titleText: {
    //         textAlign: 'center'
    //     },
    //     actions: {
    //         textAlign: 'center'
    //     }
    // },
    '@media screen and (max-width: 480px)': {}
}))
