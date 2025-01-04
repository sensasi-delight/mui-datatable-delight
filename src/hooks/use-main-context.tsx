// vendors
import { createContext, ReactNode, useContext } from 'react'
// local types
import type { DataTableProps } from '..'
// functions
import { processTextLabels } from './use-main-context.process-text-labels'
// defaults
import { DEFAULT_ICONS } from './use-main-context.default-icons'
import { DEFAULT_COMPONENTS } from './use-main-context.default-components'

export function MainContextProvider({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps
    children: ReactNode
}): ReactNode {
    return (
        <MainContext.Provider
            value={{
                components: {
                    ...datatableProps.components,
                    ...DEFAULT_COMPONENTS
                },
                icons: {
                    ...DEFAULT_ICONS,
                    ...datatableProps.icons
                },
                textLabels: processTextLabels(datatableProps.textLabels)
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export function useMainContext() {
    return useContext(MainContext)
}

/**
 * @deprecated WILL UNEXPORT, use `useMainContext` instead.
 */
export const MainContext = createContext({
    components: DEFAULT_COMPONENTS,
    icons: DEFAULT_ICONS,
    textLabels: processTextLabels(undefined)
})
