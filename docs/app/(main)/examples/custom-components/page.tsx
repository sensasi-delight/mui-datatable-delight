'use client'

import React from 'react'
import Chip from '@mui/material/Chip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import MuiTooltip, { type TooltipProps } from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import Checkbox from '@mui/material/Checkbox'
import Radio, { type RadioProps } from '@mui/material/Radio'
import TableViewCol from './_table-view-col'
//
import DataTable, { FilteredValuesList } from '@src'

const CustomChip = props => {
    const { label, onDelete, columnNames, className, index } = props

    return (
        <Chip
            className={className}
            variant="outlined"
            color={
                columnNames[index].name === 'Company' ? 'secondary' : 'primary'
            }
            label={label}
            onDelete={onDelete}
        />
    )
}

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

const CustomCheckbox = (props: RadioProps) => {
    const newProps = Object.assign({}, props)

    newProps.color =
        props['data-description'] === 'row-select' ? 'secondary' : 'primary'

    return props['data-description'] === 'row-select' ? (
        <Radio {...newProps} />
    ) : (
        <Checkbox {...newProps} />
    )
}

const CustomFilterList = props => {
    return <FilteredValuesList {...props} ItemComponent={CustomChip} />
}

class Example extends React.Component {
    render() {
        const columns = [
            { name: 'Name' },
            {
                name: 'Company',
                options: {
                    filter: true,
                    filterType: 'custom',
                    filterList: ['Test Corp'],
                    customFilterListOptions: {
                        render: v => {
                            if (v.length !== 0) {
                                return `Company: ${v[0]}`
                            }
                            return false
                        },
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
                                    filterList[index][0] = event.target.value
                                    onChange(filterList[index], index, column)
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
                        renderValue: val => (val ? val : '(Empty)')
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

        let options = {
            onFilterChipClose: (index, removedFilter, filterList) => {
                console.log(index, removedFilter, filterList)
            },
            selectableRows: 'single',
            selectToolbarPlacement: 'none'
        }

        return (
            <DataTable
                title={'ACME Employee list'}
                data={data}
                columns={columns}
                options={options}
                components={{
                    FilteredValuesList: CustomFilterList,
                    Tooltip: CustomTooltip,
                    Checkbox: CustomCheckbox,
                    TableViewCol: TableViewCol
                }}
            />
        )
    }
}

export default Example
