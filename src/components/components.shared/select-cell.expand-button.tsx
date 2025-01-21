import type { MUIDataTableExpandButton } from 'mui-datatables'
import { IconButton } from '@mui/material'
import {
    KeyboardArrowRight as KeyboardArrowRightIcon,
    Remove as RemoveIcon
} from '@mui/icons-material'

/**
 * @todo  IMPROVE PROP TYPES
 */
export function ExpandButton({
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
