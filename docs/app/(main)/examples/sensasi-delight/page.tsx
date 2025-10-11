'use client'

import Refresh from '@mui/icons-material/Refresh'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DataTable, { type DataTableProps } from '@src'

/**
 * @deprecated FOR TEMPORARY DEVELOPMENT ONLY
 */
export default function Page() {
    const options: DataTableProps['options'] = {
        count: 50,
        customToolbar: () => (
            <Tooltip arrow title="Segarkan">
                <span>
                    <IconButton>
                        <Refresh />
                    </IconButton>
                </span>
            </Tooltip>
        ),
        download: 'disabled',
        filter: false,
        jumpToPage: true,
        onChangeRowsPerPage: console.log,
        // rowsPerPage: 15,
        // sortOrder: sortOrder,
        // onTableChange: handleTableChangeOrInit,
        // onTableInit: handleTableChangeOrInit,
        // selectableRowsHeader: true,
        onColumnSortChange: (changedColumn, direction) => {
            // setSortOrder({
            //     name: changedColumn,
            //     direction
            // })
            console.log(changedColumn, direction)
        },
        onDownload: () => {
            return false
        },
        onRowClick: () => console.log('aswd'),
        onViewColumnsChange: console.log,
        print: false,
        // serverSide: true,
        responsive: 'standard',
        rowHover: true,
        rowsPerPageOptions: [15, 30, 50, 100],
        selectableRows: 'none'
    }

    const data: {
        name: string
        role: string
    }[] = [
        {
            name: 'a',
            role: 'a'
        },
        {
            name: 'a',
            role: 'a'
        },
        {
            name: 'a',
            role: 'a'
        },
        {
            name: 'a',
            role: 'a'
        }
    ]

    return (
        <DataTable
            columns={['name', 'role']}
            data={data}
            options={options}
            textLabels={{
                body: {
                    noMatch: 'Tidak ada data',
                    toolTip: 'Urutkan'
                },
                pagination: {
                    jumpToPage: 'halaman:',
                    next: 'selanjutnya',
                    previous: 'sebelumnya',
                    rowsPerPage: 'data/halaman:'
                },
                toolbar: {
                    downloadCsv: 'Unduh',
                    print: 'Cetak',
                    search: 'Cari',
                    viewColumns: 'Tampilkan kolom'
                }
            }}
            title="asd"
        />
    )
}
