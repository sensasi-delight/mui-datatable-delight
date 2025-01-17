// vendors
import { makeStyles } from 'tss-react/mui'
// local components
import { DataTableFooterPagination } from './footer.pagination'
import { DataTableFooterJumpToPage } from './footer.jump-to-page'
import { useMainContext } from '../hooks/use-main-context'

export default function TableFooter({
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: TableFooterProps) {
    const { options, state, textLabels } = useMainContext()
    const { classes, cx } = useStyles()
    const { customFooter, pagination = true, jumpToPage } = options

    return (
        <div className={cx(ROOT_CLASS, classes.root)}>
            {customFooter?.(
                state.displayData.length,
                state.page,
                rowsPerPage,
                changeRowsPerPage,
                changePage,
                textLabels.pagination
            )}

            {!customFooter && jumpToPage && (
                <DataTableFooterJumpToPage
                    count={state.displayData.length}
                    page={state.page}
                    rowsPerPage={rowsPerPage}
                    changePage={changePage}
                />
            )}

            {!customFooter && pagination && (
                <DataTableFooterPagination
                    count={state.displayData.length}
                    page={state.page}
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={changeRowsPerPage}
                    changePage={changePage}
                />
            )}
        </div>
    )
}

interface TableFooterProps {
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
