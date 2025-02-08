import { useContext } from 'react'

import DataTableContext from './context'
import type ContextValue from './types/context-value'

export default function useDataTableContext<T>() {
    return useContext(DataTableContext) as ContextValue<T>
}
