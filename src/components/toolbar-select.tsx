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
import { ClassName } from '../enums/class-name'

export function TableToolbarSelect({
    onRowsDelete,
    selectedRows,
    displayData,
    selectRowUpdate
}: TableToolbarSelectProps) {
    const {
        components,
        options,
        textLabels: { selectedRows: selectedRowsTextLabels }
    } = useMainContext()
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    {selectedRows.data.length} {selectedRowsTextLabels.text}
                </Typography>
            </div>

            {options.customToolbarSelect?.(
                selectedRows,
                displayData ?? [],
                (rows: number[]) =>
                    handleCustomSelectedRows(rows, options, selectRowUpdate)
            )}

            {!options.customToolbarSelect && (
                <components.Tooltip title={selectedRowsTextLabels.delete}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => onRowsDelete()}
                        aria-label={selectedRowsTextLabels.deleteAria}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </components.Tooltip>
            )}
        </div>
    )
}

const useStyles = makeStyles({
    name: ClassName.TOOLBAR__SELECT + '-'
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

export interface TableToolbarSelectProps {
    /** Current row selected or not */
    // rowSelected?: boolean // UNUSED SKIP FOR NOW

    /** Callback to trigger selected rows delete */
    onRowsDelete: () => void

    displayData: MUIDataTableToolbarSelect['displayData']

    selectRowUpdate?: MUIDataTableToolbarSelect['selectRowUpdate']

    selectedRows: Parameters<
        Required<DataTableOptions>['customToolbarSelect']
    >[0]
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
