'use client'

import Box from '@mui/material/Box'
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { ReactNode } from 'react'
import JumpToPage from './components/jump-to-page'
import { DataTableFooterPagination } from './components/pagination'

/**
 * The bottom bar component.
 *
 * @category  Component
 */
export default function BottomBar(): ReactNode {
    const { options, state, textLabels, onAction } = useDataTableContext()
    const { customFooter, pagination = true, jumpToPage } = options

    function changePage(page: number) {
        onAction?.(TableAction.CHANGE_PAGE, { page })
        options.onChangePage?.(page)
    }

    function changeRowsPerPage(rowsPerPage: number) {
        const rowCount = options.count ?? state.displayData.length

        const newState = {
            page: getPageValue(rowCount, rowsPerPage, state.page),
            rowsPerPage: rowsPerPage
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
    if (!jumpToPage && !pagination) return null

    return (
        <Box
            className={ClassName.BOTTOM_BAR}
            sx={theme => ({
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingLeft: '16px',
                paddingRight: '8px',
                [theme.breakpoints.down('sm')]: {
                    alignItems: 'end',
                    flexDirection: 'column',
                    marginTop: '1em'
                }
            })}
        >
            {jumpToPage && <JumpToPage changePage={changePage} />}

            {pagination && (
                <DataTableFooterPagination
                    changePage={changePage}
                    changeRowsPerPage={changeRowsPerPage}
                    rowsPerPage={rowsPerPage}
                />
            )}
        </Box>
    )
}
