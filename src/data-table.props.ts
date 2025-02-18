// vendors
import type { ReactNode } from 'react'
import type { PaperProps } from '@mui/material/Paper'
//
import type { ColumnDefinition } from './types/props/column-definition'
import type { DataTableOptions } from './types/options'
import type { DataTableComponents } from './types/components'
import type { DataTableIcons } from './types/icons'
import type { DefaultRow } from './types/default-row'
import type { TextLabelsType } from '@src/hooks/use-data-table-context/function/statics/default-text-labels'

export interface DataTableProps<Row = DefaultRow> {
    /**
     * Pass and use `className` to style `<DataTable />` as desired
     */
    className?: string

    /**
     * Columns used to describe table
     */
    columns: ColumnDefinition<Row>[]

    /**
     * Override `<DataTable />` components
     */
    components?: Partial<DataTableComponents>

    /**
     * Data used to populate `<DataTable />`
     *
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
    data: Row[]

    /**
     * Override `<DataTable />` icons
     */
    icons?: Partial<DataTableIcons>

    /**
     * Title of the table
     */
    title?: string | ReactNode

    options?: Partial<DataTableOptions<Row>>

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
     * Override Material UI's `<Paper />` props that wrap the `<DataTable />`
     */
    paperProps?: Exclude<PaperProps, 'ref'>
}
