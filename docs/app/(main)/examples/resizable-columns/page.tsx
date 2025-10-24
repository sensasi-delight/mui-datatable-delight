'use client'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import DataTable, { type DataTableOptions, type DataTableProps } from '@src'
import { useState } from 'react'

function Example() {
    const [marginLeft, setMarginLeft] = useState(10)
    const [selectableRows, setSelectableRows] =
        useState<DataTableOptions['selectableRows']>('multiple')

    const [counter, setCounter] = useState(1)
    const incrCount = () => {
        // We update an arbitrary value here to test table resizing on state updates
        setCounter(counter + 1)
    }

    const columns: DataTableProps['columns'] = [
        {
            name: 'Counter',
            options: {
                customBodyRender: () => (
                    <button onClick={incrCount} type="button">
                        +
                    </button>
                ),
                empty: true,
                sort: false
            }
        },
        {
            name: 'Name',
            options: {
                hint: '?',
                setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
            }
        },
        {
            name: 'Business Title',
            options: {
                customBodyRender: val => {
                    return (
                        <div style={{ height: '20px', position: 'relative' }}>
                            <div
                                style={{
                                    bottom: 0,
                                    boxSizing: 'border-box',
                                    display: 'block',
                                    left: 0,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    width: '100%'
                                }}
                            >
                                <div
                                    style={{
                                        boxSizing: 'border-box',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {val}
                                </div>
                            </div>
                        </div>
                    )
                },
                hint: '?'
            }
        },
        'Location'
    ]

    const data = [
        ['Gabby George ', 'Business Analyst', 'Minneapolis'],
        [
            'Aiden Lloyd',
            "Business Consultant at Tony's Burger Palace and CEO of Johnny's Blueberry Sundaes",
            'Dallas'
        ],
        ['Jaden Collins', 'Attorney', 'Santa Ana'],
        ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
        ['Aaren Rose', null, 'Toledo']
    ]

    const options: DataTableProps['options'] = {
        filter: true,
        filterType: 'dropdown',
        selectableRows: selectableRows
    }

    return (
        <>
            <FormGroup row>
                <FormControl>
                    <TextField
                        label="Left Margin"
                        onChange={e =>
                            setMarginLeft(parseInt(e.target.value, 10))
                        }
                        type="number"
                        value={marginLeft}
                    />
                </FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            checked={selectableRows === 'multiple'}
                            color="primary"
                            onChange={event =>
                                setSelectableRows(
                                    event.target.checked ? 'multiple' : 'none'
                                )
                            }
                            value="true"
                        />
                    }
                    label="Selectable Rows"
                />
            </FormGroup>

            <div style={{ marginLeft: `${marginLeft}px` }}>
                <DataTable
                    columns={columns}
                    data={data}
                    options={options}
                    title={`ACME Employee list [${counter}]`}
                />

                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                        options={options}
                        title={'ACME Employee list'}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    options={options}
                    title={'ACME Employee list'}
                />
            </div>
        </>
    )
}

export default Example
