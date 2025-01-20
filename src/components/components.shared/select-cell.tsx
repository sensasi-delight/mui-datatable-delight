import { Checkbox, type CheckboxProps, TableCell } from '@mui/material'
import { tss } from 'tss-react/mui'
import {
    DataTableOptions,
    TableAction
} from '../../data-table.props.type/options'
import { useDataTableContext } from '../../hooks'
import { ExpandButton } from './select-cell.expand-button'
import { buildMap } from '../../functions'

export function DataTableTableSelectCell({
    fixedHeader,
    fixedSelectColumn,
    isHeaderCell,
    expandableOn = false,
    selectableOn = 'none',
    isRowExpanded = false,
    onExpand,
    isRowSelectable,
    selectableRowsHeader,
    hideExpandButton,
    expandableRowsHeader,
    expandedRows,
    selectableRowsHideCheckboxes,
    setHeadCellRef,
    dataIndex,
    onChange,
    ...otherProps
}: DataTableTableSelectCellProps & IsHeaderCell) {
    const { components, onAction, options, state } = useDataTableContext()
    const { classes, cx } = useStyles()

    if (
        expandableOn === false &&
        (selectableOn === 'none' || selectableRowsHideCheckboxes === true)
    ) {
        return null
    }

    function areAllRowsExpanded() {
        return state.expandedRows.data.length === state.data.length
    }

    const cellClass = cx({
        [classes.root]: true,
        [classes.fixedHeader]: fixedHeader && isHeaderCell,
        [classes.fixedLeft]: fixedSelectColumn,
        [classes.headerCell]: isHeaderCell
    })

    const buttonClass = cx({
        [classes.expandDisabled]: hideExpandButton
    })

    const iconClass = cx({
        [classes.icon]: true,
        [classes.hide]: isHeaderCell && !expandableRowsHeader,
        [classes.expanded]:
            isRowExpanded || (isHeaderCell && areAllRowsExpanded())
    })
    const iconIndeterminateClass = cx({
        [classes.icon]: true,
        [classes.hide]: isHeaderCell && !expandableRowsHeader
    })

    const _Checkbox = components.Checkbox ?? Checkbox

    const renderCheckBox = () => {
        if (
            isHeaderCell &&
            (selectableOn !== 'multiple' || selectableRowsHeader === false)
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
                data-index={dataIndex || null}
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
                    isRowExpandable(item.dataIndex, state.expandedRows)
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
                        isRowExpandable(item.dataIndex, state.expandedRows))
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

    const _RowExpansionButton = components.RowExpansionButton ?? ExpandButton

    return (
        <TableCell
            className={cellClass}
            padding="checkbox"
            sx={{
                bgcolor: isHeaderCell ? 'background.paper' : undefined
            }}
            ref={el => {
                setHeadCellRef?.(0, 0, el)
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {expandableOn && (
                    <_RowExpansionButton
                        areAllRowsExpanded={areAllRowsExpanded}
                        buttonClass={buttonClass}
                        dataIndex={dataIndex}
                        expandedRows={expandedRows}
                        expandableRowsHeader={expandableRowsHeader}
                        iconClass={iconClass}
                        iconIndeterminateClass={iconIndeterminateClass}
                        isHeaderCell={isHeaderCell}
                        onExpand={
                            isHeaderCell ? toggleAllExpandableRows : onExpand
                        }
                    />
                )}

                {selectableOn !== 'none' &&
                    selectableRowsHideCheckboxes !== true &&
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

    /** Select cell part of fixed header */
    fixedHeader?: boolean

    /** Callback to trigger cell update */
    onChange?: CheckboxProps['onChange']

    /** Extend the style applied to components */
    // classes?: PropTypes.object

    /** Is expandable option enabled */
    expandableOn?: boolean

    /** Adds extra class, `expandDisabled` when the row is not expandable. */
    hideExpandButton?: boolean

    /** Is selectable option enabled */
    selectableOn?: string

    /** Select cell disabled on/off */
    isRowSelectable?: boolean

    fixedSelectColumn: boolean

    selectableRowsHideCheckboxes: DataTableOptions['selectableRowsHideCheckboxes']

    isRowExpanded: boolean

    dataIndex: number

    id: string
}

const useStyles = tss.withName('datatable-delight--body--select-cell').create({
    root: {
        '@media print': {
            display: 'none'
        }
    },
    fixedHeader: {
        position: 'sticky',
        top: '0px',
        zIndex: 100
    },
    fixedLeft: {
        position: 'sticky',
        left: '0px',
        zIndex: 100
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
        zIndex: 110
    },
    expandDisabled: {},
    checkboxRoot: {},
    checked: {},
    disabled: {}
})
