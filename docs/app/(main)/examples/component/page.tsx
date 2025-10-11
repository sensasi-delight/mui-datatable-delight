'use client'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import DataTable, { type DataTableProps } from '@src'
import React from 'react'
import Cities from '../_shared-components/cities'

class Example extends React.Component {
    render() {
        const columns: DataTableProps['columns'] = [
            {
                name: 'Name',
                options: {
                    customBodyRender: (value, _, __, ___, updateValue) => (
                        <TextField
                            onChange={event => updateValue(event.target.value)}
                            value={value}
                        />
                    ),
                    filter: false
                }
            },
            {
                name: 'Title',
                options: {
                    filter: true
                }
            },
            {
                name: 'Location',
                options: {
                    customBodyRender: (
                        value,
                        _,
                        columnIndex,
                        __,
                        updateValue
                    ) => (
                        <Cities
                            change={event => updateValue(event)}
                            index={columnIndex}
                            value={value?.toString() ?? ''}
                        />
                    ),
                    filter: true
                }
            },
            {
                name: 'Age',
                options: {
                    customBodyRender: (value, _, __, ___, updateValue) => (
                        <TextField
                            name="age"
                            onChange={event => updateValue(event.target.value)}
                            type="number"
                            value={value ?? ''}
                        />
                    ),
                    filter: false
                }
            },
            {
                name: 'Salary',
                options: {
                    customBodyRender: value => {
                        const nf = new Intl.NumberFormat('en-US', {
                            currency: 'USD',
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: 'currency'
                        })

                        return nf.format(value)
                    },
                    filter: true
                }
            },
            {
                name: 'Active',
                options: {
                    customBodyRender: (value, _, __, ___, updateValue) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={Boolean(value)}
                                        color="primary"
                                        onChange={event => {
                                            updateValue(
                                                event.target.value === 'Yes'
                                                    ? false
                                                    : true
                                            )
                                        }}
                                        value={value ? 'Yes' : 'No'}
                                    />
                                }
                                label={value ? 'Yes' : 'No'}
                                value={value ? 'Yes' : 'No'}
                            />
                        )
                    },
                    filter: true
                }
            }
        ]

        const data = [
            [
                'Robin Duncan',
                'Business Analyst',
                'Los Angeles',
                null,
                77000,
                false
            ],
            [
                'Mel Brooks',
                'Business Consultant',
                'Oklahoma City',
                37,
                null,
                true
            ],
            ['Harper White', 'Attorney', 'Pittsburgh', 52, 420000, false],
            [
                'Kris Humphrey',
                'Agency Legal Counsel',
                'Laredo',
                30,
                150000,
                true
            ],
            ['Frankie Long', 'Industrial Analyst', 'Austin', 31, 170000, false],
            ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, 90000, true],
            [
                'Justice Mann',
                'Business Consultant',
                'Chicago',
                24,
                133000,
                false
            ],
            [
                'Addison Navarro',
                'Business Management Analyst',
                'New York',
                50,
                295000,
                true
            ],
            [
                'Jesse Welch',
                'Agency Legal Counsel',
                'Seattle',
                28,
                200000,
                false
            ],
            [
                'Eli Mejia',
                'Commercial Specialist',
                'Long Beach',
                65,
                400000,
                true
            ],
            [
                'Gene Leblanc',
                'Industrial Analyst',
                'Hartford',
                34,
                110000,
                false
            ],
            ['Danny Leon', 'Computer Scientist', 'Newark', 60, 220000, true],
            [
                'Lane Lee',
                'Corporate Counselor',
                'Cincinnati',
                52,
                180000,
                false
            ],
            ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, 99000, true],
            ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, 90000, false],
            [
                'Terry Macdonald',
                'Commercial Specialist',
                'Miami',
                39,
                140000,
                true
            ],
            ['Justice Mccarthy', 'Attorney', 'Tucson', 26, 330000, false],
            ['Silver Carey', 'Computer Scientist', 'Memphis', 47, 250000, true],
            [
                'Franky Miles',
                'Industrial Analyst',
                'Buffalo',
                49,
                190000,
                false
            ],
            ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, 80000, true],
            [
                'Gabby Strickland',
                'Business Process Consultant',
                'Scottsdale',
                26,
                45000,
                false
            ],
            [
                'Mason Ray',
                'Computer Scientist',
                'San Francisco',
                39,
                142000,
                true
            ]
        ]

        const options: DataTableProps['options'] = {
            filter: true,
            filterType: 'dropdown',
            responsive: 'standard'
        }

        return (
            <DataTable
                columns={columns}
                data={data}
                options={options}
                title={'ACME Employee list'}
            />
        )
    }
}

export default Example
