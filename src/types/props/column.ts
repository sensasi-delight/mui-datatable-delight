import type { DataTableColumnObjectOptions } from '../columns'

export type ColumnPropType<T> =
    | string
    | {
          name: string
          label?: string
          options?: Partial<DataTableColumnObjectOptions<T>>
      }
