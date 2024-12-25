import type { ReactNode } from 'react'
import type {
    MUIDataTablePagination,
    MUIDataTableTextLabelsPagination
} from 'mui-datatables'
import { DataTableFooterPagination } from './footer.pagination'
import type { DataTableFooterPaginationProps } from './footer.pagination.props.type'

export default function TableFooter({
    options,
    rowCount,
    page,
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: TableFooterProps) {
    const { customFooter, pagination = true } = options

    if (customFooter) {
        return customFooter(
            rowCount,
            page,
            rowsPerPage,
            changeRowsPerPage,
            changePage,
            options.textLabels.pagination
        )
    }

    if (pagination) {
        return (
            <DataTableFooterPagination
                count={rowCount}
                page={page}
                rowsPerPage={rowsPerPage}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
                options={options}
            />
        )
    }

    return null
}

interface TableFooterProps {
    /** Total number of table rows */
    rowCount: number

    /** Options used to describe table */
    options: {
        customFooter: (
            rowCount: TableFooterProps['rowCount'],
            page: TableFooterProps['page'],
            rowsPerPage: TableFooterProps['rowsPerPage'],

            changeRowsPerPage: TableFooterProps['changeRowsPerPage'],
            changePage: TableFooterProps['changePage'],
            paginationTextLabels: MUIDataTableTextLabelsPagination
        ) => ReactNode
        pagination: boolean
        textLabels: {
            pagination: MUIDataTablePagination
        }
    } & DataTableFooterPaginationProps['options']

    /** Current page index */
    page: number

    /** Total number allowed of rows per page */
    rowsPerPage: number

    /** Callback to trigger rows per page change */
    changeRowsPerPage: (nRows: number) => void

    /** Callback to trigger page change */
    changePage: (pageNo: number) => void
}
