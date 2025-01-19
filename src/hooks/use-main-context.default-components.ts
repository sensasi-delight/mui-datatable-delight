// vendors
import { Checkbox as MuiCheckbox, Tooltip as MuiTooltip } from '@mui/material'
// components
import type { DataTableComponents } from '../data-table.props.type/components'

import {
    BottomBar,
    ColumnsResizer,
    ColumnVisibilityBox,
    DataFilterBox,
    FilteredValuesList,
    RowExpansionButton,
    SelectedRowsToolbar,
    TableBody,
    TableHead,
    Toolbar
} from '../components'

/**
 * ⚠️ THIS VARIABLE SHOULD NOT BE USED OUTSIDE THE `use-main-context.tsx` ⚠️
 */
export const DEFAULT_COMPONENTS: DataTableComponents = {
    BottomBar,
    Checkbox: MuiCheckbox,
    ColumnsResizer,
    ColumnVisibilityBox,
    DataFilterBox,
    FilteredValuesList,
    RowExpansionButton,
    SelectedRowsToolbar,
    TableBody,
    TableHead,
    Toolbar,
    Tooltip: MuiTooltip
}
