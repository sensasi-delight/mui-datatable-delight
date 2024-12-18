import React from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import RemoveIcon from '@mui/icons-material/Remove'

export default function ExpandButton({
  areAllRowsExpanded,
  buttonClass,
  expandableRowsHeader,
  expandedRows,
  iconClass,
  iconIndeterminateClass,
  isHeaderCell,
  onExpand,
}: {
  areAllRowsExpanded: () => boolean
  buttonClass: string
  expandableRowsHeader: boolean
  expandedRows: { data: any[] }
  iconClass: string
  iconIndeterminateClass: string
  isHeaderCell: boolean
  onExpand: () => void
}) {
  return (
    <>
      {isHeaderCell && !areAllRowsExpanded() && areAllRowsExpanded && expandedRows.data.length > 0 ? (
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <RemoveIcon id="expandable-button" className={iconIndeterminateClass} />
        </IconButton>
      ) : (
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <KeyboardArrowRightIcon id="expandable-button" className={iconClass} />
        </IconButton>
      )}
    </>
  )
}
