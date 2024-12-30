import type {
    MUIDataTableColumnOptions,
    MUIDataTableCustomHeadRenderer
} from 'mui-datatables'

export type DataTableColumns = (string | DataTableColumnObject)[]

interface DataTableColumnObject {
    label?: string
    name: string
    options?: {
        display?: boolean | 'excluded' | 'always'
        empty?: boolean
        filter?: boolean
        sort?: boolean
        print?: boolean
        searchable?: boolean
        download?: boolean
        viewColumns?: boolean

        filterList?: MUIDataTableColumnOptions['filterList']

        // PROPS TYPE DECLARATION
        // filterOptions: PropTypes.oneOfType([
        //     PropTypes.array,
        //     PropTypes.shape({
        //         names: PropTypes.array,
        //         logic: PropTypes.func,
        //         display: PropTypes.func
        //     })
        // ]),
        filterOptions?: MUIDataTableColumnOptions['filterOptions']

        filterType?:
            | 'dropdown'
            | 'checkbox'
            | 'multiselect'
            | 'textField'
            | 'custom'

        customHeadRender?: MUIDataTableColumnOptions['customHeadRender']
        customBodyRender?: MUIDataTableColumnOptions['customBodyRender']
        customBodyRenderLite?: MUIDataTableColumnOptions['customBodyRenderLite']
        customHeadLabelRender?: MUIDataTableColumnOptions['customHeadLabelRender']
        customFilterListOptions?: MUIDataTableColumnOptions['customFilterListOptions']
        customFilterListRender?: MUIDataTableColumnOptions['customHeadRender']
        setCellProps?: (
            cellValue: string,
            rowIndex: number,
            columnIndex: number
        ) => object

        setCellHeaderProps?: (
            columnMeta: MUIDataTableCustomHeadRenderer
        ) => object

        sortThirdClickReset?: boolean
        sortDescFirst?: boolean
    }
}
