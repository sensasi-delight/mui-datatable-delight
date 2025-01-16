// materials
import { Checkbox, Tooltip } from '@mui/material'
// locals
import {
    ExpandButton,
    DataTableBody,
    DataTableToolbarFilter,
    TableFilterList,
    TableFooter,
    TableHead,
    TableResize,
    TableToolbar,
    TableToolbarSelect,
    ToolbarViewCol
} from '../components'

export interface DataTableComponents {
    Checkbox: typeof Checkbox
    ExpandButton: typeof ExpandButton
    TableBody: typeof DataTableBody
    TableFilter: typeof DataTableToolbarFilter
    TableFilterList: typeof TableFilterList
    TableFooter: typeof TableFooter
    TableHead: typeof TableHead
    TableResize: typeof TableResize
    TableToolbar: typeof TableToolbar
    TableToolbarSelect: typeof TableToolbarSelect
    TableViewCol: typeof ToolbarViewCol
    Tooltip: typeof Tooltip
}
