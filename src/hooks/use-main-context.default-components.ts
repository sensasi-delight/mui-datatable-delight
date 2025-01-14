// vendors
import { Checkbox, Tooltip } from '@mui/material'
// components
import type { DataTableComponents } from '../data-table.props.type/components'
import {
    DataTableBody,
    DataTableToolbarFilter,
    ExpandButton,
    TableFilterList,
    TableFooter,
    TableHead,
    TableResize,
    TableToolbar,
    TableToolbarSelect,
    ToolbarViewCol
} from '../'

/**
 * ⚠️ THIS VARIABLE SHOULD NOT BE USED OUTSIDE THE `use-main-context.tsx` ⚠️
 */
export const DEFAULT_COMPONENTS: DataTableComponents = {
    Checkbox,
    ExpandButton,
    TableBody: DataTableBody,
    TableFilter: DataTableToolbarFilter,
    TableFilterList: TableFilterList,
    TableFooter,
    TableHead,
    TableResize,
    TableToolbar,
    TableToolbarSelect,
    TableViewCol: ToolbarViewCol,
    Tooltip
}
