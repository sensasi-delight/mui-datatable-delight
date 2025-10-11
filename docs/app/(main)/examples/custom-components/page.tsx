'use client'

// import Chip, { type ChipProps } from '@mui/material/Chip'
// materials
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MuiTooltip, { type TooltipProps } from '@mui/material/Tooltip'
//
import DataTable, {
    // FilteredValuesList,
    type DataTableProps
} from '@src'
import React from 'react'
import TableViewCol from './_table-view-col'

// const CustomChip = (props: ChipProps) => {
//     const { label, onDelete, columnNames, className, index } = props

//     return (
//         <Chip
//             className={className}
//             variant="outlined"
//             color={
//                 columnNames[index].name === 'Company' ? 'secondary' : 'primary'
//             }
//             label={label}
//             onDelete={onDelete}
//         />
//     )
// }

const CustomTooltip = ({ title, children }: TooltipProps) => {
    return (
        <MuiTooltip
            leaveDelay={250}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 250 }}
            title={title}
        >
            {children}
        </MuiTooltip>
    )
}

const CustomCheckbox = (props: CheckboxProps) => {
    const color =
        // @ts-expect-error  WILL FIX THIS LATER
        props['data-description'] === 'row-select' ? 'secondary' : 'primary'

    // @ts-expect-error  WILL FIX THIS LATER
    return props['data-description'] === 'row-select' ? (
        // @ts-expect-error  WILL FIX THIS LATER
        <Radio {...props} color={color} />
    ) : (
        <Checkbox {...props} color={color} />
    )
}

// const CustomFilterList = props => {
//     return <FilteredValuesList {...props} ItemComponent={CustomChip} />
// }

class Example extends React.Component {
    render() {
        const columns: DataTableProps['columns'] = [
            { name: 'Name' },
            {
                name: 'Company',
                options: {
                    customFilterListOptions: {
                        render: v =>
                            typeof v === 'string' && v.length !== 0
                                ? `Company: ${v[0]}`
                                : false,
                        update: filterList => filterList
                    },
                    filter: true,
                    filterList: ['Test Corp'],
                    filterOptions: {
                        display: (filterList, onChange, index, column) => (
                            <Select
                                onChange={event => {
                                    const currentColumnFilterList =
                                        filterList[index]

                                    if (
                                        currentColumnFilterList === undefined ||
                                        typeof currentColumnFilterList ===
                                            'string'
                                    ) {
                                        throw new Error()
                                    }

                                    currentColumnFilterList[0] = event.target
                                        .value as string

                                    onChange(
                                        currentColumnFilterList,
                                        index,
                                        column
                                    )
                                }}
                                value={filterList[index]}
                            >
                                <MenuItem value="Test Corp">
                                    {'Test Corp'}
                                </MenuItem>
                                <MenuItem value="Other Corp">
                                    {'Other Corp'}
                                </MenuItem>
                            </Select>
                        ),
                        logic(status, filter) {
                            if (filter.length > 0) {
                                return status !== filter[0]
                            }
                            return false
                        },
                        names: []
                    },
                    filterType: 'custom'
                }
            },
            {
                label: 'City Label',
                name: 'City',
                options: { filterList: ['Dallas'] }
            },
            { name: 'State' },
            {
                name: 'Empty',
                options: {
                    empty: true,
                    filterOptions: {
                        renderValue: val => val ?? '(Empty)'
                    },
                    filterType: 'checkbox'
                }
            }
        ]
        const data = [
            ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
            ['John Walsh', 'Test Corp', 'Hartford', null],
            ['Bob Herm', 'Other Corp', 'Tampa', 'FL'],
            ['James Houston', 'Test Corp', 'Dallas', 'TX']
        ]

        const options: DataTableProps['options'] = {
            onFilterChipClose: (index, removedFilter, filterList) => {
                console.log(index, removedFilter, filterList)
            },
            selectableRows: 'single'
            // selectToolbarPlacement: 'none'
        }

        return (
            <DataTable
                columns={columns}
                components={{
                    Checkbox: CustomCheckbox,

                    // @ts-expect-error  WILL FIX THIS LATER
                    ColumnVisibilitiesBox: TableViewCol,
                    // FilteredValuesList: CustomFilterList,
                    Tooltip: CustomTooltip
                }}
                data={data}
                options={options}
                title={'ACME Employee list'}
            />
        )
    }
}

export default Example
