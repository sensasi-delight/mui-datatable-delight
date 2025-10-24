// materials
import type Checkbox from '@mui/material/Checkbox'
import type Tooltip from '@mui/material/Tooltip'

// ########## <Datatable /> sub-components ##########
import type AnnounceText from '../components/announce-text'

import type BottomBar from '../components/bottom-bar'

import type FilteredValuesList from '../components/filtered-values-list'

import type SelectedRowsToolbar from '../components/selected-rows-toolbar'

import type Table from '../components/table'
// ########## <Table /> sub-components ##########
import type RowExpansionButton from '../components/table/components/_shared/checkbox-cell/components/row-expansion-button'
import type TableBody from '../components/table/components/body'
import type TableHead from '../components/table/components/head'

import type Toolbar from '../components/toolbar'
import type ColumnVisibilitiesBox from '../components/toolbar/components/column-visibilities-box'
// ########## <Toolbar /> sub-components ##########
import type DataFilterBox from '../components/toolbar/components/data-filter-box'

export interface DataTableComponents {
    AnnounceText: typeof AnnounceText
    BottomBar: typeof BottomBar

    /**
     * Global `<Checkbox />` component inside `<DataTable />`
     */
    Checkbox: typeof Checkbox
    ColumnVisibilitiesBox: typeof ColumnVisibilitiesBox
    DataFilterBox: typeof DataFilterBox
    FilteredValuesList: typeof FilteredValuesList
    RowExpansionButton: typeof RowExpansionButton
    SelectedRowsToolbar: typeof SelectedRowsToolbar
    Table: typeof Table
    TableBody: typeof TableBody
    TableHead: typeof TableHead
    Toolbar: typeof Toolbar

    /**
     * Global `<Tooltip />` component inside `<DataTable />`
     */
    Tooltip: typeof Tooltip
}
