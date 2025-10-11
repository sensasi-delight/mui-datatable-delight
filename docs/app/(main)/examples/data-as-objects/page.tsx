'use client'

// materials
import TextField from '@mui/material/TextField'
// DataTable
import DataTable, { type DataTableProps } from '@src'
// vendors
import { useState } from 'react'

export default function Example() {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <button onClick={() => setCounter(counter + 1)}>
                Re-render - {counter}
            </button>

            <DataTable
                columns={COLUMNS}
                data={DATA}
                title="ACME Employee list"
            />
        </>
    )
}

interface DataItemType {
    name: string
    title: string
    location: string
    age: number
    salary: string
    phone: {
        home: string
        cell: string
    }
}

const DATA: DataItemType[] = [
    {
        age: 30,
        location: 'Minneapolis',
        name: 'Gabby George',
        phone: { cell: '123-4567', home: '867-5309' },
        salary: '$100,000',
        title: 'Business Analyst'
    },
    {
        age: 55,
        location: 'Dallas',
        name: 'Aiden Lloyd',
        phone: { cell: '123-4568', home: '867-5310' },
        salary: '$200,000',
        title: 'Business Consultant'
    },
    {
        age: 27,
        location: 'Santa Ana',
        name: 'Jaden Collins',
        phone: { cell: '123-4569', home: '867-5311' },
        salary: '$500,000',
        title: 'Attorney'
    },
    {
        age: 22,
        location: 'St. Petersburg',
        name: 'Franky Rees',
        phone: { cell: '123-4569', home: '867-5312' },
        salary: '$50,000',
        title: 'Business Analyst'
    }
]

const COLUMNS: DataTableProps<DataItemType>['columns'] = [
    {
        label: 'Name',
        name: 'name',
        options: {
            display: 'excluded',
            filter: true
        }
    },
    {
        label: 'Modified Title Label',
        name: 'title',
        options: {
            customBodyRender: value => {
                return <span>{value}</span>
            }
        }
    },
    {
        label: 'Location',
        name: 'location',
        options: {
            customBodyRender: (value, _, __, ___, updateValue) => {
                return (
                    <TextField
                        onChange={event => updateValue(event.target.value)}
                        size="small"
                        value={value}
                    />
                )
            },
            filter: false
        }
    },
    {
        label: 'Age',
        name: 'age'
    },
    {
        label: 'Salary',
        name: 'salary',
        options: {
            sort: false
        }
    },
    {
        label: 'Home Phone',
        name: 'phone.home'
    },
    {
        label: 'Cell Phone #',
        name: 'phone.cell'
    },
    {
        label: 'Not An Attribute',
        name: 'phone2.home'
    }
]
