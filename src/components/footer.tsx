// types
import type { ReactNode } from 'react'
import type {
    MUIDataTablePagination,
    MUIDataTableTextLabelsPagination
} from 'mui-datatables'
// vendors
import { makeStyles } from 'tss-react/mui'
// local components
import type { DataTableFooterPaginationProps } from './footer.pagination.props.type'
import { DataTableFooterPagination } from './footer.pagination'
import { DataTableFooterJumpToPage } from './footer.jump-to-page'
// statics
import { TEXT_LABELS } from '../statics'

export default function TableFooter({
    options,
    rowCount,
    page,
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: TableFooterProps) {
    const { classes } = useStyles()
    const {
        customFooter,
        pagination = true,
        jumpToPage,
        textLabels: { pagination: paginationTextLabels }
    } = options

    return (
        <div className={classes.root}>
            {customFooter &&
                customFooter(
                    rowCount,
                    page,
                    rowsPerPage,
                    changeRowsPerPage,
                    changePage,
                    paginationTextLabels
                )}

            {jumpToPage && (
                <DataTableFooterJumpToPage
                    count={rowCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    textLabel={paginationTextLabels.jumpToPage ?? TEXT_LABELS}
                    changePage={changePage}
                />
            )}

            {pagination && (
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

const useStyles = makeStyles({
    name: 'delight-datatable-footer'
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
