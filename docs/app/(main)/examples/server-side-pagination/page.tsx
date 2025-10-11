'use client'

// materials
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
// DataTable
import DataTable, { type DataTableOptions } from '@src'
// vendors
import { useEffect, useState } from 'react'

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
            columns={[
                {
                    label: 'Full Name',
                    name: 'fullName',
                    options: {
                        customBodyRender: value => {
                            // Here you can render a more complex display.
                            // You're given access to tableMeta, which has
                            // the rowData (as well as the original object data).
                            // See the console for a detailed look at this object.

                            // console.log('customBodyRender')
                            // console.dir(tableMeta)
                            return (
                                <Box alignItems="center" display="flex" gap={2}>
                                    <Avatar sx={{ height: 24, width: 24 }} />
                                    {value}
                                </Box>
                            )
                        }
                    }
                },
                {
                    label: 'Title',
                    name: 'title'
                },
                {
                    label: 'Location',
                    name: 'location'
                }
            ]}
            data={data}
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
                selectableRows: 'none',
                serverSide: true
            }}
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
        />
    )
}

function getAllData() {
    return [
        {
            fullName: 'Gabby George',
            location: 'Minneapolis',
            title: 'Business Analyst'
        },
        {
            fullName: 'Aiden Lloyd',
            location: 'Dallas',
            title: 'Business Consultant'
        },
        {
            fullName: 'Jaden Collins',
            location: 'Santa Ana',
            title: 'Attorney'
        },
        {
            fullName: 'Franky Rees',
            location: 'St. Petersburg',
            title: 'Business Analyst'
        },
        {
            fullName: 'Aaren Rose',
            location: 'Toledo',
            title: 'Business Analyst'
        },

        {
            fullName: 'John George',
            location: 'Washington DC',
            title: 'Business Analyst'
        },
        {
            fullName: 'Pat Lloyd',
            location: 'Baltimore',
            title: 'Computer Programmer'
        },
        {
            fullName: 'Joe Joe Collins',
            location: 'Las Cruces',
            title: 'Attorney'
        },
        {
            fullName: 'Franky Hershy',
            location: 'El Paso',
            title: 'Paper Boy'
        },
        {
            fullName: 'Aaren Smalls',
            location: 'Tokyo',
            title: 'Business Analyst'
        },

        {
            fullName: 'Boogie G',
            location: 'Unknown',
            title: 'Police Officer'
        },
        {
            fullName: 'James Roulf',
            location: 'Video Game Land',
            title: 'Business Consultant'
        },
        {
            fullName: 'Mike Moocow',
            location: 'New York',
            title: 'Burger King Employee'
        },
        {
            fullName: 'Mimi Gerock',
            location: 'McCloud',
            title: 'Business Analyst'
        },
        {
            fullName: 'Jason Evans',
            location: 'Mt Shasta',
            title: 'Business Analyst'
        },

        {
            fullName: 'Simple Sam',
            location: 'Mt Shasta',
            title: 'Business Analyst'
        },
        {
            fullName: 'Marky Mark',
            location: 'Las Cruces',
            title: 'Business Consultant'
        },
        { fullName: 'Jaden Jam', location: 'El Paso', title: 'Attorney' },
        {
            fullName: 'Holly Jo',
            location: 'St. Petersburg',
            title: 'Business Analyst'
        },
        {
            fullName: 'Suzie Q',
            location: 'New York',
            title: 'Business Analyst'
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
