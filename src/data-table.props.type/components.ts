import type {
    MUIDataTableBody,
    MUIDataTableCheckboxProps,
    MUIDataTableExpandButton,
    MUIDataTableFilterList,
    MUIDataTableFooter,
    MUIDataTableHead,
    MUIDataTableResize,
    MUIDataTableToolbar,
    MUIDataTableToolbarSelect,
    MUIDataTableViewCol
} from 'mui-datatables'
import type { ReactNode } from 'react'
import type { SvgIconComponent } from '@mui/icons-material'
import { TooltipProps } from '@mui/material'

export type DataTableComponents = Partial<{
    Checkbox: ((props: MUIDataTableCheckboxProps) => ReactNode) | ReactNode
    ExpandButton: ((props: MUIDataTableExpandButton) => ReactNode) | ReactNode
    TableBody: ((props: MUIDataTableBody) => ReactNode) | ReactNode
    TableViewCol: ((props: MUIDataTableViewCol) => ReactNode) | ReactNode
    TableFilterList: ((props: MUIDataTableFilterList) => ReactNode) | ReactNode
    TableFooter: ((props: MUIDataTableFooter) => ReactNode) | ReactNode
    TableHead: ((props: MUIDataTableHead) => ReactNode) | ReactNode
    TableResize: ((props: MUIDataTableResize) => ReactNode) | ReactNode
    TableToolbar: ((props: MUIDataTableToolbar) => ReactNode) | ReactNode
    TableToolbarSelect:
        | ((props: MUIDataTableToolbarSelect) => ReactNode)
        | ReactNode
    Tooltip: (props: TooltipProps) => ReactNode
    icons: Partial<{
        SearchIcon: SvgIconComponent | ReactNode
        DownloadIcon: SvgIconComponent | ReactNode
        PrintIcon: SvgIconComponent | ReactNode
        ViewColumnIcon: SvgIconComponent | ReactNode
        FilterIcon: SvgIconComponent | ReactNode
    }>
}>
