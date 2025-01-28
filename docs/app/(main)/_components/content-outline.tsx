'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

export default function ContentOutline() {
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

    return (
        <>
            <Typography>Contents</Typography>

            <MenuList dense component="div">
                {headings.map(heading => (
                    <MenuItem
                        key={heading.id}
                        href={`#${heading.id}`}
                        component="a"
                    >
                        <ListItemText inset={heading.tagName === 'H3'}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: heading.innerHTML
                                }}
                            />
                        </ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </>
    )
}
