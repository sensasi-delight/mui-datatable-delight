'use client'

import TablePagination, {
    type TablePaginationProps
} from '@mui/material/TablePagination'
// global enums
import ClassName from '@src/enums/class-name'
// functions
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import type { ReactElement } from 'react'
import type { DataTableFooterPaginationProps } from './types/props'

/**
 * Bottom bar pagination.
 *
 * @category  Component
 */
export function DataTableFooterPagination({
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: DataTableFooterPaginationProps): ReactElement {
    const { state, textLabels } = useDataTableContext()

    const handleRowChange: TablePaginationProps['onRowsPerPageChange'] = ({
        target: { value }
    }) => {
        changeRowsPerPage(parseInt(value, 10))
    }

    const handlePageChange: TablePaginationProps['onPageChange'] = (
        _,
        page
    ) => {
        changePage(page)
    }

    return (
        <TablePagination
            className={ClassName.BOTTOM_BAR__PAGINATION}
            component="div"
            count={state.count}
            labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${textLabels.pagination.displayRows} ${count}`
            }
            labelRowsPerPage={textLabels.pagination.rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowChange}
            page={getPageValue(state.count, rowsPerPage, state.page)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={state.rowsPerPageOptions}
            slotProps={{
                actions: {
                    nextButton: {
                        'aria-label': textLabels.pagination.next,
                        id: 'pagination-next',
                        title: textLabels.pagination.next
                    },
                    previousButton: {
                        'aria-label': textLabels.pagination.previous,
                        id: 'pagination-back',
                        title: textLabels.pagination.previous
                    }
                },

                select: {
                    id: 'pagination-input',
                    MenuProps: {
                        id: 'pagination-menu',
                        MenuListProps: {
                            id: 'pagination-menu-list'
                        }
                    },
                    SelectDisplayProps: {
                        id: 'pagination-rows'
                    }
                },

                toolbar: {
                    sx: theme => ({
                        [theme.breakpoints.down('sm')]: {
                            marginTop: '-0.5em',
                            paddingLeft: theme.spacing(2)
                        },

                        '& > *': {
                            fontSize: '0.8rem !important'
                        },

                        '& > p': {
                            color: 'var(--mui-palette-text-secondary) !important'
                        },
                        paddingRight: '0 !important'
                    })
                }
            }}
            sx={{
                maxWidth: '100%',
                overflowX: 'auto'
            }}
        />
    )
}
