import React from 'react'
import MuiTablePagination from '@mui/material/TablePagination'
import JumpToPage from './JumpToPage'
import { makeStyles } from 'tss-react/mui'
import { getPageValue } from '../utils'

const useStyles = makeStyles({ name: 'MUIDataTablePagination' })(() => ({
  root: {},
  navContainer: {
    padding: '0px 24px 0px 24px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toolbar: {},
  selectRoot: {},
  '@media screen and (max-width: 400px)': {
    toolbar: {
      '& span:nth-of-type(2)': {
        display: 'none',
      },
    },
    selectRoot: {
      marginRight: '8px',
    },
  },
}))

function TablePagination(props: TablePaginationProps) {
  const { classes } = useStyles()

  const handleRowChange = event => {
    props.changeRowsPerPage(event.target.value)
  }

  const handlePageChange = (_, page) => {
    props.changePage(page)
  }

  const { count, options, rowsPerPage, page } = props
  const textLabels = options.textLabels.pagination

  return (
    <div className={classes.navContainer}>
      {options.jumpToPage ? (
        <JumpToPage
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          textLabels={options.textLabels}
          changePage={props.changePage}
          changeRowsPerPage={props.changeRowsPerPage}
        />
      ) : null}

      {/* @ts-expect-error - MUI TablePagination component is not typed */}
      <MuiTablePagination
        component="div"
        className={classes.root}
        classes={{
          // @ts-expect-error - MUI TablePagination component is not typed
          caption: classes.caption,
          toolbar: classes.toolbar,
          selectRoot: classes.selectRoot,
        }}
        count={count}
        rowsPerPage={rowsPerPage}
        page={getPageValue(count, rowsPerPage, page)}
        labelRowsPerPage={textLabels.rowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
        backIconButtonProps={{
          id: 'pagination-back',
          'data-testid': 'pagination-back',
          'aria-label': textLabels.previous,
          title: textLabels.previous || '',
        }}
        nextIconButtonProps={{
          id: 'pagination-next',
          'data-testid': 'pagination-next',
          'aria-label': textLabels.next,
          title: textLabels.next || '',
        }}
        SelectProps={{
          id: 'pagination-input',
          SelectDisplayProps: { id: 'pagination-rows', 'data-testid': 'pagination-rows' },
          MenuProps: {
            id: 'pagination-menu',
            'data-testid': 'pagination-menu',
            MenuListProps: { id: 'pagination-menu-list', 'data-testid': 'pagination-menu-list' },
          },
        }}
        rowsPerPageOptions={options.rowsPerPageOptions}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowChange}
      />
    </div>
  )
}

interface TablePaginationProps {
  /** Total number of table rows */
  count: number

  /** Options used to describe table */
  options: any

  /** Current page index */
  page: number

  /** Total number allowed of rows per page */
  rowsPerPage: number

  /** Callback to trigger page change */
  changePage: (page: number) => void

  /** Callback to trigger rows per page change */
  changeRowsPerPage: (rows: number) => void
}

export default TablePagination
