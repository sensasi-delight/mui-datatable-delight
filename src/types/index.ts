// vendors
import type { ReactNode } from 'react'
import type { PaperProps } from '@mui/material/Paper'
import type { SxProps } from '@mui/system/styleFunctionSx'
//
import type { DataTableOptions } from './options'
import type { DataTableComponents } from './components'
import type { DataTableColumnObjectOptions } from './columns'
import type { DataTableIcons } from './icons'
import type { DefaultDataRowItemType } from './values/default-data-row-item-type'
import type { TextLabelsType } from '@src/hooks/use-data-table-context/function/statics/default-text-labels'

export interface DataTableProps<DataRowItemType = DefaultDataRowItemType> {
    /** Pass and use className to style MUIDataTable as desired */
    className?: string

    /** Columns used to describe table */
    columns: (
        | string
        | {
              name: string
              label?: string
              options?: Partial<DataTableColumnObjectOptions<DataRowItemType>>
          }
    )[]

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
    data: DataRowItemType[]

    icons?: Partial<DataTableIcons>

    /**
     * Title of the table
     */
    title?: string | ReactNode

    options?: Partial<DataTableOptions<DataRowItemType>>

    /**
     * User provided labels to localize text.
     *
     * @see [Localization Docs](https://mui-datatable-delight.vercel.app/docs/features/localization)
     */
    textLabels?: Partial<TextLabelsType>

    ref?: PaperProps['ref']

    /**
     * Override `<DataTable />` Style
     *
     * @experimental not implemented yet
     * @todo WILL IMPLEMENT THIS LATER
     */
    sx?: SxProps
}
