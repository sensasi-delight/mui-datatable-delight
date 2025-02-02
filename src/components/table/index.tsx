'use client'

// materials
import MuiTable from '@mui/material/Table'
import useDataTableContext from '../../hooks/use-data-table-context'
import { tss } from 'tss-react/mui'
// global enums
import ClassName from '../../enums/class-name'
// types
import type { Props } from './types/props'
// components
import TableHead from './components/head'
import TableBody from './components/body'

export default function Table({ selectRowUpdate }: Props) {
    const { classes, cx } = useStyles()
    const {
        components,
        options,
        props: datatableRootProps,
        state,
        tableRef
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

            <_TableHead selectRowUpdate={selectRowUpdate} />

            <_TableBody selectRowUpdate={selectRowUpdate} />

            {options.customTableBodyFooterRender?.(state, options)}
        </MuiTable>
    )
}

const useStyles = tss.withName(ClassName.TABLE).create({
    root: {
        outline: 'none'
    }
})
