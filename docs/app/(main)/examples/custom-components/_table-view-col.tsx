'use client'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import { type DataTableState, useDataTableContext } from '@src'
import ComponentClassName from '@/src/enums/class-name'

export default function TableViewCol<T>({
    onColumnUpdate,
    updateColumns
}: {
    onColumnUpdate: (index: number) => void
    updateColumns: (columns: DataTableState<T>['columns']) => void
}) {
    const { state, textLabels: allTextLabels } = useDataTableContext<T>()
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
            className={ComponentClassName.TABLE__VIEW_COL}
            component="fieldset"
            sx={{
                fontFamily: 'Roboto',
                padding: '16px 24px 16px 24px'
            }}
        >
            <Typography
                sx={{
                    color: 'var(--mui-palette-text-secondary)',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginLeft: '-7px',
                    marginRight: '24px',
                    textAlign: 'left'
                }}
                variant="caption"
            >
                {textLabels.title}
            </Typography>

            <FormGroup
                sx={{
                    marginTop: '8px'
                }}
            >
                <Button onClick={selectAll}>Show All</Button>

                {state.columns.map((column, index) => {
                    return (
                        column.display !== 'excluded' &&
                        column.viewColumns !== false && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={column.display}
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
                                            fontSize: '15px',
                                            marginLeft: '8px'
                                        }
                                    }
                                }}
                            />
                        )
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}
