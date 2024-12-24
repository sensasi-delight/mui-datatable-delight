import MuiTablePagination, {
    TablePaginationProps as MuiTablePaginationProps
} from '@mui/material/TablePagination'
import JumpToPage from './footer.pagination.jump-to-page'
import { makeStyles } from 'tss-react/mui'
import { getPageValue } from '../functions.shared/get-page-value'
import {
    MUIDataTableOptions,
    MUIDataTableTextLabelsPagination
} from 'mui-datatables'

const useStyles = makeStyles({ name: 'MUIDataTablePagination' })(() => ({
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

function TablePagination({
    count,
    options,
    rowsPerPage,
    page,
    changeRowsPerPage,
    changePage
}: TablePaginationProps) {
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

    const textLabels = options.textLabels.pagination

    return (
        <div className={classes.navContainer}>
            {options.jumpToPage ? (
                <JumpToPage
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    textLabels={options.textLabels}
                    changePage={changePage}
                    changeRowsPerPage={changeRowsPerPage}
                />
            ) : null}

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

export interface TablePaginationProps {
    /** Total number of table rows */
    count: number

    /** Options used to describe table */
    options: {
        rowsPerPageOptions: MUIDataTableOptions['rowsPerPageOptions']
        jumpToPage: MUIDataTableOptions['jumpToPage']
        pagination: boolean
        textLabels: {
            pagination: MUIDataTableTextLabelsPagination
        }
    }

    /** Current page index */
    page: number

    /** Total number allowed of rows per page */
    rowsPerPage: number

    /** Callback to trigger rows per page change */
    changeRowsPerPage: (nRows: number) => void

    /** Callback to trigger page change */
    changePage: (pageNo: number) => void
}

export default TablePagination
