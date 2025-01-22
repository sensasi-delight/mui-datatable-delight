'use client'

// vendors
import { tss } from 'tss-react/mui'
// local sub-components
import { DataTableFooterPagination } from './components/pagination'
import { DataTableFooterJumpToPage } from './components/jump-to-page'
// globals
import useDataTableContext from '../../hooks/use-data-table-context'
import { TableAction } from '../../types/options'
import { getPageValue } from '../../functions.shared/get-page-value'
import { ClassName } from '../../enums/class-name'
import type { DataTableState } from '../../types/state'

/**
 * @todo  FIX FONT SIZES ARE DIFFERENT IN SUB-COMPONENTS
 * @todo  RENAME COMPONENT TO `<BottomToolbar />`
 */
export function TableFooter({}: TableFooterProps) {
    const { options, state, textLabels, onAction } = useDataTableContext()
    const { classes, cx } = useStyles()
    const { customFooter, pagination = true, jumpToPage } = options

    function changePage(page: number) {
        onAction?.(TableAction.CHANGE_PAGE, { page })
        options.onChangePage?.(page)
    }

    function changeRowsPerPage(rowsPerPage: DataTableState['rowsPerPage']) {
        const rowCount = options.count ?? state.displayData.length

        const newState = {
            rowsPerPage: rowsPerPage,
            page: getPageValue(rowCount, rowsPerPage, state.page)
        }

        onAction?.(TableAction.CHANGE_ROWS_PER_PAGE, newState)

        options.onChangeRowsPerPage?.(newState.rowsPerPage)
    }

    const rowsPerPage = state.rowsPerPage

    if (customFooter)
        return customFooter(
            state.displayData.length,
            state.page,
            rowsPerPage,
            changeRowsPerPage,
            changePage,
            textLabels.pagination
        )

    /** Render nothing */
    if (!jumpToPage && !pagination) return <></>

    return (
        <div className={cx(ClassName.FOOTER, classes.root)}>
            {jumpToPage && (
                <DataTableFooterJumpToPage
                    count={state.displayData.length}
                    page={state.page}
                    rowsPerPage={rowsPerPage}
                    changePage={changePage}
                />
            )}

            {pagination && (
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

const useStyles = tss.withName(ClassName.FOOTER + '-').create(({ theme }) => ({
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
