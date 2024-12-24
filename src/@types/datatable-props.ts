import type { MUIDataTableProps, MUIDataTableState } from 'mui-datatables'
import type { Component, ReactNode, RefObject } from 'react'
import type { DataTableOptions } from './data-table-options'
import type { MUIDataTableColumn as DataTableColumn } from 'mui-datatables'
// import type { SxProps } from '@mui/material'

export type DataTableColumns = (string | DataTableColumn)[]
export type DataTableData = (number | string | null | undefined)[][]

export interface DataTableProps {
    columns: DataTableColumns

    components?: MUIDataTableProps['components']

    data: DataTableData

    /** Table title that placed on top left */
    title?: string | ReactNode

    options?: DataTableOptions

    innerRef?:
        | RefObject<
              Component<DataTableProps, MUIDataTableState> | null | undefined
          >
        | undefined

    /** Override `<DataTable />` Style */
    // sx?: SxProps
}
