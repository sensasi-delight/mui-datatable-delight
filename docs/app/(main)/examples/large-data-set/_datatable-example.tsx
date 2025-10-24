'use client'

import Button from '@mui/material/Button'
//
import DataTable, { type DataTableProps } from '@src'
// vendors
import { useEffect, useState } from 'react'

export function DataTableExample() {
    const [data, setData] = useState<Row[]>([])

    useEffect(() => {
        setData(getGenerateData())
    }, [])

    const columns: DataTableProps<Row>['columns'] = [
        {
            label: 'Name',
            name: 'name',
            options: {
                filter: true
            }
        },
        {
            label: 'Modified Title Label',
            name: 'title',
            options: {
                filter: true
            }
        },
        {
            label: 'Location',
            name: 'location',
            options: {
                filter: false
            }
        },
        {
            label: 'Age',
            name: 'age',
            options: {
                filter: true
            }
        },
        {
            label: 'Salary',
            name: 'salary',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            label: 'Phone',
            name: 'phone',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            label: 'E-mail',
            name: 'email',
            options: {
                filter: true,
                sort: false
            }
        }
    ]

    const options: DataTableProps<Row>['options'] = {
        // These next two options allow you to make it so filters need to be confirmed.
        confirmFilters: true,

        // Calling the applyNewFilters parameter applies the selected filters to the table
        customFilterDialogFooter: (_, applyNewFilters) => {
            return (
                <div style={{ marginTop: '40px' }}>
                    <Button onClick={applyNewFilters} variant="contained">
                        Apply Filters
                    </Button>
                </div>
            )
        },
        filter: true,
        filterType: 'dropdown',
        jumpToPage: true,
        responsive: 'vertical',
        rowsPerPage: 100,
        rowsPerPageOptions: [10, 100, 250, 500, 1000],
        searchDelay: 500,
        tableBodyHeight: '500px'
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

interface Row {
    name: string
    title: string
    location: string
    salary: string
    phone: string
    email: string
}

function getGenerateData(): Row[] {
    const data = []

    for (let i = 0; i < 5000; i++) {
        const name =
            FIRST_NAMES[getRandomNumber(FIRST_NAMES.length)] +
            ' ' +
            LAST_NAMES[getRandomNumber(LAST_NAMES.length)]

        data.push({
            email: `${name.replace(/ /g, '_').toLowerCase()}@example.com`,
            location: LOCATIONS[getRandomNumber(LOCATIONS.length)] ?? '',
            name: name,
            phone: '555-5555',
            salary: SALARIES[getRandomNumber(SALARIES.length)] ?? '',
            title: TITLES[getRandomNumber(TITLES.length)] ?? ''
        })
    }

    return data
}

function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max)
}

const FIRST_NAMES = [
    'Adam',
    'Jack',
    'Edward',
    'Donna',
    'Sarah',
    'Susie',
    'Sam',
    'RJ',
    'Henry',
    'Ryan',
    'Ricky',
    'James'
]

const LAST_NAMES = [
    'Robson',
    'Johnson',
    'Jackson',
    'Campo',
    'Edwards',
    'Brown',
    'Green',
    'White',
    'Simmons',
    'Gates',
    'Jobs'
]

const TITLES = [
    'Owner',
    'Unemployed',
    'Burger Flipper',
    'Coder',
    'Business Analyst',
    'Attorney',
    'Consultant',
    'Singer',
    'Painter'
]

const LOCATIONS = [
    'New York',
    'El Paso',
    'DC',
    'Dallas',
    'Santa Ana',
    'St. Petersburg',
    'London',
    'Paris'
]

const SALARIES = ['$100,000', '$50,000', '$75,000', '$80,000']
