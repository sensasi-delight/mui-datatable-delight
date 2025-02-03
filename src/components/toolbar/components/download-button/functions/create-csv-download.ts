import type { Primitive } from '@src/types/values/primitive'
import type { DataTableProps } from '../../../../../data-table.props'
import type { DataTableOptions } from '../../../../../types/options'
import type { DataTableState } from '../../../../../types/state'

/**
 * @todo Add datetime on default filename
 */
export function createCsvDownload<T>(
    columns: DataTableState<T>['columns'],
    data: DataTableState<T>['data'],
    options: DataTableOptions<T>
) {
    const fromUser = options.onDownload?.(
        columns => buildHead(columns, options),
        data => buildBody(data, columns, options),
        columns,
        data
    )

    if (fromUser === false) {
        return
    }

    if (typeof fromUser === 'string') {
        downloadCsv(fromUser, options?.downloadOptions?.filename)

        return
    }

    const finalData = fromUser?.data ?? data
    const finalColumns = fromUser?.columns ?? columns

    const csvHead = buildHead(finalColumns, options)
    const csvBody = buildBody(finalData, finalColumns, options)
    const csv = `${csvHead}${csvBody}`.trim()

    downloadCsv(csv, options?.downloadOptions?.filename)
}

const buildHead = (
    columns: DataTableState['columns'],
    options: DataTableProps['options']
) =>
    columns
        .reduce(
            (soFar, column) =>
                column.download
                    ? soFar +
                      '"' +
                      prepare(column.label ?? column.name) +
                      '"' +
                      getSeparator(options?.downloadOptions?.separator)
                    : soFar,
            ''
        )
        .slice(0, -1) + '\r\n'

const buildBody = <T>(
    data: DataTableState<T>['data'],
    columns: DataTableState<T>['columns'],
    options: DataTableProps<T>['options']
) => {
    if (!data.length) return ''

    return data
        .reduce(
            (soFar, row) =>
                soFar +
                '"' +
                [...row.data]
                    .filter((_, index) => columns[index].download)
                    .map(prepare)
                    .join(
                        '"' +
                            getSeparator(options?.downloadOptions?.separator) +
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

function prepare(data: Primitive): Primitive {
    if (typeof data === 'string') {
        // Places single quote before the appearance of dangerous characters if they
        // are the first in the data string.
        return data
            .replace(/"/g, '""') // replaceDoubleQuoteInString
            .replace(/^\+|^-|^=|^@/g, "'$&")
    }

    return data
}
