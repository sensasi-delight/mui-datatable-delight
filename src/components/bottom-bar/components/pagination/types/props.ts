export interface DataTableFooterPaginationProps {
    /** Total number of table rows */
    count: number

    /** Current page index */
    page: number

    /** Total number allowed of rows per page */
    rowsPerPage: number

    /** Callback to trigger rows per page change */
    changeRowsPerPage: (nRows: number) => void

    /** Callback to trigger page change */
    changePage: (pageNo: number) => void
}
