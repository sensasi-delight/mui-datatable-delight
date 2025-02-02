'use client'

// vendors
import {
    useState,
    type ReactNode,
    useEffect,
    useRef,
    type Context,
    useCallback
} from 'react'
// globals
import type { DataTableProps } from '@src/types'
import type { DataTableOptions, DataTableState } from '@src/index'
import { load, save, warnInfo } from '@src/functions'
import getNewStateOnDataChange from '@src/functions/get-new-state-on-data-change'
import TableAction from '@src/enums/table-action'
// locals
import { DEFAULT_ICONS } from '../../statics/default-icons'
import { DEFAULT_OPTIONS } from '../../statics/default-options'
import { handleDeprecatedOptions } from '../../function/handle-deprecated-options'
import { processTextLabels } from '../../function/process-text-labels'
import DEFAULT_STATE from '../../statics/default-state'
import DataTableContext from '../../context'
import type ContextValue from '../../types/context-value'

export default function DataTableContextProvider<DataRowItemType>({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps<DataRowItemType>
    children: ReactNode
}): ReactNode {
    const draggableHeadCellRefs = useRef<HTMLTableCellElement[]>([])
    const tableHeadCellElements = useRef<HTMLTableCellElement[]>([])
    const tableRef = useRef<HTMLTableElement>(null)

    const lastDatatableProps = useRef(datatableProps)

    const restoredState = datatableProps.options?.storageKey
        ? load(datatableProps.options.storageKey)
        : undefined

    const getInitialState = useCallback(() => {
        const newState = getNewStateOnDataChange(
            datatableProps,
            1,
            true,
            datatableProps.options ?? {},
            {
                ...DEFAULT_STATE,
                ...getStateFromDataTableOptionsProp(datatableProps.options),
                ...restoredState
            },
            undefined
        )

        datatableProps.options?.onTableInit?.(TableAction.INITIALIZED, newState)

        return newState
    }, [datatableProps, restoredState])

    const [state, setState] =
        useState<DataTableState<DataRowItemType>>(getInitialState)

    useEffect(() => {
        setState(prev => {
            const isDataTablePropsChanged = (
                Object.keys(
                    datatableProps
                ) as (keyof DataTableProps<DataRowItemType>)[]
            ).some(
                key => lastDatatableProps.current[key] !== datatableProps[key]
            )

            if (!isDataTablePropsChanged) {
                return prev
            }

            // store last datatableProps for comparison
            lastDatatableProps.current = datatableProps

            return getInitialState()
        })
    }, [datatableProps, getInitialState])

    const options = getConstructedOption(datatableProps?.options)

    handleDeprecatedOptions(datatableProps, options)

    const _DataTableContext = DataTableContext as Context<
        ContextValue<DataRowItemType>
    >

    return (
        <_DataTableContext.Provider
            value={{
                components: datatableProps.components ?? {},
                draggableHeadCellRefs,
                icons: {
                    ...DEFAULT_ICONS,
                    ...datatableProps.icons
                },
                onAction(action, newPartialState) {
                    setState(prev => {
                        // const isStateChange = (
                        //     Object.keys(
                        //         newPartialState
                        //     ) as (keyof DataTableState)[]
                        // ).some(key => prev[key] !== newPartialState[key])

                        // if (!isStateChange) {
                        //     return prev
                        // }

                        const newState = {
                            ...prev,
                            ...newPartialState
                        }

                        datatableProps.options?.onTableChange?.(
                            action,
                            newState
                        )

                        if (datatableProps.options?.storageKey)
                            save(datatableProps.options.storageKey, newState)

                        return newState
                    })
                },
                options,
                props: datatableProps,
                setState,
                tableHeadCellElements,
                tableRef,
                state,
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
}: DataTableProps<T>['options'] = {}) {
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

    function validateOptions<T>(options: DataTableOptions<T>) {
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
        ...(DEFAULT_OPTIONS as DataTableOptions<T>),
        ...(optionsFromProp ?? {}),
        downloadOptions: {
            ...DEFAULT_OPTIONS.downloadOptions,
            ...optionsFromProp?.downloadOptions
        }
    }
}
