import { createContext, ReactNode, useContext } from 'react'
import { DataTableProps } from '..'
import { DEFAULT_COMPONENTS } from './use-main-context.default-components'
import { DEFAULT_ICONS } from './use-main-context.default-icons'
import { processTextLabels } from './use-main-context.process-text-labels'

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
                components: componentsPreprocess(datatableProps.components),
                icons: {
                    ...DEFAULT_ICONS,
                    ...(datatableProps.components?.icons ?? {})
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

function componentsPreprocess(components: DataTableProps['components']) {
    return {
        TableBody: components?.TableBody ?? DEFAULT_COMPONENTS.TableBody,
        TableFilter: components?.TableFilter ?? DEFAULT_COMPONENTS.TableFilter,
        TableFilterList:
            components?.TableFilterList ?? DEFAULT_COMPONENTS.TableFilterList,
        TableFooter: components?.TableFooter ?? DEFAULT_COMPONENTS.TableFooter,
        TableHead: components?.TableHead ?? DEFAULT_COMPONENTS.TableHead,
        TableResize: components?.TableResize ?? DEFAULT_COMPONENTS.TableResize,
        TableToolbar:
            components?.TableToolbar ?? DEFAULT_COMPONENTS.TableToolbar,
        TableToolbarSelect:
            components?.TableToolbarSelect ??
            DEFAULT_COMPONENTS.TableToolbarSelect,
        Tooltip: components?.Tooltip ?? DEFAULT_COMPONENTS.Tooltip
    }
}

const DEFAULT_MAIN_CONTEXT_VALUE = {
    components: DEFAULT_COMPONENTS,
    icons: DEFAULT_ICONS,
    textLabels: processTextLabels(undefined)
}

/**
 * @deprecated WILL UNEXPORT, use `useMainContext` instead.
 */
export const MainContext = createContext(DEFAULT_MAIN_CONTEXT_VALUE)
