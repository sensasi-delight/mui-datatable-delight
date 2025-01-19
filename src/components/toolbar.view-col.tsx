// vendors
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Typography
} from '@mui/material'
import { tss } from 'tss-react/mui'
// globals
import { useMainContext } from '../hooks/use-main-context'
import { TableAction } from '../data-table.props.type/options'

const CLASS_ID = 'datatable-delight--toolbar--view-col'

export function ToolbarViewCol({}: ToolbarViewColProps) {
    const { components, onAction, options, state, textLabels } =
        useMainContext()
    const { classes, cx } = useStyles()

    const handleColChange = (index: number) => {
        const newColumns = [...state.columns]

        newColumns[index].display =
            newColumns[index].display === 'true' ? 'false' : 'true'

        onAction?.(TableAction.VIEW_COLUMNS_CHANGE, {
            columns: newColumns
        })

        const cb = options.onViewColumnsChange || options.onColumnViewChange

        cb?.(
            newColumns[index].name,
            newColumns[index].display === 'true' ? 'add' : 'remove'
        )
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
                {state.columns.map((column, index) => {
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

const useStyles = tss.create(({ theme }) => ({
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

export interface ToolbarViewColProps {
    /** Extend the style applied to components */
    // classes?: PropTypes.object
}
