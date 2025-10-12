'use client'

import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import type { SxProps } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import ComponentClassName from '@src/enums/class-name'
// global enums
import TableAction from '@src/enums/table-action'
import { buildMap } from '@src/functions'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { DataTableOptions } from '@/src/types/options'
// local components
import RowExpansionButton from './components/row-expansion-button'

export default function CheckboxCell({
    isHeaderCell,
    isRowExpanded = false,
    onExpand,
    isRowSelectable,
    hideExpandButton,
    dataIndex,
    onChange,
    ...otherProps
}: DataTableTableSelectCellProps & IsHeaderCell) {
    const { components, onAction, options, state } = useDataTableContext()

    if (
        options.expandableRows === false &&
        (options.selectableRows === 'none' ||
            options.selectableRowsHideCheckboxes)
    ) {
        return null
    }

    function areAllRowsExpanded() {
        return state.expandedRows.data.length === state.data.length
    }

    const _Checkbox = components.Checkbox ?? Checkbox

    const renderCheckBox = () => {
        if (
            isHeaderCell &&
            (options.selectableRows !== 'multiple' ||
                !options.selectableRowsHeader)
        ) {
            // only display the header checkbox for multiple selection.
            return null
        }
        return (
            <_Checkbox
                color="primary"
                data-description={
                    isHeaderCell ? 'row-select-header' : 'row-select'
                }
                data-index={dataIndex ?? null}
                disabled={!isRowSelectable}
                onChange={onChange}
                {...otherProps}
            />
        )
    }

    // Collapses or expands all expanded rows
    function toggleAllExpandableRows() {
        const expandedRowsData = [...state.expandedRows.data]

        const { isRowExpandable } = options
        const affectedRows: {
            index: number
            dataIndex: number
        }[] = []

        if (expandedRowsData.length > 0) {
            // collapse all
            for (let ii = expandedRowsData.length - 1; ii >= 0; ii--) {
                const item = expandedRowsData[ii]

                if (!item) continue

                if (isRowExpandable?.(item.dataIndex, state.expandedRows)) {
                    const affectedRow = expandedRowsData.splice(ii, 1)[0]

                    if (!affectedRow) continue

                    affectedRows.push(affectedRow)
                }
            }
        } else {
            // expand all
            for (let ii = 0; ii < state.data.length; ii++) {
                const item = state.data[ii]

                if (!item) continue

                if (isRowExpandable?.(item.index, state.expandedRows)) {
                    if (state.expandedRows.lookup[item.index] !== true) {
                        const newItem = {
                            dataIndex: item.index,
                            index: ii
                        }

                        expandedRowsData.push(newItem)
                        affectedRows.push(newItem)
                    }
                }
            }
        }

        const newState = {
            expandedRows: {
                data: expandedRowsData,
                lookup: buildMap(expandedRowsData)
            }
        }

        onAction?.(TableAction.EXPAND_ROW, newState)

        options.onRowExpansionChange?.(
            affectedRows,
            newState.expandedRows.data,
            newState.expandedRows.data.map(item => item.dataIndex)
        )
    }

    const _RowExpansionButton =
        components.RowExpansionButton ?? RowExpansionButton

    return (
        <TableCell
            className={ComponentClassName.TABLE__CHECKBOX_CELL}
            padding="checkbox"
            sx={constructCellSx(options, isHeaderCell)}
        >
            <div style={{ alignItems: 'center', display: 'flex' }}>
                {options.expandableRows && (
                    <_RowExpansionButton
                        areAllRowsExpanded={areAllRowsExpanded}
                        dataIndex={dataIndex}
                        isHeaderCell={isHeaderCell}
                        isRowExpanded={isRowExpanded}
                        onExpand={
                            isHeaderCell ? toggleAllExpandableRows : onExpand
                        }
                    />
                )}

                {options.selectableRows !== 'none' &&
                    !options.selectableRowsHideCheckboxes &&
                    renderCheckBox()}
            </div>
        </TableCell>
    )
}

type IsHeaderCell =
    | {
          isHeaderCell: true
          indeterminate: boolean
          onExpand?: never
      }
    | {
          isHeaderCell: false
          onExpand: () => void
      }

export interface DataTableTableSelectCellProps {
    /** Select cell checked on/off */
    checked: boolean

    /** Callback to trigger cell update */
    onChange?: CheckboxProps['onChange']

    /** Extend the style applied to components */
    // classes?: PropTypes.object

    /** Adds extra class, `expandDisabled` when the row is not expandable. */
    hideExpandButton?: boolean

    /** Select cell disabled on/off */
    isRowSelectable?: boolean

    isRowExpanded?: boolean

    dataIndex?: number

    // id: string
}

function constructCellSx(
    {
        fixedHeader,
        fixedSelectColumn,
        responsive
    }: Pick<
        DataTableOptions,
        'fixedHeader' | 'fixedSelectColumn' | 'responsive'
    >,
    isHeaderCell: boolean
): SxProps {
    return {
        ...(fixedHeader && isHeaderCell
            ? {
                  position: 'sticky',
                  top: '0px'
              }
            : {}),

        ...(fixedSelectColumn
            ? {
                  left: '0px',
                  position: 'sticky'
              }
            : {}),

        ...(isHeaderCell
            ? {
                  backgroundColor: 'var(--mui-palette-background-paper)',
                  zIndex: 1
              }
            : {}),

        '@media print': {
            display: 'none'
        },

        borderBottom:
            !isHeaderCell && responsive === 'vertical'
                ? {
                      md: '1px solid var(--mui-palette-TableCell-border)',
                      sm: 'none',
                      xs: 'none'
                  }
                : undefined
    }
}
