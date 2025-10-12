'use client'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import ComponentClassName from '@src/enums/class-name'
// global enums
import TableAction from '@src/enums/table-action'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'

/**
 * @import Toolbar from ".."
 */

/**
 * A component that renders a form with checkboxes for each column with `viewColumns` set to true.
 * The component is used in the {@link Toolbar | `<Toolbar />`}.
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

        options.onColumnVisibilityChange?.(
            changedColumn.name,
            changedColumn.display === true ? 'add' : 'remove'
        )
    }

    const _Checkbox = components.Checkbox ?? Checkbox

    return (
        <FormControl
            aria-label={textLabels.viewColumns.titleAria}
            className={classes.root}
            component="fieldset"
        >
            <Typography className={classes.title} variant="caption">
                {textLabels.viewColumns.title}
            </Typography>

            <FormGroup className={classes.formGroup}>
                {state.columns.map((column, index) => {
                    if (column.display === 'excluded' || !column.viewColumns) {
                        return
                    }

                    return (
                        <FormControlLabel
                            classes={{
                                label: classes.label,
                                root: classes.formControl
                            }}
                            control={
                                <_Checkbox
                                    checked={column.display === true}
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
                })}
            </FormGroup>
        </FormControl>
    )
}

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__COLUMN_VISIBILITIES_BOX)
    .create(() => ({
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
            color: 'var(--mui-palette-text-primary)',
            fontSize: '15px',
            marginLeft: '8px'
        },
        root: {
            fontFamily: 'Roboto',
            padding: '16px 24px 16px 24px'
        },
        title: {
            color: 'var(--mui-palette-text-secondary)',
            fontSize: '14px',
            fontWeight: 500,
            marginLeft: '-7px',
            marginRight: '24px',
            textAlign: 'left'
        }
    }))

// export interface ToolbarViewColProps {
//     /** Extend the style applied to components */
//     // classes?: PropTypes.object
// }
