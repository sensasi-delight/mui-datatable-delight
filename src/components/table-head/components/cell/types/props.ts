import { TableCellProps, TableSortLabelProps } from '@mui/material'
import type { ReactNode, RefObject } from 'react'
import { DataTableState } from '../../../../../data-table.props.type/state'

export interface Props {
    /** Current sort direction */
    sortDirection?: TableSortLabelProps['direction']

    /** Callback to trigger column sort */
    toggleSort: (columnIndex: number) => void

    /** Sort enabled / disabled for this column **/
    sort: boolean

    /** Hint tooltip text */
    hint?: string

    /** Column displayed in print */
    print: boolean

    /** Optional to be used with `textLabels.body.columnHeaderTooltip` */
    column: DataTableState['columns'][0]

    tableRef: RefObject<HTMLTableElement | null>

    draggableHeadCellRefs: RefObject<HTMLTableCellElement[]>

    index: number

    children: ReactNode

    columnOrder: DataTableState['columnOrder']

    columns: DataTableState['columns']

    cellHeaderProps: TableCellProps

    colPosition: number

    setHeadCellsRef: (
        rowIndex: number,
        colIndex: number,
        ref: HTMLTableCellElement
    ) => void
}
