// materials
import { Table as MuiTable } from '@mui/material'
import { useDataTableContext } from '../../hooks'
import { useStyles } from './hooks'
// types
import type { TableProps } from './types'
import { TableHead } from '../head'
import { DataTableBody } from '../body'

export function Table({
    tableRef,
    selectRowUpdate,
    setHeadCellRef,
    draggableHeadCellRefs
}: TableProps) {
    const { classes, cx } = useStyles()
    const {
        components,
        options,
        props: datatableRootProps,
        state
    } = useDataTableContext()

    const tablePropsFromOption = options.setTableProps?.() ?? {}

    const _TableHead = components.TableHead ?? TableHead
    const _TableBody = components.TableBody ?? DataTableBody

    return (
        <MuiTable
            ref={tableRef}
            tabIndex={0}
            role="grid"
            {...tablePropsFromOption}
            className={cx(classes.root, tablePropsFromOption.className)}
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

            <_TableHead
                columns={state.columns}
                // @ts-expect-error WILL FIX THIS LATER
                activeColumn={state.activeColumn}
                data={state.displayData}
                count={state.count}
                page={state.page}
                rowsPerPage={state.rowsPerPage}
                selectedRows={state.selectedRows}
                selectRowUpdate={selectRowUpdate}
                setCellRef={setHeadCellRef}
                expandedRows={state.expandedRows}
                sortOrder={state.sortOrder}
                columnOrder={state.columnOrder}
                draggableHeadCellRefs={draggableHeadCellRefs}
                tableRef={tableRef}
            />

            <_TableBody
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
    )
}
