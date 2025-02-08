'use client'

// materials
import { tss } from 'tss-react/mui'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
// globals
import type { DataTableOptions } from '@src/types/options'
import type { DataTableState } from '@src/types/state'
import useDataTableContext from '@src/hooks/use-data-table-context'
import ComponentClassName from '@src/enums/class-name'
// locals
import type { ColumnState } from '@src/types/state/column'
import type { DataItemState } from '@src/types/state/data-item'
import { ICON_BUTTON_DEFAULT_SX } from '../statics/icon-button-default-sx'
import { createCsvDownload } from './functions/create-csv-download'

export function ToolbarDownloadButton() {
    const { classes } = useStyles()
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
                    className={classes.root}
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

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__DOWNLOAD_BUTTON)
    .create({
        root: {}
    })

function handleCSVDownload<T>(
    { columns, columnOrder, data, displayData }: DataTableState<T>,
    options: DataTableOptions<T>
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

function getColumnOrderIndices(columnOrder: unknown[]): number[] {
    return Array.isArray(columnOrder) ? columnOrder.map((_, idx) => idx) : []
}

function getDataToDownload(data: unknown[], columnOrderIndices: number[]) {
    return data.map(row => ({
        index: row.index,
        data: columnOrderIndices.map(idx => row.data[idx])
    }))
}

function shouldUseDisplayedRowsOnly<T>(options: DataTableOptions<T>): boolean {
    return options.downloadOptions?.filterOptions?.useDisplayedRowsOnly ?? false
}

function getFilteredDataToDownload<T>(
    displayData: DataTableState<T>['displayData'],
    data: DataTableState<T>['data'],
    columnOrderIndices: number[]
) {
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
    column: unknown,
    dataIndex: number,
    colIndex: number,
    data: unknown[]
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
    return data.map(row => ({
        ...row,
        data: row.data.filter(
            (_, i) => columns[columnOrderIndices[i]].display === true
        )
    }))
}
