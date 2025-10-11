'use client'

// materials
import MuiTable from '@mui/material/Table'
// globals
import ClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import TableBody from './components/body'
import TableHead from './components/head'
//
import type { Props } from './types/props'

/**
 * Main table component
 *
 * @category  Component
 */
export default function Table({ selectRowUpdate }: Props): ReactNode {
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
            role="grid"
            tabIndex={0}
            {...tablePropsFromOption}
            className={cx(classes.root, tablePropsFromOption.className)}
        >
            {datatableRootProps?.title && (
                <caption
                    style={{
                        left: '-3000px',
                        position: 'absolute'
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
