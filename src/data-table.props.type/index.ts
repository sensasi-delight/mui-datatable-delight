import type { MUIDataTableState } from 'mui-datatables'
import type { Component, ReactNode, RefObject } from 'react'
import type { DataTableOptions } from './options'
import type { MUIDataTableColumn as DataTableColumn } from 'mui-datatables'
import type { DataTableComponents } from './components'
import type { SxProps } from '@mui/material'

export type DataTableColumns = (string | DataTableColumn)[]
type DefaultDataItem = Object | (number | string | null)[]
export type DataTableData = DefaultDataItem[]

export interface DataTableProps<Item = DefaultDataItem> {
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

    /** Table title that placed on top left */
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
