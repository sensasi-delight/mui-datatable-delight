import type { MUIDataTableTextLabels } from 'mui-datatables'
import type { ReactNode } from 'react'
import type { DataTableOptions } from './options'
import type { DataTableComponents } from './components'
import type { PaperProps, SxProps } from '@mui/material'
import type { DataTableColumnObject } from './columns'
import { DataTableIcons } from './icons'

export type DefaultDataItem = Object | (number | string | null)[]
export type DataTableData = DefaultDataItem[]

export interface DataTableProps<Item = DefaultDataItem> {
    /** Pass and use className to style MUIDataTable as desired */
    className?: string

    /** Columns used to describe table */
    columns: (string | DataTableColumnObject)[]

    components?: Partial<DataTableComponents>

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

    icons?: Partial<DataTableIcons>

    /**
     * Title of the table
     */
    title?: string | ReactNode

    options?: DataTableOptions

    /**
     * User provided labels to localize text.
     *
     * @see [Localization Docs](https://mui-datatable-delight.vercel.app/docs/features/localization)
     */
    textLabels?: Partial<MUIDataTableTextLabels>

    ref?: PaperProps['ref']

    /**
     * Override `<DataTable />` Style
     *
     * @experimental not implemented yet
     * @todo WILL IMPLEMENT THIS LATER
     */
    sx?: SxProps
}
