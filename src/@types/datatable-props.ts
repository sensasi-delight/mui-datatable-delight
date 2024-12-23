import type { MUIDataTableProps } from 'mui-datatables'
import type { ReactNode } from 'react'

import type {
    MUIDataTableOptions,
    MUIDataTableColumn as DataTableColumn
} from 'mui-datatables'

export type DataTableOptions = MUIDataTableOptions
export type DataTableColumns = (string | DataTableColumn)[]

export interface DataTableProps extends Omit<MUIDataTableProps, 'title'> {
    /** Table title that placed on top left */
    title?: string | ReactNode

    columns: DataTableColumns

    options?: DataTableOptions
}
