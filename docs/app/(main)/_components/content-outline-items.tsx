'use client'

import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import useHeadings from './use-headings'

export default function ContentOutlineItems({
    handleClose
}: {
    handleClose?: () => void
}) {
    const headings = useHeadings()

    return headings.map(heading => (
        <MenuItem
            component="a"
            href={`#${heading.id}`}
            key={heading.id}
            onClick={handleClose}
        >
            <ListItemText inset={heading.tagName === 'H3'}>
                <span
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: intentionally setting innerHTML
                    dangerouslySetInnerHTML={{
                        __html: heading.innerHTML
                    }}
                />
            </ListItemText>
        </MenuItem>
    ))
}
