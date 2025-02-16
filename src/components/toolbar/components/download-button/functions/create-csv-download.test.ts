import { describe, expect, it, vi } from 'vitest'
import { createCsvDownload } from './create-csv-download'
import type { DataTableOptions, DataTableState } from '@src/index'

describe('createCsvDownload', () => {
    const data = [
        { data: ['anton', 'abraham'] },
        { data: ['berta', 'buchel'] }
    ] as DataTableState<unknown>['data']

    const columns = [
        {
            name: 'firstname',
            download: true
        },
        {
            name: 'lastname',
            download: true
        }
    ] as DataTableState<unknown>['columns']

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

        const options = {
            downloadOptions: {
                filename: 'test.csv',
                separator: ';'
            },
            onDownload: () => {
                downloadCsv()

                return ''
            }
        } as unknown as DataTableOptions<unknown>

        createCsvDownload<unknown>(columns, data, options)

        expect(downloadCsv).toBeCalled()
    })
})

// LEGACY TEST
// describe('utils.js', () => {
//     describe('escapeDangerousCsvCharacters', () => {
//         it('properly escapes the first character in a string if it can be used for injection', () => {
//             assert.strictEqual(
//                 escapeDangerousCsvCharacters('+SUM(1+1)'),
//                 "'+SUM(1+1)"
//             )
//             assert.strictEqual(
//                 escapeDangerousCsvCharacters('-SUM(1+1)'),
//                 "'-SUM(1+1)"
//             )
//             assert.strictEqual(
//                 escapeDangerousCsvCharacters('=SUM(1+1)'),
//                 "'=SUM(1+1)"
//             )
//             assert.strictEqual(
//                 escapeDangerousCsvCharacters('@SUM(1+1)'),
//                 "'@SUM(1+1)"
//             )
//             assert.equal(escapeDangerousCsvCharacters(123), 123)
//         })
//     })

//     describe('buildCsv', () => {
//         const options = {
//             downloadOptions: {
//                 separator: ';'
//             },
//             onDownload: null
//         }
//         const columns = [
//             {
//                 name: 'firstname',
//                 download: true
//             },
//             {
//                 name: 'lastname',
//                 download: true
//             }
//         ]

//         it('properly builds a csv when given a non-empty dataset', () => {
//             const data = [
//                 { data: ['anton', 'abraham'] },
//                 { data: ['berta', 'buchel'] }
//             ]
//             const csv = buildCsv(columns, data, options)

//             assert.strictEqual(
//                 csv,
//                 '"firstname";"lastname"\r\n' +
//                     '"anton";"abraham"\r\n' +
//                     '"berta";"buchel"'
//             )
//         })

//         it('returns an empty csv with header when given an empty dataset', () => {
//             const data = []
//             const csv = buildCsv(columns, data, options)

//             assert.strictEqual(csv, '"firstname";"lastname"')
//         })
//     })
// })
