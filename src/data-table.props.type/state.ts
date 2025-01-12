import type {
    DisplayData,
    MUIDataTableColumn,
    MUIDataTableColumnState,
    MUIDataTableStateRows
} from 'mui-datatables'
import { ReactNode } from 'react'

export enum FilterTypeEnum {
    CHECKBOX = 'checkbox',
    TEXTFIELD = 'textField',
    MULTISELECT = 'multiselect',
    CUSTOM = 'custom',
    DROPDOWN = 'dropdown'
}

type DataTableStateColumn = Omit<
    MUIDataTableColumnState,
    'filterType' | 'filterOptions' | 'filterList'
> & {
    /**
     * Choice of filtering view. Takes priority over global filterType option.
     *
     * Use 'custom' is you are supplying your own rendering via filterOptions.
     *
     * @default  'dropdown'
     *
     * @see  {@link FilterTypeEnum}
     */
    filterType?: FilterTypeEnum

    /**
     * Filter value list.
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/column-filters|Column Filters Example}.
     */
    filterList?: string[]

    /**
     * These options affect the filter display and functionality from the filter dialog.
     *
     * To modify the filter chip that display after selecting filters.
     *
     * @see  {@link DataTableStateColumnFilterOptions}.
     */
    filterOptions?: DataTableStateColumnFilterOptions
}

export interface DataTableStateColumnFilterOptions {
    /**
     * Custom names for the filter fields.
     *
     * @see  {@link https://mui-datatable-delight.vercel.app/examples/column-filters|Column Filters Example}.
     */
    names?: string[] | undefined

    /**
     * Custom rendering inside the filter dialog.
     *
     * `filterList` must be of the same type in the main column options, that is an array of arrays, where each array corresponds to the filter list for a given column.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    display?: (
        filterList: DataTableState['filterList'],
        onChange: (
            val: string | string[],
            index: number,
            column: MUIDataTableColumn
        ) => void,
        index: number,
        column: MUIDataTableColumn,
        filterData: DataTableState['filterData']
    ) => ReactNode

    /**
     * custom filter logic.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    logic?:
        | ((prop: string, filterValue: any[], row?: any[]) => boolean)
        | undefined

    /**
     * A function to customize filter choices.
     *
     * Use case: changing empty strings to `"(empty)"` in a dropdown.
     *
     * @see {@link https://mui-datatable-delight.vercel.app/examples/customize-filter|Customize Filter Example}.
     */
    renderValue?: ((value: string) => string) | undefined

    /** Will force a filter option to take up the grid's full width. */
    fullWidth?: boolean | undefined
}

export interface DataTableState {
    activeColumn: string | null
    announceText?: string
    columnOrder: number[]
    columns: DataTableStateColumn[]
    count: number
    data: any[]
    displayData: DisplayData
    expandedRows: MUIDataTableStateRows
    filterData: string[][]
    filterList: string[][]
    page: number
    previousSelectedRow: null | { index: number; dataIndex: number }
    rowsPerPage: number
    rowsPerPageOptions: number[]
    rowsSelected: number[]
    searchText: string | null
    searchProps: React.HTMLAttributes<HTMLInputElement> | null
    selectedRows: MUIDataTableStateRows
    showResponsive: boolean
    sortOrder?: {
        name: string
        direction: 'asc' | 'desc'
    }
}
