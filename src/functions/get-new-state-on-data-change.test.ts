import { describe, expect, it, vi } from 'vitest'
import getNewStateOnDataChange from './get-new-state-on-data-change'
import { DEFAULT_OPTIONS } from '../hooks/use-data-table-context/statics/default-options'
import { type DataTableState } from '@src/index'
import DEFAULT_STATE from '@src/hooks/use-data-table-context/statics/default-state'

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

    const options = {
        ...DEFAULT_OPTIONS,
        search: true,
        download: true,
        print: true,
        viewColumns: true,
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        tableBodyHeight: '400px',
        tableBodyMaxHeight: '',
        // onTableChange: (action, state) => {
        //     console.log(action)
        //     console.dir(state)
        // }
        ...DEFAULT_OPTIONS
    }

    const expectedColumns = [
        {
            name: 'Name',
            label: 'Name',
            display: true,
            empty: false,
            filter: true,
            sort: true,
            print: true,
            searchable: true,
            download: true,
            viewColumns: true,
            sortCompare: undefined, // new value
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            sortDescFirst: false,
            filterOptions: {
                fullWidth: true
            }
        },
        {
            display: true,
            empty: false,
            filter: true,
            sort: true,
            print: true,
            searchable: true,
            download: true,
            viewColumns: true,
            sortCompare: undefined, // new value
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            sortDescFirst: false,
            name: 'Title',
            label: 'Title'
        },
        {
            display: true,
            empty: false,
            filter: true,
            sort: true,
            print: true,
            searchable: true,
            download: true,
            viewColumns: true,
            sortCompare: undefined, // new value
            // sortCompare: null, // legacy value
            sortThirdClickReset: false,
            sortDescFirst: false,
            name: 'Location',
            label: 'Location'
        }
    ]

    const expectedData = [
        {
            index: 0,
            data: ['Gabby George', 'Business Analyst', 'Minneapolis']
        },
        {
            index: 1,
            data: [
                'Aiden Lloyd',
                "Business Consultant for an International Company and CEO of Tony's Burger Palace",
                'Dallas'
            ]
        },
        {
            index: 2,
            data: ['Jaden Collins', 'Attorney', 'Santa Ana']
        },
        {
            index: 3,
            data: ['Franky Rees', 'Business Analyst', 'St. Petersburg']
        },
        {
            index: 4,
            data: ['Aaren Rose', null, 'Toledo']
        },
        {
            index: 5,
            data: ['Johnny Jones', 'Business Analyst', 'St. Petersburg']
        },
        {
            index: 6,
            data: ['Jimmy Johns', 'Business Analyst', 'Baltimore']
        },
        {
            index: 7,
            data: ['Jack Jackson', 'Business Analyst', 'El Paso']
        },
        {
            index: 8,
            data: ['Joe Jones', 'Computer Programmer', 'El Paso']
        },
        {
            index: 9,
            data: ['Jacky Jackson', 'Business Consultant', 'Baltimore']
        },
        {
            index: 10,
            data: ['Jo Jo', 'Software Developer', 'Washington DC']
        },
        {
            index: 11,
            data: ['Donna Marie', 'Business Manager', 'Annapolis']
        }
    ]

    const expected: DataTableState<(typeof data)[0]> = {
        ...DEFAULT_STATE,
        // activeColumn: null, // new value = undefined prop
        // announceText: null, // new value = undefined prop

        count: 12, // new value
        columns: expectedColumns,
        expandedRows: {
            data: [],
            lookup: {}
        },
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
        sortOrder: undefined, // new value
        // sortOrder: {}, // legacy value

        // rowsPerPageOptions: [10, 15, 100], // legacy value

        columnOrder: [0, 1, 2]
    }

    it('should return new state', () => {
        const props = {
            data,
            columns,
            title: 'ACME Employee list',

            options,

            // appended from legacy code
            className: 'tss-1x5mjc5-MUIDataTable-root',
            classes: {
                root: 'tss-1x5mjc5-MUIDataTable-root',
                paper: 'tss-11quiee-MUIDataTable-paper',
                paperResponsiveScrollFullHeightFullWidth:
                    'tss-1nfo58d-MUIDataTable-paperResponsiveScrollFullHeightFullWidth',
                tableRoot: 'tss-900muf-MUIDataTable-tableRoot',
                responsiveBase: 'tss-1cdcmys-MUIDataTable-responsiveBase',
                responsiveScroll: 'tss-131sses-MUIDataTable-responsiveScroll',
                responsiveScrollMaxHeight:
                    'tss-1acbflw-MUIDataTable-responsiveScrollMaxHeight',
                responsiveScrollFullHeight:
                    'tss-1dm1iyi-MUIDataTable-responsiveScrollFullHeight',
                responsiveStacked: 'tss-r6c9w6-MUIDataTable-responsiveStacked',
                responsiveStackedFullWidth:
                    'tss-1rzqjie-MUIDataTable-responsiveStackedFullWidth',
                caption: 'tss-1opebqo-MUIDataTable-caption',
                liveAnnounce: 'tss-hwdp7s-MUIDataTable-liveAnnounce'
            },
            components: {
                TableBody: {},
                TableFilter: {},
                TableResize: {},
                TableToolbar: {},
                TableToolbarSelect: {},
                Tooltip: {
                    propTypes: {}
                },
                icons: {}
            }
        }

        const newState = getNewStateOnDataChange(
            props,
            1,
            true,
            options,
            DEFAULT_STATE,
            vi.fn()
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
        const props = {
            className: 'tss-1x5mjc5-MUIDataTable-root',
            classes: {
                root: 'tss-1x5mjc5-MUIDataTable-root',
                paper: 'tss-11quiee-MUIDataTable-paper',
                paperResponsiveScrollFullHeightFullWidth:
                    'tss-1nfo58d-MUIDataTable-paperResponsiveScrollFullHeightFullWidth',
                tableRoot: 'tss-900muf-MUIDataTable-tableRoot',
                responsiveBase: 'tss-1cdcmys-MUIDataTable-responsiveBase',
                responsiveScroll: 'tss-131sses-MUIDataTable-responsiveScroll',
                responsiveScrollMaxHeight:
                    'tss-1acbflw-MUIDataTable-responsiveScrollMaxHeight',
                responsiveScrollFullHeight:
                    'tss-1dm1iyi-MUIDataTable-responsiveScrollFullHeight',
                responsiveStacked: 'tss-r6c9w6-MUIDataTable-responsiveStacked',
                responsiveStackedFullWidth:
                    'tss-1rzqjie-MUIDataTable-responsiveStackedFullWidth',
                caption: 'tss-1opebqo-MUIDataTable-caption',
                liveAnnounce: 'tss-hwdp7s-MUIDataTable-liveAnnounce'
            },
            title: 'ACME Employee list',
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
            options: {
                search: true,
                download: true,
                print: true,
                viewColumns: true,
                filter: false,
                filterType: 'dropdown',
                responsive: 'vertical',
                tableBodyHeight: '400px',
                tableBodyMaxHeight: ''
            },
            components: {
                TableBody: {},
                TableFilter: {},
                TableResize: {},
                TableToolbar: {},
                TableToolbarSelect: {},
                Tooltip: {
                    propTypes: {}
                },
                icons: {}
            }
        }

        const result = getNewStateOnDataChange(
            props,
            1,
            true,
            options,
            DEFAULT_STATE,
            () => {
                console.log('setState')
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
                    index: 0,
                    data: ['Gabby George', 'Business Analyst', 'Minneapolis']
                },
                {
                    index: 2,
                    data: ['Jaden Collins', 'Attorney', 'Santa Ana']
                },
                {
                    index: 3,
                    data: ['Franky Rees', 'Business Analyst', 'St. Petersburg']
                },
                {
                    index: 4,
                    data: ['Aaren Rose', null, 'Toledo']
                },
                {
                    index: 5,
                    data: ['Johnny Jones', 'Business Analyst', 'St. Petersburg']
                },
                {
                    index: 6,
                    data: ['Jimmy Johns', 'Business Analyst', 'Baltimore']
                },
                {
                    index: 7,
                    data: ['Jack Jackson', 'Business Analyst', 'El Paso']
                },
                {
                    index: 8,
                    data: ['Joe Jones', 'Computer Programmer', 'El Paso']
                },
                {
                    index: 9,
                    data: ['Jacky Jackson', 'Business Consultant', 'Baltimore']
                },
                {
                    index: 10,
                    data: ['Jo Jo', 'Software Developer', 'Washington DC']
                },
                {
                    index: 11,
                    data: ['Donna Marie', 'Business Manager', 'Annapolis']
                }
            ],
            options: {
                filterList: [[], [], []]
            }
        }

        const newState = getNewStateOnDataChange(
            props,
            2,
            true,
            options,
            DEFAULT_STATE,
            () => {
                console.log('setState')
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
