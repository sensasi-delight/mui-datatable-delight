import type { ReactNode } from 'react'

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

export interface TextLabelsType {
    body: {
        noMatch: string | ReactNode
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
