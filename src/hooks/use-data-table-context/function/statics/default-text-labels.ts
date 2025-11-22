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
        reset: 'RESET',
        title: 'FILTERS'
    },
    pagination: {
        displayRows: 'of',
        jumpToPage: 'Jump to page',
        next: 'Next page',
        previous: 'Previous page',
        rowsPerPage: 'Rows per page'
    },
    selectedRows: {
        delete: 'Delete',
        deleteAria: 'Delete Selected Rows',
        text: 'row(s) selected'
    },
    toolbar: {
        downloadCsv: 'Download CSV',
        filterTable: 'Filter Table',
        print: 'Print',
        search: 'Search',
        viewColumns: 'View Columns'
    },
    viewColumns: {
        title: 'Show Columns',
        titleAria: 'Show/Hide Table Columns'
    }
}

export interface TextLabelsType {
    body: {
        noMatch: string | React.ReactNode
        toolTip: string
    }
    filter: {
        all: string
        reset: string
        title: string
    }
    pagination: {
        displayRows: string
        next: string
        previous: string
        rowsPerPage: string
        jumpToPage: string
    }
    selectedRows: {
        delete: string
        deleteAria: string
        text: string
    }
    toolbar: {
        downloadCsv: string
        filterTable: string
        print: string
        search: string
        viewColumns: string
    }
    viewColumns: {
        title: string
        titleAria: string
    }
}
