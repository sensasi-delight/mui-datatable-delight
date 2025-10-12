'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import DataTable, { type DataTableOptions, type DataTableProps } from '@src'
import { useState } from 'react'
import CustomToolbarSelect from './_custom-toolbar-select'

function Example() {
    const [stp, setStp] =
        useState<DataTableOptions['selectToolbarPlacement']>('replace')

    const columns = ['Name', 'Title', 'Location', 'Age', 'Salary']

    const data = [
        ['Gabby George', 'Business Analyst', 'Minneapolis', 30, 100000],
        ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, 200000],
        ['Jaden Collins', 'Attorney', 'Santa Ana', 27, 500000],
        ['Franky Rees', 'Business Analyst', 'St. Petersburg', 22, 50000],
        ['Aaren Rose', 'Business Consultant', 'Toledo', 28, 75000],
        ['Blake Duncan', 'Business Management Analyst', 'San Diego', 65, 94000],
        ['Frankie Parry', 'Agency Legal Counsel', 'Jacksonville', 71, 210000],
        ['Lane Wilson', 'Commercial Specialist', 'Omaha', 19, 65000],
        ['Robin Duncan', 'Business Analyst', 'Los Angeles', 20, 77000],
        ['Mel Brooks', 'Business Consultant', 'Oklahoma City', 37, 135000],
        ['Harper White', 'Attorney', 'Pittsburgh', 52, 420000],
        ['Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, 150000],
        ['Frankie Long', 'Industrial Analyst', 'Austin', 31, 170000],
        ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, 90000],
        ['Justice Mann', 'Business Consultant', 'Chicago', 24, 133000],
        [
            'Addison Navarro',
            'Business Management Analyst',
            'New York',
            50,
            295000
        ],
        ['Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, 200000],
        ['Eli Mejia', 'Commercial Specialist', 'Long Beach', 65, 400000],
        ['Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, 110000],
        ['Danny Leon', 'Computer Scientist', 'Newark', 60, 220000],
        ['Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, 180000],
        ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, 99000],
        ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, 90000],
        ['Terry Macdonald', 'Commercial Specialist', 'Miami', 39, 140000],
        ['Justice Mccarthy', 'Attorney', 'Tucson', 26, 330000],
        ['Silver Carey', 'Computer Scientist', 'Memphis', 47, 250000],
        ['Franky Miles', 'Industrial Analyst', 'Buffalo', 49, 190000],
        ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, 80000],
        [
            'Gabby Strickland',
            'Business Process Consultant',
            'Scottsdale',
            26,
            45000
        ],
        ['Mason Ray', 'Computer Scientist', 'San Francisco', 39, 142000]
    ]

    const options: DataTableProps['options'] = {
        customSelectedRowsToolbar: (
            selectedRows,
            displayData,
            setSelectedRows
        ) => (
            <CustomToolbarSelect
                displayData={displayData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        ),
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        rowsPerPage: 10,
        selectableRows: 'multiple',
        selectToolbarPlacement: stp
    }

    return (
        <>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Select Toolbar Placement
                </InputLabel>
                <Select
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    onChange={e =>
                        setStp(
                            e.target
                                .value as DataTableOptions['selectToolbarPlacement']
                        )
                    }
                    style={{
                        marginBottom: '10px',
                        marginRight: 10,
                        width: '200px'
                    }}
                    value={stp}
                >
                    <MenuItem value={'none'}>none</MenuItem>
                    <MenuItem value={'replace'}>replace</MenuItem>
                    <MenuItem value={'above'}>above</MenuItem>
                </Select>
            </FormControl>
            <DataTable
                columns={columns}
                data={data}
                options={options}
                title={'ACME Employee list'}
            />
        </>
    )
}

export default Example
