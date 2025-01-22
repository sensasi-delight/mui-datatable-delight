// materials
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
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
    BottomBar?: typeof BottomBar
    Checkbox?: typeof Checkbox
    ColumnsResizer?: typeof ColumnsResizer
    ColumnVisibilityBox?: typeof ColumnVisibilityBox
    DataFilterBox?: typeof DataFilterBox
    FilteredValuesList?: typeof FilteredValuesList
    RowExpansionButton?: typeof RowExpansionButton
    SelectedRowsToolbar?: typeof SelectedRowsToolbar
    TableBody?: typeof TableBody
    TableHead?: typeof TableHead
    Toolbar?: typeof Toolbar
    Tooltip?: typeof Tooltip
}
