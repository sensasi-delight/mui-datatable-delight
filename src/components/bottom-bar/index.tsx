'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
// local sub-components
import { DataTableFooterPagination } from './components/pagination'
import JumpToPage from './components/jump-to-page'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import { getPageValue } from '@src/functions/_shared/get-page-value'
// global enums
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'

/**
 * The bottom bar component.
 *
 * @category  Component
 *
 * @todo  FIX FONT SIZES ARE DIFFERENT IN SUB-COMPONENTS
 */
export default function BottomBar(): ReactNode {
    const { options, state, textLabels, onAction } = useDataTableContext()
    const { classes } = useStyles()
    const { customFooter, pagination = true, jumpToPage } = options

    function changePage(page: number) {
        onAction?.(TableAction.CHANGE_PAGE, { page })
        options.onChangePage?.(page)
    }

    function changeRowsPerPage(rowsPerPage: number) {
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
        <div className={classes.root}>
            {jumpToPage && <JumpToPage changePage={changePage} />}

            {pagination && (
                <DataTableFooterPagination
                    rowsPerPage={rowsPerPage}
                    changeRowsPerPage={changeRowsPerPage}
                    changePage={changePage}
                />
            )}
        </div>
    )
}

const useStyles = tss.withName(ClassName.BOTTOM_BAR).create(({ theme }) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '8px',
        paddingLeft: '16px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginTop: '1em',
            alignItems: 'end'
        }
    }
}))
