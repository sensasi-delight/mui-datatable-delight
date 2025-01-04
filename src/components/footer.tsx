// types
import type { ReactNode } from 'react'
import type { MUIDataTableTextLabelsPagination } from 'mui-datatables'
// vendors
import { makeStyles } from 'tss-react/mui'
// local components
import type { DataTableFooterPaginationProps } from './footer.pagination.props.type'
import { DataTableFooterPagination } from './footer.pagination'
import { DataTableFooterJumpToPage } from './footer.jump-to-page'
import { useMainContext } from '../hooks/use-main-context'

export default function TableFooter({
    options,
    rowCount,
    page,
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: TableFooterProps) {
    const { textLabels } = useMainContext()
    const { classes, cx } = useStyles()
    const { customFooter, pagination = true, jumpToPage } = options

    return (
        <div className={cx(ROOT_CLASS, classes.root)}>
            {customFooter &&
                customFooter(
                    rowCount,
                    page,
                    rowsPerPage,
                    changeRowsPerPage,
                    changePage,
                    textLabels.pagination
                )}

            {!customFooter && jumpToPage && (
                <DataTableFooterJumpToPage
                    count={rowCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    changePage={changePage}
                />
            )}

            {!customFooter && pagination && (
                <DataTableFooterPagination
                    count={rowCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={changeRowsPerPage}
                    changePage={changePage}
                    options={options}
                />
            )}
        </div>
    )
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

const ROOT_CLASS = 'datatable-delight--footer'

const useStyles = makeStyles({
    name: ROOT_CLASS
})(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginTop: '1em',
            alignItems: 'end'
        }
    }
}))
