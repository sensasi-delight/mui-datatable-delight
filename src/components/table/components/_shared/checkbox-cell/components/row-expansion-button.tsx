'use client'

import type { MUIDataTableExpandButton } from 'mui-datatables'
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
}: MUIDataTableExpandButton) {
    const isNotExpand =
        isHeaderCell &&
        areAllRowsExpanded &&
        !areAllRowsExpanded() &&
        expandedRows.data.length > 0

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
