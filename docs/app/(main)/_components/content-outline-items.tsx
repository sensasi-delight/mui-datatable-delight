'use client'

import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import useHeadings from './use-headings'

export default function ContentOutlineItems({
    handleClose
}: {
    handleClose?: () => void
}) {
    const headings = useHeadings()

    return headings.map(heading => (
        <MenuItem
            key={heading.id}
            href={`#${heading.id}`}
            component="a"
            onClick={handleClose}
        >
            <ListItemText inset={heading.tagName === 'H3'}>
                <span
                    dangerouslySetInnerHTML={{
                        __html: heading.innerHTML
                    }}
                />
            </ListItemText>
        </MenuItem>
    ))
}
