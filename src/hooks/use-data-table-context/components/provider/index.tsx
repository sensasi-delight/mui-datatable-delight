'use client'

import { useState, type ReactNode, useEffect, useRef } from 'react'
import DEFAULT_STATE from '../../statics/default-state'
import { handleDeprecatedOptions } from '../../function/handle-deprecated-options'
import DataTableContext from '../../context'
import { DEFAULT_ICONS } from '../../statics/default-icons'
import { processTextLabels } from '../../function/process-text-labels'
import { DEFAULT_OPTIONS } from '../../statics/default-options'
// globals
import type { DataTableProps } from '@src/types'
import type { DataTableOptions, DataTableState } from '@src/index'
import { load, save, warnInfo } from '@src/functions'
import getNewStateOnDataChange from '@src/functions/get-new-state-on-data-change'
import TableAction from '@src/enums/table-action'

export default function DataTableContextProvider({
    datatableProps,
    children
}: {
    datatableProps: DataTableProps
    children: ReactNode
}): ReactNode {
    const lastDatatableProps = useRef<DataTableProps>(null)

    const restoredState = datatableProps.options?.storageKey
        ? load(datatableProps.options.storageKey)
        : undefined

    const [state, setState] = useState<DataTableState>(
        getNewStateOnDataChange(
            datatableProps,
            1,
            true,
            datatableProps.options ?? {},
            {
                ...DEFAULT_STATE,
                ...getStateFromDataTableOptionsProp(datatableProps.options),
                ...restoredState
            },
            () => {}
        )
    )

    useEffect(() => {
        setState(prev => {
            const isDataTablePropsChanged =
                JSON.stringify(datatableProps.data) !==
                    JSON.stringify(lastDatatableProps.current?.data) ||
                JSON.stringify(datatableProps.columns) !==
                    JSON.stringify(lastDatatableProps.current?.columns) ||
                JSON.stringify(datatableProps.options) !==
                    JSON.stringify(lastDatatableProps.current?.options)

            if (!isDataTablePropsChanged) {
                return prev
            }

            const newState = getNewStateOnDataChange(
                datatableProps,
                1,
                true,
                datatableProps.options ?? {},
                {
                    ...prev,
                    ...getStateFromDataTableOptionsProp(datatableProps.options),
                    ...restoredState
                },
                () => {}
            )

            // store last datatableProps for comparison
            lastDatatableProps.current = datatableProps

            datatableProps.options?.onTableInit?.(
                TableAction.INITIALIZED,
                newState
            )

            return newState
        })
    }, [datatableProps])

    useEffect(() => {
        lastDatatableProps.current = datatableProps
        datatableProps.options?.onTableInit?.(TableAction.INITIALIZED, state)
    }, [])

    const options = getConstructedOption(datatableProps?.options)

    handleDeprecatedOptions(datatableProps, options)
    return (
        <DataTableContext.Provider
            value={{
                components: datatableProps.components ?? {},
                icons: {
                    ...DEFAULT_ICONS,
                    ...datatableProps.icons
                },
                onAction(action, newPartialState) {
                    setState(prev => {
                        const newState = {
                            ...prev,
                            ...newPartialState
                        }

                        datatableProps.options?.onTableChange?.(
                            action,
                            newState
                        )

                        if (JSON.stringify(prev) === JSON.stringify(newState)) {
                            return prev
                        }

                        if (datatableProps.options?.storageKey)
                            save(datatableProps.options.storageKey, newState)

                        return newState
                    })
                },
                options,
                props: datatableProps,
                setState,
                state,
                textLabels: processTextLabels(datatableProps.textLabels)
            }}
        >
            {children}
        </DataTableContext.Provider>
    )
}

/**
 * @todo RENAME THIS TO SOMETHING CLEARER
 */
function getStateFromDataTableOptionsProp({
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

function getConstructedOption(
    optionsFromProp: DataTableProps['options']
): DataTableOptions {
    return {
        ...DEFAULT_OPTIONS,
        ...(optionsFromProp ?? {}),
        downloadOptions: {
            ...DEFAULT_OPTIONS.downloadOptions,
            ...optionsFromProp?.downloadOptions
        }
    }
}
