import type { MUIDataTableOptions } from 'mui-datatables'
import type { DataTableData } from './datatable-props'

type DataType = {
    index: number
    data: DataTableData[0]
}

export interface DataTableOptions
    extends Omit<MUIDataTableOptions, 'onDownload'> {
    /**
     * A callback function that triggers when the user downloads the CSV file.
     * In the callback, you can control what is written to the CSV file.
     * Return false to cancel download of file.
     *
     * @see https://github.com/gregnb/mui-datatables/blob/master/examples/on-download/index.tsx
     */
    onDownload?: (
        data: DataType[],
        columns: any
    ) => { data: DataType[]; columns: any } | false
}
