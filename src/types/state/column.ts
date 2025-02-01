import type { DataTableColumnObjectOptions } from '../columns'

export type ColumnState<T> = {
    name: string
    label: string
} & DataTableColumnObjectOptions<T>
