'use client'

import React, { useState } from 'react'
import DataTable from '@src'
import { ThemeProvider } from '@mui/material/styles'
import { tss } from 'tss-react/mui'
import { createTheme } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function Example() {
    const { classes, cx } = useStyles()
    const [denseTable, setDenseTable] = useState(false)
    const [vertical, setVertical] = useState(false)
    const columns = [
        {
            name: 'Name',
            options: {
                filter: true,
                setCellProps: value => {
                    return {
                        className: cx({
                            [classes.NameCell]: value === 'Mel Brooks'
                        }),
                        style: {
                            borderRight: '2px solid blue'
                        }
                    }
                },
                setCellHeaderProps: value => {
                    return {
                        className: cx({
                            [classes.NameCell]: true
                        }),
                        style: {
                            textDecoration: 'underline'
                        }
                    }
                }
            }
        },
        {
            name: 'Title',
            options: {
                filter: true,
                setCellHeaderProps: value => ({
                    style: { textDecoration: 'underline' }
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

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: vertical ? 'vertical' : 'standard',
        fixedHeader: false,
        fixedSelectColumn: false,
        rowHover: false,
        setRowProps: (row, dataIndex, rowIndex) => {
            return {
                className: cx({
                    [classes.BusinessAnalystRow]: row[1] === 'Business Analyst',
                    [classes.GreyLine]:
                        rowIndex % 2 === 0 && row[1] !== 'Business Analyst'
                }),
                style: { border: '3px solid blue' }
            }
        },
        setTableProps: () => {
            return {
                size: denseTable ? 'small' : 'medium'
            }
        }
    }

    const getMuiTheme = () =>
        createTheme({
            components: {
                MUIDataTable: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#red'
                        },
                        paper: {
                            boxShadow: 'none'
                        }
                    }
                },
                MuiToolbar: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#f00'
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
                MUIDataTableSelectCell: {
                    styleOverrides: {
                        headerCell: {
                            backgroundColor: 'blue'
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
                }
            }
        })

    const toggleDenseTable = event => {
        setDenseTable(!!event.target.checked)
    }

    const toggleResponsive = event => {
        setVertical(!!event.target.checked)
    }

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={denseTable}
                            onChange={toggleDenseTable}
                            value="denseTable"
                            color="primary"
                        />
                    }
                    label="Dense Table"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={vertical}
                            onChange={toggleResponsive}
                            value="vertical"
                            color="primary"
                        />
                    }
                    label="Responsive Vertical Table"
                />
            </FormGroup>
            <DataTable
                title={'ACME Employee list'}
                data={data}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    )
}

const useStyles = tss.create(({ theme }) => ({
    BusinessAnalystRow: {
        '& td': { backgroundColor: '#FAA' }
    },
    GreyLine: {
        '& td': { backgroundColor: theme.palette.grey[200] }
    },
    NameCell: {
        fontWeight: 900
    }
}))
