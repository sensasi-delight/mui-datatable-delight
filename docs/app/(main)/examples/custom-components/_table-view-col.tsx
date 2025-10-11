// vendors

// materials
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
//
import { type DataTableState, useDataTableContext } from '@src'
import { tss } from 'tss-react/mui'

function TableViewCol<T>({
    onColumnUpdate,
    updateColumns
}: {
    onColumnUpdate: (index: number) => void
    updateColumns: (columns: DataTableState<T>['columns']) => void
}) {
    const { state, textLabels: allTextLabels } = useDataTableContext<T>()
    const { classes } = useStyles()
    const textLabels = allTextLabels.viewColumns

    const handleColChange = (index: number) => {
        onColumnUpdate(index)
    }

    const selectAll = () => {
        const newColumns = state.columns.map(col => {
            const newCol = Object.assign({}, col)

            newCol.display = true

            return newCol
        })

        updateColumns(newColumns)
    }

    return (
        <FormControl
            aria-label={textLabels.titleAria}
            className={classes.root}
            component="fieldset"
        >
            <Typography className={classes.title} variant="caption">
                {textLabels.title}
            </Typography>

            <FormGroup className={classes.formGroup}>
                <Button onClick={selectAll}>Show All</Button>

                {state.columns.map((column, index) => {
                    return (
                        column.display !== 'excluded' &&
                        column.viewColumns !== false && (
                            <FormControlLabel
                                classes={{
                                    label: classes.label,
                                    root: classes.formControl
                                }}
                                control={
                                    <Checkbox
                                        checked={column.display}
                                        classes={{
                                            checked: classes.checked,
                                            root: classes.checkboxRoot
                                        }}
                                        className={classes.checkbox}
                                        color="primary"
                                        onChange={() => handleColChange(index)}
                                        value={column.name}
                                    />
                                }
                                key={index}
                                label={column.label}
                            />
                        )
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}

export default TableViewCol

const useStyles = tss.withName('MUIDataTableViewCol').create(({ theme }) => ({
    checkbox: {
        height: '32px',
        padding: '0px',
        width: '32px'
    },
    checkboxRoot: {},
    checked: {},
    formControl: {},
    formGroup: {
        marginTop: '8px'
    },
    label: {
        color: theme.palette.text.primary,
        fontSize: '15px',
        marginLeft: '8px'
    },
    root: {
        fontFamily: 'Roboto',
        padding: '16px 24px 16px 24px'
    },
    title: {
        color: theme.palette.text.secondary,
        fontSize: '14px',
        fontWeight: 500,
        marginLeft: '-7px',
        marginRight: '24px',
        textAlign: 'left'
    }
}))
