import { MUIDataTableColumnOptions } from 'mui-datatables'

export const sortCompare: MUIDataTableColumnOptions['sortCompare'] = order => {
    return (a, b) => {
        var aData =
            a.data === null || typeof a.data === 'undefined' ? '' : a.data
        var bData =
            b.data === null || typeof b.data === 'undefined' ? '' : b.data
        return (
            (typeof aData.localeCompare === 'function'
                ? aData.localeCompare(bData)
                : aData - bData) * (order === 'asc' ? 1 : -1)
        )
    }
}
