import { type DataTableOptions, STP } from '../../../types/options'

export const DEFAULT_OPTIONS: DataTableOptions = {
    caseSensitive: false,
    download: true,
    downloadOptions: {
        filename: 'tableDownload.csv', // WILL REMOVE THIS LATER, DEFAULT VALUE HAS BEEN HANDLED BY `createCSVDownload` FUNCTION
        separator: ',' // WILL REMOVE THIS LATER, DEFAULT VALUE HAS BEEN HANDLED BY `createCSVDownload` FUNCTION
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
    pagination: true,
    print: true,
    resizableColumns: false,
    responsive: 'vertical',
    rowHover: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    search: true,
    selectableRows: 'multiple',
    selectableRowsHideCheckboxes: false,
    selectableRowsOnClick: false,
    selectableRowsHeader: true,
    serverSide: false,
    setTableProps: () => ({}),
    sort: true,
    sortFilterList: true,
    tableBodyHeight: 'auto',
    viewColumns: true,
    selectToolbarPlacement: STP.REPLACE
}
