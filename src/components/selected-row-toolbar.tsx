'use client'

// vendors
import type { MUIDataTableToolbarSelect } from 'mui-datatables'
import { tss } from 'tss-react/mui'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
// locals
import {
    TableAction,
    type DataTableOptions
} from '../types/options'
import useDataTableContext from '../hooks/use-data-table-context'
import { ClassName } from '../enums/class-name'
import { buildMap, getNewStateOnDataChange } from '../functions'

export function TableToolbarSelect({
    selectRowUpdate
}: TableToolbarSelectProps) {
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
                setState ?? (() => {})
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
                (rows: number[]) =>
                    handleCustomSelectedRows(rows, options, selectRowUpdate)
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
    .withName(ClassName.TOOLBAR__SELECT)
    .create(({ theme }) => ({
        root: {
            flex: '1 1 100%',
            display: 'flex',
            position: 'relative',
            zIndex: 120,
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
    selectRowUpdate?: MUIDataTableToolbarSelect['selectRowUpdate']
}

function handleCustomSelectedRows(
    /** Array of rows indexes that are selected, e.g. [0, 2] will select first and third rows in table */
    selectedRows: number[],
    options: DataTableOptions,
    selectRowUpdate: MUIDataTableToolbarSelect['selectRowUpdate']
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

    selectRowUpdate?.('custom', selectedRows)
}
