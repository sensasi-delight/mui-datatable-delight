import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { makeStyles } from 'tss-react/mui'
import { useMainContext } from '../hooks/use-main-context'
import type { DataTableState } from '../data-table.props.type/state'

const CLASS_ID = 'datatable-delight--toolbar--view-col'

export function ToolbarViewCol({
    columns,
    onColumnUpdate
}: ToolbarViewColProps) {
    const { components, textLabels } = useMainContext()
    const { classes, cx } = useStyles()

    const handleColChange = (index: number) => {
        onColumnUpdate(index)
    }

    return (
        <FormControl
            component="fieldset"
            className={cx(CLASS_ID, classes.root)}
            aria-label={textLabels.viewColumns.titleAria}
        >
            <Typography variant="caption" className={classes.title}>
                {textLabels.viewColumns.title}
            </Typography>

            <FormGroup className={classes.formGroup}>
                {columns.map((column, index) => {
                    if (column.display === 'excluded' || !column.viewColumns) {
                        return
                    }

                    return (
                        <FormControlLabel
                            key={index}
                            classes={{
                                root: classes.formControl,
                                label: classes.label
                            }}
                            control={
                                <components.Checkbox
                                    color="primary"
                                    data-description="table-view-col"
                                    className={classes.checkbox}
                                    classes={{
                                        root: classes.checkboxRoot,
                                        checked: classes.checked
                                    }}
                                    onChange={() => handleColChange(index)}
                                    checked={column.display === 'true'}
                                    value={column.name}
                                />
                            }
                            label={column.label}
                        />
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}

const useStyles = makeStyles()(theme => ({
    root: {
        padding: '16px 24px 16px 24px',
        fontFamily: 'Roboto'
    },
    title: {
        marginLeft: '-7px',
        marginRight: '24px',
        fontSize: '14px',
        color: theme.palette.text.secondary,
        textAlign: 'left',
        fontWeight: 500
    },
    formGroup: {
        marginTop: '8px'
    },
    formControl: {},
    checkbox: {
        padding: '0px',
        width: '32px',
        height: '32px'
    },
    checkboxRoot: {},
    checked: {},
    label: {
        fontSize: '15px',
        marginLeft: '8px',
        color: theme.palette.text.primary
    }
}))

interface ToolbarViewColProps {
    /** Columns used to describe table */
    columns: DataTableState['columns']

    /** Options used to describe table */
    // options: DataTableOptions

    /** Callback to trigger View column update */
    onColumnUpdate: (columnIndex: number) => void

    /** Extend the style applied to components */
    // classes?: PropTypes.object
}
