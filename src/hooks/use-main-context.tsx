// vendors
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react'
// local types
import type { DataTableProps } from '..'
// functions
import { processTextLabels } from './use-main-context.process-text-labels'
// defaults
import { DEFAULT_ICONS } from './use-main-context.default-icons'
import { DEFAULT_COMPONENTS } from './use-main-context.default-components'
import { DataTableState } from '../data-table.props.type/state'

export function MainContextProvider({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps
    children: ReactNode
}): ReactNode {
    const [state, setState] = useState(DEFAULT_STATE)

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
                setState,
                state,
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

export const DEFAULT_STATE: DataTableState = {
    activeColumn: null,
    announceText: null,
    count: 0,
    columnOrder: [0],
    columns: [],
    data: [],
    displayData: [],
    expandedRows: {
        data: [],
        lookup: {}
    },
    filterData: [],
    filterList: [],
    page: 0,
    previousSelectedRow: null,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50, 100],
    rowsSelected: [],
    searchProps: {},
    searchText: null,
    selectedRows: {
        data: [],
        lookup: {}
    },
    showResponsive: false
}

/**
 * @deprecated WILL UNEXPORT, use `useMainContext` instead.
 */
export const MainContext = createContext<ContextValueType>({
    components: DEFAULT_COMPONENTS,
    icons: DEFAULT_ICONS,
    state: DEFAULT_STATE,
    textLabels: processTextLabels(undefined)
})

interface ContextValueType {
    components: typeof DEFAULT_COMPONENTS
    icons: typeof DEFAULT_ICONS
    setState?: Dispatch<SetStateAction<DataTableState>>
    state: typeof DEFAULT_STATE
    textLabels: ReturnType<typeof processTextLabels>
}
