'use client'

import DataTable, { type DataTableProps } from '@src'
import { useState } from 'react'

export default function Example() {
    const [data, setData] = useState(defaultData)
    const [display, setDisplay] = useState([true, true, true, true, true])
    const [filterList, setFilterList] = useState(defaultFilterList)
    const [filterOptions, setFilterOptions] = useState([
        'Franky Miles',
        'this',
        'test',
        'is',
        'working'
    ])

    const handleFilterNameChange = () => {
        const string = prompt(
            'Write a semicolon-separated string to change filter names in the first column!'
        )

        if (string) setFilterOptions(string.split(';'))
    }

    const handleAddData = () => {
        const string = prompt(
            "Write a semicolon-separated string with values for 'Name', 'Title', 'Location', 'Age' and 'Salary' to add a new row of data!"
        )

        if (string) setData(prev => [string.split(';'), ...prev])
    }

    const handleChangeDisplay = () => {
        const string = prompt(
            "Write a semicolon-separated string of display options for each of the 5 columns. Options are either 'true', 'false', or 'excluded'"
        )

        if (string) setDisplay(string.split(';').map(v => v === 'true'))
    }

    const columns: DataTableProps['columns'] = [
        {
            name: 'Name',
            options: {
                customFilterListOptions: { render: v => `Name: ${v}` },
                display: display[0],
                filter: true,
                filterList: filterList[0]?.length ? filterList[0] : undefined,
                filterOptions: {
                    names: filterOptions
                }
            }
        },
        {
            name: 'Title',
            options: {
                customFilterListOptions: { render: v => `Title: ${v}` },
                display: display[1],
                filter: true,
                filterList: filterList[1]?.length ? filterList[1] : undefined,
                filterType: 'textField' // set filterType's at the column level
            }
        },
        {
            name: 'Location',
            options: {
                display: display[2],
                filter: true,
                filterList: filterList[2]?.length ? filterList[2] : undefined,
                filterOptions: {
                    fullWidth: true
                }
            }
        },
        {
            name: 'Age',
            options: {
                customFilterListOptions: { render: v => `Age: ${v}` },
                display: display[3],
                filter: true,
                filterList: filterList[3]?.length ? filterList[3] : undefined
            }
        },
        {
            name: 'Salary',
            options: {
                customFilterListOptions: { render: v => `Salary: ${v}` },
                display: display[4],
                filter: true,
                filterList: filterList[4]?.length ? filterList[4] : undefined,
                sort: false
            }
        }
    ]

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                options={{
                    filter: true,
                    filterType: 'dropdown',
                    onFilterChange: (_, newFilterList) => {
                        setFilterList(newFilterList)
                    },
                    responsive: 'vertical',
                    rowsPerPage: 10,
                    selectableRows: 'multiple'
                }}
                title="ACME Employee list"
            />
            <button
                onClick={() => setFilterList(defaultFilterList)}
                type="button"
            >
                Set starter filters!
            </button>
            <button onClick={handleFilterNameChange} type="button">
                Change filter names for first column!
            </button>
            <button onClick={handleAddData} type="button">
                Add row data!
            </button>
            <button onClick={handleChangeDisplay} type="button">
                Change which columns are displayed!
            </button>
        </>
    )
}

const defaultData = [
    ['Gabby George', 'Business Analyst', 'Minneapolis', 30, 100000],
    ['Business Analyst', 'Business Consultant', 'Dallas', 55, 200000],
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
    ['Addison Navarro', 'Business Management Analyst', 'New York', 50, 295000],
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

const defaultFilterList = [['Franky Miles'], ['Business Analyst'], [], [], []]
