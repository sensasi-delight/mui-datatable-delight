// materials
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'

// ########## <Datatable /> sub-components ##########
import AnnounceText from '../components/announce-text'

import BottomBar from '../components/bottom-bar'

import ColumnsResizer from '../components/columns-resizer'

import FilteredValuesList from '../components/filtered-values-list'

import SelectedRowsToolbar from '../components/selected-rows-toolbar'

import Table from '../components/table'
// ########## <Table /> sub-components ##########
import RowExpansionButton from '../components/table/components/_shared/checkbox-cell/components/row-expansion-button'
import TableBody from '../components/table/components/body'
import TableHead from '../components/table/components/head'

import Toolbar from '../components/toolbar'
// ########## <Toolbar /> sub-components ##########
import DataFilterBox from '../components/toolbar/components/data-filter-box'
import ColumnVisibilitiesBox from '../components/toolbar/components/column-visibilities-box'

export interface DataTableComponents {
    AnnounceText: typeof AnnounceText
    BottomBar?: typeof BottomBar

    /**
     * Global `<Checkbox />` component inside `<DataTable />`
     */
    Checkbox?: typeof Checkbox
    ColumnsResizer?: typeof ColumnsResizer
    ColumnVisibilitiesBox?: typeof ColumnVisibilitiesBox
    DataFilterBox?: typeof DataFilterBox
    FilteredValuesList?: typeof FilteredValuesList
    RowExpansionButton?: typeof RowExpansionButton
    SelectedRowsToolbar?: typeof SelectedRowsToolbar
    Table?: typeof Table
    TableBody?: typeof TableBody
    TableHead?: typeof TableHead
    Toolbar?: typeof Toolbar

    /**
     * Global `<Tooltip />` component inside `<DataTable />`
     */
    Tooltip?: typeof Tooltip
}
