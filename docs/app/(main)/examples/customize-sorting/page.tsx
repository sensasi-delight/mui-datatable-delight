'use client'

import React from 'react'
import DataTable, { type DataTableProps } from '@src'

class Example extends React.Component {
    render() {
        const columns = ['Name', 'SurveyScore', 'Date']

        const data = [
            ['Gabby George', 3, '2018-07-06T23:58:59.000Z'],
            ['Aiden Lloyd', 10, '2018-07-06T23:58:53.000Z'],
            ['Jaden Collins', 3, '2018-07-06T23:55:51.000Z'],
            ['Franky Rees', 3, '2018-07-06T22:47:56.000Z'],
            ['Aaren Rose', 8, '2018-07-06T21:59:20.000Z']
        ]

        const options: DataTableProps['options'] = {
            filter: true,
            filterType: 'dropdown',
            responsive: 'vertical',
            customSort: (data, colIndex, order) => {
                return data.sort((a, b) => {
                    const aVal = a.data[colIndex] ?? 0

                    const aWeight =
                        typeof aVal === 'string'
                            ? aVal.length
                            : (a.data[colIndex] ?? 0)

                    const bVal = b.data[colIndex] ?? 0

                    const bWeight =
                        typeof bVal === 'string'
                            ? bVal.length
                            : (b.data[colIndex] ?? 0)

                    return (
                        (aWeight < bWeight ? -1 : 1) *
                        (order === 'desc' ? 1 : -1)
                    )
                })
            }
        }

        return (
            <DataTable
                title={'Survey Scores'}
                data={data}
                columns={columns}
                options={options}
            />
        )
    }
}

export default Example
