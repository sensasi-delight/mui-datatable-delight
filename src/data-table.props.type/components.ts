// materials
import { Checkbox, Tooltip } from '@mui/material'
// locals
import { DataTableBody } from '../components/body'
import { DataTableToolbarFilter } from '../components/toolbar.filter'
import TableFilterList from '../components/filter-list'
import TableFooter from '../components/footer'
import ExpandButton from '../components/components.shared/select-cell.expand-button'
import { TableToolbarSelect } from '../components/toolbar-select'
import TableHead from '../components/head'
import Toolbar from '../components/toolbar'
import { ToolbarViewCol } from '../components/toolbar.view-col'
import TableResize from '../components/resize'

export interface DataTableComponents {
    Checkbox: typeof Checkbox
    ExpandButton: typeof ExpandButton
    TableBody: typeof DataTableBody
    TableFilter: typeof DataTableToolbarFilter
    TableFilterList: typeof TableFilterList
    TableFooter: typeof TableFooter
    TableHead: typeof TableHead
    TableResize: typeof TableResize
    TableToolbar: typeof Toolbar
    TableToolbarSelect: typeof TableToolbarSelect
    TableViewCol: typeof ToolbarViewCol
    Tooltip: typeof Tooltip
}
