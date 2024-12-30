import type { MUIDataTableState } from 'mui-datatables'
import type { Component, ReactNode, RefObject } from 'react'
import type { DataTableOptions } from './options'
import type { DataTableComponents } from './components'
import type { SxProps } from '@mui/material'
import type { DataTableColumns } from './columns'

export { DataTableColumns }

type DefaultDataItem = Object | (number | string | null)[]
export type DataTableData = DefaultDataItem[]

export interface DataTableProps<Item = DefaultDataItem> {
    /** Pass and use className to style MUIDataTable as desired */
    className?: string

    /** Columns used to describe table */
    columns: DataTableColumns

    components?: DataTableComponents

    /**
     * @example
     * ```js
     *  const data = [
     *      ['Gabby George', 'Business Analyst', 'Minneapolis'],
     *      ['Aiden Lloyd', "Business Consultant", 'Dallas'],
     *      ['Jaden Collins', 'Attorney', 'Santa Ana'],
     *      // ....
     *  ];
     * ```
     */
    data: Item[]

    /**
     * Title of the table
     */
    title?: string | ReactNode

    options?: DataTableOptions

    innerRef?:
        | RefObject<
              Component<DataTableProps, MUIDataTableState> | null | undefined
          >
        | undefined

    /**
     * Override `<DataTable />` Style
     *
     * @experimental not implemented yet
     * @todo WILL IMPLEMENT THIS LATER
     */
    sx?: SxProps
}
