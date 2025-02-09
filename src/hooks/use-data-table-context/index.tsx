import { useContext } from 'react'

import DataTableContext from './context'
import type ContextValue from './types/context-value'

/**
 * Hook to access the DataTableContext.
 *
 * @example
 *
 * @category Hook
 */
export default function useDataTableContext<T>(): ContextValue<T> {
    return useContext(DataTableContext) as ContextValue<T>
}
