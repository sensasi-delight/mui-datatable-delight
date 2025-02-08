'use client'

import IconButton from '@mui/material/IconButton'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'

/**
 * @todo  IMPROVE PROP TYPES
 */
export default function RowExpansionButton({
    areAllRowsExpanded,
    buttonClass,
    expandableRowsHeader,
    expandedRows,
    iconClass,
    iconIndeterminateClass,
    isHeaderCell,
    onExpand
}: {
    areAllRowsExpanded: () => boolean
    buttonClass: string
    dataIndex?: number
    expandableRowsHeader: boolean
    expandedRows: unknown[]
    iconClass: string
    iconIndeterminateClass: string
    isHeaderCell: boolean
    onExpand?: (...args: unknown[]) => unknown
}) {
    const isNotExpand =
        isHeaderCell && !areAllRowsExpanded() && expandedRows.data.length > 0

    return (
        <IconButton
            id="expandable-button"
            onClick={onExpand}
            style={{ padding: 0 }}
            disabled={expandableRowsHeader === false}
            className={buttonClass}
        >
            {isNotExpand ? (
                <RemoveIcon className={iconIndeterminateClass} />
            ) : (
                <KeyboardArrowRightIcon className={iconClass} />
            )}
        </IconButton>
    )
}
