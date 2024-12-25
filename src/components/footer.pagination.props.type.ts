import type {
    MUIDataTableOptions,
    MUIDataTableTextLabelsPagination
} from 'mui-datatables'

export interface DataTableFooterPaginationProps {
    /** Total number of table rows */
    count: number

    /** Options used to describe table */
    options: {
        rowsPerPageOptions: MUIDataTableOptions['rowsPerPageOptions']
        jumpToPage: MUIDataTableOptions['jumpToPage']
        pagination: boolean
        textLabels: {
            pagination: MUIDataTableTextLabelsPagination
        }
    }

    /** Current page index */
    page: number

    /** Total number allowed of rows per page */
    rowsPerPage: number

    /** Callback to trigger rows per page change */
    changeRowsPerPage: (nRows: number) => void

    /** Callback to trigger page change */
    changePage: (pageNo: number) => void
}
