'use client'

import type { ReactNode } from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDataTableContext } from '@src'

/**
 * The row expansion button component.
 *
 * @category  Component
 */
export default function RowExpansionButton({
    areAllRowsExpanded,
    buttonClass,
    iconClass,
    iconIndeterminateClass,
    isHeaderCell,
    onExpand
}: {
    areAllRowsExpanded: () => boolean
    buttonClass: string
    dataIndex?: number
    iconClass: string
    iconIndeterminateClass: string
    isHeaderCell: boolean
    onExpand?: (...args: unknown[]) => unknown
}): ReactNode {
    const { options, state } = useDataTableContext()

    const isNotExpand =
        isHeaderCell &&
        !areAllRowsExpanded() &&
        state.expandedRows.data.length > 0

    return (
        <IconButton
            id="expandable-button"
            onClick={onExpand}
            style={{ padding: 0 }}
            disabled={options.expandableRowsHeader === false}
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
