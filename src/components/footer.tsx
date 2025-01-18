// vendors
import { makeStyles } from 'tss-react/mui'
// local components
import { DataTableFooterPagination } from './footer.pagination'
import { DataTableFooterJumpToPage } from './footer.jump-to-page'
import { useMainContext } from '../hooks/use-main-context'
import { TableAction } from '../data-table.props.type/options'
import { getPageValue } from '../functions.shared/get-page-value'

export default function TableFooter({}: TableFooterProps) {
    const { options, state, textLabels, onAction } = useMainContext()
    const { classes, cx } = useStyles()
    const { customFooter, pagination = true, jumpToPage } = options

    function changePage(page: number) {
        onAction?.(TableAction.CHANGE_PAGE, { page })
        options.onChangePage?.(page)
    }

    const changeRowsPerPage = (rowsPerPage: number) => {
        const rowCount = options.count ?? state.displayData.length

        const newState = {
            rowsPerPage: rowsPerPage,
            page: getPageValue(rowCount, rowsPerPage, state.page)
        }

        onAction?.(TableAction.CHANGE_ROWS_PER_PAGE, newState)

        options.onChangeRowsPerPage?.(newState.rowsPerPage)
    }

    const rowsPerPage = state.rowsPerPage

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

interface TableFooterProps {}

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
