'use client'

// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
// locals
import type { DataTableOptions } from '../data-table.props.type/options'
import type { DataTableState } from '../data-table.props.type/state'
import { useDataTableContext } from '../hooks'
import { ICON_BUTTON_DEFAULT_SX } from './toolbar.icon-button-default-sx'
import { createCsvDownload } from './toolbar.functions.create-csv-download'

export function ToolbarDownloadButton() {
    const {
        icons,
        options,
        state,
        textLabels: { toolbar: toolbarTextLabels }
    } = useDataTableContext()

    return (
        <Tooltip title={toolbarTextLabels.downloadCsv} disableFocusListener>
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
    const columnOrderIndices = getColumnOrderIndices(columnOrder)
    let columnsToDownload = columnOrderIndices.map(idx => columns[idx])
    let dataToDownload = getDataToDownload(data, columnOrderIndices)

    if (shouldUseDisplayedRowsOnly(options)) {
        dataToDownload = getFilteredDataToDownload(
            displayData,
            data,
            columnOrderIndices
        )
    }

    if (shouldUseDisplayedColumnsOnly(options)) {
        columnsToDownload = getDisplayedColumns(columnsToDownload)
        dataToDownload = filterDataByDisplayedColumns(
            dataToDownload,
            columns,
            columnOrderIndices
        )
    }

    createCsvDownload(columnsToDownload, dataToDownload, options)
}

function getColumnOrderIndices(columnOrder: any[]): number[] {
    return Array.isArray(columnOrder) ? columnOrder.map((_, idx) => idx) : []
}

function getDataToDownload(data: any[], columnOrderIndices: number[]): any[] {
    return data.map(row => ({
        index: row.index,
        data: columnOrderIndices.map(idx => row.data[idx])
    }))
}

function shouldUseDisplayedRowsOnly(options: DataTableOptions): boolean {
    return options.downloadOptions?.filterOptions?.useDisplayedRowsOnly || false
}

function getFilteredDataToDownload(
    displayData: DataTableState['displayData'],
    data: DataTableState['data'],
    columnOrderIndices: number[]
): any[] {
    return displayData
        .map(row => ({
            index: row.index,
            data: row.data.map((column, i) =>
                getActualValue(column, row.dataIndex, i, data)
            )
        }))
        .map(row => ({
            index: row.index,
            data: columnOrderIndices.map(idx => row.data[idx])
        }))
}

function getActualValue(
    column: any,
    dataIndex: number,
    colIndex: number,
    data: any[]
): any {
    if (isReactElement(column)) {
        return data.find(d => d.index === dataIndex)?.data[colIndex]
    }
    return typeof column === 'function'
        ? data.find(d => d.index === dataIndex)?.data[colIndex]
        : column
}

function isReactElement(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

function shouldUseDisplayedColumnsOnly(options: DataTableOptions): boolean {
    return (
        options.downloadOptions?.filterOptions?.useDisplayedColumnsOnly || false
    )
}

function getDisplayedColumns(columns: any[]): any[] {
    return columns.filter(column => column.display === 'true')
}

function filterDataByDisplayedColumns(
    data: any[],
    columns: any[],
    columnOrderIndices: number[]
): any[] {
    return data.map(row => ({
        ...row,
        data: row.data.filter(
            (_, idx) => columns[columnOrderIndices[idx]].display === 'true'
        )
    }))
}
