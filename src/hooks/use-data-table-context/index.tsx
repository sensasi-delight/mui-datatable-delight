import { useContext } from 'react'

import DataTableContext from './context'

export default function useDataTableContext() {
    return useContext(DataTableContext)
}
