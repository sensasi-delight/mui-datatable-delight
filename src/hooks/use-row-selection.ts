import TableAction from '@src/enums/table-action'
import { buildMap } from '@src/functions'
import useDataTableContext from '@src/hooks/use-data-table-context'
import SELECT_TOOLBAR_PLACEMENT from '@src/statics/select-toolbar-placement'
import type { SelectRowUpdateType } from '@src/types/select-row-update'
import type { SelectedRowDataState } from '@src/types/state/selected-row-data'

export function useRowSelection<T>(): SelectRowUpdateType {
    const { onAction, options, state } = useDataTableContext<T>()

    const selectRowUpdate: SelectRowUpdateType = (
        type,
        value,
        shiftAdjacentRows = []
    ) => {
        if (options.selectableRows === 'none') {
            return
        }

        if (type === 'head') {
            const prevState = state

            const { displayData, selectedRows: prevSelectedRows } = prevState
            const selectedRowsLen = state.selectedRows.data.length
            let isDeselect =
                selectedRowsLen === displayData.length ||
                (selectedRowsLen < displayData.length && selectedRowsLen > 0)

            const selectedRows = displayData.reduce<SelectedRowDataState[]>(
                (arr, item, i) => {
                    const selected =
                        options.isRowSelectable?.(
                            item.dataIndex,
                            prevSelectedRows
                        ) ?? true

                    if (selected) {
                        arr.push({
                            dataIndex: item.dataIndex,
                            index: i
                        })
                    }

                    return arr
                },
                []
            )

            let newRows = [...selectedRows]
            let selectedMap = buildMap(newRows)

            // if the select toolbar is disabled, the rules are a little different
            if (
                options.selectToolbarPlacement === SELECT_TOOLBAR_PLACEMENT.NONE
            ) {
                if (selectedRowsLen > displayData.length) {
                    isDeselect = true
                } else {
                    for (const item of selectedRows) {
                        isDeselect = !selectedMap[item.dataIndex]
                    }
                }
            }

            if (isDeselect) {
                newRows = prevState.selectedRows.data.filter(
                    ({ dataIndex }) => !selectedMap[dataIndex]
                )
                selectedMap = buildMap(newRows)
            }

            const newState = {
                curSelectedRows: newRows,
                previousSelectedRow: undefined,
                selectedRows: {
                    data: newRows,
                    lookup: selectedMap
                }
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            options.onRowSelectionChange?.(
                newState.curSelectedRows,
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'cell') {
            if (Array.isArray(value)) {
                throw new Error('value must be a single row')
            }

            const prevState = state
            const { dataIndex } = value ?? {}
            let selectedRows = [...prevState.selectedRows.data]
            let rowPos = -1

            for (let cIndex = 0; cIndex < selectedRows.length; cIndex++) {
                if (selectedRows[cIndex]?.dataIndex === dataIndex) {
                    rowPos = cIndex
                    break
                }
            }

            if (rowPos >= 0) {
                selectedRows.splice(rowPos, 1)

                // handle rows affected by shift+click
                if (shiftAdjacentRows.length > 0) {
                    const shiftAdjacentMap = buildMap(shiftAdjacentRows)

                    const temp = selectedRows.slice().reverse()

                    temp.forEach((row, i) => {
                        if (shiftAdjacentMap[row.dataIndex]) {
                            selectedRows.splice(i, 1)
                        }
                    })
                }
            } else if (options.selectableRows === 'single') {
                selectedRows = [value]
            } else {
                // multiple
                selectedRows.push(value)

                // handle rows affected by shift+click
                if (shiftAdjacentRows.length > 0) {
                    const selectedMap = buildMap(selectedRows)
                    shiftAdjacentRows.forEach(aRow => {
                        if (!selectedMap[aRow.dataIndex]) {
                            selectedRows.push(aRow)
                        }
                    })
                }
            }

            const newState = {
                ...prevState,
                previousSelectedRow: value,
                selectedRows: {
                    data: selectedRows,
                    lookup: buildMap(selectedRows)
                }
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, newState)

            options.onRowSelectionChange?.(
                [value],
                newState.selectedRows.data,
                newState.selectedRows.data.map(item => item.dataIndex)
            )
        } else if (type === 'custom') {
            const lookup = buildMap(Array.isArray(value) ? value : [value])

            const selectedRows = {
                data: Array.isArray(value) ? value : [value],
                lookup
            }

            onAction?.(TableAction.ROW_SELECTION_CHANGE, {
                previousSelectedRow: undefined,
                selectedRows
            })

            options.onRowSelectionChange?.(
                selectedRows.data,
                selectedRows.data,
                selectedRows.data.map(item => item.dataIndex)
            )
        }
    }

    return selectRowUpdate
}
