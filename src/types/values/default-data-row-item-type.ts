import type { Primitive } from './primitive'

export type DefaultDataRowItemType =
    | Primitive[]
    | {
          [key: string]: Primitive
      }
