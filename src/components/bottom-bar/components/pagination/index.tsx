'use client'

// vendors
import type { ReactElement } from 'react'
import type { DataTableFooterPaginationProps } from './types/props'
import { tss } from 'tss-react/mui'
import TablePagination, {
    type TablePaginationProps
} from '@mui/material/TablePagination'
// functions
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import ClassName from '@src/enums/class-name'

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
    const { classes } = useStyles()

    const handleRowChange: TablePaginationProps['onRowsPerPageChange'] = ({
        target: { value }
    }) => {
        changeRowsPerPage(parseInt(value))
    }

    const handlePageChange: TablePaginationProps['onPageChange'] = (
        _,
        page
    ) => {
        changePage(page)
    }

    return (
        <TablePagination
            component="div"
            className={classes.root}
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
                    previousButton: {
                        id: 'pagination-back',
                        'aria-label': textLabels.pagination.previous,
                        title: textLabels.pagination.previous
                    },

                    nextButton: {
                        id: 'pagination-next',
                        'aria-label': textLabels.pagination.next,
                        title: textLabels.pagination.next,
                        className: classes.nextButton
                    }
                },

                select: {
                    id: 'pagination-input',
                    SelectDisplayProps: {
                        id: 'pagination-rows'
                    },
                    MenuProps: {
                        id: 'pagination-menu',
                        MenuListProps: {
                            id: 'pagination-menu-list'
                        }
                    }
                },

                toolbar: {
                    className: classes.toolbar
                }
            }}
        />
    )
}

const useStyles = tss
    .withName(ClassName.BOTTOM_BAR__PAGINATION)
    .create(({ theme }) => ({
        root: {
            maxWidth: '100%',
            overflowX: 'auto'
        },

        toolbar: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '-0.5em',
                paddingLeft: theme.spacing(2)
            },
            paddingRight: '0 !important',

            '& > p': {
                color: 'var(--mui-palette-text-secondary) !important'
            },

            '& > *': {
                fontSize: '0.8rem !important'
            }
        },

        nextButton: {}
    }))
