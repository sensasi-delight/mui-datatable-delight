import type { ColumnDefinitionOptions } from '../props/column-definition/options'

export type ColumnState<T> = {
    name: string
    label: string
} & ColumnDefinitionOptions<T>
