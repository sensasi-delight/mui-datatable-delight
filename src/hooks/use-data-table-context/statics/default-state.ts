import type { DataTableState } from '../../../types/state'

const DEFAULT_STATE = {
    activeColumn: null,
    count: 0,
    columnOrder: [0],
    columns: [],
    data: [],
    displayData: [],
    expandedRows: {
        data: [],
        lookup: {}
    },
    filterData: [],
    filterList: [],
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    rowsSelected: [],
    searchText: '',
    searchProps: {},
    selectedRows: {
        data: [],
        lookup: {}
    },
    sortOrder: undefined,
    showResponsive: false
} satisfies DataTableState<unknown>

export default DEFAULT_STATE
