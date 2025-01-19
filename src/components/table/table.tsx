// materials
import { Table as MuiTable } from '@mui/material'
import { useMainContext } from '../../hooks/use-main-context'
import { useStyles } from './hooks'
// types
import type { TableProps } from './types'

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
    } = useMainContext()

    const tablePropsFromOption = options.setTableProps?.() ?? {}

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
                setCellRef={setHeadCellRef}
                expandedRows={state.expandedRows}
                sortOrder={state.sortOrder}
                columnOrder={state.columnOrder}
                draggableHeadCellRefs={draggableHeadCellRefs}
                tableRef={tableRef}
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
