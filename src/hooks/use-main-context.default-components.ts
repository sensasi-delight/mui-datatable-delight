import TableResize from '../components/resize'
import { DataTableToolbarFilter } from '../components/toolbar.filter'
import { TableToolbarSelect as DefaultTableToolbarSelect } from '../components/toolbar-select'
import { DataTableBody as DefaultTableBody } from '../components/body'
import { TableFilterList } from '../components/filter-list'
import DefaultTableFooter from '../components/footer'
import DefaultTableHead from '../components/head'
import DefaultTableToolbar from '../components/toolbar'
import { Checkbox, Tooltip } from '@mui/material'
import ExpandButton from '../components/components.shared/select-cell.expand-button'
import { ToolbarViewCol } from '../components/toolbar.view-col'
import type { DataTableComponents } from '../data-table.props.type/components'

/**
 * ⚠️ THIS VARIABLE SHOULD NOT BE USED OUTSIDE THE `use-main-context.tsx` ⚠️
 */
export const DEFAULT_COMPONENTS: DataTableComponents = {
    Checkbox: Checkbox,
    ExpandButton: ExpandButton,
    TableBody: DefaultTableBody,
    TableFilter: DataTableToolbarFilter,
    TableFilterList: TableFilterList,
    TableFooter: DefaultTableFooter,
    TableHead: DefaultTableHead,
    TableResize: TableResize,
    TableToolbar: DefaultTableToolbar,
    TableToolbarSelect: DefaultTableToolbarSelect,
    TableViewCol: ToolbarViewCol,
    Tooltip: Tooltip
}
