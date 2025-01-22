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
import { tss } from 'tss-react/mui'
// locals
import type { DataTableToolbarFilterProps } from './toolbar.filter'
import { type DataTableState } from '../types/state'
import useDataTableContext from '../hooks/use-data-table-context'
import { FilterTypeEnum } from '../types/columns'

export function DataTableToolbarFilterRenderFilters({
    columns,
    parentProps,
    innerFilterList: filterList
}: {
    columns: DataTableState['columns']
    parentProps: DataTableToolbarFilterProps
    innerFilterList: string[][]
    setFilterList: React.Dispatch<React.SetStateAction<string[][]>>
}) {
    const { textLabels, options } = useDataTableContext()
    const { classes } = useStyles()
    const { filterData, filterUpdate } = parentProps

    const renderedColumns = columns.map((column, index) => {
        if (!column.filter) return

        const filterType = column.filterType ?? options.filterType

        if (filterType === FilterTypeEnum.CHECKBOX) {
            return (
                <DataTableToolbarFilterCheckbox
                    index={index}
                    column={column}
                    key={index}
                    filterData={filterData}
                    filterList={filterList}
                    handleCheckboxChange={(value: string) => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                value,
                                column,
                                FilterTypeEnum.CHECKBOX
                            )
                        }
                    }}
                />
            )
        }

        if (filterType === FilterTypeEnum.MULTISELECT) {
            return (
                <DataTableToolbarFilterMultiselect
                    column={column}
                    index={index}
                    key={index}
                    filterData={filterData}
                    filterList={filterList}
                    onSelectChange={event => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                event.target.value,
                                column,
                                FilterTypeEnum.MULTISELECT
                            )
                        }
                    }}
                />
            )
        }

        if (filterType === FilterTypeEnum.TEXTFIELD) {
            return (
                <RenderTextField
                    parentProps={parentProps}
                    column={column}
                    index={index}
                    key={index}
                    onChange={event => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                event.target.value,
                                column,
                                FilterTypeEnum.TEXTFIELD
                            )
                        }
                    }}
                />
            )
        }

        if (filterType === FilterTypeEnum.CUSTOM) {
            return (
                <RenderCustomField
                    column={column}
                    index={index}
                    key={index}
                    parentProps={parentProps}
                    handleCustomChange={(
                        value: DataTableState['data'][0],
                        index: number,
                        column: DataTableState['columns'][0]
                    ) => {
                        if (options.confirmFilters !== true) {
                            filterUpdate?.(
                                index,
                                value,
                                column,
                                column.filterType ?? FilterTypeEnum.DROPDOWN
                            )
                        }
                    }}
                />
            )
        }

        return (
            <RenderSelect
                column={column}
                index={index}
                key={index}
                parentProps={parentProps}
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
                            FilterTypeEnum.DROPDOWN
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

function DataTableToolbarFilterCheckbox({
    index,
    column,
    filterData,
    filterList,
    handleCheckboxChange
}: {
    index: number
    column: DataTableState['columns'][0]
    filterData: DataTableToolbarFilterProps['filterData']
    filterList: DataTableToolbarFilterProps['filterList']
    handleCheckboxChange: (value: string) => void
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
                    {filterData[index].map((filterValue, filterIndex) => (
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
                                        checked={
                                            filterList[index].indexOf(
                                                filterValue
                                            ) >= 0
                                        }
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
                                label={renderItem(filterValue)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
        </Grid>
    )
}

function DataTableToolbarFilterMultiselect({
    column,
    index,
    filterList,
    onSelectChange,
    filterData
}: {
    column: DataTableState['columns'][0]
    index: number
    filterList: string[][]
    onSelectChange: SelectProps<string[]>['onChange']
    filterData: string[][]
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
                    {filterData[index].map((filterValue, filterIndex) => (
                        <MenuItem value={filterValue} key={filterIndex + 1}>
                            <_Checkbox
                                data-description="table-filter"
                                color="primary"
                                checked={
                                    filterList[index].indexOf(filterValue) >= 0
                                }
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
                            <ListItemText primary={renderItem(filterValue)} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

function RenderTextField({
    column,
    index,
    onChange,
    parentProps: { filterList }
}: {
    column: DataTableState['columns'][0]
    index: number
    onChange: TextFieldProps['onChange']
    parentProps: DataTableToolbarFilterProps
}) {
    const { classes } = useStyles()

    if (column.filterOptions && column.filterOptions.renderValue) {
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
                    value={filterList[index].toString() || ''}
                    data-testid={`filtertextfield-${column.name}`}
                    onChange={onChange}
                />
            </FormControl>
        </Grid>
    )
}

function RenderCustomField({
    column,
    index,
    parentProps: { filterData, filterList },
    handleCustomChange
}: {
    column: DataTableState['columns'][0]
    index: number
    parentProps: DataTableToolbarFilterProps
    handleCustomChange: (
        value: DataTableState['data'][0],
        index: number,
        column: DataTableState['columns'][0]
    ) => void
}) {
    const { classes } = useStyles()

    const width = column.filterOptions?.fullWidth ? 12 : 6

    const display = column.filterOptions && column.filterOptions.display

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

function RenderSelect({
    column,
    index,
    parentProps: { filterData, filterList },
    onChange
}: {
    column: DataTableState['columns'][0]
    index: number
    parentProps: DataTableToolbarFilterProps
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
                        filterList[index].length
                            ? filterList[index].toString()
                            : textLabels.filter.all
                    }
                    name={column.name}
                    onChange={onChange}
                    input={<Input name={column.name} id={column.name} />}
                >
                    <MenuItem value={textLabels.filter.all} key={0}>
                        {textLabels.filter.all}
                    </MenuItem>

                    {filterData[index].map((filterValue, filterIndex) => (
                        <MenuItem value={filterValue} key={filterIndex + 1}>
                            {renderItem(filterValue)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

const useStyles = tss
    .withName('datatable-delight--toolbar--filter--render-filters')
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
