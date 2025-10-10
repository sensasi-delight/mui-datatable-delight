'use client'

import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'

export default class CustomToolbar extends React.Component {
    handleClick = () => {
        console.log('clicked on icon!')
    }

    render() {
        return (
            <React.Fragment>
                <Tooltip title={'custom icon'}>
                    <IconButton onClick={this.handleClick}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }
}
