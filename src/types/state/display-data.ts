import type { ReactNode } from 'react'
import type { ColumnDefinitionOptions } from '../props/column-definition/options'

export type DisplayDataState<T> = {
    data: (ReactNode | ColumnDefinitionOptions<T>['customBodyRenderLite'])[]
    dataIndex: number
}[]
