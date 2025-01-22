import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'

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
