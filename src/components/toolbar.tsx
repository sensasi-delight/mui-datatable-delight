// vendors
import { makeStyles } from 'tss-react/mui'
import React from 'react'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print'
// materials
import {
    IconButton,
    Toolbar as VendorToolbar,
    Tooltip as MuiTooltip,
    Theme,
    Typography
} from '@mui/material'
// material icons
import {
    Search as SearchIcon,
    Download as DownloadIcon,
    Print as PrintIcon,
    ViewColumn as ViewColumnIcon,
    FilterList as FilterIcon
} from '@mui/icons-material'
// locals
import { createCsvDownload } from './toolbar.functions.create-csv-download'
import { DataTableToolbarFilter } from './toolbar.filter'
import Popover from './toolbar.popover'
import TableViewCol from './toolbar.view-col'
import { DataTableToolbarSearch } from './toolbar.search'
import { DataTableOptions } from '../data-table.props.type/options'
import { DataTableState } from '../data-table.props.type/state'
import { useMainContext } from '../hooks/use-main-context'

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
    displayData: DataTableState['displayData']

    options: DataTableOptions

    searchText: string
}

type TEMPORARY_CLASS_PROP_TYPE = ToolbarProps & {
    classes: ReturnType<typeof useStyles>['classes']

    context: ReturnType<typeof useMainContext>
}

class TableToolbarClass extends React.Component<TEMPORARY_CLASS_PROP_TYPE> {
    state = {
        iconActive: null,
        showSearch: Boolean(
            this.props.searchText ||
                this.props.options.searchText ||
                this.props.options.searchOpen ||
                this.props.options.searchAlwaysOpen
        ),
        searchText: this.props.searchText || null
    }

    componentDidUpdate(prevProps: TEMPORARY_CLASS_PROP_TYPE) {
        if (this.props.searchText !== prevProps.searchText) {
            this.setState({ searchText: this.props.searchText })
        }
    }

    handleCSVDownload = () => {
        const { data, displayData, columns, options, columnOrder } = this.props
        let dataToDownload = [] //cloneDeep(data);
        let columnsToDownload = []
        let columnOrderCopy = Array.isArray(columnOrder)
            ? columnOrder.slice(0)
            : []

        if (columnOrderCopy.length === 0) {
            columnOrderCopy = columns.map((item, idx) => idx)
        }

        data.forEach(row => {
            let newRow = { index: row.index, data: [] }
            columnOrderCopy.forEach(idx => {
                newRow.data.push(row.data[idx])
            })
            dataToDownload.push(newRow)
        })

        columnOrderCopy.forEach(idx => {
            columnsToDownload.push(columns[idx])
        })

        if (options.downloadOptions && options.downloadOptions.filterOptions) {
            // check rows first:
            if (options.downloadOptions.filterOptions.useDisplayedRowsOnly) {
                let filteredDataToDownload = displayData.map((row, index) => {
                    let i = -1

                    // Help to preserve sort order in custom render columns
                    row.index = index

                    return {
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
                                          .data[i]
                                    : column
                            val =
                                typeof val === 'function'
                                    ? data.find(d => d.index === row.dataIndex)
                                          .data[i]
                                    : val
                            return val
                        })
                    }
                })

                dataToDownload = []
                filteredDataToDownload.forEach(row => {
                    let newRow = { index: row.index, data: [] }
                    columnOrderCopy.forEach(idx => {
                        newRow.data.push(row.data[idx])
                    })
                    dataToDownload.push(newRow)
                })
            }

            // now, check columns:
            if (options.downloadOptions.filterOptions.useDisplayedColumnsOnly) {
                columnsToDownload = columnsToDownload.filter(
                    _ => _.display === 'true'
                )

                dataToDownload = dataToDownload.map(row => {
                    row.data = row.data.filter(
                        (_, index) =>
                            columns[columnOrderCopy[index]].display === 'true'
                    )
                    return row
                })
            }
        }

        createCsvDownload(columnsToDownload, dataToDownload, options)
    }

    setActiveIcon = iconName => {
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
                    if (this.props.options.onFilterDialogOpen) {
                        this.props.options.onFilterDialogOpen()
                    }
                }
                if (iconActive === undefined && prevIconActive === 'filter') {
                    this.props.setTableAction('onFilterDialogClose')
                    if (this.props.options.onFilterDialogClose) {
                        this.props.options.onFilterDialogClose()
                    }
                }
            }
        )
    }

    isSearchShown = iconName => {
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

    getActiveIcon = (styles, iconName) => {
        let isActive = this.state.iconActive === iconName
        if (iconName === 'search') {
            const { showSearch, searchText } = this.state
            isActive = isActive || showSearch || searchText
        }
        return isActive ? styles.iconActive : styles.icon
    }

    showSearch = () => {
        this.props.setTableAction('onSearchOpen')
        !!this.props.options.onSearchOpen && this.props.options.onSearchOpen()
        return true
    }

    hideSearch = () => {
        const { onSearchClose } = this.props.options

        this.props.setTableAction('onSearchClose')
        if (onSearchClose) onSearchClose()
        this.props.searchClose()

        this.setState(() => ({
            iconActive: null,
            showSearch: false,
            searchText: null
        }))
    }

    handleSearch = value => {
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
            data,
            options,
            classes,
            columns,
            filterData,
            filterList,
            filterUpdate,
            resetFilters,
            toggleViewColumn,
            updateColumns,
            title,
            components = {},
            updateFilterByType
        } = this.props
        const { icons = {} } = components

        const Tooltip = components.Tooltip ?? MuiTooltip
        const TableViewColComponent = components.TableViewCol ?? TableViewCol
        const TableFilterComponent =
            components.TableFilter ?? DataTableToolbarFilter
        const SearchIconComponent = icons.SearchIcon ?? SearchIcon
        const DownloadIconComponent = icons.DownloadIcon ?? DownloadIcon
        const PrintIconComponent = icons.PrintIcon ?? PrintIcon
        const ViewColumnIconComponent = icons.ViewColumnIcon ?? ViewColumnIcon
        const FilterIconComponent = icons.FilterIcon ?? FilterIcon

        const { search, downloadCsv, print, viewColumns, filterTable } =
            this.props.context.textLabels.toolbar
        const { showSearch } = this.state

        const filterPopoverExit = () => {
            this.setState({ hideFilterPopover: false })
            this.setActiveIcon()
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
                                        root: this.getActiveIcon(
                                            classes,
                                            'search'
                                        )
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
                        <Tooltip title={downloadCsv}>
                            <span>
                                <IconButton
                                    data-testid={
                                        downloadCsv.replace(/\s/g, '') +
                                        '-iconButton'
                                    }
                                    aria-label={downloadCsv}
                                    classes={{ root: classes.icon }}
                                    disabled={options.download === 'disabled'}
                                    onClick={this.handleCSVDownload}
                                >
                                    <DownloadIconComponent />
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}

                    {options.print && (
                        <span>
                            <ReactToPrint content={() => this.props.tableRef()}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <span>
                                            <Tooltip title={print}>
                                                <IconButton
                                                    data-testid={
                                                        print + '-iconButton'
                                                    }
                                                    aria-label={print}
                                                    disabled={
                                                        options.print ===
                                                        'disabled'
                                                    }
                                                    onClick={handlePrint}
                                                    classes={{
                                                        root: classes.icon
                                                    }}
                                                >
                                                    <PrintIconComponent />
                                                </IconButton>
                                            </Tooltip>
                                        </span>
                                    )}
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </span>
                    )}

                    {options.viewColumns && (
                        <Popover
                            refExit={this.setActiveIcon.bind(null)}
                            classes={{ closeIcon: classes.filterCloseIcon }}
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
                                            root: this.getActiveIcon(
                                                classes,
                                                'viewcolumns'
                                            )
                                        }}
                                        disabled={
                                            options.viewColumns === 'disabled'
                                        }
                                        onClick={this.setActiveIcon.bind(
                                            null,
                                            'viewcolumns'
                                        )}
                                    >
                                        <ViewColumnIconComponent />
                                    </IconButton>
                                </Tooltip>
                            }
                            content={
                                <TableViewColComponent
                                    data={data}
                                    columns={columns}
                                    options={options}
                                    onColumnUpdate={toggleViewColumn}
                                    updateColumns={updateColumns}
                                    components={components}
                                />
                            }
                        />
                    )}

                    {options.filter && (
                        <Popover
                            refExit={filterPopoverExit}
                            hide={
                                this.state.hideFilterPopover ||
                                options.filter === 'disabled'
                            }
                            classes={{
                                paper: classes.filterPaper,
                                closeIcon: classes.filterCloseIcon
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
                                                root: this.getActiveIcon(
                                                    classes,
                                                    'filter'
                                                )
                                            }}
                                            disabled={
                                                options.filter === 'disabled'
                                            }
                                            onClick={this.setActiveIcon.bind(
                                                null,
                                                'filter'
                                            )}
                                        >
                                            <FilterIconComponent />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            }
                            content={
                                <TableFilterComponent
                                    customFooter={
                                        options.customFilterDialogFooter
                                    }
                                    columns={columns}
                                    options={options}
                                    filterList={filterList}
                                    filterData={filterData}
                                    onFilterUpdate={filterUpdate}
                                    onFilterReset={resetFilters}
                                    handleClose={closeFilterPopover}
                                    updateFilterByType={updateFilterByType}
                                    components={components}
                                />
                            }
                        />
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
    filterCloseIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100
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
