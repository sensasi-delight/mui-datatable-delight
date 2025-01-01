// vendors
import type { MUIDataTableToolbarSelect } from 'mui-datatables'
import { makeStyles } from 'tss-react/mui'
// materials
import type { Theme } from '@mui/material'
import { IconButton, Typography, Tooltip as MuiTooltip } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
// locals
import type { DataTableProps } from '../data-table.props.type'
import type { DataTableOptions } from '../data-table.props.type/options'
import { TEXT_LABELS } from '../statics'

export function TableToolbarSelect({
    onRowsDelete,
    selectedRows,
    options,
    displayData,
    selectRowUpdate,
    components = {}
}: {
    /** Options used to describe table */
    options: DataTableOptions

    /** Current row selected or not */
    rowSelected?: boolean

    /** Callback to trigger selected rows delete */
    onRowsDelete: () => void

    displayData: MUIDataTableToolbarSelect['displayData']

    selectRowUpdate?: MUIDataTableToolbarSelect['selectRowUpdate']

    components?: DataTableProps['components']

    selectedRows: Parameters<
        Required<DataTableOptions>['customToolbarSelect']
    >[0]
}) {
    const { classes } = useStyles()

    const textLabels =
        options.textLabels?.selectedRows ?? TEXT_LABELS.selectedRows

    const Tooltip = components.Tooltip ?? MuiTooltip

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    {selectedRows.data.length} {textLabels.text}
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
                <Tooltip title={textLabels.delete}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => onRowsDelete()}
                        aria-label={textLabels.deleteAria}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
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
