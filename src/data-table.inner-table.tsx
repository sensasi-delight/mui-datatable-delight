import { DndProvider } from 'react-dnd'
import { Table as MuiTable } from '@mui/material'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useMainContext } from './hooks/use-main-context'
import { DataTableOptions } from './data-table.props.type/options'
import { makeStyles } from 'tss-react/mui'

export function InnerTable({
    // new this
    forwardUpdateDividers,
    forwardSetHeadResizable,
    // this sections
    tableRef,
    selectRowUpdate,
    toggleSortColumn,
    setHeadCellRef,
    areAllRowsExpanded,
    toggleAllExpandableRows,
    updateColumnOrder,
    draggableHeadCellRefs,
    getCurrentRootRef,
    timers,
    toggleExpandRow
}: {
    // new this
    forwardUpdateDividers: (fn: () => void) => void
    forwardSetHeadResizable: (fn: () => void) => void
    // this
    tableRef: React.Ref<HTMLTableElement>
    selectRowUpdate: unknown
    toggleSortColumn: unknown
    setHeadCellRef: unknown
    areAllRowsExpanded: unknown
    toggleAllExpandableRows: unknown
    updateColumnOrder: unknown
    draggableHeadCellRefs: HTMLTableCellElement[]
    getCurrentRootRef: unknown
    timers: unknown
    toggleExpandRow: unknown
}) {
    const { classes, cx } = useStyles()
    const {
        components,
        options,
        props: datatableRootProps,
        state
    } = useMainContext()

    const { tableHeightVal, responsiveClass } =
        getTableHeightAndResponsiveClasses(options, classes)

    const tableProps = options.setTableProps?.() ?? {}

    return (
        <div
            style={{ position: 'relative', ...tableHeightVal }}
            className={responsiveClass}
        >
            {options.resizableColumns && (
                <components.TableResize
                    updateDividers={forwardUpdateDividers}
                    // @ts-expect-error WILL FIX THIS LATER
                    setResizable={forwardSetHeadResizable}
                />
            )}

            {/* @ts-expect-error WILL FIX THIS LATER */}
            <DndProvider
                backend={HTML5Backend}
                context={typeof window === 'undefined' ? undefined : window}
            >
                <MuiTable
                    ref={tableRef}
                    tabIndex={0}
                    role="grid"
                    {...tableProps}
                    className={cx(classes.tableRoot, tableProps.className)}
                >
                    {datatableRootProps?.title && (
                        <caption
                            style={{
                                position: 'absolute',
                                left: '-3000px'
                            }}
                        >
                            {datatableRootProps.title}
                        </caption>
                    )}

                    <components.TableHead
                        columns={state.columns}
                        // @ts-expect-error WILL FIX THIS LATER
                        activeColumn={state.activeColumn}
                        data={state.displayData}
                        count={state.count}
                        page={state.page}
                        rowsPerPage={state.rowsPerPage}
                        selectedRows={state.selectedRows}
                        selectRowUpdate={selectRowUpdate}
                        toggleSort={toggleSortColumn}
                        setCellRef={setHeadCellRef}
                        expandedRows={state.expandedRows}
                        areAllRowsExpanded={areAllRowsExpanded}
                        toggleAllExpandableRows={toggleAllExpandableRows}
                        sortOrder={state.sortOrder}
                        columnOrder={state.columnOrder}
                        updateColumnOrder={updateColumnOrder}
                        draggableHeadCellRefs={draggableHeadCellRefs}
                        tableRef={getCurrentRootRef}
                        timers={timers}
                    />

                    <components.TableBody
                        data={state.displayData}
                        count={state.count}
                        columns={state.columns}
                        page={state.page}
                        rowsPerPage={state.rowsPerPage}
                        selectedRows={state.selectedRows}
                        // @ts-expect-error WILL FIX THIS LATER
                        selectRowUpdate={selectRowUpdate}
                        previousSelectedRow={state.previousSelectedRow}
                        // @ts-expect-error WILL FIX THIS LATER
                        expandedRows={state.expandedRows}
                        // @ts-expect-error WILL FIX THIS LATER
                        toggleExpandRow={toggleExpandRow}
                        columnOrder={state.columnOrder}
                        filterList={state.filterList}
                    />

                    {options.customTableBodyFooterRender?.({
                        data: state.displayData,
                        count: state.count,
                        columns: state.columns,
                        selectedRows: state.selectedRows,
                        // @ts-expect-error WILL FIX THIS LATER
                        selectableRows: options.selectableRows
                    })}
                </MuiTable>
            </DndProvider>
        </div>
    )
}

function getTableHeightAndResponsiveClasses(
    options: DataTableOptions,
    classes: ReturnType<typeof useStyles>['classes']
) {
    const responsiveOption = options.responsive

    let maxHeight = options.tableBodyMaxHeight
    let responsiveClass

    switch (responsiveOption) {
        // deprecated
        case 'scroll':
            responsiveClass = classes.responsiveScroll
            maxHeight = '499px'
            break
        // deprecated
        case 'scrollMaxHeight':
            responsiveClass = classes.responsiveScrollMaxHeight
            maxHeight = '499px'
            break
        // deprecated
        case 'scrollFullHeight':
            responsiveClass = classes.responsiveScrollFullHeight
            maxHeight = 'none'
            break
        // deprecated
        case 'scrollFullHeightFullWidth':
            responsiveClass = classes.responsiveScrollFullHeight
            break
        // deprecated
        case 'stacked':
            responsiveClass = classes.responsiveStacked
            maxHeight = 'none'
            break
        // deprecated
        case 'stackedFullWidth':
            responsiveClass = classes.responsiveStackedFullWidth
            maxHeight = 'none'
            break

        default:
            responsiveClass = classes.responsiveBase
            break
    }

    const tableHeightVal = {
        maxHeight: maxHeight,
        height: options.tableBodyHeight
    }

    return {
        tableHeightVal,
        responsiveClass
    }
}

const useStyles = makeStyles({
    name: 'datatable-delight'
})(theme => ({
    tableRoot: {
        outline: 'none'
    },

    responsiveBase: {
        overflow: 'auto',
        '@media print': {
            height: 'auto !important'
        }
    },

    // deprecated, but continuing support through v3.x
    responsiveScroll: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollMaxHeight: {
        overflow: 'auto',
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveScrollFullHeight: {
        height: '100%'
    },
    // deprecated, but continuing support through v3.x
    responsiveStacked: {
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            overflow: 'hidden'
        }
    },
    // deprecated, but continuing support through v3.x
    responsiveStackedFullWidth: {}
}))
