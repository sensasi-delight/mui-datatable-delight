import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import BlockIcon from '@mui/icons-material/Block'
import { tss } from 'tss-react/mui'

export default function CustomToolbarSelect(props: unknown) {
    const { classes } = useStyles()

    const handleClickInverseSelection = () => {
        const nextSelectedRows = props.displayData.reduce(
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
        <div className={classes.iconContainer}>
            <Tooltip title={'Deselect ALL'}>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleClickDeselectAll}
                >
                    <IndeterminateCheckBoxIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
            <Tooltip title={'Inverse selection'}>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleClickInverseSelection}
                >
                    <CompareArrowsIcon
                        className={[classes.icon, classes.inverseIcon].join(
                            ' '
                        )}
                    />
                </IconButton>
            </Tooltip>
            <Tooltip title={'Block selected'}>
                <IconButton
                    className={classes.iconButton}
                    onClick={handleClickBlockSelected}
                >
                    <BlockIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

const useStyles = tss.create({
    iconButton: {},
    iconContainer: {
        marginRight: '24px'
    },
    inverseIcon: {
        transform: 'rotate(90deg)'
    },
    icon: {}
})
