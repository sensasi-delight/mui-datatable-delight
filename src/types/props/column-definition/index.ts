import type { ColumnDefinitionObject } from './object'

export type ColumnDefinition<Row> = string | ColumnDefinitionObject<Row>
