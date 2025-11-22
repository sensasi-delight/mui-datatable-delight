'use client'

import Paper, { type PaperProps } from '@mui/material/Paper'
// vendors
// components
import AnnounceText from './components/announce-text'
import BottomBar from './components/bottom-bar'
import FilteredValuesList from './components/filtered-values-list'
import SelectedRowsToolbar from './components/selected-rows-toolbar'
import Table from './components/table'
import Toolbar from './components/toolbar'
// locals
import type { DataTableProps } from './data-table.props'
// enums
import ClassName from './enums/class-name'
import { hasToolbarItem } from './functions/has-toolbar-item'
// hooks
import useDataTableContext from './hooks/use-data-table-context'
import DataTableContextProvider from './hooks/use-data-table-context/components/provider'
import { useFilterUpdate } from './hooks/use-filter-update'
import { useRowSelection } from './hooks/use-row-selection'
import SELECT_TOOLBAR_PLACEMENT from './statics/select-toolbar-placement'
import type { DefaultRow } from './types/default-row'

/**
 * A responsive DataTable component built with `@mui/material` for React-based project.
 *
 * @category  Component
 *
 * @see  https://mui-datatable-delight.vercel.app
 */
export function DataTable<Row = DefaultRow>({
    className,
    ref,
    paperProps,
    ...props
}: DataTableProps<Row>): React.ReactNode {
    return (
        <DataTableContextProvider datatableProps={props}>
            <DataTable_
                className={`${ClassName.ROOT} ${className}`}
                paperProps={paperProps}
                ref={ref}
            />
        </DataTableContextProvider>
    )
}

function DataTable_<T>({
    className,
    ref,
    paperProps
}: {
    className?: string
    ref: PaperProps['ref']
    paperProps?: PaperProps
}): React.ReactNode {
    const { components, options, state } = useDataTableContext<T>()

    const filterUpdate = useFilterUpdate<T>()
    const selectRowUpdate = useRowSelection<T>()

    const isShowToolbarSelect =
        options.selectToolbarPlacement === SELECT_TOOLBAR_PLACEMENT.ALWAYS ||
        (state.selectedRows.data.length > 0 &&
            options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.NONE)

    const isShowToolbar =
        !isShowToolbarSelect &&
        hasToolbarItem(options) &&
        options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.ABOVE &&
        options.selectToolbarPlacement !== SELECT_TOOLBAR_PLACEMENT.NONE

    // ####### COMPONENT HANDLER ###########
    const HandleSelectedRowsToolbar =
        components.SelectedRowsToolbar ?? SelectedRowsToolbar
    const HandleToolbar = components.Toolbar ?? Toolbar
    const HandleFilteredValuesList =
        components.FilteredValuesList ?? FilteredValuesList
    const HandleBottomBar = components.BottomBar ?? BottomBar

    return (
        <Paper
            className={className}
            elevation={options?.elevation}
            ref={ref}
            sx={{
                '& .datatables-noprint': {
                    '@media print': {
                        display: 'none'
                    }
                },
                isolation: 'isolate'
            }}
            {...paperProps}
        >
            {isShowToolbarSelect && (
                <HandleSelectedRowsToolbar selectRowUpdate={selectRowUpdate} />
            )}

            {isShowToolbar && <HandleToolbar filterUpdate={filterUpdate} />}

            <HandleFilteredValuesList filterUpdate={filterUpdate} />

            <div
                style={{
                    height: options.tableBodyHeight,
                    maxHeight: options.tableBodyMaxHeight,
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                <Table selectRowUpdate={selectRowUpdate} />
            </div>

            <HandleBottomBar />

            <AnnounceText />
        </Paper>
    )
}
