'use client'

import { tss } from 'tss-react/mui'
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import { buildMap } from '@src/functions'
// global enums
import TableAction from '@src/enums/table-action'
// local components
import RowExpansionButton from './components/row-expansion-button'
import ComponentClassName from '@src/enums/class-name'

export default function CheckboxCell({
    isHeaderCell,
    isRowExpanded = false,
    onExpand,
    isRowSelectable,
    hideExpandButton,
    setHeadCellRef,
    dataIndex,
    onChange,
    ...otherProps
}: DataTableTableSelectCellProps & IsHeaderCell) {
    const { components, onAction, options, state } = useDataTableContext()
    const { classes, cx } = useStyles()

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

    const cellClasses = cx(classes.root, {
        [classes.fixedHeader]: options.fixedHeader && isHeaderCell,
        [classes.fixedLeft]: options.fixedSelectColumn,
        [classes.headerCell]: isHeaderCell
    })

    const buttonClass = cx({
        [classes.expandDisabled]: hideExpandButton
    })

    const iconClass = cx(classes.icon, {
        [classes.hide]: isHeaderCell && !options.expandableRowsHeader,
        [classes.expanded]:
            isRowExpanded || (isHeaderCell && areAllRowsExpanded())
    })
    const iconIndeterminateClass = cx(classes.icon, {
        [classes.hide]: isHeaderCell && !options.expandableRowsHeader
    })

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
                classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checked,
                    disabled: classes.disabled
                }}
                data-description={
                    isHeaderCell ? 'row-select-header' : 'row-select'
                }
                data-index={dataIndex ?? null}
                color="primary"
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
        const affectedRows: string[] = []

        if (expandedRowsData.length > 0) {
            // collapse all
            for (let ii = expandedRowsData.length - 1; ii >= 0; ii--) {
                let item = expandedRowsData[ii]
                if (
                    !isRowExpandable ||
                    isRowExpandable(item?.dataIndex, state.expandedRows)
                ) {
                    affectedRows.push(expandedRowsData.splice(ii, 1))
                }
            }
        } else {
            // expand all
            for (let ii = 0; ii < state.data.length; ii++) {
                let item = state.data[ii]
                if (
                    !isRowExpandable ||
                    (isRowExpandable &&
                        isRowExpandable(item?.dataIndex, state.expandedRows))
                ) {
                    if (state.expandedRows.lookup[item.index] !== true) {
                        let newItem = {
                            index: ii,
                            dataIndex: item.index
                        }
                        expandedRowsData.push(newItem)
                        affectedRows.push(newItem)
                    }
                }
            }
        }

        const newState = {
            expandedRows: {
                lookup: buildMap(expandedRowsData),
                data: expandedRowsData
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
            className={cellClasses}
            padding="checkbox"
            ref={el => {
                setHeadCellRef?.(0, 0, el)
            }}
            sx={{
                borderBottom:
                    !isHeaderCell &&
                    (options?.responsive === 'vertical' ||
                        options?.responsive === 'stacked' ||
                        options?.responsive === 'stackedFullWidth')
                        ? {
                              xs: 'none',
                              sm: 'none',
                              md: '1px solid var(--mui-palette-TableCell-border)'
                          }
                        : undefined
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {options.expandableRows && (
                    <_RowExpansionButton
                        areAllRowsExpanded={areAllRowsExpanded}
                        buttonClass={buttonClass}
                        dataIndex={dataIndex}
                        expandedRows={state.expandedRows}
                        expandableRowsHeader={options.expandableRowsHeader}
                        iconClass={iconClass}
                        iconIndeterminateClass={iconIndeterminateClass}
                        isHeaderCell={isHeaderCell}
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

    isRowExpanded: boolean

    dataIndex: number

    id: string
}

const useStyles = tss.withName(ComponentClassName.TABLE__CHECKBOX_CELL).create({
    root: {
        '@media print': {
            display: 'none'
        }
    },
    fixedHeader: {
        position: 'sticky',
        top: '0px'
    },
    fixedLeft: {
        position: 'sticky',
        left: '0px'
    },
    icon: {
        cursor: 'pointer',
        transition: 'transform 0.25s'
    },
    expanded: {
        transform: 'rotate(90deg)'
    },
    hide: {
        visibility: 'hidden'
    },
    headerCell: {
        backgroundColor: 'var(--mui-palette-background-paper)',
        zIndex: 1
    },
    expandDisabled: {},
    checkboxRoot: {},
    checked: {},
    disabled: {}
})
