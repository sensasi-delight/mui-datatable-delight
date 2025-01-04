// materials
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectProps,
    TextField,
    TextFieldProps,
    Typography
} from '@mui/material'
// vendors
import { makeStyles } from 'tss-react/mui'
// locals
import type {
    CustomUpdateType,
    DataTableToolbarFilterProps
} from './toolbar.filter'
import type { DataTableProps } from '..'
import {
    type DataTableState,
    FilterTypeEnum
} from '../data-table.props.type/state'
import { useMainContext } from '../hooks/use-main-context'

export function DataTableToolbarFilterRenderFilters({
    columns,
    parentProps,
    setFilterList,
    innerFilterList: filterList
}: {
    columns: DataTableState['columns']
    parentProps: DataTableToolbarFilterProps
    innerFilterList: string[][]
    setFilterList: React.Dispatch<React.SetStateAction<string[][]>>
}) {
    const { textLabels } = useMainContext()
    const { classes } = useStyles()
    const { components, filterData, onFilterUpdate, options } = parentProps

    const renderedColumns = columns.map((column, index) => {
        if (!column.filter) return

        const filterType = column.filterType ?? options.filterType

        if (filterType === FilterTypeEnum.CHECKBOX) {
            return (
                <DataTableToolbarFilterCheckbox
                    index={index}
                    column={column}
                    key={index}
                    Component={components.Checkbox}
                    filterData={filterData}
                    filterList={filterList}
                    handleCheckboxChange={(value: string) => {
                        filterUpdate(
                            index,
                            value,
                            FilterTypeEnum.CHECKBOX,
                            undefined,
                            parentProps,
                            setFilterList
                        )

                        if (options.confirmFilters !== true) {
                            onFilterUpdate?.(
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
                    CheckboxComponent={components.Checkbox}
                    filterData={filterData}
                    filterList={filterList}
                    onSelectChange={event => {
                        filterUpdate(
                            index,
                            event.target.value,
                            FilterTypeEnum.MULTISELECT,
                            undefined,
                            parentProps,
                            setFilterList
                        )

                        if (parentProps.options.confirmFilters !== true) {
                            parentProps.onFilterUpdate?.(
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
                        filterUpdate(
                            index,
                            event.target.value,
                            FilterTypeEnum.TEXTFIELD,
                            undefined,
                            parentProps,
                            setFilterList
                        )

                        if (parentProps.options.confirmFilters !== true) {
                            parentProps.onFilterUpdate?.(
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
                        filterUpdate(
                            index,
                            value,
                            column.filterType ?? FilterTypeEnum.DROPDOWN,
                            undefined,
                            parentProps,
                            setFilterList
                        )

                        if (parentProps.options.confirmFilters !== true) {
                            parentProps.onFilterUpdate?.(
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

                    filterUpdate(
                        index,
                        value,
                        FilterTypeEnum.DROPDOWN,
                        undefined,
                        parentProps,
                        setFilterList
                    )

                    if (options.confirmFilters !== true) {
                        parentProps.onFilterUpdate?.(
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
    Component = Checkbox,
    handleCheckboxChange
}: {
    index: number
    column: DataTableState['columns'][0]
    filterData: DataTableToolbarFilterProps['filterData']
    filterList: DataTableToolbarFilterProps['filterList']
    Component: typeof Checkbox
    handleCheckboxChange: (value: string) => void
}) {
    const { classes } = useStyles()
    const renderItem = column?.filterOptions?.renderValue ?? (v => v)

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
                                    <Component
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
    CheckboxComponent = Checkbox,
    filterList,
    onSelectChange,
    filterData
}: {
    column: DataTableState['columns'][0]
    index: number
    CheckboxComponent: typeof Checkbox
    filterList: string[][]
    onSelectChange: SelectProps<string[]>['onChange']
    filterData: string[][]
}) {
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
                            <CheckboxComponent
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
    const { textLabels } = useMainContext()
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

function filterUpdate(
    index: number,
    value: DataTableProps['data'][0],
    type: FilterTypeEnum,
    customUpdate: CustomUpdateType | undefined,
    { filterList, updateFilterByType }: DataTableToolbarFilterProps,
    setFilterList: React.Dispatch<React.SetStateAction<string[][]>>
) {
    const clonedFilterList = [...filterList]

    updateFilterByType(clonedFilterList, index, value, type, customUpdate)

    setFilterList(clonedFilterList)
}

const useStyles = makeStyles({
    name: 'datatable-delight--toolbar--filter--render-filters'
})(theme => ({
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
