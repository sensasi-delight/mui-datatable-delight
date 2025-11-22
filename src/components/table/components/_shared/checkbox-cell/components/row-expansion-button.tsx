'use client'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import type { SxProps } from '@mui/material/styles'
import useDataTableContext from '@src/hooks/use-data-table-context'

/**
 * The row expansion button component.
 *
 * @category  Component
 */
export default function RowExpansionButton({
    areAllRowsExpanded,
    isHeaderCell,
    isRowExpanded,
    onExpand
}: {
    areAllRowsExpanded: () => boolean
    dataIndex?: number
    isHeaderCell: boolean
    isRowExpanded: boolean
    onExpand?: (...args: unknown[]) => unknown
}): React.ReactNode {
    const { options, state } = useDataTableContext()

    const isNotExpand =
        isHeaderCell &&
        !areAllRowsExpanded() &&
        state.expandedRows.data.length > 0

    const keyboardIconSx: SxProps = {
        ...ICON_SX,
        transform:
            isRowExpanded || (isHeaderCell && areAllRowsExpanded())
                ? 'rotate(90deg)'
                : undefined,
        visibility:
            isHeaderCell && !options.expandableRowsHeader ? 'hidden' : undefined
    }

    const removeIconSx: SxProps = {
        ...ICON_SX,
        visibility:
            isHeaderCell && !options.expandableRowsHeader ? 'hidden' : undefined
    }

    return (
        <IconButton
            disabled={options.expandableRowsHeader === false}
            id="expandable-button"
            onClick={onExpand}
            style={{ padding: 0 }}
        >
            {isNotExpand ? (
                <RemoveIcon sx={removeIconSx} />
            ) : (
                <KeyboardArrowRightIcon sx={keyboardIconSx} />
            )}
        </IconButton>
    )
}

const ICON_SX = {
    cursor: 'pointer',
    transition: 'transform 0.25s'
}
