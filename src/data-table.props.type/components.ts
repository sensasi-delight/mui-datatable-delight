// vendors
import type { ReactNode } from 'react'
// materials
import type { SvgIconComponent } from '@mui/icons-material'
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
import TableViewCol from '../components/toolbar.view-col'
import TableResize from '../components/resize'

export interface DataTableComponents {
    Checkbox?: typeof Checkbox | ReactNode
    ExpandButton?: typeof ExpandButton | ReactNode
    icons?: {
        SearchIcon?: SvgIconComponent | ReactNode
        DownloadIcon?: SvgIconComponent | ReactNode
        PrintIcon?: SvgIconComponent | ReactNode
        ViewColumnIcon?: SvgIconComponent | ReactNode
        FilterIcon?: SvgIconComponent | ReactNode
    }
    TableBody?: typeof DataTableBody | ReactNode
    TableFilter?: typeof DataTableToolbarFilter | ReactNode
    TableFilterList?: typeof TableFilterList | ReactNode
    TableFooter?: typeof TableFooter | ReactNode
    TableHead?: typeof TableHead | ReactNode
    TableResize?: typeof TableResize | ReactNode
    TableToolbar?: typeof Toolbar | ReactNode
    TableToolbarSelect?: typeof TableToolbarSelect | ReactNode
    TableViewCol?: typeof TableViewCol | ReactNode
    Tooltip?: typeof Tooltip | ReactNode
}
