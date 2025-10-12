import RowsSelectedToolbarPlacement from '@src/statics/select-toolbar-placement'
import { type DataTableOptions } from '@src/types/options'

export const DEFAULT_OPTIONS = {
    caseSensitive: false,
    download: true,
    downloadOptions: {
        filename: 'tableDownload.csv',
        separator: ','
    },
    elevation: 4,
    expandableRows: false,
    expandableRowsHeader: true,
    expandableRowsOnClick: false,
    filter: true,
    filterArrayFullMatch: true,
    filterType: 'dropdown',
    fixedHeader: true,
    fixedSelectColumn: true,
    jumpToPage: false,
    pagination: true,
    print: true,
    responsive: 'vertical',
    rowHover: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    search: true,
    searchAlwaysOpen: false,
    searchDelay: 0,
    searchOpen: false,
    selectableRows: 'multiple',
    selectableRowsHeader: true,
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    selectToolbarPlacement: RowsSelectedToolbarPlacement.REPLACE,
    serverSide: false,
    setTableProps: () => ({}),
    sort: true,
    sortFilterList: true,
    tableBodyHeight: 'auto',
    viewColumns: true
} satisfies DataTableOptions
