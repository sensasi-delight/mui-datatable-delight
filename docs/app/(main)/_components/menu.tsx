'use client'

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { grey } from '@mui/material/colors'
import Link from 'next/link'
// locals
import { Route as ExamplesRoute } from '../examples/_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '../../../utils'
import { ReactNode, useEffect, useState } from 'react'
import { DRAWER_WIDTH } from '../_constants'

export default function Menu({
    isOpen,
    toggle
}: {
    isOpen: boolean
    toggle: () => void
}) {
    const theme = useTheme()
    const [isClient, setIsClient] = useState(false)
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md')) && isClient

    useEffect(() => {
        setIsClient(true)
    })

    return (
        <Drawer
            open={isOpen || !isBelowMd}
            anchor="left"
            onClose={toggle}
            variant={isBelowMd ? 'temporary' : 'persistent'}
            sx={
                !isBelowMd
                    ? {
                          width: DRAWER_WIDTH,
                          flexShrink: 0,
                          '& .MuiDrawer-paper': {
                              width: DRAWER_WIDTH,
                              boxSizing: 'border-box'
                          }
                      }
                    : undefined
            }
        >
            <List component="nav">
                <CustomListSubheader>Getting Started</CustomListSubheader>

                <CustomListItem
                    href="/docs/getting-started/overview"
                    text="Overview"
                />

                <CustomListSubheader>Examples</CustomListSubheader>

                <CustomListItem href="/examples" text="Overview" />

                {SORTED_EXAMPLES.map((enumKey, i) => (
                    <CustomListItem
                        key={i}
                        href={'/examples/' + snakeCaseToKebab(enumKey)}
                        text={snakeCaseToTitle(enumKey)}
                    />
                ))}
            </List>
        </Drawer>
    )
}

const SORTED_EXAMPLES = Object.keys(ExamplesRoute)
    .filter(key => isNaN(parseInt(key)))
    .sort()

function CustomListItem({ href, text }: { href: string; text: string }) {
    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                LinkComponent={Link}
                sx={{
                    py: 0.5
                }}
            >
                <ListItemText
                    primary={text}
                    sx={{
                        m: 0
                    }}
                    slotProps={{
                        primary: {
                            sx: {
                                fontSize: '0.9em !important',
                                color: grey[800]
                            }
                        }
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}

function CustomListSubheader({ children }: { children: ReactNode }) {
    return (
        <ListSubheader
            sx={{
                lineHeight: 'unset',
                pt: 2,
                pb: 0.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'Highlight'
            }}
        >
            {children}
        </ListSubheader>
    )
}
