'use client'

// materials
import MuiTable from '@mui/material/Table'
import useDataTableContext from '../../hooks/use-data-table-context'
import { tss } from 'tss-react/mui'
// global enums
import ClassName from '../../enums/class-name'
// types
import type { Props as TableProps } from './types/props'
// components
import TableHead from './components/head'
import TableBody from './components/body'
import type { Props as HeadProps } from './components/head/types/props'

export default function Table({
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
    const _TableBody = components.TableBody ?? TableBody

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

            {/* @ts-expect-error VALUES ARE NOT PASSING PROPS ANYMORE - WILL REMOVE TYPES LATER */}
            <_TableBody selectRowUpdate={selectRowUpdate} />

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
