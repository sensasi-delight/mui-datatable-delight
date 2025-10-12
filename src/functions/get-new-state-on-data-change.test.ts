import type { DataTableOptions, DataTableProps } from '@src'
import DEFAULT_STATE from '@src/hooks/use-data-table-context/statics/default-state'
import { type DataTableState } from '@src/types/state'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OPTIONS } from '../hooks/use-data-table-context/statics/default-options'
import getNewStateOnDataChange from './get-new-state-on-data-change'

describe('get-new-state-on-data-change', () => {
    const data = [
        ['Gabby George', 'Business Analyst', 'Minneapolis'],
        [
            'Aiden Lloyd',
            "Business Consultant for an International Company and CEO of Tony's Burger Palace",
            'Dallas'
        ],
        ['Jaden Collins', 'Attorney', 'Santa Ana'],
        ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
        ['Aaren Rose', null, 'Toledo'],
        ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
        ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
        ['Jack Jackson', 'Business Analyst', 'El Paso'],
        ['Joe Jones', 'Computer Programmer', 'El Paso'],
        ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
        ['Jo Jo', 'Software Developer', 'Washington DC'],
        ['Donna Marie', 'Business Manager', 'Annapolis']
    ]

    const columns = [
        { name: 'Name', options: { filterOptions: { fullWidth: true } } },
        'Title',
        'Location'
    ]

    const options: DataTableOptions<(typeof data)[number]> = {
        ...DEFAULT_OPTIONS,
        download: true,
        filter: true,
        filterType: 'dropdown',
        print: true,
        responsive: 'vertical',
        search: true,
        tableBodyHeight: '400px',
        tableBodyMaxHeight: '',
        viewColumns: true
        // onTableChange: (action, state) => {
        //     console.log(action)
        //     console.dir(state)
        // }
    }

    const expectedColumns = [
        {
            display: true,
            download: true,
            empty: false,
            filter: true,
            filterOptions: {
                fullWidth: true
            },
            label: 'Name',
            name: 'Name',
            print: true,
            searchable: true,
            sort: true,
            sortCompare: undefined, // new value
            sortDescFirst: false,
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            viewColumns: true
        },
        {
            display: true,
            download: true,
            empty: false,
            filter: true,
            label: 'Title',
            name: 'Title',
            print: true,
            searchable: true,
            sort: true,
            sortCompare: undefined, // new value
            sortDescFirst: false,
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            viewColumns: true
        },
        {
            display: true,
            download: true,
            empty: false,
            filter: true,
            label: 'Location',
            name: 'Location',
            print: true,
            searchable: true,
            sort: true,
            sortCompare: undefined, // new value
            sortDescFirst: false,
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            viewColumns: true
        }
    ]

    const expectedData = [
        {
            data: ['Gabby George', 'Business Analyst', 'Minneapolis'],
            index: 0
        },
        {
            data: [
                'Aiden Lloyd',
                "Business Consultant for an International Company and CEO of Tony's Burger Palace",
                'Dallas'
            ],
            index: 1
        },
        {
            data: ['Jaden Collins', 'Attorney', 'Santa Ana'],
            index: 2
        },
        {
            data: ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
            index: 3
        },
        {
            data: ['Aaren Rose', null, 'Toledo'],
            index: 4
        },
        {
            data: ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
            index: 5
        },
        {
            data: ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
            index: 6
        },
        {
            data: ['Jack Jackson', 'Business Analyst', 'El Paso'],
            index: 7
        },
        {
            data: ['Joe Jones', 'Computer Programmer', 'El Paso'],
            index: 8
        },
        {
            data: ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
            index: 9
        },
        {
            data: ['Jo Jo', 'Software Developer', 'Washington DC'],
            index: 10
        },
        {
            data: ['Donna Marie', 'Business Manager', 'Annapolis'],
            index: 11
        }
    ]

    const expected: DataTableState<(typeof data)[0]> = {
        ...DEFAULT_STATE,
        // sortOrder: {}, // legacy value

        // rowsPerPageOptions: [10, 15, 100], // legacy value

        columnOrder: [0, 1, 2],
        columns: expectedColumns,
        // activeColumn: null, // new value = undefined prop
        // announceText: null, // new value = undefined prop

        count: 12, // new value
        data: expectedData,
        displayData: [
            {
                data: ['Gabby George', 'Business Analyst', 'Minneapolis'],
                dataIndex: 0
            },
            {
                data: [
                    'Aiden Lloyd',
                    "Business Consultant for an International Company and CEO of Tony's Burger Palace",
                    'Dallas'
                ],
                dataIndex: 1
            },
            {
                data: ['Jaden Collins', 'Attorney', 'Santa Ana'],
                dataIndex: 2
            },
            {
                data: ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
                dataIndex: 3
            },
            {
                data: ['Aaren Rose', null, 'Toledo'],
                dataIndex: 4
            },
            {
                data: ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
                dataIndex: 5
            },
            {
                data: ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
                dataIndex: 6
            },
            {
                data: ['Jack Jackson', 'Business Analyst', 'El Paso'],
                dataIndex: 7
            },
            {
                data: ['Joe Jones', 'Computer Programmer', 'El Paso'],
                dataIndex: 8
            },
            {
                data: ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
                dataIndex: 9
            },
            {
                data: ['Jo Jo', 'Software Developer', 'Washington DC'],
                dataIndex: 10
            },
            {
                data: ['Donna Marie', 'Business Manager', 'Annapolis'],
                dataIndex: 11
            }
        ],
        expandedRows: {
            data: [],
            lookup: {}
        },
        filterData: [
            [
                'Aaren Rose',
                'Aiden Lloyd',
                'Donna Marie',
                'Franky Rees',
                'Gabby George',
                'Jack Jackson',
                'Jacky Jackson',
                'Jaden Collins',
                'Jimmy Johns',
                'Jo Jo',
                'Joe Jones',
                'Johnny Jones'
            ],
            [
                'Attorney',
                'Business Analyst',
                'Business Consultant',
                "Business Consultant for an International Company and CEO of Tony's Burger Palace",
                'Business Manager',
                'Computer Programmer',
                null,
                'Software Developer'
            ],
            [
                'Annapolis',
                'Baltimore',
                'Dallas',
                'El Paso',
                'Minneapolis',
                'Santa Ana',
                'St. Petersburg',
                'Toledo',
                'Washington DC'
            ]
        ],
        filterList: [[], [], []],
        rowsPerPage: 10,

        // previousSelectedRow: null,  // legacy value
        // searchProps: {},  // legacy value
        // searchText: null, // legacy value

        selectedRows: {
            data: [],
            lookup: {}
        },
        // showResponsive: false, // legacy value
        sortOrder: undefined // new value
    }

    it('should return new state', () => {
        const props: DataTableProps<(typeof data)[number]> = {
            columns,
            components: {
                // TableBody: {},
                // TableFilter: {},
                // TableToolbar: {},
                // TableToolbarSelect: {},
                // Tooltip: {
                //     propTypes: {}
                // },
                // icons: {}
            },
            data,

            options,
            title: 'ACME Employee list'
        }

        const newState = getNewStateOnDataChange(
            {
                columns: props.columns,
                options: props.options
            },
            data,
            1,
            true,
            options,
            DEFAULT_STATE,
            {
                current: () => undefined
            }
        )

        const {
            columnOrder: aColumnOrder,
            columns: aColumns,
            data: aData,
            displayData: aDisplayData,
            expandedRows: aExpandedRows,
            selectedRows: aSelectedRows,
            filterData: aFilterData,
            filterList: aFilterList,
            ...restNewState
        } = newState

        const {
            columnOrder: bColumnOrder,
            columns: bColumns,
            data: bData,
            displayData: bDisplayData,
            expandedRows: bExpandedRows,
            selectedRows: bSelectedRows,
            filterData: bFilterData,
            filterList: bFilterList,
            ...restExpected
        } = expected

        expect(aColumnOrder).deep.equal(bColumnOrder)
        expect(aColumns).deep.equal(bColumns)
        expect(aData).deep.equal(bData)
        expect(aDisplayData).deep.equal(bDisplayData)
        expect(aExpandedRows).deep.equal(bExpandedRows)
        expect(aSelectedRows).deep.equal(bSelectedRows)
        expect(aFilterList).deep.equal(bFilterList)
        expect(aFilterData).deep.equal(bFilterData)

        expect(restNewState).deep.equal(restExpected)
    })

    it('should return new state when props update', () => {
        const props: DataTableProps<(typeof data)[number]> = {
            columns: [
                {
                    name: 'Name',
                    options: {
                        filterOptions: {
                            fullWidth: true
                        }
                    }
                },
                'Title',
                'Location'
            ],
            data: [
                ['Gabby George', 'Business Analyst', 'Minneapolis'],
                [
                    'Aiden Lloyd',
                    "Business Consultant for an International Company and CEO of Tony's Burger Palace",
                    'Dallas'
                ],
                ['Jaden Collins', 'Attorney', 'Santa Ana'],
                ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
                ['Aaren Rose', null, 'Toledo'],
                ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
                ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
                ['Jack Jackson', 'Business Analyst', 'El Paso'],
                ['Joe Jones', 'Computer Programmer', 'El Paso'],
                ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
                ['Jo Jo', 'Software Developer', 'Washington DC'],
                ['Donna Marie', 'Business Manager', 'Annapolis']
            ],
            options: {
                download: true,
                filter: false,
                filterType: 'dropdown',
                print: true,
                responsive: 'vertical',
                search: true,
                tableBodyHeight: '400px',
                tableBodyMaxHeight: '',
                viewColumns: true
            },
            title: 'ACME Employee list'
        }

        const result = getNewStateOnDataChange(
            {
                columns: props.columns,
                options: props.options
            },
            props.data,
            1,
            true,
            options,
            DEFAULT_STATE,
            {
                current: () => {
                    console.log('setState')
                }
            }
        )

        expect(result).deep.equal(expected)
    })

    it('should return new state when data is delete', () => {
        const props = {
            columns: [
                {
                    name: 'Name',
                    options: {
                        filterOptions: {
                            fullWidth: true
                        }
                    }
                },
                'Title',
                'Location'
            ],
            data: [
                {
                    data: ['Gabby George', 'Business Analyst', 'Minneapolis'],
                    index: 0
                },
                {
                    data: ['Jaden Collins', 'Attorney', 'Santa Ana'],
                    index: 2
                },
                {
                    data: ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
                    index: 3
                },
                {
                    data: ['Aaren Rose', null, 'Toledo'],
                    index: 4
                },
                {
                    data: [
                        'Johnny Jones',
                        'Business Analyst',
                        'St. Petersburg'
                    ],
                    index: 5
                },
                {
                    data: ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
                    index: 6
                },
                {
                    data: ['Jack Jackson', 'Business Analyst', 'El Paso'],
                    index: 7
                },
                {
                    data: ['Joe Jones', 'Computer Programmer', 'El Paso'],
                    index: 8
                },
                {
                    data: ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
                    index: 9
                },
                {
                    data: ['Jo Jo', 'Software Developer', 'Washington DC'],
                    index: 10
                },
                {
                    data: ['Donna Marie', 'Business Manager', 'Annapolis'],
                    index: 11
                }
            ],
            options: {
                filterList: [[], [], []]
            }
        }

        const newState = getNewStateOnDataChange(
            {
                columns: props.columns,
                options: options
            },
            props.data,
            2,
            true,
            options,
            DEFAULT_STATE,
            {
                current: () => {
                    console.log('setState')
                }
            }
        )

        const dataToBeDeleted = data[1]

        const expectedState = {
            ...expected,

            // delete row
            count: expected.count - 1,
            data: expected.data.filter(
                row => row.data[0] !== dataToBeDeleted?.[0]
            ),
            displayData: expected.displayData.filter(
                row => row.data[0] !== dataToBeDeleted?.[0]
            ),
            filterData: expected.filterData.map((columnData, colIndex) =>
                columnData?.filter(item => item !== dataToBeDeleted?.[colIndex])
            )
        }

        expect(newState).deep.equal(expectedState)
    })
})
