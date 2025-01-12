import clsx from 'clsx'
import { CheckboxProps } from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import { makeStyles } from 'tss-react/mui'
import { MUIDataTableExpandButton } from 'mui-datatables'
import { DataTableOptions } from '../../data-table.props.type/options'
import { useMainContext } from '../../hooks/use-main-context'

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
    onChange,
    ...otherProps
}: DataTableTableSelectCellProps) {
    const { components } = useMainContext()
    const { classes } = useStyles()

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

    const renderCheckBox = () => {
        if (
            isHeaderCell &&
            (selectableOn !== 'multiple' || selectableRowsHeader === false)
        ) {
            // only display the header checkbox for multiple selection.
            return null
        }
        return (
            <components.Checkbox
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
                    <components.ExpandButton
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
