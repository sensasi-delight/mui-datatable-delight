'use client'

import React from 'react'
// import Chip, { type ChipProps } from '@mui/material/Chip'
// materials
import { type CheckboxProps } from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import MuiTooltip, { type TooltipProps } from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import TableViewCol from './_table-view-col'
//
import DataTable, {
    // FilteredValuesList,
    type DataTableProps
} from '@src'

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
            title={title}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 250 }}
            leaveDelay={250}
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
                    filter: true,
                    filterType: 'custom',
                    filterList: ['Test Corp'],
                    customFilterListOptions: {
                        render: v =>
                            typeof v === 'string' && v.length !== 0
                                ? `Company: ${v[0]}`
                                : false,
                        update: filterList => filterList
                    },
                    filterOptions: {
                        names: [],
                        logic(status, filter) {
                            if (filter.length > 0) {
                                return status !== filter[0]
                            }
                            return false
                        },
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
                        )
                    }
                }
            },
            {
                name: 'City',
                label: 'City Label',
                options: { filterList: ['Dallas'] }
            },
            { name: 'State' },
            {
                name: 'Empty',
                options: {
                    empty: true,
                    filterType: 'checkbox',
                    filterOptions: {
                        renderValue: val => val ?? '(Empty)'
                    }
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
                title={'ACME Employee list'}
                data={data}
                columns={columns}
                options={options}
                components={{
                    // FilteredValuesList: CustomFilterList,
                    Tooltip: CustomTooltip,
                    Checkbox: CustomCheckbox,

                    // @ts-expect-error  WILL FIX THIS LATER
                    ColumnVisibilitiesBox: TableViewCol
                }}
            />
        )
    }
}

export default Example
