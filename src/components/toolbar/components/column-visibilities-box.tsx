'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import TableAction from '@src/enums/table-action'
import ComponentClassName from '@src/enums/class-name'

/**
 * A component that renders a form with checkboxes for each column with `viewColumns` set to true.
 * The component is used in the {@link DataTableToolbar} component.
 *
 * @category  Component
 */
export default function ColumnVisibilitiesBox(): ReactNode {
    const { components, onAction, options, state, textLabels } =
        useDataTableContext()
    const { classes } = useStyles()

    const handleColChange = (index: number) => {
        const newColumns = state.columns.map(column =>
            // shallow copy to trigger re-render
            Object.assign({}, column)
        )

        const changedColumn = newColumns[index]
        if (!changedColumn) {
            throw new Error('Column not found')
        }

        changedColumn.display = !changedColumn.display
        newColumns[index] = changedColumn

        onAction?.(TableAction.VIEW_COLUMNS_CHANGE, {
            columns: newColumns
        })

        const cb =
            options.onColumnVisibilityChange ?? options.onViewColumnsChange

        cb?.(
            changedColumn.name,
            changedColumn.display === true ? 'add' : 'remove'
        )
    }

    const _Checkbox = components.Checkbox ?? Checkbox

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
                                <_Checkbox
                                    color="primary"
                                    className={classes.checkbox}
                                    classes={{
                                        root: classes.checkboxRoot,
                                        checked: classes.checked
                                    }}
                                    onChange={() => handleColChange(index)}
                                    checked={column.display === true}
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

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__COLUMN_VISIBILITIES_BOX)
    .create(({ theme }) => ({
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

// export interface ToolbarViewColProps {
//     /** Extend the style applied to components */
//     // classes?: PropTypes.object
// }
