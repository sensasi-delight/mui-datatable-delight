import MuiTablePagination from '@mui/material/TablePagination'
import type { TextLabelsType } from '@src'

export function CustomFooter(props: {
    changeRowsPerPage: (nRows: number) => void
    changePage: (pageNo: number) => void
    count: number
    page: number
    rowsPerPage: number
    textLabels: TextLabelsType['pagination']
}) {
    const { count, page, rowsPerPage, textLabels } = props

    const footerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0px 24px 0px 24px'
    }

    return (
        <div style={footerStyle}>
            <button>Custom Option</button>

            <MuiTablePagination
                backIconButtonProps={{
                    'aria-label': textLabels.previous
                }}
                component="div"
                count={count}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${textLabels.displayRows} ${count}`
                }
                labelRowsPerPage={textLabels.rowsPerPage}
                nextIconButtonProps={{
                    'aria-label': textLabels.next
                }}
                onPageChange={(_, page) => {
                    props.changePage(page)
                }}
                onRowsPerPageChange={event => {
                    props.changeRowsPerPage(parseInt(event.target.value))
                }}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 20, 100]}
            />
        </div>
    )
}
