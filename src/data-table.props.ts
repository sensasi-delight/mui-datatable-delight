// vendors
import type { ReactNode } from 'react'
import type { PaperProps } from '@mui/material/Paper'
import type { SxProps } from '@mui/system/styleFunctionSx'
//
import type { DataTableOptions } from './types/options'
import type { DataTableComponents } from './types/components'
import type { DataTableColumnObjectOptions } from './types/columns'
import type { DataTableIcons } from './types/icons'
import type { DefaultDataRowItemType } from './types/values/default-data-row-item-type'
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
     * @see  {@link https://mui-datatable-delight.vercel.app/docs/features/localization | Localization Docs}
     */
    textLabels?: Partial<{
        body: Partial<TextLabelsType['body']>
        filter: Partial<TextLabelsType['filter']>
        pagination: Partial<TextLabelsType['pagination']>
        selectedRows: Partial<TextLabelsType['selectedRows']>
        toolbar: Partial<TextLabelsType['toolbar']>
        viewColumns: Partial<TextLabelsType['viewColumns']>
    }>

    ref?: PaperProps['ref']

    /**
     * Override `<DataTable />` Style
     *
     * @experimental not implemented yet
     * @todo WILL IMPLEMENT THIS LATER
     */
    sx?: SxProps
}
