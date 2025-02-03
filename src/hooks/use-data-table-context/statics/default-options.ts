import { type DataTableOptions } from '@src/types/options'
import RowsSelectedToolbarPlacement from '@src/enums/rows-selected-toolbar-placement'

export const DEFAULT_OPTIONS = {
    caseSensitive: false,
    download: true,
    downloadOptions: {
        filename: 'tableDownload.csv',
        separator: ','
    },
    draggableColumns: {
        enabled: false,
        transitionTime: 300
    },
    elevation: 4,
    enableNestedDataAccess: '',
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
    resizableColumns: false,
    responsive: 'vertical',
    rowHover: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    search: true,
    searchOpen: false,
    searchAlwaysOpen: false,
    searchDelay: 0,
    selectableRows: 'multiple',
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    selectableRowsHeader: true,
    selectToolbarPlacement: RowsSelectedToolbarPlacement.REPLACE,
    serverSide: false,
    setTableProps: () => ({}),
    sort: true,
    sortFilterList: true,
    tableBodyHeight: 'auto',
    viewColumns: true
} satisfies DataTableOptions
