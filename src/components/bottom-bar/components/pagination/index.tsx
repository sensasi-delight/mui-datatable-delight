'use client'

// vendors
import { tss } from 'tss-react/mui'
import type { DataTableFooterPaginationProps } from './types/props'
import TablePagination, {
    type TablePaginationProps
} from '@mui/material/TablePagination'
// functions
import { getPageValue } from '@src/functions/_shared/get-page-value'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import ClassName from '@src/enums/class-name'

export function DataTableFooterPagination({
    rowsPerPage,
    changeRowsPerPage,
    changePage
}: DataTableFooterPaginationProps) {
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
        <div className={classes.root}>
            <TablePagination
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
        </div>
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
            paddingRight: '0 !important'
        },

        nextButton: {
            marginRight: theme.spacing(0.1)
        }
    }))
