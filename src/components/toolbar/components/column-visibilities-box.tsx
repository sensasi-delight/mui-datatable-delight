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
            className={ComponentClassName.TOOLBAR__COLUMN_VISIBILITIES_BOX}
            component="fieldset"
            style={{
                fontFamily: 'Roboto',
                padding: '16px 24px 16px 24px'
            }}
        >
            <Typography
                style={{
                    color: 'var(--mui-palette-text-secondary)',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginLeft: '-7px',
                    marginRight: '24px',
                    textAlign: 'left'
                }}
                variant="caption"
            >
                {textLabels.viewColumns.title}
            </Typography>

            <FormGroup
                sx={{
                    marginTop: '8px'
                }}
            >
                {state.columns.map((column, index) => {
                    if (column.display === 'excluded' || !column.viewColumns) {
                        return
                    }

                    return (
                        <FormControlLabel
                            control={
                                <_Checkbox
                                    checked={column.display === true}
                                    color="primary"
                                    onChange={() => handleColChange(index)}
                                    sx={{
                                        height: '32px',
                                        padding: '0px',
                                        width: '32px'
                                    }}
                                    value={column.name}
                                />
                            }
                            key={index}
                            label={column.label}
                            slotProps={{
                                typography: {
                                    sx: {
                                        color: 'var(--mui-palette-text-primary)',
                                        fontSize: '15px',
                                        marginLeft: '8px'
                                    }
                                }
                            }}
                        />
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}

// export interface ToolbarViewColProps {
//     /** Extend the style applied to components */
//     // classes?: PropTypes.object
// }
