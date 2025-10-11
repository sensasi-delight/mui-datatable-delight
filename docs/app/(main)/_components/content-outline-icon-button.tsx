'use client'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import ContentOutlineItems from './content-outline-items'
import useHeadings from './use-headings'

export default function ContentOutlineIconButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const headings = useHeadings()

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    if (headings.length === 0) return null

    return (
        <>
            <Tooltip arrow title="Outline">
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    color="primary"
                    onClick={handleClick}
                >
                    <FormatListBulletedIcon />
                </IconButton>
            </Tooltip>

            <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
                <ContentOutlineItems handleClose={handleClose} />
            </Menu>
        </>
    )
}
