// materials
import { IconButton, Tooltip } from '@mui/material'
// locals
import type { DataTableOptions } from '../data-table.props.type/options'
import { useMainContext } from '../hooks/use-main-context'
import { ICON_BUTTON_DEFAULT_SX } from './toolbar.icon-button-default-sx'
import { createCsvDownload } from './toolbar.functions.create-csv-download'
import { DataTableState } from '../data-table.props.type/state'

export function ToolbarDownloadButton({
    options
}: {
    options: DataTableOptions
}) {
    const {
        icons,
        state,
        textLabels: { toolbar: toolbarTextLabels }
    } = useMainContext()

    return (
        <Tooltip title={toolbarTextLabels.downloadCsv}>
            <span>
                <IconButton
                    aria-label={toolbarTextLabels.downloadCsv}
                    disabled={options.download === 'disabled'}
                    onClick={() => handleCSVDownload(state, options)}
                    sx={ICON_BUTTON_DEFAULT_SX}
                >
                    <icons.DownloadIcon />
                </IconButton>
            </span>
        </Tooltip>
    )
}

function handleCSVDownload(
    { columns, columnOrder, data, displayData }: DataTableState,
    options: DataTableOptions
) {
    const columnOrderCopy = Array.isArray(columnOrder)
        ? columnOrder.slice(0).map((_, idx) => idx)
        : []

    let columnsToDownload = columnOrderCopy.map(idx => columns[idx])
    let dataToDownload = data.map(row => ({
        index: row.index,
        data: columnOrderCopy.map(idx => row.data[idx])
    }))

    // check rows first:
    if (options.downloadOptions?.filterOptions?.useDisplayedRowsOnly) {
        const filteredDataToDownload = displayData.map((row, index) => {
            let i = -1

            return {
                index, // Help to preserve sort order in custom render columns
                data: row.data.map(column => {
                    i += 1

                    /**
                     * if we have a custom render, which will appear as a react element, we must grab the actual value from data that matches the dataIndex and column
                     * @todo Create a utility function for checking whether or not something is a react object
                     */
                    let val =
                        typeof column === 'object' &&
                        column !== null &&
                        !Array.isArray(column)
                            ? data.find(d => d.index === row.dataIndex)?.data[i]
                            : column

                    val =
                        typeof val === 'function'
                            ? data.find(d => d.index === row.dataIndex)?.data[i]
                            : val

                    return val
                })
            }
        })

        dataToDownload = filteredDataToDownload.map(row => ({
            index: row.index,
            data: columnOrderCopy.map(idx => row.data[idx])
        }))
    }

    // now, check columns:
    if (options.downloadOptions?.filterOptions?.useDisplayedColumnsOnly) {
        columnsToDownload = columnsToDownload.filter(
            column => column.display === 'true'
        )

        dataToDownload = dataToDownload.map(row => {
            row.data = row.data.filter(
                (_, index) => columns[columnOrderCopy[index]].display === 'true'
            )
            return row
        })
    }

    createCsvDownload(columnsToDownload, dataToDownload, options)
}
