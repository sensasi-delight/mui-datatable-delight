import type { ColumnDefinitionOptions } from './options'
import type { DefaultRow } from '../../default-row'

export interface ColumnDefinitionObject<Row = DefaultRow> {
    name: string
    label?: string
    options?: Partial<ColumnDefinitionOptions<Row>>
}
