// vendors
import type { MUIDataTableToolbarSelect } from 'mui-datatables'
import { makeStyles } from 'tss-react/mui'
// materials
import type { Theme } from '@mui/material'
import { IconButton, Typography } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
// locals
import type { DataTableOptions } from '../data-table.props.type/options'
import { useMainContext } from '../hooks/use-main-context'

export function TableToolbarSelect({
    onRowsDelete,
    selectedRows,
    options,
    displayData,
    selectRowUpdate
}: {
    /** Options used to describe table */
    options: DataTableOptions

    /** Current row selected or not */
    rowSelected?: boolean

    /** Callback to trigger selected rows delete */
    onRowsDelete: () => void

    displayData: MUIDataTableToolbarSelect['displayData']

    selectRowUpdate?: MUIDataTableToolbarSelect['selectRowUpdate']

    selectedRows: Parameters<
        Required<DataTableOptions>['customToolbarSelect']
    >[0]
}) {
    const { textLabels, components } = useMainContext()
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    {selectedRows.data.length} {textLabels.selectedRows.text}
                </Typography>
            </div>

            {options.customToolbarSelect ? (
                options.customToolbarSelect(
                    selectedRows,
                    displayData ?? [],
                    (rows: number[]) =>
                        handleCustomSelectedRows(rows, options, selectRowUpdate)
                )
            ) : (
                <components.Tooltip title={textLabels.selectedRows.delete}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => onRowsDelete()}
                        aria-label={textLabels.selectedRows.deleteAria}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </components.Tooltip>
            )}
        </div>
    )
}

const useStyles = makeStyles({
    name: 'datatable-delight--toolbar-select'
})(({ spacing }: Theme) => ({
    root: {
        flex: '1 1 100%',
        display: 'flex',
        position: 'relative',
        zIndex: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing(1),
        paddingBottom: spacing(1),
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
