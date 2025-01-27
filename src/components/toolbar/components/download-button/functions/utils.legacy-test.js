import {
    buildCsv,
    escapeDangerousCsvCharacters
} from '../../../../../functions'
import { getPageValue } from '../src/functions.shared'
import { createCsvDownload } from '../src/components/table-toolbar.functions.create-csv-download'
import { spy } from 'sinon'
import { assert } from 'chai'

describe('utils.js', () => {
    describe('escapeDangerousCsvCharacters', () => {
        it('properly escapes the first character in a string if it can be used for injection', () => {
            assert.strictEqual(
                escapeDangerousCsvCharacters('+SUM(1+1)'),
                "'+SUM(1+1)"
            )
            assert.strictEqual(
                escapeDangerousCsvCharacters('-SUM(1+1)'),
                "'-SUM(1+1)"
            )
            assert.strictEqual(
                escapeDangerousCsvCharacters('=SUM(1+1)'),
                "'=SUM(1+1)"
            )
            assert.strictEqual(
                escapeDangerousCsvCharacters('@SUM(1+1)'),
                "'@SUM(1+1)"
            )
            assert.equal(escapeDangerousCsvCharacters(123), 123)
        })
    })

    describe('buildCsv', () => {
        const options = {
            downloadOptions: {
                separator: ';'
            },
            onDownload: null
        }
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

        it('properly builds a csv when given a non-empty dataset', () => {
            const data = [
                { data: ['anton', 'abraham'] },
                { data: ['berta', 'buchel'] }
            ]
            const csv = buildCsv(columns, data, options)

            assert.strictEqual(
                csv,
                '"firstname";"lastname"\r\n' +
                    '"anton";"abraham"\r\n' +
                    '"berta";"buchel"'
            )
        })

        it('returns an empty csv with header when given an empty dataset', () => {
            const data = []
            const csv = buildCsv(columns, data, options)

            assert.strictEqual(csv, '"firstname";"lastname"')
        })
    })
})
