'use client'

import React, { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import DataTable from '@src'
// import { makeStyles } from 'tss-react/mui'

type DataItemType = (string | number)[]

export default function MessageManager() {
    // const { classes } = useStyles()
    const [filteredMessages, setFilteredMessages] = useState<DataItemType[]>([])

    useEffect(() => {
        getMessages()
    }, [])

    function getMessages() {
        const THIRTYROWS = 30
        const messages = buildTestData(THIRTYROWS, 0)

        setFilteredMessages(messages)
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
            const randomSelection =
                data[Math.floor(Math.random() * data.length)]

            const id = i + 1 + startingIndex

            rows.push([id, ...randomSelection])
        }

        return rows
    }

    const columns = [
        {
            name: 'Id',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    const value = filteredMessages[dataIndex][0]

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

// const useStyles = makeStyles()(theme => ({
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

const options = {
    filter: false,
    fixedHeader: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    pagination: false,
    tableBodyHeight: '500px',
    onRowClick(rowNode) {
        console.log(rowNode)
    }
}
