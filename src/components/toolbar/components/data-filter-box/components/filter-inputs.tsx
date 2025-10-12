'use client'

// materials
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectProps } from '@mui/material/Select'
import type { SxProps } from '@mui/material/styles'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// global enums
import FilterType from '@src/enums/filter-type'
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { FilterUpdateType } from '@src/types/filter-update'
// locals
import { type DataTableState } from '@src/types/state'
import type { ColumnState } from '@src/types/state/column'
import type { Primitive } from '@src/types/values/primitive'
// vendors
import type { ReactElement, ReactNode } from 'react'

/**
 * A component that renders a list of filters in a form.
 *
 * @category  Component
 */
export default function ToolbarDataFilterBoxFilters<T>({
    filterUpdate,
    innerFilterList: filterList
}: {
    filterUpdate: FilterUpdateType<T>
    innerFilterList: string[][]
}): ReactElement {
    const { textLabels, options, state } = useDataTableContext<T>()

    const renderedColumns = state.columns.map((column, index) => {
        if (!column.filter) return

        const filterType = column.filterType ?? options.filterType

        if (filterType === FilterType.CHECKBOX) {
            return (
                <DataTableToolbarFilterCheckbox
                    column={column}
                    filterData={state.filterData}
                    filterList={filterList}
                    handleCheckboxChange={value => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                value as string,
                                column,
                                FilterType.CHECKBOX
                            )
                        }
                    }}
                    index={index}
                    key={index}
                />
            )
        }

        if (filterType === FilterType.MULTISELECT) {
            return (
                <DataTableToolbarFilterMultiselect
                    column={column}
                    filterData={state.filterData}
                    filterList={filterList}
                    index={index}
                    key={index}
                    onSelectChange={event => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                event.target.value,
                                column,
                                FilterType.MULTISELECT
                            )
                        }
                    }}
                />
            )
        }

        if (filterType === FilterType.TEXTFIELD) {
            return (
                <RenderTextField
                    column={column}
                    filterList={filterList}
                    index={index}
                    key={index}
                    onChange={event => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                event.target.value,
                                column,
                                FilterType.TEXTFIELD
                            )
                        }
                    }}
                />
            )
        }

        if (filterType === FilterType.CUSTOM) {
            return (
                <RenderCustomField
                    column={column}
                    filterData={state.filterData}
                    filterList={filterList}
                    handleCustomChange={(value, index, column) => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                value,
                                column,
                                column.filterType ?? FilterType.DROPDOWN
                            )
                        }
                    }}
                    index={index}
                    key={index}
                />
            )
        }

        return (
            <RenderSelect
                column={column}
                filterData={state.filterData}
                filterList={filterList}
                index={index}
                key={index}
                onChange={event => {
                    const value =
                        event.target.value === textLabels.filter.all
                            ? []
                            : [event.target.value]

                    if (options.confirmFilters !== true) {
                        filterUpdate?.(
                            index,
                            value,
                            column,
                            FilterType.DROPDOWN
                        )
                    }
                }}
            />
        )
    })

    return (
        <Grid
            alignItems="center"
            container
            direction="row"
            justifyContent="flex-start"
            spacing={4}
        >
            {renderedColumns}
        </Grid>
    )
}

const SXS: {
    [key: string]: SxProps
} = {
    checkboxFormControl: { margin: '0px' },

    checkboxFormControlLabel: {
        fontSize: '15px',
        marginLeft: '8px'
    },
    // checkboxIcon: { height: '32px', width: '32px' },
    checkboxListTitle: {
        color: 'var(--mui-palette-text-secondary)',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '8px',
        marginLeft: '7px',
        textAlign: 'left'
    }
}

function DataTableToolbarFilterCheckbox<T>({
    index,
    column,
    filterData,
    filterList,
    handleCheckboxChange
}: {
    index: number
    column: ColumnState<T>
    filterData: DataTableState<T>['filterData']
    filterList: DataTableState<T>['filterList']
    handleCheckboxChange: (value: Primitive) => void
}) {
    const { components } = useDataTableContext()
    const renderItem = column?.filterOptions?.renderValue ?? (v => v)

    const _Checkbox = components.Checkbox ?? Checkbox

    return (
        <Grid
            size={{
                xs: 6
            }}
        >
            <FormGroup>
                <Grid
                    size={{
                        xs: 12
                    }}
                >
                    <Typography sx={SXS.checkboxListTitle} variant="body2">
                        {column.label}
                    </Typography>
                </Grid>
                <Grid container>
                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <Grid key={filterIndex}>
                            <FormControlLabel
                                sx={SXS.checkboxFormControl}
                                slotProps={{
                                    typography: {
                                        sx: SXS.checkboxFormControlLabel
                                    }
                                }}
                                control={
                                    <_Checkbox
                                        checked={filterList[index]?.includes(
                                            filterValue as string
                                        )}
                                        color="primary"
                                        data-description="table-filter"
                                        onChange={() =>
                                            handleCheckboxChange(filterValue)
                                        }
                                        value={
                                            filterValue != null
                                                ? filterValue.toString()
                                                : ''
                                        }
                                    />
                                }
                                key={filterIndex}
                                label={renderItem(filterValue)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
        </Grid>
    )
}

function DataTableToolbarFilterMultiselect<T>({
    column,
    index,
    filterList,
    onSelectChange,
    filterData
}: {
    column: ColumnState<T>
    index: number
    filterList: string[][]
    onSelectChange: SelectProps<string[]>['onChange']
    filterData: DataTableState<T>['filterData']
}) {
    const { components } = useDataTableContext()

    const renderItem =
        column.filterOptions?.renderValue ?? (v => v as ReactNode)

    const width = column.filterOptions?.fullWidth ? 12 : 6

    const _Checkbox = components.Checkbox ?? Checkbox

    return (
        <Grid
            key={index}
            size={{
                xs: width
            }}
            sx={{
                mt: '16px'
            }}
        >
            <FormControl fullWidth key={index} variant="standard">
                <InputLabel htmlFor={column.name}>{column.label}</InputLabel>

                <Select
                    fullWidth
                    input={<Input id={column.name} name={column.name} />}
                    multiple
                    name={column.name}
                    onChange={onSelectChange}
                    renderValue={selected =>
                        selected.map(renderItem).join(', ')
                    }
                    value={filterList[index] ?? []}
                >
                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <MenuItem
                            key={filterIndex + 1}
                            value={filterValue as string}
                        >
                            <_Checkbox
                                checked={filterList[index]?.includes(
                                    filterValue as string
                                )}
                                color="primary"
                                data-description="table-filter"
                                value={
                                    filterValue != null
                                        ? filterValue.toString()
                                        : ''
                                }
                            />
                            <ListItemText
                                primary={renderItem(filterValue) as string}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

function RenderTextField<T>({
    column,
    index,
    onChange,
    filterList
}: {
    column: ColumnState<T>
    index: number
    onChange: TextFieldProps['onChange']
    filterList: DataTableState<T>['filterList']
}) {
    if (column.filterOptions?.renderValue) {
        console.warn('Custom renderValue not supported for textField filters')
    }

    const width = column.filterOptions?.fullWidth ? 12 : 6

    return (
        <Grid
            size={{ xs: width }}
            sx={{
                mt: '16px'
            }}
        >
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    label={column.label}
                    onChange={onChange}
                    value={filterList[index]?.toString() ?? ''}
                    variant="standard"
                />
            </FormControl>
        </Grid>
    )
}

function RenderCustomField<T>({
    column,
    filterData,
    filterList,
    index,
    handleCustomChange
}: {
    column: ColumnState<T>
    filterData: DataTableState<T>['filterData']
    filterList: DataTableState<T>['filterList']
    index: number
    handleCustomChange: (
        value: string | string[],
        index: number,
        column: ColumnState<T>
    ) => void
}) {
    const width = column.filterOptions?.fullWidth ? 12 : 6

    const display = column.filterOptions?.display

    /**
     * CAN'T FIND ANY DECLARATIONS OF THIS, DISABLE FOR NOW
     */
    // || (options.filterOptions && options.filterOptions.display)

    if (!display) {
        console.error(
            'Property "display" is required when using custom filter type.'
        )

        return
    }

    /**
     * CAN'T FIND ANY DECLARATIONS OF THIS, DISABLE FOR NOW
     */
    // if (column.filterListOptions && column.filterListOptions.renderValue) {
    //     console.warn('"renderValue" is ignored for custom filter fields')
    // }

    return (
        <Grid
            key={index}
            size={{ xs: width }}
            sx={{
                mt: '16px'
            }}
        >
            <FormControl fullWidth key={index}>
                {display(
                    filterList,
                    handleCustomChange,
                    index,
                    column,
                    filterData
                )}
            </FormControl>
        </Grid>
    )
}

function RenderSelect<T>({
    column,
    filterData,
    filterList,
    index,
    onChange
}: {
    column: ColumnState<T>
    filterData: DataTableState<T>['filterData']
    filterList: DataTableState<T>['filterList']
    index: number
    onChange: SelectProps<string>['onChange']
}) {
    const { textLabels } = useDataTableContext()

    const renderItem = column.filterOptions?.renderValue ?? (v => v)

    const width = column.filterOptions?.fullWidth ? 12 : 6

    return (
        <Grid
            key={index}
            size={{ xs: width }}
            sx={{
                mt: '16px'
            }}
        >
            <FormControl fullWidth key={index} variant="standard">
                <InputLabel htmlFor={column.name}>{column.label}</InputLabel>
                <Select
                    fullWidth
                    input={<Input id={column.name} name={column.name} />}
                    name={column.name}
                    onChange={onChange}
                    value={
                        filterList[index]?.length
                            ? filterList[index]?.toString()
                            : textLabels.filter.all
                    }
                >
                    <MenuItem key={0} value={textLabels.filter.all}>
                        {textLabels.filter.all}
                    </MenuItem>

                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <MenuItem
                            key={filterIndex + 1}
                            value={filterValue as string}
                        >
                            {renderItem(filterValue)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}
