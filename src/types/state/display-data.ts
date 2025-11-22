import type { ColumnDefinitionOptions } from '../props/column-definition/options'

export type DisplayDataState<T> = {
    data: (
        | React.ReactNode
        | ColumnDefinitionOptions<T>['customBodyRenderLite']
    )[]
    dataIndex: number
}[]
