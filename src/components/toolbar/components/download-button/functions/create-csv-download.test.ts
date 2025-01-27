import { describe, expect, it, vi } from 'vitest'
import { createCsvDownload } from './create-csv-download'
import type { DataTableOptions } from '@src/index'

describe('createCsvDownload', () => {
    const columns = [
        {
            name: 'firstname',
            download: true
        },
        {
            name: 'lastname',
            download: true
        }
    ]
    const data = [{ data: ['anton', 'abraham'] }, { data: ['berta', 'buchel'] }]

    /**
     * CAN'T REWRITE THIS TEST FOR NOW
     */
    // it('does not call download function if download callback returns `false`', () => {
    //     const options = {
    //         downloadOptions: {
    //             separator: ';'
    //         },
    //         onDownload: () => false
    //     }
    //     const downloadCsv = spy()

    //     createCsvDownload(columns, data, options, downloadCsv)

    //     assert.strictEqual(downloadCsv.callCount, 0)
    // })

    it('calls download function if download callback returns not `false`', () => {
        const downloadCsv = vi.fn()

        const options: DataTableOptions = {
            downloadOptions: {
                separator: ';'
            },
            onDownload: () => {
                downloadCsv()

                return ''
            }
        }

        createCsvDownload(columns, data, options)

        expect(downloadCsv).toBeCalled()
    })
})
