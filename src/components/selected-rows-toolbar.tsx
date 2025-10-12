'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import getNewStateOnDataChange from '@src/functions/get-new-state-on-data-change'
// globals
import type { SelectRowUpdateType } from '@src/types/select-row-update'
// vendors
import type { ReactNode } from 'react'
// enums
import ClassName from '../enums/class-name'
import TableAction from '../enums/table-action'
import { buildMap } from '../functions'
import useDataTableContext from '../hooks/use-data-table-context'
// locals
import type { DataTableOptions } from '../types/options'

/**
 * The selected rows toolbar component.
 *
 * It renders the number of selected rows and either a custom component
 * provided by the user or a default delete button. When the delete button
 * is clicked, it will call the {@link DataTableOptions.onRowsDelete | `onRowsDelete`} function provided by the user
 * or the `onAction` function with the {@link TableAction.ROW_DELETE | `TableAction.ROW_DELETE`} action.
 *
 * @category  Component
 */
export default function SelectedRowsToolbar({
    selectRowUpdate
}: TableToolbarSelectProps): ReactNode {
    const {
        components,
        onAction,
        options,
        state,
        textLabels: { selectedRows: selectedRowsTextLabels },
        updateCellValueRef
    } = useDataTableContext()

    function onRowsDelete() {
        const { selectedRows, data } = state
        const selectedMap = buildMap(selectedRows.data)
        const cleanRows = data.filter(({ index }) => !selectedMap[index])

        if (
            options.onRowsDelete?.(
                selectedRows,
                cleanRows.map(ii => ii.data)
            ) === false
        ) {
            return
        }

        const newState = {
            ...getNewStateOnDataChange(
                {
                    columns: state.columns,
                    options
                },
                cleanRows,
                2, // 2 = MEAN UPDATE
                true,
                options,
                state,
                updateCellValueRef
            )
        }

        onAction?.(TableAction.ROW_DELETE, newState)
    }

    const _Tooltip = components.Tooltip ?? Tooltip

    return (
        <Box
            className={ClassName.SELECTED_ROWS_TOOLBAR}
            sx={theme => ({
                '@media print': {
                    display: 'none'
                },
                alignItems: 'center',
                display: 'flex',
                flex: '1 1 100%',
                justifyContent: 'space-between',
                paddingBottom: theme.spacing(1),
                paddingTop: theme.spacing(1),
                position: 'relative'
            })}
        >
            <div>
                <Typography
                    sx={{
                        paddingLeft: '26px'
                    }}
                    variant="subtitle1"
                >
                    {state.selectedRows.data.length}{' '}
                    {selectedRowsTextLabels.text}
                </Typography>
            </div>

            {options.customSelectedRowsToolbar?.(
                state.selectedRows,
                state.displayData ?? [],
                rows => handleCustomSelectedRows(rows, options, selectRowUpdate)
            )}

            {!options.customSelectedRowsToolbar && (
                <_Tooltip title={selectedRowsTextLabels.delete}>
                    <IconButton
                        aria-label={selectedRowsTextLabels.deleteAria}
                        onClick={() => onRowsDelete()}
                        sx={{
                            marginRight: '24px'
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </_Tooltip>
            )}
        </Box>
    )
}

export interface TableToolbarSelectProps {
    selectRowUpdate: SelectRowUpdateType
}

function handleCustomSelectedRows<T>(
    /** Array of rows indexes that are selected, e.g. [0, 2] will select first and third rows in table */
    selectedRows: number[],
    options: DataTableOptions<T>,
    selectRowUpdate: TableToolbarSelectProps['selectRowUpdate']
) {
    if (!Array.isArray(selectedRows)) {
        throw new TypeError(
            `"selectedRows" must be an "array", but it's "${typeof selectedRows}"`
        )
    }

    if (selectedRows.some(row => typeof row !== 'number')) {
        throw new TypeError(`Array "selectedRows" must contain only numbers`)
    }

    if (selectedRows.length > 1 && options.selectableRows === 'single') {
        throw new Error(
            'Can not select more than one row when "selectableRows" is "single"'
        )
    }

    const _selectedRows = selectedRows.map(row => ({
        dataIndex: row,
        index: row
    }))

    selectRowUpdate('custom', _selectedRows)
}
