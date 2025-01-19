'use client'

import React from 'react'
import MuiTablePagination from '@mui/material/TablePagination'

export function CustomFooter(props: unknown) {
    const { count, textLabels, rowsPerPage, page } = props

    const footerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0px 24px 0px 24px'
    }

    const handleRowChange = event => {
        props.changeRowsPerPage(event.target.value)
    }

    const handlePageChange = (_, page) => {
        props.changePage(page)
    }

    return (
        <div style={footerStyle}>
            <button>Custom Option</button>

            <MuiTablePagination
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={textLabels.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${textLabels.displayRows} ${count}`
                }
                backIconButtonProps={{
                    'aria-label': textLabels.previous
                }}
                nextIconButtonProps={{
                    'aria-label': textLabels.next
                }}
                rowsPerPageOptions={[10, 20, 100]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowChange}
            />
        </div>
    )
}
