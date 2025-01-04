import { DataTableProps } from '..'
import { DEFAULT_TEXT_LABELS } from './use-main-context.process-text-labels.default-text-labels'

/**
 * ⚠️ THIS FUNCTION SHOULD NOT BE USED OUTSIDE THE `use-main-context.tsx` ⚠️
 *
 * Merge `textLabels` from prop with `DEFAULT_TEXT_LABELS`
 */
export function processTextLabels(
    textLabelsFromProp: DataTableProps['textLabels']
): typeof DEFAULT_TEXT_LABELS {
    /**
     * Alias for `DEFAULT_TEXT_LABELS` to reduce code
     */
    const A = DEFAULT_TEXT_LABELS

    /**
     * Alias for `textLabelsFromProp` to reduce code
     */
    const B = textLabelsFromProp

    return {
        body: {
            noMatch: B?.body?.noMatch ?? A.body.noMatch,
            toolTip: B?.body?.toolTip ?? A.body.toolTip
        },
        pagination: {
            displayRows: B?.pagination?.displayRows ?? A.pagination.displayRows,
            jumpToPage: B?.pagination?.jumpToPage ?? A.pagination.jumpToPage,
            next: B?.pagination?.next ?? A.pagination.next,
            previous: B?.pagination?.previous ?? A.pagination.previous,
            rowsPerPage: B?.pagination?.rowsPerPage ?? A.pagination.rowsPerPage
        },
        toolbar: {
            search: B?.toolbar?.search ?? A.toolbar.search,
            downloadCsv: B?.toolbar?.downloadCsv ?? A.toolbar.downloadCsv,
            print: B?.toolbar?.print ?? A.toolbar.print,
            viewColumns: B?.toolbar?.viewColumns ?? A.toolbar.viewColumns,
            filterTable: B?.toolbar?.filterTable ?? A.toolbar.filterTable
        },
        filter: {
            all: B?.filter?.all ?? A.filter.all,
            title: B?.filter?.title ?? A.filter.title,
            reset: B?.filter?.reset ?? A.filter.reset
        },
        viewColumns: {
            title: B?.viewColumns?.title ?? A.viewColumns.title,
            titleAria: B?.viewColumns?.titleAria ?? A.viewColumns.titleAria
        },
        selectedRows: {
            text: B?.selectedRows?.text ?? A.selectedRows.text,
            delete: B?.selectedRows?.delete ?? A.selectedRows.delete,
            deleteAria: B?.selectedRows?.deleteAria ?? A.selectedRows.deleteAria
        }
    }
}
