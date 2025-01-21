// materials
import MuiTable from '@mui/material/Table'
import { useDataTableContext } from '../../hooks'
import { tss } from 'tss-react/mui'
// globals
import { ClassName } from '../../enums'
// types
import type { TableProps } from './types'
// components
import { TableHead } from '../head'
import { DataTableBody } from '../body'
import { HeadProps } from '../head/types'

export function Table({
    draggableHeadCellRefs, // TEMPORARY PASSING HEAD PROPS
    selectRowUpdate, // TEMPORARY PASSING HEAD PROPS
    setHeadCellsRef, // TEMPORARY PASSING HEAD PROPS
    tableRef // TEMPORARY PASSING HEAD PROPS
}: TableProps &
    // TEMPORARY PASSING HEAD PROPS
    HeadProps) {
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
                selectRowUpdate={selectRowUpdate}
                setHeadCellsRef={setHeadCellsRef}
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

const useStyles = tss.withName(ClassName.TABLE).create({
    root: {
        outline: 'none'
    }
})
