// materials
import { Checkbox as MuiCheckbox, Tooltip as MuiTooltip } from '@mui/material'
// locals
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

export interface DataTableComponents {
    BottomBar: typeof BottomBar
    Checkbox: typeof MuiCheckbox
    ColumnsResizer: typeof ColumnsResizer
    ColumnVisibilityBox: typeof ColumnVisibilityBox
    DataFilterBox: typeof DataFilterBox
    FilteredValuesList: typeof FilteredValuesList
    RowExpansionButton: typeof RowExpansionButton
    SelectedRowsToolbar: typeof SelectedRowsToolbar
    TableBody: typeof TableBody
    TableHead: typeof TableHead
    Toolbar: typeof Toolbar
    Tooltip: typeof MuiTooltip
}
