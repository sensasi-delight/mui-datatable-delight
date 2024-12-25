// vendors
import { makeStyles } from 'tss-react/mui'
import MuiTablePagination, {
    type TablePaginationProps as MuiTablePaginationProps
} from '@mui/material/TablePagination'
// locals
import type { DataTableFooterPaginationProps } from './footer.pagination.props.type'
import { DataTableFooterPaginationJumpToPage } from './footer.pagination.jump-to-page'
// statics
import { TEXT_LABELS } from '../statics'
// functions
import { getPageValue } from '../functions.shared/get-page-value'

export function DataTableFooterPagination({
    count,
    options,
    rowsPerPage,
    page,
    changeRowsPerPage,
    changePage
}: DataTableFooterPaginationProps) {
    const { classes } = useStyles()

    const handleRowChange: MuiTablePaginationProps['onRowsPerPageChange'] = ({
        target: { value }
    }) => {
        changeRowsPerPage(parseInt(value))
    }

    const handlePageChange: MuiTablePaginationProps['onPageChange'] = (
        _,
        page
    ) => {
        changePage(page)
    }

    const textLabels = {
        ...TEXT_LABELS.pagination,
        ...options.textLabels.pagination
    }

    return (
        <div className={classes.navContainer}>
            {options.jumpToPage && (
                <DataTableFooterPaginationJumpToPage
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    textLabel={
                        textLabels.jumpToPage ??
                        TEXT_LABELS.pagination.jumpToPage
                    }
                    changePage={changePage}
                />
            )}

            <MuiTablePagination
                component="div"
                className={classes.root}
                classes={{
                    // caption: classes.caption,
                    toolbar: classes.toolbar,
                    selectRoot: classes.selectRoot
                }}
                count={count}
                rowsPerPage={rowsPerPage}
                page={getPageValue(count, rowsPerPage, page)}
                labelRowsPerPage={textLabels.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${textLabels.displayRows} ${count}`
                }
                slotProps={{
                    actions: {
                        previousButton: {
                            id: 'pagination-back',
                            // 'data-testid': 'pagination-back',
                            'aria-label': textLabels.previous,
                            title: textLabels.previous || ''
                        },

                        nextButton: {
                            id: 'pagination-next',
                            // 'data-testid': 'pagination-next',
                            'aria-label': textLabels.next,
                            title: textLabels.next || ''
                        }
                    },

                    select: {
                        id: 'pagination-input',
                        SelectDisplayProps: {
                            id: 'pagination-rows'
                            // 'data-testid': 'pagination-rows'
                        },
                        MenuProps: {
                            id: 'pagination-menu',
                            // 'data-testid': 'pagination-menu',
                            MenuListProps: {
                                id: 'pagination-menu-list'
                                // 'data-testid': 'pagination-menu-list'
                            }
                        }
                    }
                }}
                rowsPerPageOptions={options.rowsPerPageOptions}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowChange}
            />
        </div>
    )
}

const useStyles = makeStyles({
    name: 'delight-datatable-footer--pagination'
})(() => ({
    root: {},
    navContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    toolbar: {},
    selectRoot: {},
    '@media screen and (max-width: 400px)': {
        toolbar: {
            '& span:nth-of-type(2)': {
                display: 'none'
            }
        },
        selectRoot: {
            marginRight: '8px'
        }
    }
}))
