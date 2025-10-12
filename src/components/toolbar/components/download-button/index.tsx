'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ComponentClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
// globals
import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'
// locals
import type { ColumnState } from '@src/types/state/column'
import type { DataItemState } from '@src/types/state/data-item'
import type { DisplayDataState } from '@src/types/state/display-data'
import type { ReactElement } from 'react'
// materials
import { ICON_BUTTON_DEFAULT_SX } from '../statics/icon-button-default-sx'
import { createCsvDownload } from './functions/create-csv-download'

/**
 * A component that renders a button for downloading the data as a CSV file.
 */
export function ToolbarDownloadButton(): ReactElement {
    const {
        icons,
        options,
        state,
        textLabels: { toolbar: toolbarTextLabels }
    } = useDataTableContext()

    return (
        <Tooltip disableFocusListener title={toolbarTextLabels.downloadCsv}>
            <span>
                <IconButton
                    className={ComponentClassName.TOOLBAR__DOWNLOAD_BUTTON}
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

function handleCSVDownload<T>(
    { columns, columnOrder, data, displayData }: DataTableState<T>,
    options: DataTableOptions<T>
) {
    const columnOrderIndices = getColumnOrderIndices(columnOrder)

    let columnsToDownload: ColumnState<T>[] = columnOrderIndices.map(idx => {
        const column = columns[idx]
        if (!column) {
            throw new Error('Column not found')
        }

        return column
    })

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

function getColumnOrderIndices(columnOrder: unknown[]): number[] {
    return Array.isArray(columnOrder) ? columnOrder.map((_, idx) => idx) : []
}

function getDataToDownload(
    data: DataItemState[],
    columnOrderIndices: number[]
) {
    return data.map(row => ({
        data: columnOrderIndices.map(idx => row.data[idx]),
        index: row.index
    }))
}

function shouldUseDisplayedRowsOnly<T>(options: DataTableOptions<T>): boolean {
    return options.downloadOptions?.filterOptions?.useDisplayedRowsOnly ?? false
}

function getFilteredDataToDownload<T>(
    displayData: DataTableState<T>['displayData'],
    data: DataItemState[],
    columnOrderIndices: number[]
): DataItemState[] {
    return displayData
        .map((row, i) => ({
            data: row.data.map((cell, ii) =>
                getActualValue(cell, row.dataIndex, ii, data)
            ),
            index: i
        }))
        .map(row => ({
            data: columnOrderIndices.map(idx => row.data[idx]),
            index: row.index
        }))
}

function getActualValue<T>(
    column: DisplayDataState<T>[number]['data'][number],
    dataIndex: number,
    colIndex: number,
    data: DataItemState[]
) {
    if (isReactElement(column)) {
        return data.find(d => d.index === dataIndex)?.data[colIndex]
    }
    return typeof column === 'function'
        ? data.find(d => d.index === dataIndex)?.data[colIndex]
        : column
}

function isReactElement(obj: unknown): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

function shouldUseDisplayedColumnsOnly<T>(
    options: DataTableOptions<T>
): boolean {
    return (
        options.downloadOptions?.filterOptions?.useDisplayedColumnsOnly ?? false
    )
}

function getDisplayedColumns<T>(columns: ColumnState<T>[]) {
    return columns.filter(column => column.display)
}

function filterDataByDisplayedColumns<T>(
    data: DataItemState[],
    columns: ColumnState<T>[],
    columnOrderIndices: number[]
) {
    return data.map(row => {
        return {
            ...row,
            data: row.data.filter((_, i) => {
                const colIndex = columnOrderIndices[i]

                if (typeof colIndex === 'undefined') {
                    throw new Error('Column index not found')
                }

                return columns[colIndex]?.display === true
            })
        }
    })
}
