import type { ReactNode } from 'react'
import type { ColumnDefinitionOptions } from '../props/column-definition/options'

export type DisplayDataState<T> = {
    data: (
        | T[keyof T]
        | ReactNode
        | ColumnDefinitionOptions<T>['customBodyRender']
    )[]
    dataIndex: number
}[]
