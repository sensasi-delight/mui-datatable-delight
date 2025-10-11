'use client'

import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'

import ContentOutlineItems from './content-outline-items'
import useHeadings from './use-headings'

export default function ContentOutline() {
    const headings = useHeadings()

    if (headings.length === 0) return null

    return (
        <>
            <Typography>Contents</Typography>

            <MenuList component="div" dense>
                <ContentOutlineItems />
            </MenuList>
        </>
    )
}
