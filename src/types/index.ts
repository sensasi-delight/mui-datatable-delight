// vendors
import type { MUIDataTableTextLabels } from 'mui-datatables'
import type { ReactNode } from 'react'
import type { PaperProps } from '@mui/material/Paper'
import type { SxProps } from '@mui/system/styleFunctionSx'
//
import type { DataTableOptions } from './options'
import type { DataTableComponents } from './components'
import type { DataTableColumnObject } from './columns'
import type { DataTableIcons } from './icons'

type DataType = number | string | null

export type DefaultRowDataType =
    | {
          [key: string]: DataType
      }
    | DataType[]

/**
 * @deprecated  WILL BE UNEXPORTED. USE `DefaultRowDataType` INSTEAD
 */
export type DefaultDataItem = DefaultRowDataType

/**
 * @deprecated  WILL BE UNEXPORTED
 */
export type DataTableData = DefaultRowDataType[]

export interface DataTableProps<RowDataType = DefaultRowDataType> {
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
    data: RowDataType[]

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
