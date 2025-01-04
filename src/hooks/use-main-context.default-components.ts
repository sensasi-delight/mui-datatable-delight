import TableResize from '../components/resize'
import { DataTableToolbarFilter } from '../components/toolbar.filter'
import { TableToolbarSelect as DefaultTableToolbarSelect } from '../components/toolbar-select'
import { DataTableBody as DefaultTableBody } from '../components/body'
import DefaultTableFilterList from '../components/filter-list'
import DefaultTableFooter from '../components/footer'
import DefaultTableHead from '../components/head'
import DefaultTableToolbar from '../components/toolbar'
import { Tooltip } from '@mui/material'

export const DEFAULT_COMPONENTS = {
    TableBody: DefaultTableBody,
    TableFilter: DataTableToolbarFilter,
    TableFilterList: DefaultTableFilterList,
    TableFooter: DefaultTableFooter,
    TableHead: DefaultTableHead,
    TableResize: TableResize,
    TableToolbar: DefaultTableToolbar,
    TableToolbarSelect: DefaultTableToolbarSelect,
    Tooltip: Tooltip
}
