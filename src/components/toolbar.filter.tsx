// materials
import {
    Button,
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
    Typography
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
// locals
import type { DataTableOptions } from '../data-table.props.type/options'
import type { DataTableProps } from '../../'
import {
    type DataTableState,
    FilterTypeEnum
} from '../data-table.props.type/state'
import { TEXT_LABELS } from '../statics'

export function DataTableToolbarFilter(props: DataTableToolbarFilterProps) {
    const { classes } = useStyles()
    const [filterList, setFilterList] = useState(props.filterList)

    return (
        <TableFilter
            {...props}
            classes={classes}
            filterList={filterList}
            setFilterList={setFilterList}
        />
    )
}

const useStyles = makeStyles({
    name: 'datatable-delight--toolbar--filter'
})(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: '24px 24px 36px 24px',
        fontFamily: 'Roboto'
    },
    header: {
        flex: '0 0 auto',
        marginBottom: '16px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        display: 'inline-block',
        marginLeft: '7px',
        color: theme.palette.text.primary,
        fontSize: '14px',
        fontWeight: 500
    },
    noMargin: {
        marginLeft: '0px'
    },
    reset: {
        alignSelf: 'left'
    },
    resetLink: {
        marginLeft: '16px',
        fontSize: '12px',
        cursor: 'pointer'
    },
    filtersSelected: {
        alignSelf: 'right'
    },
    /* checkbox */
    checkboxListTitle: {
        marginLeft: '7px',
        marginBottom: '8px',
        fontSize: '14px',
        color: theme.palette.text.secondary,
        textAlign: 'left',
        fontWeight: 500
    },
    checkboxFormGroup: {
        marginTop: '8px'
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

class TableFilter extends React.Component<
    DataTableToolbarFilterProps & {
        /**
         * @deprecated TEMPORARY FOR MIGRATION
         */
        setFilterList: React.Dispatch<React.SetStateAction<string[][]>>
    }
> {
    filterUpdate = (
        index: number,
        value: DataTableProps['data'][0],
        type: FilterTypeEnum,
        customUpdate: CustomUpdateType | undefined
    ) => {
        const newFilterList = this.props.filterList.slice(0)

        this.props.updateFilterByType(
            newFilterList,
            index,
            value,
            type,
            customUpdate
        )

        this.props.setFilterList(newFilterList)
    }

    handleCustomChange = (
        value: DataTableState['data'][0],
        index: number,
        column: DataTableState['columns'][0]
    ) => {
        this.filterUpdate(
            index,
            value,
            column.filterType ?? FilterTypeEnum.DROPDOWN,
            undefined
        )

        if (this.props.options.confirmFilters !== true) {
            this.props.onFilterUpdate?.(
                index,
                value,
                column,
                column.filterType ?? FilterTypeEnum.DROPDOWN
            )
        }
    }

    // ################## RENDER COMPONENT BLOCK ######################

    renderSelect(column: DataTableState['columns'][0], index: number) {
        const { classes, filterData, options, filterList } = this.props
        const textLabels = options.textLabels.filter ?? TEXT_LABELS.filter

        const renderItem =
            column.filterOptions?.renderValue ??
            (v => (v !== null ? v.toString() : ''))

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
                    <InputLabel htmlFor={column.name}>
                        {column.label}
                    </InputLabel>
                    <Select
                        fullWidth
                        value={
                            filterList[index].length
                                ? filterList[index].toString()
                                : textLabels.all
                        }
                        name={column.name}
                        onChange={event => {
                            const value =
                                event.target.value === textLabels.all
                                    ? []
                                    : [event.target.value]

                            this.filterUpdate(
                                index,
                                value,
                                FilterTypeEnum.DROPDOWN,
                                undefined
                            )

                            if (this.props.options.confirmFilters !== true) {
                                this.props.onFilterUpdate?.(
                                    index,
                                    value,
                                    column,
                                    FilterTypeEnum.DROPDOWN
                                )
                            }
                        }}
                        input={<Input name={column.name} id={column.name} />}
                    >
                        <MenuItem value={textLabels.all} key={0}>
                            {textLabels.all}
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

    renderTextField(column: DataTableState['columns'][0], index: number) {
        const { filterList, classes } = this.props

        if (column.filterOptions && column.filterOptions.renderValue) {
            console.warn(
                'Custom renderValue not supported for textField filters'
            )
        }

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
                <FormControl key={index} fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label={column.label}
                        value={filterList[index].toString() || ''}
                        data-testid={`filtertextfield-${column.name}`}
                        onChange={event => {
                            this.filterUpdate(
                                index,
                                event.target.value,
                                FilterTypeEnum.TEXTFIELD,
                                undefined
                            )

                            if (this.props.options.confirmFilters !== true) {
                                this.props.onFilterUpdate?.(
                                    index,
                                    event.target.value,
                                    column,
                                    FilterTypeEnum.TEXTFIELD
                                )
                            }
                        }}
                    />
                </FormControl>
            </Grid>
        )
    }

    renderCustomField(column: DataTableState['columns'][0], index: number) {
        const { filterData, filterList, classes } = this.props

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
                        this.handleCustomChange,
                        index,
                        column,
                        filterData
                    )}
                </FormControl>
            </Grid>
        )
    }

    render() {
        const {
            classes,
            columns,
            options,
            customFooter,
            filterList,
            components,
            onFilterReset,
            onFilterUpdate,
            setFilterList,
            filterData
        } = this.props

        const textLabels = options.textLabels.filter ?? TEXT_LABELS.filter

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
                            this.filterUpdate(
                                index,
                                value,
                                FilterTypeEnum.CHECKBOX,
                                undefined
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
                            this.filterUpdate(
                                index,
                                event.target.value,
                                FilterTypeEnum.MULTISELECT,
                                undefined
                            )

                            if (this.props.options.confirmFilters !== true) {
                                this.props.onFilterUpdate?.(
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

            return filterType === FilterTypeEnum.TEXTFIELD
                ? this.renderTextField(column, index)
                : filterType === FilterTypeEnum.CUSTOM
                  ? this.renderCustomField(column, index)
                  : this.renderSelect(column, index)
        })

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.reset}>
                        <Typography
                            variant="body2"
                            className={clsx({
                                [classes.title]: true
                            })}
                        >
                            {textLabels.title}
                        </Typography>

                        <Button
                            color="primary"
                            className={classes.resetLink}
                            tabIndex={0}
                            aria-label={textLabels.reset}
                            data-testid="filterReset-button"
                            onClick={() => {
                                setFilterList(columns.map(() => []))

                                if (options.confirmFilters !== true) {
                                    onFilterReset?.()
                                }
                            }}
                        >
                            {textLabels.reset}
                        </Button>
                    </div>

                    <div className={classes.filtersSelected} />
                </div>

                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                >
                    {renderedColumns}
                </Grid>

                {customFooter?.(filterList, () => {
                    this.props.filterList.forEach((filter, index) => {
                        this.props.onFilterUpdate?.(
                            index,
                            filter,
                            this.props.columns[index],
                            FilterTypeEnum.CUSTOM
                        )
                    })

                    this.props.handleClose() // close filter dialog popover

                    this.props.options.onFilterConfirm?.(this.props.filterList)

                    return this.props.filterList
                })}
            </div>
        )
    }
}

type FilterListType = string[][]
type CustomUpdateType = (
    filterList: FilterListType,
    filterPos: FilterListType,
    index: number
) => FilterListType

interface DataTableToolbarFilterProps {
    /**
     * @deprecated TEMPORARY FOR MIGRATION
     */
    classes: ReturnType<typeof useStyles>['classes']

    /** Data used to populate filter dropdown/checkbox */
    filterData: string[][]

    /** Data selected to be filtered against dropdown/checkbox */
    filterList: FilterListType

    /** Options used to describe table */
    options: Required<DataTableOptions>

    /** Callback to trigger filter update */
    onFilterUpdate?: (
        index: number,
        value: string | string[],
        column: DataTableState['columns'][0],
        type: FilterTypeEnum
    ) => void

    /** Callback to trigger filter reset */
    onFilterReset?: () => void

    // ####### FOUND ON CLASS BODY
    updateFilterByType: (
        newFilterList: string[][],
        index: number,
        value: DataTableProps['data'][0],
        type: string,
        customUpdate: CustomUpdateType | undefined
    ) => void

    columns: DataTableState['columns']

    handleClose: () => void

    components: {
        Checkbox: typeof Checkbox
    }

    customFooter: (
        filterList: FilterListType,
        applyFilters: () => FilterListType
    ) => ReactNode
}

/**
 * @deprecated REFACTORS WHEN COMPONENT CHANGES TO FULL FUNCTIONAL
 */
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

    /**
     * @bug THIS WORKAROUND HAS A BUG, FILTER NOT APPLIED AT FIRST CLICK.
     * @deprecated
     */
    handleCheckboxChange: (value: string) => void
}) {
    const { classes } = useStyles()
    const renderItem =
        column?.filterOptions?.renderValue ?? ((v: ReactNode) => v)

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

    const renderItem = column.filterOptions?.renderValue ?? ((v: string) => v)

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
