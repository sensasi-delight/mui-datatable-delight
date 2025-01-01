import clsx from 'clsx'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import { makeStyles } from 'tss-react/mui'
import ExpandButton from './select-cell.expand-button'
import { MUIDataTableExpandButton } from 'mui-datatables'
import { DataTableOptions } from '../../data-table.props.type/options'
import { DataTableProps } from '../../data-table.props.type'

export function DataTableTableSelectCell({
    fixedHeader,
    fixedSelectColumn,
    isHeaderCell = false,
    expandableOn = false,
    selectableOn = 'none',
    isRowExpanded = false,
    onExpand,
    isRowSelectable,
    selectableRowsHeader,
    hideExpandButton,
    expandableRowsHeader,
    expandedRows,
    areAllRowsExpanded = () => false,
    selectableRowsHideCheckboxes,
    setHeadCellRef,
    dataIndex,
    components = {},
    onChange,
    ...otherProps
}: DataTableTableSelectCellProps) {
    const { classes } = useStyles()

    const CheckboxComponent = components.Checkbox ?? Checkbox
    const ExpandButtonComponent = components.ExpandButton ?? ExpandButton

    if (
        expandableOn === false &&
        (selectableOn === 'none' || selectableRowsHideCheckboxes === true)
    ) {
        return null
    }

    const cellClass = clsx({
        [classes.root]: true,
        [classes.fixedHeader]: fixedHeader && isHeaderCell,
        [classes.fixedLeft]: fixedSelectColumn,
        [classes.headerCell]: isHeaderCell
    })

    const buttonClass = clsx({
        [classes.expandDisabled]: hideExpandButton
    })

    const iconClass = clsx({
        [classes.icon]: true,
        [classes.hide]: isHeaderCell && !expandableRowsHeader,
        [classes.expanded]:
            isRowExpanded || (isHeaderCell && areAllRowsExpanded())
    })
    const iconIndeterminateClass = clsx({
        [classes.icon]: true,
        [classes.hide]: isHeaderCell && !expandableRowsHeader
    })

    let refProp = {}
    if (setHeadCellRef) {
        refProp.ref = el => {
            setHeadCellRef(0, 0, el)
        }
    }

    const renderCheckBox = () => {
        if (
            isHeaderCell &&
            (selectableOn !== 'multiple' || selectableRowsHeader === false)
        ) {
            // only display the header checkbox for multiple selection.
            return null
        }
        return (
            <CheckboxComponent
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

    return (
        <TableCell className={cellClass} padding="checkbox" {...refProp}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {expandableOn && (
                    <ExpandButtonComponent
                        isHeaderCell={isHeaderCell}
                        areAllRowsExpanded={areAllRowsExpanded}
                        expandedRows={expandedRows}
                        onExpand={onExpand}
                        expandableRowsHeader={expandableRowsHeader}
                        buttonClass={buttonClass}
                        iconIndeterminateClass={iconIndeterminateClass}
                        iconClass={iconClass}
                        dataIndex={dataIndex}
                    />
                )}
                {selectableOn !== 'none' &&
                    selectableRowsHideCheckboxes !== true &&
                    renderCheckBox()}
            </div>
        </TableCell>
    )
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

    onExpand: MUIDataTableExpandButton['onExpand']

    fixedSelectColumn: boolean

    selectableRowsHideCheckboxes: DataTableOptions['selectableRowsHideCheckboxes']

    isRowExpanded: boolean

    dataIndex: number

    id: string

    components: DataTableProps['components']
}

const useStyles = makeStyles({ name: 'datatable-delight--body--select-cell' })(
    () => ({
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
)
