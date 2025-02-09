'use client'

import type { ReactNode } from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'

/**
 * The row expansion button component.
 *
 * @todo  IMPROVE PROP TYPES
 *
 * @category  Component
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
}): ReactNode {
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
