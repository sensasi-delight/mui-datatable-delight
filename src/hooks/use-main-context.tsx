// vendors
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
// local types
import type { DataTableOptions, DataTableProps } from '..'
// functions
import { processTextLabels } from './use-main-context.process-text-labels'
// defaults
import { DEFAULT_ICONS } from './use-main-context.default-icons'
import { DEFAULT_COMPONENTS } from './use-main-context.default-components'
import { DataTableState } from '../data-table.props.type/state'
import { TableAction } from '../data-table.props.type/options'
import { getNewStateOnDataChange, load, save, warnInfo } from '../functions'

export function MainContextProvider({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps
    children: ReactNode
}): ReactNode {
    const restoredState = datatableProps.options?.storageKey
        ? load(datatableProps.options.storageKey)
        : undefined

    const [state, setState] = useState(
        getNewStateOnDataChange(
            datatableProps,
            1,
            true,
            datatableProps.options ?? {},
            {
                ...DEFAULT_STATE,
                ...getInitTableOptions(datatableProps.options),
                ...restoredState
            },
            () => {}
        )
    )

    function onStateChange(
        action: TableAction,
        newPartialState: Partial<DataTableState>
    ) {
        setState(prev => {
            const newState = {
                ...prev,
                ...newPartialState
            }

            datatableProps.options?.onTableChange?.(action, newState)

            if (datatableProps.options?.storageKey)
                save(datatableProps.options.storageKey, newState)

            return newState
        })
    }

    useEffect(() => {
        datatableProps.options?.onTableInit?.(TableAction.INITIALIZED, state)
    }, [])

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
                onStateChange,
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
    onStateChange?: (action: TableAction, state: DataTableState) => void
    state: typeof DEFAULT_STATE
    textLabels: ReturnType<typeof processTextLabels>
}

function getInitTableOptions({
    rowsPerPage,
    page,
    rowsSelected,
    rowsPerPageOptions
}: DataTableProps['options'] = {}) {
    const optState: {
        page?: DataTableState['page']
        rowsPerPage?: DataTableState['rowsPerPage']
        rowsPerPageOptions?: DataTableState['rowsPerPageOptions']
        rowsSelected?: DataTableState['rowsSelected']
    } = {}

    if (rowsPerPage) {
        optState.rowsPerPage = rowsPerPage
    }

    if (page) {
        optState.page = page
    }

    if (rowsSelected) {
        optState.rowsSelected = rowsSelected
    }

    if (rowsPerPageOptions) {
        optState.rowsPerPageOptions = rowsPerPageOptions
    }

    function validateOptions(options: DataTableOptions) {
        if (options.serverSide && options.onTableChange === undefined) {
            throw Error(
                'onTableChange callback must be provided when using serverSide option'
            )
        }
        if (
            options.expandableRows &&
            options.renderExpandableRow === undefined
        ) {
            throw Error(
                'renderExpandableRow must be provided when using expandableRows option'
            )
        }
        if (
            options.rowsSelected &&
            Array.isArray(options.rowsSelected) &&
            options.rowsSelected.some(isNaN)
        ) {
            warnInfo(
                'When using the rowsSelected option, must be provided an array of numbers only.'
            )
        }
    }

    validateOptions(optState)

    return optState
}
