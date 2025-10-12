'use client'

import Alert from '@mui/material/Alert'
// import { Waypoint } from 'react-waypoint'
import DataTable, { type DataTableProps } from '@src'
import { useEffect, useState } from 'react'

type DataItemType = (string | number)[]

export default function MessageManager() {
    const [filteredMessages, setFilteredMessages] = useState<DataItemType[]>([])

    useEffect(() => {
        function getMessages() {
            const messages = buildTestData(30, 0)

            setFilteredMessages(messages)
        }

        getMessages()
    }, [])

    const columns: DataTableProps['columns'] = [
        {
            name: 'Id',
            options: {
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    const value = filteredMessages[dataIndex]?.[0]

                    if (rowIndex !== filteredMessages.length - 10) {
                        return value
                    }

                    return (
                        <>
                            {/* <Waypoint
                                onEnter={() => {
                                    console.log('WAYPOINT REACHED')
                                    const newData = buildTestData(
                                        30,
                                        filteredMessages.length
                                    )

                                    setFilteredMessages(prev => [
                                        ...prev,
                                        ...newData
                                    ])
                                }}
                            /> */}
                            {value}*
                        </>
                    )
                },
                filter: false,
                sort: false
            }
        },
        {
            name: 'Message',
            options: {
                sort: false
            }
        },
        {
            name: 'Requester',
            options: {
                sort: false
            }
        }
    ]

    return (
        <>
            <Alert severity="warning">
                <code>react-waypoint</code> is not supported `react@19.2.0`.
                Skip this example for now.
            </Alert>

            <DataTable
                columns={columns}
                data={filteredMessages}
                options={options}
            />
        </>
    )
}

function buildTestData(count: number, startingIndex: number) {
    const data = [
        ['Template 1', 'Requester Jerry'],
        ['Template 2', 'Test user 1'],
        ['Order66', 'Test user 2'],
        ['Live Message', 'Another Person'],
        ['Future Message', 'John Doe'],
        ['Expired Message', 'Jane Doe'],
        ['Retired Message', 'Some Guy']
    ]

    const rows: DataItemType[] = []

    for (let i = 0; i < count; i += 1) {
        const id = i + 1 + startingIndex
        const randomIndex = Math.floor(Math.random() * data.length)
        const randomSelection = data[randomIndex]

        if (!randomSelection) {
            throw new Error('Random selection is undefined')
        }

        rows.push([id, ...randomSelection])
    }

    return rows
}

const options: DataTableProps['options'] = {
    filter: false,
    filterType: 'dropdown',
    fixedHeader: true,
    onRowClick(rowNode) {
        console.log(rowNode)
    },
    pagination: false,
    responsive: 'standard',
    selectableRows: 'none',
    serverSide: true,
    tableBodyHeight: '500px'
}
