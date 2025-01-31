'use client'

import { createContext } from 'react'
import { processTextLabels } from './function/process-text-labels'
import type ContextValue from './types/context-value'
// statics
import { DEFAULT_ICONS } from './statics/default-icons'
import { DEFAULT_OPTIONS } from './statics/default-options'
import DEFAULT_STATE from './statics/default-state'

const DataTableContext = createContext<ContextValue>({
    components: {},
    icons: DEFAULT_ICONS,
    options: DEFAULT_OPTIONS,
    state: DEFAULT_STATE,
    textLabels: processTextLabels(undefined),

    draggableHeadCellRefs: {
        current: []
    },

    tableHeadCellElements: {
        current: []
    },

    tableRef: {
        current: null
    },

    setHeadResizable: {
        current: undefined
    },

    updateDividers: {
        current: undefined
    }
})

export default DataTableContext
