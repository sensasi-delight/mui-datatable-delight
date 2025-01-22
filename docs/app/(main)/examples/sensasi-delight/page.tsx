'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Download from '@mui/icons-material/Download'
import Refresh from '@mui/icons-material/Refresh'
import DataTable, { type DataTableOptions } from '@src'

/**
 * @deprecated FOR TEMPORARY DEVELOPMENT ONLY
 */
export default function Page() {
    const options: DataTableOptions = {
        rowHover: true,
        download: 'disabled',
        customToolbar: () => (
            <Tooltip arrow title="Segarkan">
                <span>
                    <IconButton>
                        <Refresh />
                    </IconButton>
                </span>
            </Tooltip>
        ),
        onRowClick: () => console.log('aswd'),
        filter: false,
        // serverSide: true,
        responsive: 'standard',
        selectableRows: 'none',
        print: false,
        jumpToPage: true,
        rowsPerPageOptions: [15, 30, 50, 100],
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
        onChangeRowsPerPage: console.log,
        onViewColumnsChange: console.log,
        onDownload: () => {
            return false
        },
        textLabels: {
            pagination: {
                next: 'selanjutnya',
                previous: 'sebelumnya',
                rowsPerPage: 'data/halaman:',
                jumpToPage: 'halaman:'
            },
            toolbar: {
                search: 'Cari',
                downloadCsv: 'Unduh',
                print: 'Cetak',
                viewColumns: 'Tampilkan kolom'
            },
            body: {
                noMatch: 'Tidak ada data',
                toolTip: 'Urutkan'
            }
        },
        count: 50
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
            title="asd"
            data={data}
            columns={['name', 'role']}
            options={options}
            components={{
                icons: {
                    DownloadIcon: Download
                }
            }}
        />
    )
}
