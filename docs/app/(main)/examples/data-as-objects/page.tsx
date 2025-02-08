'use client'

// vendors
import React, { useState } from 'react'
// materials
import TextField from '@mui/material/TextField'
// DataTable
import DataTable, { type DataTableProps } from '@src'

export default function Example() {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <button onClick={() => setCounter(counter + 1)}>
                Re-render - {counter}
            </button>

            <DataTable
                title="ACME Employee list"
                data={DATA}
                columns={COLUMNS}
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
        name: 'Gabby George',
        title: 'Business Analyst',
        location: 'Minneapolis',
        age: 30,
        salary: '$100,000',
        phone: { home: '867-5309', cell: '123-4567' }
    },
    {
        name: 'Aiden Lloyd',
        title: 'Business Consultant',
        location: 'Dallas',
        age: 55,
        salary: '$200,000',
        phone: { home: '867-5310', cell: '123-4568' }
    },
    {
        name: 'Jaden Collins',
        title: 'Attorney',
        location: 'Santa Ana',
        age: 27,
        salary: '$500,000',
        phone: { home: '867-5311', cell: '123-4569' }
    },
    {
        name: 'Franky Rees',
        title: 'Business Analyst',
        location: 'St. Petersburg',
        age: 22,
        salary: '$50,000',
        phone: { home: '867-5312', cell: '123-4569' }
    }
]

const COLUMNS: DataTableProps<DataItemType>['columns'] = [
    {
        name: 'name',
        label: 'Name',
        options: {
            filter: true,
            display: 'excluded'
        }
    },
    {
        name: 'title',
        label: 'Modified Title Label',
        options: {
            customBodyRender: value => {
                return <span>{value}</span>
            }
        }
    },
    {
        name: 'location',
        label: 'Location',
        options: {
            filter: false,
            customBodyRender: (value, _, __, ___, updateValue) => {
                return (
                    <TextField
                        size="small"
                        value={value}
                        onChange={event => updateValue(event.target.value)}
                    />
                )
            }
        }
    },
    {
        name: 'age',
        label: 'Age'
    },
    {
        name: 'salary',
        label: 'Salary',
        options: {
            sort: false
        }
    },
    {
        name: 'phone.home',
        label: 'Home Phone'
    },
    {
        name: 'phone.cell',
        label: 'Cell Phone #'
    },
    {
        name: 'phone2.home',
        label: 'Not An Attribute'
    }
]
