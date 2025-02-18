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
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// vendors
import type { ReactElement } from 'react'
import { tss } from 'tss-react/mui'
// locals
import { type DataTableState } from '@src/types/state'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import FilterType from '@src/enums/filter-type'
import type { ColumnState } from '@src/types/state/column'
import type { FilterUpdateType } from '@src/types/filter-update'
//

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
    const { classes } = useStyles()

    const renderedColumns = state.columns.map((column, index) => {
        if (!column.filter) return

        const filterType = column.filterType ?? options.filterType

        if (filterType === FilterType.CHECKBOX) {
            return (
                <DataTableToolbarFilterCheckbox
                    index={index}
                    column={column}
                    key={index}
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
                />
            )
        }

        if (filterType === FilterType.MULTISELECT) {
            return (
                <DataTableToolbarFilterMultiselect
                    column={column}
                    index={index}
                    key={index}
                    filterData={state.filterData}
                    filterList={filterList}
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
                    filterList={filterList}
                    column={column}
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
                    index={index}
                    key={index}
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
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            className={classes.root}
        >
            {renderedColumns}
        </Grid>
    )
}

const useStyles = tss
    // .withName()
    .create(({ theme }) => ({
        root: {},
        checkboxListTitle: {
            marginLeft: '7px',
            marginBottom: '8px',
            fontSize: '14px',
            color: theme.palette.text.secondary,
            textAlign: 'left',
            fontWeight: 500
        },

        checkboxFormControl: {
            margin: '0px'
        },

        checkboxFormControlLabel: {
            fontSize: '15px',
            marginLeft: '8px',
            color: theme.palette.text.primary
        },
        checkboxIcon: {
            width: '32px',
            height: '32px'
        },
        checkbox: {},
        checked: {},
        gridListTile: {
            marginTop: '16px'
        }
    }))

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
    handleCheckboxChange: (value: T[keyof T]) => void
}) {
    const { components } = useDataTableContext()
    const { classes } = useStyles()
    const renderItem = column?.filterOptions?.renderValue ?? (v => v)

    const _Checkbox = components.Checkbox ?? Checkbox

    return (
        <Grid item xs={6}>
            <FormGroup>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        className={classes.checkboxListTitle}
                    >
                        {column.label}
                    </Typography>
                </Grid>
                <Grid container>
                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <Grid item key={filterIndex}>
                            <FormControlLabel
                                key={filterIndex}
                                classes={{
                                    root: classes.checkboxFormControl,
                                    label: classes.checkboxFormControlLabel
                                }}
                                control={
                                    <_Checkbox
                                        data-description="table-filter"
                                        color="primary"
                                        className={classes.checkboxIcon}
                                        onChange={() =>
                                            handleCheckboxChange(filterValue)
                                        }
                                        checked={filterList[index]?.includes(
                                            filterValue as string
                                        )}
                                        classes={{
                                            root: classes.checkbox,
                                            checked: classes.checked
                                        }}
                                        value={
                                            filterValue != null
                                                ? filterValue.toString()
                                                : ''
                                        }
                                    />
                                }
                                label={renderItem(filterValue) as string}
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
    const { classes } = useStyles()

    const renderItem = column.filterOptions?.renderValue ?? (v => v)

    const width = column.filterOptions?.fullWidth ? 12 : 6

    const _Checkbox = components.Checkbox ?? Checkbox

    return (
        <Grid
            item
            key={index}
            xs={width}
            classes={{
                'grid-xs-12': classes.gridListTile,
                'grid-xs-6': classes.gridListTile
            }}
        >
            <FormControl key={index} variant="standard" fullWidth>
                <InputLabel htmlFor={column.name}>{column.label}</InputLabel>

                <Select<string[]>
                    multiple
                    fullWidth
                    value={filterList[index] ?? []}
                    renderValue={selected =>
                        selected.map(renderItem).join(', ')
                    }
                    name={column.name}
                    onChange={onSelectChange}
                    input={<Input name={column.name} id={column.name} />}
                >
                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <MenuItem
                            value={filterValue as string}
                            key={filterIndex + 1}
                        >
                            <_Checkbox
                                data-description="table-filter"
                                color="primary"
                                checked={filterList[index]?.includes(
                                    filterValue as string
                                )}
                                value={
                                    filterValue != null
                                        ? filterValue.toString()
                                        : ''
                                }
                                className={classes.checkboxIcon}
                                classes={{
                                    root: classes.checkbox,
                                    checked: classes.checked
                                }}
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
    const { classes } = useStyles()

    if (column.filterOptions?.renderValue) {
        console.warn('Custom renderValue not supported for textField filters')
    }

    const width = column.filterOptions?.fullWidth ? 12 : 6

    return (
        <Grid
            item
            xs={width}
            classes={{
                'grid-xs-12': classes.gridListTile,
                'grid-xs-6': classes.gridListTile
            }}
        >
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    variant="standard"
                    label={column.label}
                    value={filterList[index]?.toString() ?? ''}
                    onChange={onChange}
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
    const { classes } = useStyles()

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
            item
            key={index}
            xs={width}
            classes={{
                'grid-xs-12': classes.gridListTile,
                'grid-xs-6': classes.gridListTile
            }}
        >
            <FormControl key={index} fullWidth>
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
    const { classes } = useStyles()

    const renderItem = column.filterOptions?.renderValue ?? (v => v)

    const width = column.filterOptions?.fullWidth ? 12 : 6

    return (
        <Grid
            item
            key={index}
            xs={width}
            classes={{
                'grid-xs-12': classes.gridListTile,
                'grid-xs-6': classes.gridListTile
            }}
        >
            <FormControl key={index} variant="standard" fullWidth>
                <InputLabel htmlFor={column.name}>{column.label}</InputLabel>
                <Select
                    fullWidth
                    value={
                        filterList[index]?.length
                            ? filterList[index]?.toString()
                            : textLabels.filter.all
                    }
                    name={column.name}
                    onChange={onChange}
                    input={<Input name={column.name} id={column.name} />}
                >
                    <MenuItem value={textLabels.filter.all} key={0}>
                        {textLabels.filter.all}
                    </MenuItem>

                    {filterData[index]?.map((filterValue, filterIndex) => (
                        <MenuItem
                            value={filterValue as string}
                            key={filterIndex + 1}
                        >
                            {renderItem(filterValue) as string}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}
