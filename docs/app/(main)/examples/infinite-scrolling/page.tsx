'use client'

import { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import DataTable, { type DataTableProps } from '@src'
// import { tss } from 'tss-react/mui'

type DataItemType = (string | number)[]

export default function MessageManager() {
    // const { classes } = useStyles()
    const [filteredMessages, setFilteredMessages] = useState<DataItemType[]>([])

    useEffect(() => {
        function getMessages() {
            const messages = buildTestData(30, 0)

            setFilteredMessages(messages)
        }

        getMessages()
    }, [])

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

    const columns: DataTableProps['columns'] = [
        {
            name: 'Id',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    const value = filteredMessages[dataIndex]?.[0]

                    if (rowIndex !== filteredMessages.length - 10) {
                        return value
                    }

                    return (
                        <>
                            <Waypoint
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
                            />
                            {value}*
                        </>
                    )
                }
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
        <DataTable
            data={filteredMessages}
            columns={columns}
            options={options}
        />
    )
}

// const useStyles = tss.crate(({ theme }) => ({
//     root: {
//         width: '100%',
//         overflowX: 'auto',
//         height: 300,
//         flexGrow: 1
//     },
//     head: {
//         backgroundColor: theme.palette.primary.main,
//         color: '#fff',
//         position: 'sticky',
//         fontSize: '.6rem',
//         top: 0
//     },
//     table: {
//         minWidth: 700,
//         height: 200
//     },
//     tableCell: {
//         fontSize: '.6rem'
//     }
// }))

const options: DataTableProps['options'] = {
    filter: false,
    fixedHeader: true,
    filterType: 'dropdown',
    onRowClick(rowNode) {
        console.log(rowNode)
    },
    pagination: false,
    responsive: 'standard',
    selectableRows: 'none',
    serverSide: true,
    tableBodyHeight: '500px'
}
