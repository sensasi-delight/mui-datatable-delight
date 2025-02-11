'use client'

// vendors
import {
    type Context,
    type ReactNode,
    useState,
    useEffect,
    useRef,
    type ReactElement
} from 'react'
import isEqual from 'react-fast-compare'
// globals
import type { DataTableProps } from '@src/data-table.props'
import type { DataTableState } from '@src/types/state'
import type { DataTableOptions } from '@src/types/options'
import { load, save, warnInfo } from '@src/functions'
import getNewStateOnDataChange from '@src/functions/get-new-state-on-data-change'
import TableAction from '@src/enums/table-action'
// locals
import type ContextValue from '../../types/context-value'
import { DEFAULT_ICONS } from '../../statics/default-icons'
import { DEFAULT_OPTIONS } from '../../statics/default-options'
import { handleDeprecatedOptions } from '../../function/handle-deprecated-options'
import { processTextLabels } from '../../function/process-text-labels'
import DEFAULT_STATE from '../../statics/default-state'
import DataTableContext from '../../context'

/**
 * The DataTableContextProvider component is responsible for providing the
 * DataTableContext to the entire DataTable component tree.
 *
 * @category  Component
 */
export default function DataTableContextProvider<DataRowItemType>({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps<DataRowItemType>
    children: ReactNode
}): ReactElement {
    const draggableHeadCellRefs = useRef<HTMLTableCellElement[]>([])
    const lastDatatableProps = useRef(datatableProps)
    const options = useRef<DataTableOptions<DataRowItemType>>(
        getConstructedOption(datatableProps?.options)
    )
    const tableHeadCellElements = useRef<HTMLTableCellElement[]>([])
    const tableRef = useRef<HTMLTableElement>(null)

    const [state, setState] = useState<DataTableState<DataRowItemType>>(() =>
        getInitialState(datatableProps, options.current)
    )

    useEffect(() => {
        if (
            datatableProps.data !== lastDatatableProps.current.data ||
            datatableProps.columns !== lastDatatableProps.current.columns ||
            datatableProps.options !== lastDatatableProps.current.options
        ) {
            lastDatatableProps.current = datatableProps

            options.current = {
                ...options.current,
                ...datatableProps.options
            }

            let didDataUpdate =
                datatableProps.data !== lastDatatableProps.current.data

            if (datatableProps.data && lastDatatableProps.current.data) {
                didDataUpdate =
                    didDataUpdate &&
                    datatableProps.data.length ===
                        lastDatatableProps.current.data.length
            }

            setState(prev =>
                getNewStateOnDataChange(
                    datatableProps,
                    1,
                    didDataUpdate,
                    options.current,
                    prev,
                    setState
                )
            )
        }
    }, [datatableProps])

    const [forwardTableChange, setForwardTableChange] = useState<{
        action: TableAction
        state: DataTableState<DataRowItemType>
    }>()

    /**
     * Forward table change after the state has been committed to prevent
     * it re-written inside the `onTableChange` callback before the state has been committed.
     */
    useEffect(() => {
        if (forwardTableChange) {
            lastDatatableProps.current.options?.onTableChange?.(
                forwardTableChange.action,
                forwardTableChange.state
            )

            if (lastDatatableProps.current.options?.storageKey) {
                save(
                    lastDatatableProps.current.options.storageKey,
                    forwardTableChange.state
                )
            }

            setForwardTableChange(undefined)
        }
    }, [forwardTableChange])

    handleDeprecatedOptions(datatableProps, options.current)

    const _DataTableContext = DataTableContext as Context<
        ContextValue<DataRowItemType>
    >

    return (
        <_DataTableContext.Provider
            value={{
                components: datatableProps.components ?? {},
                draggableHeadCellRefs,

                functions: {
                    setHeadCellsRef: (index, columnIndex, el) => {
                        draggableHeadCellRefs.current[index] = el
                        tableHeadCellElements.current[columnIndex] = el
                    }
                },

                icons: {
                    ...DEFAULT_ICONS,
                    ...datatableProps.icons
                },
                onAction(action, newPartialState) {
                    setState(prev => {
                        const changedKeys = Object.keys(
                            newPartialState
                        ) as (keyof typeof newPartialState)[]

                        const isChanged = changedKeys.some(
                            key => !isEqual(prev[key], newPartialState[key])
                        )

                        if (!isChanged) return prev

                        const newState = {
                            ...prev,
                            ...newPartialState
                        }

                        setForwardTableChange({
                            action,
                            state: newState
                        })

                        return newState
                    })
                },
                options: options.current,
                props: datatableProps,
                setState,
                state,
                tableHeadCellElements,
                tableRef,
                textLabels: processTextLabels(datatableProps.textLabels)
            }}
        >
            {children}
        </_DataTableContext.Provider>
    )
}

/**
 * @todo RENAME THIS TO SOMETHING CLEARER
 */
function getStateFromDataTableOptionsProp<T>({
    rowsPerPage,
    page,
    rowsSelected,
    rowsPerPageOptions
}: DataTableProps<T>['options'] = {}): Partial<DataTableState<T>> {
    const optState: {
        page?: DataTableState<T>['page']
        rowsPerPage?: DataTableState<T>['rowsPerPage']
        rowsPerPageOptions?: DataTableState<T>['rowsPerPageOptions']
        rowsSelected?: DataTableState<T>['rowsSelected']
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

    function validateOptions<T>(options: Partial<DataTableOptions<T>>) {
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

function getConstructedOption<T>(
    optionsFromProp: DataTableProps<T>['options']
): DataTableOptions<T> {
    return {
        ...DEFAULT_OPTIONS,
        ...optionsFromProp,
        downloadOptions: {
            ...DEFAULT_OPTIONS.downloadOptions,
            ...optionsFromProp?.downloadOptions
        }
    }
}

function getInitialState<T>(
    datatableProps: DataTableProps<T>,
    options: DataTableOptions<T>
): DataTableState<T> {
    const restoredState = datatableProps.options?.storageKey
        ? load<T>(datatableProps.options.storageKey)
        : undefined

    const newState = getNewStateOnDataChange<T>(
        datatableProps,
        1,
        true,
        options,
        {
            ...DEFAULT_STATE,
            ...getStateFromDataTableOptionsProp(datatableProps.options),
            ...restoredState
        },
        undefined
    )

    options?.onTableInit?.(TableAction.INITIALIZED, newState)

    return newState
}
