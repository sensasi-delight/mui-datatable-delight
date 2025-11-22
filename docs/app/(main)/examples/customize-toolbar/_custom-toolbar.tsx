'use client'

import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export default function CustomToolbar() {
    const handleClick = () => {
        console.log('clicked on icon!')
    }

    return (
        <Tooltip title={'custom icon'}>
            <IconButton onClick={handleClick}>
                <AddIcon />
            </IconButton>
        </Tooltip>
    )
}
