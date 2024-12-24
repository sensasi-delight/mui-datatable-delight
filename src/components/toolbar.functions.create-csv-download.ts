import type { MUIDataTableColumnState } from 'mui-datatables'
import type { DataTableData } from '../data-table.props.type'
import type { DataTableOptions } from '../data-table.props.type/options'

type DataType = { index: number; data: DataTableData[0] }

/**
 * @todo Add datetime on default filename
 */
export function createCsvDownload(
    columns: MUIDataTableColumnState[],
    data: DataType[],
    options: DataTableOptions
) {
    const fromUser = options.onDownload?.(data, columns)

    if (fromUser) {
        const csvHead = buildHead(fromUser.columns ?? columns, options)
        const csvBody = buildBody(fromUser.data ?? data, columns, options)
        const csv = `${csvHead}${csvBody}`.trim()

        downloadCsv(csv, options.downloadOptions?.filename)
    }
}

const buildHead = (
    columns: MUIDataTableColumnState[],
    options: DataTableOptions
) =>
    columns
        .reduce(
            (soFar, column) =>
                column.download
                    ? soFar +
                      '"' +
                      prepare(column.label ?? column.name) +
                      '"' +
                      getSeparator(options.downloadOptions?.separator)
                    : soFar,
            ''
        )
        .slice(0, -1) + '\r\n'

const buildBody = (
    data: DataType[],
    columns: MUIDataTableColumnState[],
    options: DataTableOptions
) => {
    if (!data.length) return ''

    return data
        .reduce(
            (soFar, row) =>
                soFar +
                '"' +
                row.data
                    .filter((_, index) => columns[index].download)
                    .map(prepare)
                    .join(
                        '"' +
                            getSeparator(options.downloadOptions?.separator) +
                            '"'
                    ) +
                '"\r\n',
            ''
        )
        .trim()
}

function downloadCsv(csv: string, filename = `${document.title}.csv`) {
    const blob = new Blob([csv], { type: 'text/csv' })

    if (
        navigator &&
        'msSaveOrOpenBlob' in navigator &&
        typeof navigator.msSaveOrOpenBlob === 'function'
    ) {
        navigator.msSaveOrOpenBlob(blob, filename)
    } else {
        const dataURI = `data:text/csv;charset=utf-8,${csv}`

        const URL = window.URL ?? window.webkitURL
        const downloadURI =
            typeof URL.createObjectURL === 'undefined'
                ? dataURI
                : URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.setAttribute('href', downloadURI)
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

function getSeparator(separator = ',') {
    return separator
}

function prepare(data: DataTableData[0][0]): DataTableData[0][0] {
    if (typeof data === 'string') {
        // Places single quote before the appearance of dangerous characters if they
        // are the first in the data string.
        return data
            .replace(/\"/g, '""') // replaceDoubleQuoteInString
            .replace(/^\+|^-|^=|^@/g, "'$&")
    }

    return data
}
