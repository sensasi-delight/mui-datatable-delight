import PropTypes from 'prop-types'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { makeStyles } from 'tss-react/mui'
import { useMainContext } from '../hooks/use-main-context'

const useStyles = makeStyles({ name: 'MUIDataTableViewCol' })(theme => ({
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

const TableViewCol = ({
    columns,
    components = {},
    onColumnUpdate,
    updateColumns
}) => {
    const { textLabels } = useMainContext()
    const { classes } = useStyles()
    const CheckboxComponent = components.Checkbox || Checkbox

    const handleColChange = index => {
        onColumnUpdate(index)
    }

    return (
        <FormControl
            component="fieldset"
            className={classes.root}
            aria-label={textLabels.viewColumns.titleAria}
        >
            <Typography variant="caption" className={classes.title}>
                {textLabels.viewColumns.title}
            </Typography>
            <FormGroup className={classes.formGroup}>
                {columns.map((column, index) => {
                    return (
                        column.display !== 'excluded' &&
                        column.viewColumns !== false && (
                            <FormControlLabel
                                key={index}
                                classes={{
                                    root: classes.formControl,
                                    label: classes.label
                                }}
                                control={
                                    <CheckboxComponent
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
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}

TableViewCol.propTypes = {
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Callback to trigger View column update */
    onColumnUpdate: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object
}

export default TableViewCol
