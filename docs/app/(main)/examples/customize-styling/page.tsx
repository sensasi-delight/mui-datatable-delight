'use client'

import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch, { type SwitchProps } from '@mui/material/Switch'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DataTable, { type DataTableProps } from '@src'
import { useState } from 'react'

export default function Example() {
    const [denseTable, setDenseTable] = useState(false)
    const [vertical, setVertical] = useState(false)

    const toggleDenseTable: SwitchProps['onChange'] = event => {
        setDenseTable(!!event.target.checked)
    }

    const toggleResponsive: SwitchProps['onChange'] = event => {
        setVertical(!!event.target.checked)
    }

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={denseTable}
                            color="primary"
                            onChange={toggleDenseTable}
                            value="denseTable"
                        />
                    }
                    label="Dense Table"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={vertical}
                            color="primary"
                            onChange={toggleResponsive}
                            value="vertical"
                        />
                    }
                    label="Responsive Vertical Table"
                />
            </FormGroup>
            <DataTable
                columns={columns}
                data={data}
                options={{
                    ...options,
                    responsive: vertical ? 'vertical' : 'standard',
                    setTableProps: () => {
                        return {
                            size: denseTable ? 'small' : 'medium'
                        }
                    }
                }}
                title={'ACME Employee list'}
            />
        </ThemeProvider>
    )
}

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

const getMuiTheme = () =>
    createTheme({
        components: {
            // @ts-expect-error  WILL FIX THIS LATER
            MUIDataTable: {
                styleOverrides: {
                    paper: {
                        boxShadow: 'none'
                    },
                    root: {
                        backgroundColor: '#red'
                    }
                }
            },
            MUIDataTableSelectCell: {
                styleOverrides: {
                    headerCell: {
                        backgroundColor: 'blue'
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        backgroundColor: 'purple'
                    }
                }
            },
            MuiTableFooter: {
                styleOverrides: {
                    root: {
                        '& .MuiToolbar-root': {
                            backgroundColor: 'white'
                        }
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#f00'
                    }
                }
            }
        }
    })

const options: DataTableProps['options'] = {
    filter: true,
    filterType: 'dropdown',
    fixedHeader: false,
    fixedSelectColumn: false,
    rowHover: false,
    setRowProps: (row, _, rowIndex) => {
        return {
            sx: {
                '& td': {
                    backgroundColor:
                        row[1] === 'Business Analyst'
                            ? '#FAA'
                            : rowIndex % 2 === 0 &&
                                row[1] !== 'Business Analyst'
                              ? 'Grey'
                              : undefined
                },
                border: '3px solid blue'
            }
        }
    }
}

const columns: DataTableProps['columns'] = [
    {
        name: 'Name',
        options: {
            filter: true,
            setCellHeaderProps: () => {
                return {
                    sx: {
                        fontWeight: 900,
                        textDecoration: 'underline'
                    }
                }
            },
            setCellProps: value => {
                return {
                    sx: {
                        borderRight: '2px solid blue',
                        textDecoration:
                            value === 'Mel Brooks' ? 'underline' : undefined
                    }
                }
            }
        }
    },
    {
        name: 'Title',
        options: {
            filter: true,
            setCellHeaderProps: () => ({
                sx: { textDecoration: 'underline' }
            })
        }
    },
    {
        name: 'Location',
        options: {
            filter: false
        }
    },
    {
        name: 'Age',
        options: {
            filter: true
        }
    },
    {
        name: 'Salary',
        options: {
            filter: true,
            sort: false
        }
    }
]
