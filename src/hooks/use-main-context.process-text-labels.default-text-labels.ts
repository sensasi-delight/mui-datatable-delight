import {
    MUIDataTableTextLabelsFilter,
    MUIDataTableTextLabelsPagination,
    MUIDataTableTextLabelsSelectedRows,
    MUIDataTableTextLabelsToolbar,
    MUIDataTableTextLabelsViewColumns
} from 'mui-datatables'

/*
 * Default text labels.
 */
export const DEFAULT_TEXT_LABELS: TextLabelsType = {
    body: {
        noMatch: 'Sorry, no matching records found',
        toolTip: 'Sort'
    },
    filter: {
        all: 'All',
        title: 'FILTERS',
        reset: 'RESET'
    },
    pagination: {
        next: 'Next Page',
        previous: 'Previous Page',
        rowsPerPage: 'Rows per page:',
        displayRows: 'of',
        jumpToPage: 'Jump to Page:'
    },
    selectedRows: {
        text: 'row(s) selected',
        delete: 'Delete',
        deleteAria: 'Delete Selected Rows'
    },
    toolbar: {
        search: 'Search',
        downloadCsv: 'Download CSV',
        print: 'Print',
        viewColumns: 'View Columns',
        filterTable: 'Filter Table'
    },
    viewColumns: {
        title: 'Show Columns',
        titleAria: 'Show/Hide Table Columns'
    }
}

interface TextLabelsType {
    body: {
        noMatch: string | React.ReactNode
        toolTip: string
    }
    filter: MUIDataTableTextLabelsFilter
    pagination: MUIDataTableTextLabelsPagination
    selectedRows: MUIDataTableTextLabelsSelectedRows
    toolbar: MUIDataTableTextLabelsToolbar
    viewColumns: MUIDataTableTextLabelsViewColumns
}
