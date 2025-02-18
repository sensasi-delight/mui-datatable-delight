'use client'

// vendors
import react from 'react' // this is special import that not spread to prevent ts error on build
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
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
import updateDataCol from '@src/functions/get-new-state-on-data-change/update-data-col'
import type { HandleUpdateCellValue } from './types/handle-update-cell-value'

/**
 * The DataTableContextProvider component is responsible for providing the
 * DataTableContext to the entire DataTable component tree.
 *
 * @category  Component
 */
export default function DataTableContextProvider<Row>({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps<Row>
    children: react.ReactNode
}): react.ReactElement {
    const draggableHeadCellRefs = react.useRef<HTMLTableCellElement[]>([])
    const lastDatatableProps = react.useRef(datatableProps)
    const options = react.useRef<DataTableOptions<Row>>(
        getConstructedOption(datatableProps?.options)
    )
    const tableHeadCellElements = react.useRef<HTMLTableCellElement[]>([])
    const tableRef = react.useRef<HTMLTableElement>(null)

    const updateCellValueRef = react.useRef<HandleUpdateCellValue>(undefined)

    const [state, setState] = react.useState<DataTableState<Row>>(() =>
        getInitialState(datatableProps, options.current, updateCellValueRef)
    )

    react.useEffect(() => {
        updateCellValueRef.current = (value, rowIndex, index) => {
            setState(prev => {
                const newState = {
                    ...prev,
                    ...updateDataCol<Row>(
                        rowIndex,
                        index,
                        value as react.ReactNode,
                        prev,
                        options.current
                    )
                }

                return {
                    ...newState,
                    displayData: getDisplayData<Row>(
                        prev.columns,
                        prev.data,
                        prev.filterList,
                        prev.searchText,
                        newState,
                        options.current,
                        updateCellValueRef
                    )
                }
            })
        }
    }, [])

    react.useEffect(() => {
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
                    {
                        columns: datatableProps.columns,
                        options: datatableProps.options
                    },
                    datatableProps.data,
                    1,
                    didDataUpdate,
                    options.current,
                    prev,
                    updateCellValueRef
                )
            )
        }
    }, [datatableProps])

    const [forwardTableChange, setForwardTableChange] = react.useState<{
        action: TableAction
        state: DataTableState<Row>
    }>()

    /**
     * Forward table change after the state has been committed to prevent
     * it re-written inside the `onTableChange` callback before the state has been committed.
     */
    react.useEffect(() => {
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

    const _DataTableContext = DataTableContext as react.Context<
        ContextValue<Row>
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
                state,
                tableHeadCellElements,
                tableRef,
                textLabels: processTextLabels(datatableProps.textLabels),
                updateCellValueRef
            }}
        >
            {children}
        </_DataTableContext.Provider>
    )
}

/**
 * @todo  RENAME THIS TO SOMETHING CLEARER
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
    options: DataTableOptions<T>,
    updateCellValueRef: react.RefObject<HandleUpdateCellValue | undefined>
): DataTableState<T> {
    const restoredState = datatableProps.options?.storageKey
        ? load<T>(datatableProps.options.storageKey)
        : undefined

    const newState = getNewStateOnDataChange<T>(
        {
            columns: datatableProps.columns,
            options: datatableProps.options
        },
        datatableProps.data,
        1,
        true,
        options,
        {
            ...DEFAULT_STATE,
            ...getStateFromDataTableOptionsProp(datatableProps.options),
            ...restoredState
        },
        updateCellValueRef
    )

    options?.onTableInit?.(TableAction.INITIALIZED, newState)

    return newState
}
