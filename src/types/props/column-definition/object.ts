import type { DefaultRow } from '../../default-row'
import type { ColumnDefinitionOptions } from './options'

export interface ColumnDefinitionObject<Row = DefaultRow> {
    name: string
    label?: string
    options?: Partial<ColumnDefinitionOptions<Row>>
}
