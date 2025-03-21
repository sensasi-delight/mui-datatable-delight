// vendors
import { tss } from 'tss-react/mui'
// materials
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
//
import { useDataTableContext, type DataTableState } from '@src'

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
            component="fieldset"
            className={classes.root}
            aria-label={textLabels.titleAria}
        >
            <Typography variant="caption" className={classes.title}>
                {textLabels.title}
            </Typography>

            <FormGroup className={classes.formGroup}>
                <Button onClick={selectAll}>Show All</Button>

                {state.columns.map((column, index) => {
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
                                    <Checkbox
                                        color="primary"
                                        className={classes.checkbox}
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }}
                                        onChange={() => handleColChange(index)}
                                        checked={column.display}
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

export default TableViewCol

const useStyles = tss.withName('MUIDataTableViewCol').create(({ theme }) => ({
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
