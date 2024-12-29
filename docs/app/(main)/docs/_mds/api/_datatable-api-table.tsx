'use client'

import { Typography } from '@mui/material'
import DataTable, { DataTableOptions, DataTableProps } from '@src'

export function DataTableApiTable() {
    const columns: DataTableProps['columns'] = [
        {
            name: 'name',
            label: 'Name',
            options: {
                customBodyRender: value => <code>{value}</code>
            }
        },
        {
            name: 'type',
            label: 'Type',
            options: {
                customBodyRender: value => <code>{value}</code>
            }
        },
        {
            name: 'description',
            label: 'Description'
        }
    ]

    const data = [
        {
            name: 'title',
            type: 'string|ReactNode',
            description: 'Title used to caption table.'
        },
        {
            name: 'columns',
            type: 'array',
            description:
                'Columns used to describe table. Must be either an array of simple strings or objects describing a column.'
        },
        {
            name: 'data',
            type: 'array',
            description: (
                <>
                    <Typography gutterBottom>
                        Data used to describe table. Must be either an array
                        containing objects of key/value pairs with values that
                        are strings or numbers, or arrays of strings or numbers.
                    </Typography>

                    <Typography gutterBottom>
                        <code>
                            {
                                '(Ex: data: [{"Name": "Joe", "Job Title": "Plumber", "Age": 30}, {"Name": "Jane", "Job Title": "Electrician", "Age": 45}] or data: [["Joe", "Plumber", 30], ["Jane", "Electrician", 45]])'
                            }
                        </code>
                    </Typography>

                    <Typography>
                        The customBodyRender and customBodyRenderLite options
                        can be used to control the data display.
                    </Typography>
                </>
            )
        },
        {
            name: 'options',
            type: 'array',
            description: 'Options used to describe table.'
        },
        {
            name: 'components',
            type: 'object',
            description: 'Custom components used to render the table.'
        }
    ]

    const options: DataTableOptions = {
        selectableRows: 'none',
        sortOrder: {
            name: 'name',
            direction: 'asc'
        },
        pagination: false
    }

    return <DataTable data={data} columns={columns} options={options} />
}
