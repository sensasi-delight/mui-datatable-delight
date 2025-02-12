'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
// globals
import type { SelectRowUpdateType } from '@src/types/select-row-update'
import { buildMap } from '../functions'
import getNewStateOnDataChange from '@src/functions/get-new-state-on-data-change'
// locals
import type { DataTableOptions } from '../types/options'
import type { SelectedRowDataState } from '@src/types/state/selected-row-data'
import useDataTableContext from '../hooks/use-data-table-context'
// enums
import ClassName from '../enums/class-name'
import TableAction from '../enums/table-action'

/**
 * The selected rows toolbar component.
 *
 * It renders the number of selected rows and either a custom component
 * provided by the user or a default delete button. When the delete button
 * is clicked, it will call the {@link options.onRowsDelete | `onRowsDelete`} function provided by the user
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
        props,
        state,
        setState,
        textLabels: { selectedRows: selectedRowsTextLabels }
    } = useDataTableContext()
    const { classes } = useStyles()

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
                    columns: props?.columns ?? [],
                    data: cleanRows,
                    options
                },
                2, // 2 = MEAN UPDATE
                true,
                options,
                state,
                setState
            )
        }

        onAction?.(TableAction.ROW_DELETE, newState)
    }

    const _Tooltip = components.Tooltip ?? Tooltip

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    {state.selectedRows.data.length}{' '}
                    {selectedRowsTextLabels.text}
                </Typography>
            </div>

            {options.customToolbarSelect?.(
                state.selectedRows,
                state.displayData ?? [],
                rows => handleCustomSelectedRows(rows, options, selectRowUpdate)
            )}

            {!options.customToolbarSelect && (
                <_Tooltip title={selectedRowsTextLabels.delete}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => onRowsDelete()}
                        aria-label={selectedRowsTextLabels.deleteAria}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </_Tooltip>
            )}
        </div>
    )
}

const useStyles = tss
    .withName(ClassName.SELECTED_ROWS_TOOLBAR)
    .create(({ theme }) => ({
        root: {
            flex: '1 1 100%',
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            '@media print': {
                display: 'none'
            }
        },
        title: {
            paddingLeft: '26px'
        },
        iconButton: {
            marginRight: '24px'
        },
        deleteIcon: {}
    }))

export interface TableToolbarSelectProps {
    selectRowUpdate: SelectRowUpdateType
}

function handleCustomSelectedRows<T>(
    /** Array of rows indexes that are selected, e.g. [0, 2] will select first and third rows in table */
    selectedRows: SelectedRowDataState[],
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

    selectRowUpdate('custom', selectedRows)
}
