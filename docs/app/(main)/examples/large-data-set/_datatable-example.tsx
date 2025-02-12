'use client'

// vendors
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
//
import DataTable, { type DataTableProps } from '@src'

export function DataTableExample() {
    const [data, setData] = useState<Row[]>([])

    useEffect(() => {
        setData(getGenerateData())
    }, [])

    const columns: DataTableProps<Row>['columns'] = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true
            }
        },
        {
            name: 'title',
            label: 'Modified Title Label',
            options: {
                filter: true
            }
        },
        {
            name: 'location',
            label: 'Location',
            options: {
                filter: false
            }
        },
        {
            name: 'age',
            label: 'Age',
            options: {
                filter: true
            }
        },
        {
            name: 'salary',
            label: 'Salary',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'phone',
            label: 'Phone',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'email',
            label: 'E-mail',
            options: {
                filter: true,
                sort: false
            }
        }
    ]

    const options: DataTableProps<Row>['options'] = {
        rowsPerPage: 100,
        rowsPerPageOptions: [10, 100, 250, 500, 1000],
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        tableBodyHeight: '500px',
        searchDelay: 500,
        jumpToPage: true,

        // These next two options allow you to make it so filters need to be confirmed.
        confirmFilters: true,

        // Calling the applyNewFilters parameter applies the selected filters to the table
        customFilterDialogFooter: (_, applyNewFilters) => {
            return (
                <div style={{ marginTop: '40px' }}>
                    <Button variant="contained" onClick={applyNewFilters}>
                        Apply Filters
                    </Button>
                </div>
            )
        }
    }

    return (
        <DataTable
            title={'ACME Employee list'}
            data={data}
            columns={columns}
            options={options}
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
            name: name,
            title: TITLES[getRandomNumber(TITLES.length)] ?? '',
            location: LOCATIONS[getRandomNumber(LOCATIONS.length)] ?? '',
            salary: SALARIES[getRandomNumber(SALARIES.length)] ?? '',
            phone: '555-5555',
            email: name.replace(/ /g, '_').toLowerCase() + '@example.com'
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
