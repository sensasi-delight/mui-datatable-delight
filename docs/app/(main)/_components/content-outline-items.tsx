'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

export default function ContentOutlineItems({
    handleClose
}: {
    handleClose?: () => void
}) {
    const pathname = usePathname()
    const [headings, setHeadings] = useState<Element[]>([])

    useEffect(() => {
        const newHeadings: Element[] = []

        document.querySelectorAll('h2, h3').forEach(heading => {
            newHeadings.push(heading)
        })

        setHeadings(newHeadings)
    }, [pathname])

    if (headings.length === 0) return null

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
