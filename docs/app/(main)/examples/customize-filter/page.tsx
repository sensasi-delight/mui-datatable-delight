'use client'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
// materials
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
//
import DataTable, { type DataTableProps } from '@src'
// vendors
import React from 'react'

class Example extends React.Component {
    state = {
        ageFilterChecked: false
    }

    render() {
        const columns: DataTableProps['columns'] = [
            {
                name: 'Name',
                options: {
                    filter: true,
                    filterOptions: {
                        renderValue: v =>
                            v
                                ? (v as string).replace(
                                      /^(\w).* (.*)$/,
                                      '$1. $2'
                                  )
                                : ''
                    },
                    //display: 'excluded',
                    filterType: 'dropdown'
                }
            },
            {
                label: 'Modified Title Label',
                name: 'Title',
                options: {
                    customFilterListOptions: {
                        render: v =>
                            typeof v === 'string' ? v.toLowerCase() : v
                    },
                    filter: true
                }
            },
            {
                label: 'Location',
                name: 'Location',
                options: {
                    customFilterListOptions: {
                        render: v => {
                            if (!Array.isArray(v)) {
                                throw new Error('v is not an array')
                            }

                            return v.map(l => l.toUpperCase())
                        },
                        update: (filterList, filterPos, index) => {
                            console.log('update')
                            console.log(filterList, filterPos, index)

                            filterList[index]?.splice(filterPos, 1)

                            return filterList
                        }
                    },
                    display: true,
                    filter: true,
                    filterOptions: {
                        display: (filterList, onChange, index, column) => {
                            const optionValues = [
                                'Minneapolis',
                                'New York',
                                'Seattle'
                            ]
                            return (
                                <FormControl>
                                    <InputLabel htmlFor="select-multiple-chip">
                                        Location
                                    </InputLabel>
                                    <Select
                                        multiple
                                        onChange={event => {
                                            filterList[index] = event.target
                                                .value as string[]

                                            onChange(
                                                filterList[index] ?? [],
                                                index,
                                                column
                                            )
                                        }}
                                        renderValue={selected =>
                                            selected.join(', ')
                                        }
                                        value={filterList[index]}
                                    >
                                        {optionValues.map(item => (
                                            <MenuItem key={item} value={item}>
                                                <Checkbox
                                                    checked={filterList[
                                                        index
                                                    ]?.includes(item)}
                                                    color="primary"
                                                />
                                                <ListItemText primary={item} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )
                        },
                        logic: (location, filters) => {
                            if (filters.length)
                                return !filters.includes(location)

                            return false
                        }
                    },
                    filterType: 'custom'
                }
            },
            {
                name: 'Age',
                options: {
                    // if the below value is set, these values will be used every time the table is rendered.
                    // it's best to let the table internally manage the filterList
                    // filterList: [25, 50],
                    customFilterListOptions: {
                        render: v => {
                            if (!Array.isArray(v)) {
                                throw new Error('v is not an array')
                            }

                            if (v[0] && v[1] && this.state.ageFilterChecked) {
                                return [`Min Age: ${v[0]}`, `Max Age: ${v[1]}`]
                            } else if (
                                v[0] &&
                                v[1] &&
                                !this.state.ageFilterChecked
                            ) {
                                return `Min Age: ${v[0]}, Max Age: ${v[1]}`
                            } else if (v[0]) {
                                return `Min Age: ${v[0]}`
                            } else if (v[1]) {
                                return `Max Age: ${v[1]}`
                            }
                            return []
                        },
                        update: (filterList, filterPos, index) => {
                            console.log(
                                'customFilterListOnDelete: ',
                                filterList,
                                filterPos,
                                index
                            )

                            if (filterPos === 0) {
                                filterList[index]?.splice(filterPos, 1, '')
                            } else if (filterPos === 1) {
                                filterList[index]?.splice(filterPos, 1)
                            } else if (filterPos === -1) {
                                filterList[index] = []
                            }

                            return filterList
                        }
                    },
                    filter: true,
                    filterOptions: {
                        display: (filterList, onChange, index, column) => (
                            <div>
                                <FormLabel>Age</FormLabel>
                                <FormGroup row>
                                    <TextField
                                        label="min"
                                        onChange={event => {
                                            const currentColumnFilterList =
                                                filterList[index]

                                            if (
                                                typeof currentColumnFilterList ===
                                                'undefined'
                                            ) {
                                                throw new Error(
                                                    'filterList[index] is undefined'
                                                )
                                            }

                                            currentColumnFilterList[0] =
                                                event.target.value

                                            onChange(
                                                currentColumnFilterList,
                                                index,
                                                column
                                            )
                                        }}
                                        style={{
                                            marginRight: '5%',
                                            width: '45%'
                                        }}
                                        value={filterList[index]?.[0] ?? ''}
                                    />
                                    <TextField
                                        label="max"
                                        onChange={event => {
                                            const currentColumnFilterList =
                                                filterList[index]

                                            if (
                                                typeof currentColumnFilterList ===
                                                'undefined'
                                            ) {
                                                throw new Error(
                                                    'filterList[index] is undefined'
                                                )
                                            }

                                            currentColumnFilterList[1] =
                                                event.target.value

                                            onChange(
                                                currentColumnFilterList,
                                                index,
                                                column
                                            )
                                        }}
                                        style={{ width: '45%' }}
                                        value={filterList[index]?.[1] ?? ''}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    this.state.ageFilterChecked
                                                }
                                                onChange={event =>
                                                    this.setState({
                                                        ageFilterChecked:
                                                            event.target.checked
                                                    })
                                                }
                                            />
                                        }
                                        label="Separate Values"
                                        style={{ marginLeft: '0px' }}
                                    />
                                </FormGroup>
                            </div>
                        ),
                        logic(age, filters) {
                            if (filters[0] && filters[1]) {
                                return age < filters[0] || age > filters[1]
                            } else if (filters[0]) {
                                return age < filters[0]
                            } else if (filters[1]) {
                                return age > filters[1]
                            }
                            return false
                        },
                        names: []
                    },
                    filterType: 'custom',
                    print: false
                }
            },
            {
                name: 'Salary',
                options: {
                    filter: true,
                    filterOptions: {
                        logic(salary, filterVal) {
                            const salaryFloat = parseFloat(
                                salary.replace(/[^\d]/g, '')
                            )
                            const show =
                                (filterVal.includes('Lower wages') &&
                                    salaryFloat < 100000) ||
                                (filterVal.includes('Average wages') &&
                                    salaryFloat >= 100000 &&
                                    salaryFloat < 200000) ||
                                (filterVal.includes('Higher wages') &&
                                    salaryFloat >= 200000)

                            return !show
                        },
                        names: ['Lower wages', 'Average wages', 'Higher wages']
                    },
                    filterType: 'checkbox',
                    sort: false
                }
            }
        ]

        const data = [
            ['Gabby George', 'Business Analyst', 'Minneapolis', 30, '$100,000'],
            ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, '$200,000'],
            ['Jaden Collins', 'Attorney', 'Santa Ana', 27, '$500,000'],
            [
                'Franky Rees',
                'Business Analyst',
                'St. Petersburg',
                22,
                '$50,000'
            ],
            ['Aaren Rose', 'Business Consultant', 'Toledo', 28, '$75,000'],
            [
                'Blake Duncan',
                'Business Management Analyst',
                'San Diego',
                65,
                '$94,000'
            ],
            [
                'Frankie Parry',
                'Agency Legal Counsel',
                'Jacksonville',
                71,
                '$210,000'
            ],
            ['Lane Wilson', 'Commercial Specialist', 'Omaha', 19, '$65,000'],
            ['Robin Duncan', 'Business Analyst', 'Los Angeles', 20, '$77,000'],
            [
                'Mel Brooks',
                'Business Consultant',
                'Oklahoma City',
                37,
                '$135,000'
            ],
            ['Harper White', 'Attorney', 'Pittsburgh', 52, '$420,000'],
            ['Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, '$150,000'],
            ['Frankie Long', 'Industrial Analyst', 'Austin', 31, '$170,000'],
            ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, '$90,000'],
            ['Justice Mann', 'Business Consultant', 'Chicago', 24, '$133,000'],
            [
                'Addison Navarro',
                'Business Management Analyst',
                'New York',
                50,
                '$295,000'
            ],
            ['Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, '$200,000'],
            [
                'Eli Mejia',
                'Commercial Specialist',
                'Long Beach',
                65,
                '$400,000'
            ],
            ['Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, '$110,000'],
            ['Danny Leon', 'Computer Scientist', 'Newark', 60, '$220,000'],
            ['Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, '$180,000'],
            ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, '$99,000'],
            ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, '$90,000'],
            [
                'Terry Macdonald',
                'Commercial Specialist',
                'Miami',
                39,
                '$140,000'
            ],
            ['Justice Mccarthy', 'Attorney', 'Tucson', 26, '$330,000'],
            ['Silver Carey', 'Computer Scientist', 'Memphis', 47, '$250,000'],
            ['Franky Miles', 'Industrial Analyst', 'Buffalo', 49, '$190,000'],
            ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, '$80,000'],
            [
                'Gabby Strickland',
                'Business Process Consultant',
                'Scottsdale',
                26,
                '$45,000'
            ],
            ['Mason Ray', 'Computer Scientist', 'San Francisco', 39, '$142,000']
        ]

        const options: DataTableProps['options'] = {
            filter: true,
            filterType: 'multiselect',
            responsive: 'standard',
            setFilterChipProps: (colIndex, colName, data) => {
                console.log(colIndex, colName, data)

                return {
                    className: 'testClass123',
                    color: 'primary',
                    variant: 'outlined'
                }
            }
        }

        return (
            <DataTable
                columns={columns}
                data={data}
                options={options}
                title={'ACME Employee list - customizeFilter'}
            />
        )
    }
}

export default Example
