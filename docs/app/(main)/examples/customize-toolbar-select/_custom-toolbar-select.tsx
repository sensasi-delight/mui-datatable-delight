'use client'

// icons-materials
import BlockIcon from '@mui/icons-material/Block'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
//
import type { DataTableState } from '@src'

export default function CustomToolbarSelect<T>(props: {
    selectedRows: DataTableState<T>['selectedRows']
    displayData: DataTableState<T>['displayData']
    setSelectedRows: (rows: number[]) => void
}) {
    const handleClickInverseSelection = () => {
        const nextSelectedRows = props.displayData.reduce<number[]>(
            (nextSelectedRows, _, index) => {
                if (
                    !props.selectedRows.data.find(
                        selectedRow => selectedRow.index === index
                    )
                ) {
                    nextSelectedRows.push(index)
                }

                return nextSelectedRows
            },
            []
        )

        props.setSelectedRows(nextSelectedRows)
    }

    const handleClickDeselectAll = () => {
        props.setSelectedRows([])
    }

    const handleClickBlockSelected = () => {
        console.log(
            `block users with dataIndexes: ${props.selectedRows.data.map(row => row.dataIndex)}`
        )
    }

    return (
        <div
            style={{
                marginRight: '24px'
            }}
        >
            <Tooltip title={'Deselect ALL'}>
                <IconButton onClick={handleClickDeselectAll}>
                    <IndeterminateCheckBoxIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={'Inverse selection'}>
                <IconButton onClick={handleClickInverseSelection}>
                    <CompareArrowsIcon
                        sx={{
                            transform: 'rotate(90deg)'
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Tooltip title={'Block selected'}>
                <IconButton onClick={handleClickBlockSelected}>
                    <BlockIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}
