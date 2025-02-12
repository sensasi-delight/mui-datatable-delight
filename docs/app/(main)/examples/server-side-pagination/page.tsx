'use client'

// vendors
import { useEffect, useState } from 'react'
// materials
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
// DataTable
import DataTable, { type DataTableOptions } from '@src'

export default function Example() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState<ReturnType<typeof getAllData>>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        getFakeXhrRequest(0, 5).then(res => {
            setData(res.data)
            setCount(res.total)
            setIsLoading(false)
        })
    }, [])

    return (
        <DataTable
            title={
                <Typography variant="h6">
                    ACME Employee list
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            style={{
                                marginLeft: 15,
                                position: 'relative',
                                top: 4
                            }}
                        />
                    )}
                </Typography>
            }
            data={data}
            columns={[
                {
                    name: 'fullName',
                    label: 'Full Name',
                    options: {
                        customBodyRender: value => {
                            // Here you can render a more complex display.
                            // You're given access to tableMeta, which has
                            // the rowData (as well as the original object data).
                            // See the console for a detailed look at this object.

                            // console.log('customBodyRender')
                            // console.dir(tableMeta)
                            return (
                                <Box display="flex" gap={2} alignItems="center">
                                    <Avatar sx={{ width: 24, height: 24 }} />
                                    {value}
                                </Box>
                            )
                        }
                    }
                },
                {
                    name: 'title',
                    label: 'Title'
                },
                {
                    name: 'location',
                    label: 'Location'
                }
            ]}
            options={{
                count: count,
                jumpToPage: true,

                /**
                 * a developer could react to change on an action basis or examine the state as a whole and do whatever they want
                 */
                onTableChange: (action, tableState) => {
                    if (['changePage', 'sort'].includes(action)) {
                        setIsLoading(true)

                        getFakeXhrRequest(
                            tableState.page,
                            tableState.rowsPerPage,
                            tableState.sortOrder
                        ).then(res => {
                            setData(res.data)
                            setCount(res.total)
                            setIsLoading(false)
                        })
                    } else {
                        console.log(
                            `action ${action} is not handled on server side in this example`
                        )
                    }
                },

                rowsPerPage: 5,
                rowsPerPageOptions: [],
                serverSide: true,
                selectableRows: 'none'
            }}
        />
    )
}

function getAllData() {
    return [
        {
            fullName: 'Gabby George',
            title: 'Business Analyst',
            location: 'Minneapolis'
        },
        {
            fullName: 'Aiden Lloyd',
            title: 'Business Consultant',
            location: 'Dallas'
        },
        {
            fullName: 'Jaden Collins',
            title: 'Attorney',
            location: 'Santa Ana'
        },
        {
            fullName: 'Franky Rees',
            title: 'Business Analyst',
            location: 'St. Petersburg'
        },
        {
            fullName: 'Aaren Rose',
            title: 'Business Analyst',
            location: 'Toledo'
        },

        {
            fullName: 'John George',
            title: 'Business Analyst',
            location: 'Washington DC'
        },
        {
            fullName: 'Pat Lloyd',
            title: 'Computer Programmer',
            location: 'Baltimore'
        },
        {
            fullName: 'Joe Joe Collins',
            title: 'Attorney',
            location: 'Las Cruces'
        },
        {
            fullName: 'Franky Hershy',
            title: 'Paper Boy',
            location: 'El Paso'
        },
        {
            fullName: 'Aaren Smalls',
            title: 'Business Analyst',
            location: 'Tokyo'
        },

        {
            fullName: 'Boogie G',
            title: 'Police Officer',
            location: 'Unknown'
        },
        {
            fullName: 'James Roulf',
            title: 'Business Consultant',
            location: 'Video Game Land'
        },
        {
            fullName: 'Mike Moocow',
            title: 'Burger King Employee',
            location: 'New York'
        },
        {
            fullName: 'Mimi Gerock',
            title: 'Business Analyst',
            location: 'McCloud'
        },
        {
            fullName: 'Jason Evans',
            title: 'Business Analyst',
            location: 'Mt Shasta'
        },

        {
            fullName: 'Simple Sam',
            title: 'Business Analyst',
            location: 'Mt Shasta'
        },
        {
            fullName: 'Marky Mark',
            title: 'Business Consultant',
            location: 'Las Cruces'
        },
        { fullName: 'Jaden Jam', title: 'Attorney', location: 'El Paso' },
        {
            fullName: 'Holly Jo',
            title: 'Business Analyst',
            location: 'St. Petersburg'
        },
        {
            fullName: 'Suzie Q',
            title: 'Business Analyst',
            location: 'New York'
        }
    ]
}

// mock async function
function getFakeXhrRequest(
    page: number,
    rowsPerPage: number,
    sortOrder?: DataTableOptions['sortOrder']
): Promise<{
    data: ReturnType<typeof getAllData>
    total: number
}> {
    return new Promise(resolve => {
        // mock page data
        const fullData = getAllData()

        // mock record count from server - normally this would be a number attached to the return data
        const total = fullData.length

        const orderedFullData = sortOrder
            ? fullData.sort((a, b) => {
                  // @ts-expect-error  WILL FIX THIS LATER
                  if (a[sortOrder.name] < b[sortOrder.name]) {
                      return 1 * (sortOrder.direction === 'asc' ? -1 : 1)
                      // @ts-expect-error  WILL FIX THIS LATER
                  } else if (a[sortOrder.name] > b[sortOrder.name]) {
                      return -1 * (sortOrder.direction === 'asc' ? -1 : 1)
                  } else {
                      return 0
                  }
              })
            : fullData

        const data = orderedFullData.slice(
            page * rowsPerPage,
            (page + 1) * rowsPerPage
        )

        setTimeout(() => {
            resolve({
                data,
                total
            })
        }, 2000)
    })
}
