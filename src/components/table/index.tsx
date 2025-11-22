'use client'

// materials
import MuiTable from '@mui/material/Table'
// globals
import ClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import TableBody from './components/body'
import TableHead from './components/head'
//
import type { Props } from './types/props'

/**
 * Main table component
 *
 * @category  Component
 */
export default function Table({ selectRowUpdate }: Props): React.ReactNode {
    const {
        components,
        options,
        props: datatableRootProps,
        state,
        tableRef
    } = useDataTableContext()

    const tablePropsFromOption = options.setTableProps?.() ?? {}

    const HandleTableHead = components.TableHead ?? TableHead
    const HandleTableBody = components.TableBody ?? TableBody

    return (
        <MuiTable
            ref={tableRef}
            role="grid"
            tabIndex={0}
            {...tablePropsFromOption}
            className={[ClassName.TABLE, tablePropsFromOption.className].join(
                ' '
            )}
            sx={{
                outline: 'none',
                ...tablePropsFromOption.sx
            }}
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

            <HandleTableHead selectRowUpdate={selectRowUpdate} />

            <HandleTableBody selectRowUpdate={selectRowUpdate} />

            {options.customTableBodyFooterRender?.(state, options)}
        </MuiTable>
    )
}
