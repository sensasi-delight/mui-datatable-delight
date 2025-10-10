'use client'

import { createContext } from 'react'
import { processTextLabels } from './function/process-text-labels'
// statics
import { DEFAULT_ICONS } from './statics/default-icons'
import { DEFAULT_OPTIONS } from './statics/default-options'
import DEFAULT_STATE from './statics/default-state'
import type ContextValue from './types/context-value'

const DataTableContext = createContext<ContextValue<unknown>>({
    components: {},
    icons: DEFAULT_ICONS,
    options: DEFAULT_OPTIONS,
    state: DEFAULT_STATE,

    textLabels: processTextLabels(undefined),

    props: {
        data: [],
        columns: []
    },

    tableRef: {
        current: null
    },

    updateCellValueRef: {
        current: undefined
    }
})

export default DataTableContext
