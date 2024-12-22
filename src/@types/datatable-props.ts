import type { MUIDataTableProps } from 'mui-datatables'
import type { ReactNode } from 'react'

export interface DataTableProps extends Omit<MUIDataTableProps, 'title'> {
    /** Table title that placed on top left */
    title?: string | ReactNode
}
