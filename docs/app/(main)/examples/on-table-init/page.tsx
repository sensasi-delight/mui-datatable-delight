'use client'

import React from 'react'
import DataTable, { type DataTableProps, type DataTableState } from '@src'

type RowType = (number | string)[]

class Example extends React.Component<
    unknown,
    {
        table: Partial<DataTableState<RowType>>
    }
> {
    constructor(props: unknown) {
        super(props)

        this.state = {
            table: {}
        }
    }

    columns = ['Name', 'Title', 'Location', 'Age', 'Salary']

    data = [
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

    options: DataTableProps<RowType>['options'] = {
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        responsive: 'standard',
        rowsPerPage: 10,
        download: false, // hide csv download option

        /** onTableInit gives access to initial MuiDataTable state
         *  if the application needs access to internal state prior to
         *  the user performing a table mutation (sort, filter, etc.)
         *  that triggers onTableChange
         */
        onTableInit: (_, tableState) => {
            console.log('handleTableInit: ', tableState)
            this.setState({ table: tableState })
        },

        onTableChange: (_, tableState) => {
            console.log('handleTableChange: ', tableState)
            this.setState({ table: tableState })
        }
    }

    render() {
        return (
            <DataTable
                title={'ACME Employee list'}
                data={this.data}
                columns={this.columns}
                options={this.options}
            />
        )
    }
}

export default Example
