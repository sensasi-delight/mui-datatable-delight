'use client'

// vendors
import { tss } from 'tss-react/mui'
import type { DataTableFooterPaginationProps } from './types/props'
import TablePagination, {
    type TablePaginationProps
} from '@mui/material/TablePagination'
// locals
// functions
import { getPageValue } from '../../../../functions/_shared/get-page-value'
import useDataTableContext from '../../../../hooks/use-data-table-context'
// global enums
import ClassName from '../../../../enums/class-name'

export function DataTableFooterPagination({
    count,
    rowsPerPage,
    page,
    changeRowsPerPage,
    changePage
}: DataTableFooterPaginationProps) {
    const { options, textLabels } = useDataTableContext()
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

    const finalRowsPerPageOptions = options.rowsPerPageOptions ?? [
        10, 20, 50, 100
    ]

    const finalRowPerPage = finalRowsPerPageOptions.includes(rowsPerPage)
        ? rowsPerPage
        : finalRowsPerPageOptions[0]

    return (
        <div className={classes.root}>
            <TablePagination
                component="div"
                count={count}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${textLabels.pagination.displayRows} ${count}`
                }
                labelRowsPerPage={textLabels.pagination.rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowChange}
                page={getPageValue(count, finalRowPerPage, page)}
                rowsPerPage={finalRowPerPage}
                rowsPerPageOptions={finalRowsPerPageOptions}
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
